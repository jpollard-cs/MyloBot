"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const wokcommands_1 = __importDefault(require("wokcommands"));
const path_1 = __importDefault(require("path"));
const client = new discord_js_1.Client({
    // These intents are recommended for the built in help menu
    intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES, discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
});
const dbPassword = process.env.MONGO_PASSWORD;
const dbUsername = process.env.MONGO_USERNAME;
const dbHost = process.env.MONGO_HOST;
const dbName = process.env.MONGO_DB_NAME;
const mongoUri = `mongodb+srv://${dbUsername}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`;
client.on('ready', () => {
    new wokcommands_1.default(client, {
        // The name of the local folder for your command files
        commandDir: path_1.default.join(__dirname, 'commands'),
        // Allow importing of .ts files if you are using ts-node
        typeScript: false,
        testServers: [process.env.TEST_GUILD_ID],
        mongoUri,
    });
});
client.login(process.env.CLIENT_TOKEN);
//# sourceMappingURL=index.js.map