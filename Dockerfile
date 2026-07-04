FROM mcr.microsoft.com/playwright:v1.61.1-noble

WORKDIR /app

COPY package*.json ./

RUN npm ci

# Install Java Runtime (required by Allure)
RUN apt-get update && \
    apt-get install -y openjdk-21-jre-headless && \
    rm -rf /var/lib/apt/lists/*

# Install Allure CLI
RUN npm install -g allure-commandline

COPY . .

CMD ["npx", "playwright", "test"]