FROM node:14-alpine as base

WORKDIR /usr/app
COPY package.json .
RUN npm install --quiet
COPY . .