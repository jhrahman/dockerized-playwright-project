# Dockerized Playwright Automation

![Docker](https://img.shields.io/badge/Docker-ready-blue)
![Playwright](https://img.shields.io/badge/Playwright-supported-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-enabled-blue)

Simple browser automation built to run in a consistent local or container environment.

## Overview

This project uses Playwright for browser automation and Docker to keep the execution environment stable. It is designed to be easy to start, easy to extend, and compatible with GitHub Actions.

## Getting started

### Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Install Playwright browsers:
   ```bash
   npx playwright install --with-deps
   ```
3. Run the automation suite:
   ```bash
   npx playwright test
   ```

### Docker setup

Use Docker when you want the same environment on every machine:

```bash
docker compose up --build
```

This builds the Docker image, installs dependencies, and runs the automation inside the container.

## Project structure

- `playwright.config.ts` — main Playwright configuration
- `tests/` — automation scenarios and test cases
- `pages/` — page object files and reusable UI helpers
- `utils/` — utilities and data generation helpers
- `docker-compose.yml` — Docker service definition for local container execution
- `Dockerfile.dev` — development Docker image setup
- `.github/workflows/playwright.yml` — GitHub Actions CI workflow

## Key ideas

- Uses a shared base URL and browser settings for consistency
- Captures failure artifacts like screenshots and video only when needed
- Generates an HTML report in `playwright-report`
- Supports local and CI execution with the same setup

## CI / CD

This repository already includes a GitHub Actions workflow at `.github/workflows/playwright.yml`.

The workflow:

- checks out the code
- builds the Docker image
- runs Playwright inside the container
- uploads HTML reports and test artifacts

Use `CI=true` in environments where you want Playwright to enforce CI-mode behavior.

## Useful commands

- Execute the full suite locally:
  ```bash
  npx playwright test
  ```
- Run a specific browser project:
  ```bash
  npx playwright test --project=chromium
  ```
- View the test report:
  ```bash
  npx playwright show-report
  ```

## Notes

- The Docker setup is based on Node.js 22.
- The test environment is intended to be reproducible across machines.
- Updating the workflow or Docker config keeps the same behavior in local and CI runs.

If you want to experiment with new automation flows, this setup gives you a clean base to build from.