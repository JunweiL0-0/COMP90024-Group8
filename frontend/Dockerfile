FROM node:14-alpine as build-deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
EXPOSE 3000
COPY . .
#RUN npm run build
ENTRYPOINT ["./run.sh"]

