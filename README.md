# A-SOCIAL-MEDIA

## About The Project

An exploratory full-stack project using the MEAN stack (MongoDB, Express, Angular, Node.js): a social network web application. It is marked as abandoned in the original project description.

The Express API handles user registration and login (Passport and JWT) and user search. The Angular client has pages for the feed, profile, messages, search results, friend requests, login and register. The interface is based on the SB Admin 2 theme, kept in `theme/`.

### Built With

- MongoDB (Mongoose)
- Express and Node.js
- Angular 15
- Passport and JSON Web Tokens
- [SB Admin 2](https://github.com/StartBootstrap/startbootstrap-sb-admin-2) theme (Bootstrap)
- Docker Compose (MongoDB service)

## Getting Started

### Prerequisites

- Node.js and npm
- Docker and Docker Compose

### Installation

```sh
npm install
cp .env.example .env   # then set JWT_SECRET
cd angular && npm install
```

### Running

```sh
npm start
```

This starts the MongoDB container with `docker-compose up -d`, then runs the API with nodemon on port 3000 (or `PORT`). In development, the API connects to `mongodb://localhost/a-social-media`; in production it reads `MONGODB_URI`.

The Angular client (in `angular/`) runs with `ng serve` (`npm start` inside that folder).

## Roadmap

The project is abandoned and not planned to be developed further.

## License

No license file is present in this repository. The bundled SB Admin 2 theme (`theme/___startbootstrap-sb-admin-2-gh-pages/`) is distributed under its own MIT license.

## Contact

Dyrits - https://github.com/Dyrits
