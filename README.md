# Beight Client
A collaborative web editor built with Preact and Monaco Editor.
This is the frontend for the Beight application. If you want the full experience, go to https://github.com/ChrisRu/beight-core and install the backend/API.

# License
This application is MIT licensed

# Setup

1. Install the node modules

      `npm install`

2. Done :)

# Running

1. Start the development server

      `npm run dev`

2. The application should start after a few seconds. Press CTRL+C to exit.

# Collaboration

## Inner Workings

The components communicate by a simple Eventhub.

<b>!!! IMPORTANT !!!</b>
Always remove an event listener when the component is destroyed

```javascript
// Listen to an action
eventhub.on('action:executed', this.method);

// Fire an action
eventhub.emit('action:executed', ...args);

// Remove a listener
eventhub.remove('action:executed', this.method);
```

## Folder Structure

### The root should look like this:

```
/
    /components
    /scenes
    /services
    /styles

    index.js
```

`/components` contains one or more 'components' (see below)

`/scenes` contains all the main 'views'

`/services` contains global methods/services

`/styles` contains the global styles used all over the application

`index.js` is the starting point of the application

### A component should look like this

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
