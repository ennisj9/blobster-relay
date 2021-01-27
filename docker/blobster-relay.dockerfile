FROM node:alpine
WORKDIR /usr/app
COPY package.json .
RUN npm install --quiet --production
COPY src/index.js ./src/index.js
ENTRYPOINT npm run relay
