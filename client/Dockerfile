FROM node:alpine as build_phase
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build_phase /app/build /usr/share/nginx/html
