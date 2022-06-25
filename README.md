[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <img src="https://images.t3n.de/news/wp-content/uploads/2020/07/openai-cover.png?class=hero" alt="Logo" height="60">

  <h3 align="center">open-ai-phoenix-bot</h3>

  <p align="center">
    A Discord test bot to have some fun with OpenAi
    <br />
    <br />
    ·
    <a href="https://github.com/beuluis/open-ai-phoenix-bot/issues">Report Bug</a>
    ·
    <a href="https://github.com/beuluis/open-ai-phoenix-bot/issues">Request Feature</a>
  </p>
</p>

<!-- ABOUT THE PROJECT -->

## About The Project

A Discord test bot to have some fun with [OpenAI](https://openai.com/).

The name `phoenix` comes from OpenAI itself. I just asked it :)

<!-- GETTING STARTED -->

## Getting Started Develop

To get a local copy up and running follow these simple steps.

### Prerequisites

-   [Docker](https://docs.docker.com/get-docker/)
-   [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1. Clone the repo

```sh
git clone https://github.com/beuluis/open-ai-phoenix-bot.git --branch develop
```

2. Start docker-compose

```sh
docker-compose up --build
```

### Customization

1. Create a `.env` file

```sh
touch .env
```

2. Overwrite variables as you like (format: `{variable name}={variable value}`)

| Variable             | Description                         | Default value     | Required |
| -------------------- | ----------------------------------- | ----------------- | -------- |
| `BOT_GREENTEXT_CRON` | Send a automatic AI greentext       | 0 19 \* \* \*     | false    |
| `BOT_ACTIVITY`       | What to show as activity in discord | conquer the world | false    |
| `BOT_CHANNEL_ID`     | Channel the bot sends to            |                   | true     |
| `BOT_TOKEN`          | Discord bot token                   |                   | true     |
| `OPENAI_API_KEY`     | OpenAI API token                    |                   | true     |

## Getting Started Production

To get a prod copy up and running follow these simple steps.

### Prerequisites

-   [Docker](https://docs.docker.com/get-docker/)
-   [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1. Clone the repo

```sh
git clone https://github.com/beuluis/open-ai-phoenix-bot.git --branch main
```

2. Start docker-compose

```sh
docker-compose --env-file ./.env.prod -f docker-compose.yml -f docker-compose.production.yml up -d
```

### Customization

1. Create a `.env.prod` file

```sh
touch .env
```

2. Overwrite variables as you like (format: `{variable name}={variable value}`)

| Variable             | Description                         | Default value     | Required |
| -------------------- | ----------------------------------- | ----------------- | -------- |
| `BOT_GREENTEXT_CRON` | Send a automatic AI greentext       | 0 19 \* \* \*     | false    |
| `BOT_ACTIVITY`       | What to show as activity in discord | conquer the world | false    |
| `BOT_CHANNEL_ID`     | Channel the bot sends to            |                   | true     |
| `BOT_TOKEN`          | Discord bot token                   |                   | true     |
| `OPENAI_API_KEY`     | OpenAI API token                    |                   | true     |

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- CONTACT -->

## Contact

Luis Beu - me@luisbeu.de

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/beuluis/open-ai-phoenix-bot.svg?style=flat-square
[contributors-url]: https://github.com/beuluis/open-ai-phoenix-bot/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/beuluis/open-ai-phoenix-bot.svg?style=flat-square
[forks-url]: https://github.com/beuluis/open-ai-phoenix-bot/network/members
[stars-shield]: https://img.shields.io/github/stars/beuluis/open-ai-phoenix-bot.svg?style=flat-square
[stars-url]: https://github.com/beuluis/open-ai-phoenix-bot/stargazers
[issues-shield]: https://img.shields.io/github/issues/beuluis/open-ai-phoenix-bot.svg?style=flat-square
[issues-url]: https://github.com/beuluis/open-ai-phoenix-bot/issues
[license-shield]: https://img.shields.io/github/license/beuluis/open-ai-phoenix-bot.svg?style=flat-square
