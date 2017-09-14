const markup = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>DevWars</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css" />
  <link rel="stylesheet prefetch" href="https://fonts.googleapis.com/css?family=Montserrat:700" />
<link rel="stylesheet prefetch" href="http://cdn.materialdesignicons.com/1.8.36/css/materialdesignicons.min.css" />
      <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <div class="container">
    <a class="logo" href="/">
        <img src="http://res.cloudinary.com/ds2npuroc/image/upload/v1485391872/devwars-logo_uy0cur.png" />
    </a>
    <form method="GET" action="http://devwars.us10.list-manage.com/subscribe">
        <input type="hidden" name="u" value="0719cdf11a95678dd04e5db33" />
        <input type="hidden" name="id" value="02e4f24ca1" />
        <div class="message">
            <h1><span>Season 3</span> is coming soon</h1>
            <p>Enter your email below to stay up-to-date</p>
        </div>
        <div class="form-group">
            <input type="text" name="EMAIL" placeholder="Your email" />
            <button class="btn">Subscribe</button>
        </div>
    </form>
    <a href="https://www.discord.me/devwars" class="discord-chat" target="_blank">
        <i class="mdi mdi-discord"></i>
        <span>JOIN OUR DISCORD</span>
    </a>
    <div class="socials">
        <a href="https://www.twitch.tv/devwars" class="mdi mdi-twitch" target="_blank"></a>
        <a href="https://www.youtube.com/devwars" class="mdi mdi-youtube-play" target="_blank"></a>
        <a href="https://www.facebook.com/devwars" class="mdi mdi-facebook" target="_blank"></a>
        <a href="https://www.twitter.com/devwarstv" class="mdi mdi-twitter" target="_blank"></a>
        <a href="https://plus.google.com/+devwars" class="mdi mdi-google-plus" target="_blank"></a>
        <a href="https://www.reddit.com/r/devwars" class="mdi mdi-reddit" target="_blank"></a>
    </div>
</div>
</body>
</html>
`;

export default markup;
