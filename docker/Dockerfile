ARG BASE_VERSION=17.4-alpine

FROM node:${BASE_VERSION} as build

WORKDIR /app

COPY package.json package-lock.json tsconfig.json tsconfig.build.json ./
RUN npm ci --ignore-scripts

COPY src src

CMD ["npm", "run", "start:dev"]
