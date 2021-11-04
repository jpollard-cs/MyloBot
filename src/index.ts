import { Client, Intents } from 'discord.js';
import WOKCommands from 'wokcommands';
import path from 'path';
import keepAlive from './server';

const client = new Client({
  // These intents are recommended for the built in help menu
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
});

const dbPassword = process.env.MONGO_PASSWORD;
const dbUsername = process.env.MONGO_USERNAME;
const dbHost = process.env.MONGO_HOST;
const dbName = process.env.MONGO_DB_NAME;
const mongoUri = `mongodb+srv://${dbUsername}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`;

client.on('ready', () => {
  new WOKCommands(client, {
    // The name of the local folder for your command files

    commandDir: path.join(__dirname, 'commands'),
    // Allow importing of .ts files if you are using ts-node
    typeScript: false,
    testServers: [process.env.TEST_GUILD_ID],
    mongoUri,
  });
});

// hack to keep repl.it process alive
// see './server.ts' for more info
keepAlive();

client.login(process.env.CLIENT_TOKEN);
