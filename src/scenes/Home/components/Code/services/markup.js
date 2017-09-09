export const markup = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello</title>
  </head>
  <body>
    <header>
      <h1 class="color" color="blue red">hey</h1>
      <p>hai</p>
    </header>
    <main>
      <!--hey this is cool-->
      <h1>oh boy</h1>
      <div class="container">
        <img src="./game.jpg" alt="game"/>
      </div>
    </main>
  </body>
</html>`.replace(/\t/gm, ' ');

export default markup;
