# Dockerized Playwright Automation

![Docker](https://img.shields.io/badge/Docker-ready-blue)
![Playwright](https://img.shields.io/badge/Playwright-supported-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-enabled-blue)

A clean Playwright automation setup with Docker support for reliable local and CI execution.

## Contents

- [About](#about)
- [Quick Start](#quick-start)
- [Docker Setup](#docker-setup)
- [Docker Compose](#docker-compose)
- [CI / CD](#ci--cd)
- [Project Structure](#project-structure)
- [Commands](#commands)
- [Notes](#notes)

## About

This repository uses Playwright for browser automation and Docker to make the runtime reproducible. It is built so the same configuration works locally and in CI.

---
![Dockerized Playwright Automation](./dockerized-playwright.svg)



## Quick Start

### Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Install Playwright browsers:
   ```bash
   npx playwright install --with-deps
   ```
3. Run the automation:
   ```bash
   npx playwright test
   ```

### When to use Docker

Use Docker when you want a consistent environment across machines, or when you want to mirror CI behavior locally.

## Docker Setup

Docker packages the application together with the OS, Node.js, Playwright, and dependencies.

### What Docker means in this project

- `Dockerfile` is intended for CI.
  - Builds the image
  - Installs dependencies
  - Runs Playwright tests and exits
- `Dockerfile.dev` is intended for local development.
  - Builds the same environment
  - Keeps the container running so tests can be executed without rebuilding
- A bind mount syncs the host project folder with `/app` inside the container.

### Common Docker commands

- Build an image:
  ```bash
  docker build -t playwright-test-image .
  ```
- Run the image:
  ```bash
  docker run --rm \
    -v "${PWD}/playwright-report:/app/playwright-report" \
    -v "${PWD}/test-results:/app/test-results" \
    playwright-test-image
  ```
- List running containers:
  ```bash
  docker ps
  ```
- Remove an image:
  ```bash
  docker rmi playwright-test-image
  ```

## Docker Compose

Docker Compose makes it easier to manage the local development container.

### What `docker-compose.yml` does

- Builds the image from `Dockerfile.dev`
- Starts the development container
- Mounts the project folder into `/app`
- Keeps the container running until stopped

### Common Docker Compose commands

- Build and start services:
  ```bash
  docker compose up -d
  ```
- Stop and remove all services:
  ```bash
  docker compose down
  ```
- Stop services without removing them:
  ```bash
  docker compose stop
  ```
- Start previously stopped services:
  ```bash
  docker compose start
  ```
- Show Compose-managed containers:
  ```bash
  docker compose ps
  ```
- View service logs:
  ```bash
  docker compose logs
  ```
- Execute a command inside a running service:
  ```bash
  docker compose exec playwright <command>
  ```

### Rule of thumb

- Use Docker for individual image builds and container runs.
- Use Docker Compose to manage services and simplify local development.

## CI / CD

A GitHub Actions workflow is included at `.github/workflows/playwright.yml`.

The pipeline:

- checks out the repository
- builds the Docker image
- runs Playwright tests inside the container
- uploads HTML report and test artifacts

Use `CI=true` in CI environments to enable Playwright CI behavior.

## Project Structure

- `playwright.config.ts` — Playwright configuration and runner settings
- `tests/` — automation scenarios and test cases
- `pages/` — page objects and reusable UI helpers
- `utils/` — helper functions and test data utilities
- `docker-compose.yml` — local development Compose file
- `Dockerfile.dev` — development Docker image recipe
- `.github/workflows/playwright.yml` — GitHub Actions workflow

## Commands

- Run the full suite locally:
  ```bash
  npx playwright test
  ```
- Run a specific browser project:
  ```bash
  npx playwright test --project=chromium
  ```
- Open the HTML report:
  ```bash
  npx playwright show-report
  ```
- Start local development container:
  ```bash
  docker compose up -d
  ```
- Stop and remove local container:
  ```bash
  docker compose down
  ```

## Notes

- The Docker setup is based on Node.js 22.
- The project captures screenshots, video, and trace on failure.
- The Docker and CI configuration are aligned for consistent execution.

