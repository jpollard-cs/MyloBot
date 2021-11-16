"use strict";
const discord_js_1 = require("discord.js");
const fetch = require('node-fetch');
module.exports = {
    description: 'Allows a qualifying user to register for the presale',
    category: 'Club Mylo',
    name: 'presale',
    maxArgs: 0,
    cooldown: '2s',
    slash: true,
    requireRoles: false,
    guildOnly: true,
    testOnly: false,
    callback: async (options) => {
        var _a, _b;
        const { instance, user, guild, member, interaction } = options;
        try {
            if (guild) {
                const url = `https://api.manage-invite.xyz/guilds/${process.env.BOT_GUILD_ID}/members/${user.id}`;
                const inviteResponse = await fetch(url, {
                    headers: {
                        'accept': 'application/json',
                        'authorization': `Bearer ${process.env.MANAGE_INVITE_API_KEY}`
                    }
                });
                const inviteData = await inviteResponse.json();
                let embed = new discord_js_1.MessageEmbed()
                    .setTitle('Club Mylo Presale')
                    .setDescription(`Sorry, something unexpected happened :confused:`);
                if (((_a = inviteData === null || inviteData === void 0 ? void 0 : inviteData.data) === null || _a === void 0 ? void 0 : _a.invites) && inviteData.data.invites > 4) {
                    embed = new discord_js_1.MessageEmbed()
                        .setTitle('Club Mylo Presale')
                        .setDescription(`Congratulations :tada: You have ${inviteData.data.invites} invites! You've made it into the presale!`);
                    await member.roles.add(process.env.PRESALE_ROLE_ID);
                }
                else if (((_b = inviteData === null || inviteData === void 0 ? void 0 : inviteData.data) === null || _b === void 0 ? void 0 : _b.invites) && inviteData.data.invites <= 4) {
                    embed = new discord_js_1.MessageEmbed()
                        .setTitle('Club Mylo Presale')
                        .setDescription(`Sorry :slight_frown: You only have ${inviteData.data.invites} invites! You are not yet qualified for the presale!`);
                }
                await interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
                return;
            }
            return 'Command not allowed in DMs';
        }
        catch (e) {
            console.error(e);
            return instance.messageHandler.get(guild, 'EXCEPTION');
        }
    },
};
//# sourceMappingURL=presale.js.map