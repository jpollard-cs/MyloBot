"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// https://replit.com/talk/learn/Hosting-discordjs-bots-on-replit-Works-for-both-discordjs-and-Eris/11027
const express_1 = __importDefault(require("express"));
const server = (0, express_1.default)();
server.all('/', (req, res) => {
    res.send(`<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
</head>

<body style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);">
    <div><span style='text-shadow: rgba(136, 136, 136, 0.4) 3px 3px 2px; color: rgb(65, 168, 95); font-size: 19px; font-family: "Lucida Console", Monaco, monospace;'>Whitelist Bot!</span><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-family: Helvetica; font-size: 19px;"><br></span><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-family: Helvetica;"><br><strong>What is it?<br></strong>&nbsp;<br>This bot allows you to collect wallet addresses for users you have whitelisted presumably for something like a presale. It expects you have a role or roles that are qualified for the whitelist. When you are ready it provides you with a command that will export the relevant whitelisted addresses to you as a CSV attachment right in discord. It assumes users can not register more than one address per user id / guild id combination. For those not familiar with the Discord API a &quot;guild&quot; is a Discord &quot;server&quot;.<br><br><strong>WhitelistBot Status Dashboard</strong>: <a href="https://stats.uptimerobot.com/YZPp4SD61M">WhitelistBot UptimeRobot Status Dashboard</a><br><strong><br>WhitelistBot Install Link</strong>: <a href="http://WhitelistBot Discord Install Link"></a><a href="https://discord.com/api/oauth2/authorize?client_id=905454218704474143&permissions=2147534848&scope=bot%20applications.commands">WhitelistBot OAuth Discord Install Link</a><br><strong><br>Source Code that is hosting this page and the bot</strong>: <a href="http://WhitelistBot Repl.it / Source Code"></a><a href="https://replit.com/@jpollardcs/WhitelistBot">WhitelistBot Replit / Source Code</a><br><br><strong>Setup + Configuration</strong><br><br>1.) click Discord application install link and install on the desired server<br><br>2.) configure the whitelist command<br>&nbsp; &nbsp; - This command is disabled by default. You must first assign a role that is allowed to use the command.<br>&nbsp; &nbsp; - To assign a role to the whitelist command you can do /requiredrole whitelist @WhitelistRole (where @WhitelistRole is replaced with the actual whitelist role for your guild)<br>&nbsp; &nbsp; - you may assign multiple roles that may use this command if desired by using the /requiredrole command again<br>&nbsp; &nbsp; - this may also be run as a legacy command using the designated prefix which defaults to !<br>&nbsp; &nbsp; - you can also restrict the whitelist command to a specific channel(s) via /channelonly or disable it entirely via /command (see step 3)<br><br>3.) configure anything else you&apos;d like<br>&nbsp; &nbsp; - /prefix will allow you to set the prefix for this bot - the default is !<br>&nbsp; &nbsp; - assuming you haven&apos;t changed the prefix !help will show you all the other possible commands<br>&nbsp; &nbsp; - all commands except for /getwhitelist are available as slash and legacy style commands<br><br>4.) when you&apos;re ready to export the whitelist run the /getwhitelist command<br>&nbsp; &nbsp; - <u>this command can only be executed by administrators</u> (if this is too restrictive let me know and we can discuss making it restricted to specific roles like is done with the /whitelist command)<br>&nbsp; &nbsp; - this command may only be used as a slash command as it allows the bot to respond with an ephemeral message meaning only the person that runs the command will be able to see the response with the whitelist csv (of course they are free to download and share as they deem necessary)</span><span style="font-family: Helvetica;"><br><br></span><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-family: Helvetica;"><strong>Troubleshooting</strong></span><span style="font-family: Helvetica;"><br><br></span><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-family: Helvetica;">If you&apos;re running into errors running commands check if you&apos;re in a private channel. You may need to explicitly add WhitelistBot to this channel. Also make sure no other roles are overriding WhitelistBot&apos;s permissions.<br><br><br><br>For now this is only being shared with a limited number of folks so you probably already know how to contact me if you have questions or feature requests!</span></div>
</body>

</html>`);
});
function keepAlive() {
    server.listen(3000, () => {
        console.log("Server is Ready!");
    });
}
exports.default = keepAlive;
//# sourceMappingURL=server.js.map