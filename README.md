[![Frontend Masters](https://static.frontendmasters.com/assets/brand/logos/full.png)](https://frontendmasters.com/courses/client-graphql-react-v2/)

This repo is a companion to the [Client-Side GraphQL course](https://frontendmasters.com/courses/client-graphql-react-v2/) on Frontend Masters.

Here's a link to the [Course Notes](https://clumsy-humor-894.notion.site/Client-side-GraphQL-with-React-4248372d51604858aaf9eeb9127b6433)

## Getting Started

This course repository requires Node version 20+ and a [TursoDB account](https://turso.tech/). More details can be found in [the course notes](https://clumsy-humor-894.notion.site/Client-side-GraphQL-with-React-4248372d51604858aaf9eeb9127b6433).

1. Fork/Clone [the repo](https://github.com/Hendrixer/clientside-gql)
2. Install the Dependencies with `npm install`
3. Create a [Turso](https://turso.tech/) DB account (free)
   - Follow the instructions to make a new DB
     - Create a new Group (default is fine) and choose a location
     - Create a new Database
   - Create a Database Token (Either through Turso website or the CLI)
     - Using Turso Website: Click "Create Database Token"
     - Using [the CLI](https://docs.turso.tech/cli/installation): Generate a token for your db with this command `turso db tokens create [your db name]`
4. Create a `.env` file on the root and add these environment variables. If you need the URL, you can use the "Copy URL" button in the Overview tab on Turso:

```bash
TURSO_CONNECTION_URL="your turso db url"
TURSO_AUTH_TOKEN="your db token"
```

5. Push the schema to your Turso DB with this command `npm run db:push`
