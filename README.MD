# LoadsAggregator

![Preview](README/github-preview.gif)

### Purpose

**FVL Logistics** sector primarily relies on Email and Excel as its main tools, the vast amounts of data are being manipulated in primitive ways. The main purpose of this project is to create a marketplace like experience where FVL Logistics data is aggregated from multiple sources and presented in a single format that allows manipulating data in more advanced ways by providing option to filter loads based on geospatial parameters and vehicle transporter carrying capacities.

## Table of contents

- [Preview(staging)](#preview)
- [Running the project](#running-the-project)
- [Technologies used](#technologies-used)
- [Testing](#testing)
- [Debugging](#debugging)
- [Data aggregation](#data-aggregation)
- [Loads parser](#loads-parser)

### Preview

The project staging branch is hosted on Vercel.com

You can view it right [here](https://loads-aggregator-frontend.vercel.app/)

```javascript
{
    username: "test@test.com",
    password: "password"
}
```

### Running the project

The project is structured into 2 workspaces:

- frontend
- backend

#### Frontend prerequisites

- [node ^20](https://nodejs.org/en)

#### Backend prerequisites

- [Docked Desktop](https://www.docker.com/products/docker-desktop/)
- [Deno ^1.41.0](https://deno.com/)

#### Running

1. Install all dependencies: `npm --workspaces install`
2. Create `.env` files based on `.env.example`

- Frontend: [.env.example](frontend/.env.example)
- Backend: [.env.example](backend/supabase/functions/.env.example)

3. Start backend `npm run start -w backend`

- Supabase Studio URL: [http://127.0.0.1:54323](http://127.0.0.1:54323)
- API URL: [http://127.0.0.1:54321](http://127.0.0.1:54321)
- DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres

4. Start frontend `npm run dev -w frontend`

- Frontend: [http://127.0.0.1:3000](http://127.0.0.1:3000)

### Technologies used

- [Supabase](https://supabase.com/) - A suite of services that offers Postgres database, Edge functions, Rest api generation from database schema [Postgrest](https://postgrest.org/en/v12/) hosting
- [Postgis](https://postgis.net/) - Postgres extension that provided geospatial primitives allowing to write queries based on proximity to geographic features
- [Next.js](https://nextjs.org/) - Framework built around React.js that offers good defaults, tooling and necessary features for building front-end applications
- [Vercel](https://vercel.com/) - Hosting provider that integrates very well with Next.js
- [Mantine](https://mantine.dev/) - UI components Library, collection of react hooks, forms package
- [Mapbox](https://docs.mapbox.com/#maps) - Service that provides maps UI component, geocoding, directions API's

### Testing

#### Backend (edge functions)

- Regular tests `deno test -A --parallel`
- Include LLM tests `deno test -A --parallel -- --include-llm-tests` be careful might rack up an Open AI bill

### Debugging

#### Frontend

- Use vscode `Next.js: debug full stack` configuration (Ctrl+Shift+D)

#### Backend

- Use [Deno vscode extension](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno) to debug tests

### Data Aggregation

FVL managers are exchanging loading information by sending loosely structured emails. There is an opportunity to tap into this data source, and structure it using LLM's.

Currently a `gpt-3.5-turbo-0125` model is being used, there are no significant improvements when using larger models like `gpt-4-0125-preview` also a s a downside time to parse text increases significantly along with the cost(20x). Parsing accuracy is not satisfying when used with larger text inputs and more complicated pieces of text are also not structured correctly.

A possible solution would be to semi-manually generate a list of example of how data should be parsed and use that to fine-tune a model. That would also eliminate the need to provide [json schema](https://json-schema.org/learn/getting-started-step-by-step) with every single request

#### Data Aggregation pipeline:

##### Converting email to structured format

![Conversion Example](README/conversion-example.excalidraw.png)

##### Pipeline

There are multiple steps in data aggregation pipeline:

1. Receiving emails and checking if they should be parsed
2. Using LLM's to convert unstructured data into specified format
3. Enrich the structured data with coordinates for locations and path between points
4. Restructure the data to format that can be inserted into the database and confirm that aligns with the database table format
5. Insert into the database

The time it takes to perform all of these operations can be significantly reduced by using cashing. It's very common to have repetitive entries that could be cashed therefore reducing the time and complexity of data for LLM

<details>

<summary>Conversion Pipeline</summary>

![Conversion Pipeline](backend/supabase/functions/loads-parser/function-flow.excalidraw.png)

</details>

### Loads parser

##### Zappier triggers usually take about 5 minutes to take effect.

To test the loads parser send an email containing loading information to `ebendo.turingcollege@gmail.com` in this or similar format:

```
Paris -> Brussels LF4 800Eur
Hordain -> Antwerp LF3 600 EUR

TestComp GmbH
Phone: +370 612 34567
Email: test@domain.com
```

Or can be tested sending http request when supabase is running locally:

<details>
<summary>CURL request to parse email</summary>

```curl
curl --location 'localhost:54321/functions/v1/loads-parser' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU' \
--data-raw '{
    "subject": "Subject",
    "from": "test@domain.com",
    "body": "Amsterdam, Zwolle -> Hamburg LF5 900UR\nJohn Doe GmbH\nTransport manager\nMobile: +370 600 33333\nEmail: dispo@domain.com\nAddress: Random str. 5B LT-28222, Utena (Lithuania)",
    "bodyHtml": "<h1>Email body HTML"
}
```

</details>
