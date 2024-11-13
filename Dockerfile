FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn run build

EXPOSE 5000

CMD ["yarn", "run", "start:prod"]
