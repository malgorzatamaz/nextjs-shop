FROM node:18
WORKDIR /pages
COPY . .
# RUN yarn install
RUN apt-get update && apt-get install -y openssl libssl-dev && yarn
# CMD ["node", "src/index.js"]
# CMD yarn dev
EXPOSE 3000
