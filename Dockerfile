FROM node:18.12.1-alpine3.16 as BUILD

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ .

RUN npm run dev

FROM nginx:1.21.0-alpine as PRODUCTION

COPY --from=BUILD /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]