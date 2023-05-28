FROM atools/chrome-headless:java11-node14-latest

ENV DEBIAN_FRONTEND=noninteractive

RUN google-chrome --version
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' | tee /etc/apt/sources.list.d/google-chrome.list     
RUN apt-get update
RUN apt-get install google-chrome-stable
RUN google-chrome --version

ENTRYPOINT ["tail"]
CMD ["-f","/dev/null"]