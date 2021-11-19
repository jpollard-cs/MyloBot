import { ICallbackObject, ICommand } from 'wokcommands';
import { MessageEmbed } from 'discord.js';
import { range, includes } from 'ramda';
import customMyloModel from '../models/custom-mylo.model';

const validTokenRanges = [
  ...range(11,62),
  ...range(1001, 1032),
  ...range(4001, 4042),
];

export = {
  description: 'Allows a user to add request customizations if they own a qualifying NFT',
  category: 'Configuration',
  name: 'get-custom-mylo',
  maxArgs: 1,
  minArgs: 1,
  expectedArgs: '<Token ID>',
  cooldown: '2s',
  slash: true,
  requireRoles: true,
  guildOnly: true,
  testOnly: false,
  options: [{
    name: 'token_id',
    description: 'Your Club Mylo NFT ERC-721 Token ID',
    required: true,
    type: 'INTEGER',
  }],

  callback: async (options: ICallbackObject) => {
    const { instance, user, guild, channel, interaction, args } = options;
    try {
      if (guild) {
        if (!instance.isDBConnected()) {
          return instance.messageHandler.get(guild, 'NO_DATABASE_FOUND');
        }

        const tokenId = parseInt(args.shift());

        const bredoBlue = '#78bcf4';

        if (!includes(tokenId, validTokenRanges)) {
          const errorEmbed = new MessageEmbed()
            .setColor(bredoBlue)
            .setDescription(`<:warning:910016022654877736> Invalid token ID ${tokenId}.  Please make sure it is an integer within the ranges [11-61], [1001-10031] or [4001-4042].`);
          await interaction.reply({ embeds: [errorEmbed] });
          return;
        }

        const result = await customMyloModel
          .findOne({ guild_id: guild.id, token_id: tokenId })
          .exec();

        if (result && result.user_id !== user.id) {
          const errorEmbed = new MessageEmbed()
            .setColor(bredoBlue)
            .setDescription(`<:warning:910016022654877736> It appears another user has already registered for a token with this ID **${tokenId}**. Please make sure your token ID is correct. If you believe this is in error please open a ticket through <#901106520668926003>. We apologize for the inconvenience!`);
          await interaction.reply({ embeds: [errorEmbed] });
          return;
        }
        
        const customizationsEmbed = new MessageEmbed()
          .setColor(bredoBlue)
          .setDescription(`Hey <@${user.id}>! Here are the customizations we have for you.`)
          .addFields(
            { name: 'ETH Address', value: result.address },
            { name: 'Token ID', value: `${result.token_id}` },
            { name: 'Customizations', value: result.customizations },
            { name: 'Last Updated', value: result.updatedDateTimeUtc }
          )
          
        await interaction.reply({ embeds: [customizationsEmbed] });
        
        if (result.imageUrls[0]) {
          await channel.send(result.imageUrls[0]);
        }

        if (result.imageUrls[1]) {
          await channel.send(result.imageUrls[1]);
        }

        return;
      }

      return 'Command not allowed in DMs';
    } catch (e) {
      console.error(e);
      return instance.messageHandler.get(guild, 'EXCEPTION');
    }
  },
} as ICommand;
