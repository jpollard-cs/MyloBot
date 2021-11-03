"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const json_2_csv_1 = require("json-2-csv");
const discord_js_1 = require("discord.js");
const whitelist_model_1 = __importDefault(require("../models/whitelist.model"));
module.exports = {
    description: 'Allows a user to add themselves to the whitelist',
    category: 'Configuration',
    name: 'getwhitelist',
    maxArgs: 0,
    cooldown: '2s',
    slash: true,
    permissions: ['ADMINISTRATOR'],
    requireRoles: false,
    guildOnly: true,
    testOnly: true,
    callback: async (options) => {
        const { instance, guild, interaction } = options;
        if (guild) {
            if (!instance.isDBConnected()) {
                return instance.messageHandler.get(guild, 'NO_DATABASE_FOUND');
            }
            const whitelistEntries = await whitelist_model_1.default.find({
                guild_id: guild.id
            });
            const result = whitelistEntries.reduce((acc, entry) => {
                const { guild_id, user_id, address } = entry;
                return [...acc, { guild_id, user_id, address }];
            }, []);
            const csv = await (0, json_2_csv_1.json2csvAsync)(result);
            await interaction.reply({
                files: [
                    new discord_js_1.MessageAttachment(Buffer.from(csv), 'whitelist.csv')
                ],
                ephemeral: true
            });
            return;
        }
        return 'Command not allowed in DMs';
    },
};
//# sourceMappingURL=getwhitelist.js.map