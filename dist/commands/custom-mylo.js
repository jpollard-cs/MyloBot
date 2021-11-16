"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const discord_js_1 = require("discord.js");
const luxon_1 = require("luxon");
const custom_mylo_model_1 = __importDefault(require("../models/custom-mylo.model"));
module.exports = {
    description: 'Allows a user to add request customizations if they own a qualifying NFT',
    category: 'Configuration',
    name: 'custom-mylo',
    maxArgs: 0,
    cooldown: '2s',
    slash: true,
    requireRoles: true,
    guildOnly: true,
    testOnly: false,
    callback: async (options) => {
        var _a, _b, _c;
        const { instance, user, guild, channel, interaction, member } = options;
        try {
            if (guild) {
                if (!instance.isDBConnected()) {
                    return instance.messageHandler.get(guild, 'NO_DATABASE_FOUND');
                }
                const bredoBlue = '#78bcf4';
                const filter = m => user.id === m.author.id;
                const numSteps = 5;
                const addressEmbed = new discord_js_1.MessageEmbed()
                    .setColor(bredoBlue)
                    .setTitle(`Step 1/${numSteps}: ETH Address`)
                    .setDescription(`Hey <@${user.id}> welcome to The 100 Club! Thank you for being an early supporter! Please tell us a bit about your custom Mylo. First let's start with your ETH address. This should be the same address where you hold your Mylo.`);
                let message = (await interaction.reply({ embeds: [addressEmbed], fetchReply: true }));
                const addressResponse = await channel.awaitMessages({
                    filter, max: 1, time: 600000, errors: ['time']
                });
                const address = addressResponse.first().content || '';
                addressResponse.first().delete();
                const tokenIdEmbed = new discord_js_1.MessageEmbed()
                    .setColor(bredoBlue)
                    .setTitle(`Step 2/${numSteps}: Token ID`)
                    .setDescription(`Thank you! Now please give us your token ID. If you don't know how to get this see instructions in <#909877819528581190>.`);
                await message.edit({
                    embeds: [tokenIdEmbed],
                });
                const tokenIdResponse = await channel.awaitMessages({
                    filter, max: 1, time: 600000, errors: ['time']
                });
                const tokenId = tokenIdResponse.first().content || '';
                await tokenIdResponse.first().delete();
                const result = await custom_mylo_model_1.default
                    .findOne({ guild_id: guild.id, token_id: tokenId })
                    .exec();
                if (result && result.user_id !== user.id) {
                    await message.delete();
                    const errorEmbed = new discord_js_1.MessageEmbed()
                        .setColor(bredoBlue)
                        .setDescription(`<:warning:910016022654877736> It appears another user has already registered for a token with this ID **${tokenId}**. Please make sure your token ID is correct. If you believe this is in error please open a ticket through <#901106520668926003>. We apologize for the inconvenience!`);
                    await channel.send({ embeds: [errorEmbed] });
                    return;
                }
                const customizationEmbed = new discord_js_1.MessageEmbed()
                    .setColor(bredoBlue)
                    .setTitle(`Step 3/${numSteps}: Customizations`)
                    .setDescription(`Please tell us, **in a single message**, a bit about the customizations you'd like. Please be as specific as possible. Don't just leave it up to our artist. Creativity is hard, there are 100 of these and our artist does not know anything about you or your preferences.`);
                await message.edit({
                    embeds: [customizationEmbed]
                });
                const customizationResponse = await channel.awaitMessages({
                    filter, max: 1, time: 600000, errors: ['time']
                });
                const customizations = customizationResponse.first().content || '';
                await customizationResponse.first().delete();
                const image1Embed = new discord_js_1.MessageEmbed()
                    .setColor(bredoBlue)
                    .setTitle(`[Optional] Step 4/${numSteps}: Image 1`)
                    .setDescription(`Got it, thank you! Do you have any images you would like to share to complement the description of your customizations? You will have the opportunity to upload 2 and they can either be a Discord upload or an image URL (please make sure the URL will not expire). Please send the first image now or reply "no" if you do not wish to add images.`);
                await message.edit({
                    embeds: [image1Embed],
                });
                const image1Response = await channel.awaitMessages({
                    filter, max: 1, time: 600000, errors: ['time']
                });
                let image1Url;
                const image1ResponseAttachments = image1Response.first().attachments;
                const image1ResponseContent = image1Response.first().content;
                if (image1ResponseAttachments.size) {
                    image1Url = (_a = Array.from(image1ResponseAttachments.values())[0]) === null || _a === void 0 ? void 0 : _a.url;
                }
                else if (image1ResponseContent && image1ResponseContent.trim().toLowerCase() !== "no") {
                    image1Url = image1ResponseContent.trim();
                }
                await image1Response.first().delete();
                let image2Url;
                if (image1Url) {
                    const image2Embed = new discord_js_1.MessageEmbed()
                        .setColor(bredoBlue)
                        .setTitle(`[Optional] Step 5/${numSteps}: Image 2`)
                        .setDescription(`Would you like to add a second image? Please send the second one now or reply "no" if you do not wish to add a second image.`);
                    await message.edit({
                        embeds: [image2Embed],
                    });
                    const image2Response = await channel.awaitMessages({
                        filter, max: 1, time: 600000, errors: ['time']
                    });
                    const image2ResponseAttachments = image2Response.first().attachments;
                    const image2ResponseContent = image2Response.first().content;
                    if (image2ResponseAttachments.size) {
                        image2Url = (_b = Array.from(image2ResponseAttachments.values())[0]) === null || _b === void 0 ? void 0 : _b.url;
                    }
                    else if (image2ResponseContent && image2ResponseContent.trim().toLowerCase() !== "no") {
                        image2Url = image2ResponseContent.trim();
                    }
                    await image2Response.first().delete();
                }
                await message.delete();
                await custom_mylo_model_1.default.findOneAndUpdate({
                    user_id: user.id,
                    guild_id: guild.id,
                    token_id: tokenId
                }, {
                    user_id: user.id,
                    guild_id: guild.id,
                    tokenId: tokenId,
                    address,
                    user_tag: user.tag,
                    roleNames: Array.from(((_c = member.roles.cache) === null || _c === void 0 ? void 0 : _c.values()) || []).map(r => r.name).join(' || '),
                    customizations,
                    imageUrls: [image1Url, image2Url],
                    updatedDateTimeUtc: luxon_1.DateTime.now().toISO(),
                }, { upsert: true });
                const finalEmbed = new discord_js_1.MessageEmbed()
                    .setColor(bredoBlue)
                    .setDescription(`<:ballot_box_with_check:910020496161128488> You're all set! We have you setup for a custom NFT with the below customizations.`)
                    .addFields({ name: 'ETH Address', value: address }, { name: 'Token ID', value: tokenId }, { name: 'Customizations', value: customizations })
                    .setTimestamp();
                await channel.send({ embeds: [finalEmbed] });
                if (image1Url) {
                    await channel.send(image1Url);
                }
                if (image2Url) {
                    await channel.send(image2Url);
                }
                const infoEmbed = new discord_js_1.MessageEmbed()
                    .setColor(bredoBlue)
                    .setDescription(`<:warning:910020359904956528> If there's an issue simply re-run this command and re-submit your information.`);
                await channel.send({ embeds: [infoEmbed] });
                return;
            }
            return 'Command not allowed in DMs';
        }
        catch (e) {
            console.error(e);
            // the standard message handler doesn't work properly if interaction has expired
            // so we need to do a custom response to the channel
            await channel.send('sorry :( an unexpected error occured');
            return;
        }
    },
};
//# sourceMappingURL=custom-mylo.js.map