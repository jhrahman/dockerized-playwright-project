# Use the official Node.js v22 Docker image as the base image.
# This image already includes:
# - Debian Linux (default Linux distribution)
# - Node.js v22
# - npm
# Docker will build our image on top of this image.
FROM node:22

# Create the /app directory inside the container if it doesn't exist,
# then make /app the current working directory.
# All subsequent commands (COPY, RUN, CMD, etc.) will execute from here.
WORKDIR /app

# Copy only package.json and package-lock.json from the local project
# into the current working directory (/app) inside the container.
# We copy these files first to take advantage of Docker's build cache.
# If dependencies haven't changed, Docker can reuse the npm install layer.
COPY package*.json ./

# Execute 'npm install' inside the container while building the image.
# This installs all project dependencies listed in package.json
# and creates the node_modules folder inside the image.
RUN npm install

# Copy the remaining project files (tests, pages, configs, source code, etc.)
# from the local machine into /app inside the container.
# Since dependencies are already installed, changing application code
# won't trigger another 'npm install' unless package.json changes.
COPY . .

# Download and install the Playwright browser binaries
# (Chromium, Firefox and WebKit) inside the image.
# These browsers are required for Playwright tests to execute.
RUN npx playwright install --with-deps

# Define the default command to execute when a container is started
# from this image. This command automatically runs the Playwright tests.
# Equivalent to running:
# npx playwright test
CMD ["npx", "playwright", "test"]