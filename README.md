# Beight Client
A collaborative web editor built with Preact and Monaco Editor.
This is the frontend for the Beight application. If you want the full experience, go to https://github.com/ChrisRu/beight-core and install the backend/API.

## Setup

1. Install the node modules

      `npm install`

2. Done :)

## Running

1. Start the development server

      `npm run watch`

2. The application should start after a few seconds. Press CTRL+C to exit.

## Collaboration

### Folder Structure

#### The root should look like this:

```
/
    /actions
    /components
    /scenes
    /services
    /styles
    /reducers

    index.js
```

`/actions` contains the redux actions

`/components` contains one or more 'components' (see below)

`/scenes` contains all the main 'views'

`/services` contains global methods/services

`/styles` contains the global styles used all over the application

`/reducers` contains the redux reducers

`index.js` is the starting point of the application

#### A component should look like this

```
/
    /components
    /services

    index.js
    styles.scss
```

`/components` <i>(optional)</i> contains components (a recursive file structure)

`/services` <i>(optional)</i> contains methods/services you don't want to include in the component itself

`index.js` is the component itself

`styles.scss` <i>(optional)</i> is the styles only used in this component

## License
This application is MIT licensed
