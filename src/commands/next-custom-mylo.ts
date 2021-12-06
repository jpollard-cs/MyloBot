import { ICallbackObject, ICommand } from 'wokcommands';
import { MessageEmbed } from 'discord.js';
import customMyloModel, { CustomMyloProcessingStatus } from '../models/custom-mylo.model';

export = {
  description: 'Allows a Mylo team member to request the next Mylo off the queue',
  category: 'Configuration',
  name: 'next-custom-mylo',
  maxArgs: 1,
  minArgs: 0,
  expectedArgs: '<user_id>',
  cooldown: '2s',
  slash: true,
  requireRoles: true,
  guildOnly: true,
  testOnly: false,
  options: [{
    name: 'user_id',
    description: 'optional user id',
    required: false,
    type: 'STRING',
  }],

  callback: async (options: ICallbackObject) => {
    const { instance, guild, channel, interaction, args } = options;
    try {
      if (guild) {
        if (!instance.isDBConnected()) {
          return instance.messageHandler.get(guild, 'NO_DATABASE_FOUND');
        }

        const userIdInput = args.shift();

        const bredoBlue = '#78bcf4';

        const userId = (userIdInput?.match(/(\d{18})/gm) || [])[0];

        if (!userId && userIdInput) {
          const errorEmbed = new MessageEmbed()
            .setColor(bredoBlue)
            .setDescription(`<:warning:910016022654877736> invalid user_id input ${userIdInput}. This should be an 18 digit ID that you get from right clicking the user's tag/name and selecting "copy id". You need to enable Discord developer mode to get access to this.`);
          await interaction.reply({ embeds: [errorEmbed] });
          return;
        }

        let result = await customMyloModel
          .find({
            guild_id: guild.id,
            $or: [{ processing_status: null }, { processing_status: CustomMyloProcessingStatus.NOT_PROCESSED }],
            ...(userId ? { user_id: userId } : {}),
          })
          .sort({ _id: 1 })
          .limit(100)
          .exec();

        if (!result || !result.length) {
          const errorEmbed = new MessageEmbed()
            .setColor(bredoBlue)
            .setDescription('<:warning:910016022654877736> No results found');
          await interaction.reply({ embeds: [errorEmbed] });
          return;
        }

        if (!userId) {
          result = [result[0]];
        }

        const errorEmbed = new MessageEmbed()
          .setColor(bredoBlue)
          .setDescription(`${result.length} result(s) found`);
        await interaction.reply({ embeds: [errorEmbed] });

        for (const mylo of result) {
          const customizationsEmbed = new MessageEmbed()
            .setColor(bredoBlue)
            .setDescription(`Here are our customizations for <@${mylo.user_id}> and token ID ${mylo.token_id}`)
            .addFields(
              { name: 'ETH Address', value: mylo.address },
              { name: 'Token ID', value: `${mylo.token_id}` },
              { name: 'Customizations', value: mylo.customizations },
              { name: 'User roles', value: `\`${mylo.roleNames}\`` },
            );

          await channel.send({ embeds: [customizationsEmbed] });
          for (const imageUrl of mylo.imageUrls) {
            if (!imageUrl) {
              continue;
            }
            await channel.send(imageUrl);
          }
        }

        const updates = result.map(m => {
          return {
            updateOne: {
              filter: { _id: m._id },
              update: { $set: { processing_status: CustomMyloProcessingStatus.PROCESSING } },
            },
          };
        });

        await customMyloModel.bulkWrite(updates);

        return;
      }

      return 'Command not allowed in DMs';
    }
    catch (e) {
      console.error(e);
      return instance.messageHandler.get(guild, 'EXCEPTION');
    }
  },
} as ICommand;
