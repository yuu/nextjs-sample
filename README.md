# nextjs-sample

[![](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

Nextjs x Prisma x tRPC sample project

## Table of Contents
* [Requirements](#requirements)
* [Installation](#installation)

## Requirements

nodejs 20.15.0

## Installation

``` bash
cp env-sample .env
docker compose up -d

npm install
make db-push
make db-seed

npm run dev
```
