## Relay Github Searcher

Practice Project to use Relay JS and Github Graphql API

## Specifications

-   Typescript
-   React
-   GraphQL
-   Relay JS
-   tailwindCSS

## Run

1. Install Dependencies

```
yarn install
```

2. Download Schema (env file required)
   <br>
   Github API 를 사용하기 위해 token 발급 필요

```
# .env
VITE_GITHUB_GRAPHQL_ENDPOINT=https://api.github.com/graphql
VITE_GITHUB_AUTH_TOKEN="put your token here"
```

3. Run Relay Compiler

```shell
yarn relay:watch  # watch mode

or

yarn relay --watch # watch mode

or

yarn relay
```

3. Run React Project

```shell
yarn dev
```
