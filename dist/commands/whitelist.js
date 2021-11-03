"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const discord_js_1 = require("discord.js");
const whitelist_model_1 = __importDefault(require("../models/whitelist.model"));
module.exports = {
    description: 'Allows a user to add themselves to the whitelist',
    category: 'Configuration',
    name: 'whitelist',
    maxArgs: 1,
    expectedArgs: '[address]',
    cooldown: '2s',
    slash: 'both',
    requireRoles: true,
    guildOnly: true,
    testOnly: false,
    callback: async (options) => {
        const { args, text, instance, user, guild } = options;
        if (args.length === 0) {
            return instance.messageHandler.get(guild, 'SYNTAX_ERROR');
        }
        if (guild) {
            if (!instance.isDBConnected()) {
                return instance.messageHandler.get(guild, 'NO_DATABASE_FOUND');
            }
            await whitelist_model_1.default.findOneAndUpdate({
                user_id: user.id,
                guild_id: guild.id
            }, {
                user_id: user.id,
                guild_id: guild.id,
                address: text
            }, { upsert: true });
            const embed = new discord_js_1.MessageEmbed()
                .setTitle('Whitelist')
                .setDescription(`Congratulations! your address **${text}** has been added to the whitelist!`);
            return [embed];
        }
        return 'Command not allowed in DMs';
    },
};
//# sourceMappingURL=whitelist.js.map