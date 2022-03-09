FROM node:16.14-alpine3.14

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . ./

EXPOSE 3000

CMD ["yarn", "dev"]