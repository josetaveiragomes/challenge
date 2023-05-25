FROM atools/chrome-headless:java11-node14-latest

RUN npm install
RUN npm run wdio

ENTRYPOINT ["tail"]
CMD ["-f","/dev/null"]