FROM node:latest

RUN mkdir -p /custom/backend

WORKDIR /custom/backend

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4000

RUN npm start