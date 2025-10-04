# Dockerfile

# 1. Use an official Node.js runtime as a parent image
FROM node:18-alpine

# 2. Set the working directory in the container
WORKDIR /usr/src/app

# 3. Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# 4. Install application dependencies
RUN npm install

# 5. Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# 6. Expose the port your app runs on
EXPOSE 3000

# 7. Define the command to run your app
CMD [ "node", "app.js" ]