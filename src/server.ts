// https://replit.com/talk/learn/Hosting-discordjs-bots-on-replit-Works-for-both-discordjs-and-Eris/11027
import express from 'express';

const server = express();

server.all('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
</head>

<p>&nbsp;</p>
<div><span style="text-shadow: rgba(136, 136, 136, 0.4) 3px 3px 2px; color: #41a85f; font-size: 19px; font-family: 'Lucida Console', Monaco, monospace;"><img src="https://clubmylo.com/wp-content/uploads/2021/11/wizt-1024x1024.png" alt="wizard mylo" width="197" height="197" /></span></div>
<div>&nbsp;</div>
<div><span style="font-size: 19px;"><span style="font-family: 'Lucida Console', Monaco, monospace;">MyloBot!</span></span><span style="color: #000000; background-color: #ffffff; font-family: Helvetica; font-size: 19px;"><br /></span><span style="color: #000000; background-color: #ffffff; font-family: Helvetica;"><br /><strong>What is it?<br /></strong>&nbsp;<br />A bot to support the&nbsp;<a title="club mylo" href="https://clubmylo.com/" target="_blank" rel="noopener">Club Mylo</a>&nbsp;Discord<br /><br /><strong>MyloBot Status Dashboard</strong>: <a href="https://stats.uptimerobot.com/YZPp4SD61M" target="_blank" rel="noopener">MylotBot Status Dashboard</a><br /><strong><br />Source Code that is hosting this page and the bot</strong>: <a href="https://replit.com/@jpollardcs/MyloBot">MyloBot Replit / Source Code</a><br /></span></div>

</body>

</html>`);
});

function keepAlive() {
  server.listen(3000, () => {
    console.log('Server is Ready!');
  });
}

export default keepAlive;