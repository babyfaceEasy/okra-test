# Okra Test

## Setup
- Install the latest version of Docker and Docker Compose
- Create  a `.env` file
- Copy the content from `env_sample` file into the `.env` file
#### If OS is linux, 
- Run `docker-compose up -d --build `

#### If OS is Mac-OS
- Run `docker compose up -d --build`

## Question 1: Consuming APIs

- After following the instructions in section *Setup*

If OS is linux
- Run `docker-compose exec okraapp node dist/question_one.js`

If OS is Mac-OS
- Run `docker-compose exec okraapp node dist/question_one.js`


## Question 2: Creating Logic
- Use an http client to visit the endpoint `http://localhost:3001/`
- Make use of a *POST* method
- Pass the following parameters using the keys:
- *username*
- *password*