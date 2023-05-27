const { TimelineService } = require('wdio-timeline-reporter/timeline-service');
const video = require('wdio-video-reporter');

exports.config = {
  specs: ['./tests/ui/specs/**/*.ts'],
  suites: {
    login: ['./tests/ui/specs/login.e2e.ts'],
    end2end: ['./tests/ui/specs/full-flow.ts'],
  },
  exclude: [],
  maxInstances: 5,
  capabilities: [
    {
      maxInstances: 1,
      browserName: 'chrome',
      acceptInsecureCerts: true,
      'goog:chromeOptions': { 
        args: [
          //"--headless",
          "--no-sandbox",
          "--ignore-certificate-errors",
          "--allow-insecure-localhost",
          "--allow-running-insecure-content",
          "--no-sandbox",
          "--disable-gpu",
          "--disable-dev-shm-usage",
          "--window-size=1920,1080",
        ],
      },
    },
  ],
  logLevel: 'error',
  waitforTimeout: 5000,
  connectionRetryTimeout: 15000,
  connectionRetryCount: 3,
  specFileRetries: 0,
  services: [
    'selenium-standalone', 
    [TimelineService]
  ],
  framework: 'mocha',
  reporters: [
    'spec',
    [
      'timeline', 
      { 
        outputDir: 'reports',
        embedImages: true,
        screenshotStrategy: 'on:error',
      }
    ],
    [
      video, 
      {
        outputDir: 'reports/videos',
        saveAllVideos: false,
        videoSlowdownMultiplier: 3,
      }
    ],
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 5000,
    bail: false
  }
}
