# Beight Client
A collaborative web editor built with Preact and Monaco Editor.
It works together with the Beight Core, the backend.

# License
This application is MIT licensed

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
