FROM node:latest

WORKDIR /usr/src/shield-ft/
COPY ./package*.json ./
RUN npm install -qy
COPY ./ ./
ENV PORT=4000
EXPOSE 4000

CMD ["npm", "start"]