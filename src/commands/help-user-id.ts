import { ICallbackObject, ICommand } from 'wokcommands';
import { MessageEmbed } from 'discord.js';
import configurationModel from '../models/configuration.model';

export = {
  description: 'Get help on how to obtain User ID',
  category: 'security',
  name: 'help-user-id',
  maxArgs: 0,
  slash: true,
  requireRoles: true,
  guildOnly: true,
  testOnly: false,
  options: [],
  callback: async (options: ICallbackObject) => {
    const WARNING_RED = '#F92A3F';
    const { guild, interaction, instance } = options;
    try {
      if (guild) {
        if (!instance.isDBConnected()) {
          return instance.messageHandler.get(guild, 'NO_DATABASE_FOUND');
        }

        const configuration = await configurationModel
          .findOne({ guild_id: guild.id })
          .exec();

        if (configuration?.help_user_id_image_url) {
          await interaction.reply(configuration.help_user_id_image_url);
          return;
        }

        const failureResponse = new MessageEmbed()
          .setColor(WARNING_RED)
          .setDescription(`<:warning:910016022654877736> Not configured!`);

        await interaction.reply({ embeds: [failureResponse], ephemeral: true });
        return;
      }

      return 'Command not allowed in DMs';
    } catch (e) {
      console.error(e);
      return instance.messageHandler.get(guild, 'EXCEPTION');
    }
  },
} as ICommand;
