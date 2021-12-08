import { ICallbackObject, ICommand } from 'wokcommands';
import { MessageEmbed } from 'discord.js';
import configurationModel from '../models/configuration.model';

export = {
  description: 'Configure Mylo Bot',
  category: 'configuration',
  name: 'configure-mylo-bot',
  minArgs: 2,
  maxArgs: 2,
  expectedArgs: '[admin_reporting_channel_id] [help_user_id_image_url]',
  slash: true,
  permissions: ['ADMINISTRATOR'],
  requireRoles: false,
  guildOnly: true,
  testOnly: false,
  options: [{
    name: 'admin_reporting_channel_id',
    description: 'the Channel ID where you want reports sent (anyone with access to this can ban reported users)',
    required: true,
    type: 'STRING',
  }, {
    name: 'help_user_id_image_url',
    description: 'the reason you are reporting this user',
    required: true,
    type: 'STRING',
  }],
  callback: async (options: ICallbackObject) => {
    const WARNING_RED = '#F92A3F';
    const SUCCESS_GREEN = '#00D166';
    const { args, user, guild, interaction, instance } = options;
    try {
      if (args.length === 0) {
        return instance.messageHandler.get(guild, 'SYNTAX_ERROR');
      }

      const validateSnowflake = (id: string) => {
        const snowflakeRegex = new RegExp(/\d{18}/, 'gm');
        return snowflakeRegex.test(id) && id.length === 18;
      }

      const adminReportingChannelId = args.shift();
      const helpUserIdImageUrl = args.shift();

      if (!validateSnowflake(adminReportingChannelId)) {
        const errorEmbed = new MessageEmbed()
          .setColor(WARNING_RED)
          .setDescription(`<:warning:910016022654877736> Invalid Channel ID ${adminReportingChannelId}. This should be an 18 digit number similar to the User ID used when reporting.`);
        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        return;
      }

      if (guild) {
        if (!instance.isDBConnected()) {
          return instance.messageHandler.get(guild, 'NO_DATABASE_FOUND');
        }

        await configurationModel.findOneAndUpdate(
          {
            guild_id: guild.id,
          },
          {
            guild_id: guild.id,
            admin_reporting_channel_id: adminReportingChannelId,
            help_user_id_image_url: helpUserIdImageUrl,
          },
          { upsert: true }
        );

        const confirmationEmbed = new MessageEmbed()
          .setColor(SUCCESS_GREEN)
          .setDescription(`Thank you <@${user.id}>! The configuration has been saved. The admin reporting channel is set to <#${adminReportingChannelId}>. The \`\\help-user-id\` image is below.`)
          .setImage(helpUserIdImageUrl);

        return [confirmationEmbed]
      }

      return 'Command not allowed in DMs';
    } catch (e) {
      console.error(e);
      return instance.messageHandler.get(guild, 'EXCEPTION');
    }
  },
} as ICommand;
