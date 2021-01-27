FROM node:alpine
WORKDIR /usr/app
COPY package.json .
RUN npm install --quiet
COPY test/index.js ./test/index.js