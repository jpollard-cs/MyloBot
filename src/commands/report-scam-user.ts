import { ICallbackObject, ICommand } from 'wokcommands';
import { MessageEmbed, GuildBan, MessageActionRow, MessageButton, TextChannel } from 'discord.js';
import { DateTime } from 'luxon';
import reportModel from '../models/report.model';
import configurationModel from '../models/configuration.model';

export = {
  description: 'Allows a user report suspicious or inappropriate behavior',
  category: 'security',
  name: 'report-scam-user',
  minArgs: 1,
  maxArgs: 1,
  slash: true,
  expectedArgs: '[user_id]',
  requireRoles: true,
  guildOnly: true,
  testOnly: false,
  options: [{
    name: 'user_id',
    description: 'user id, run /help-user-id if you do not know how to get this',
    required: true,
    type: 'STRING',
  }],
  callback: async (options: ICallbackObject) => {
    const WARNING_RED = '#F92A3F';
    const SUCCESS_GREEN = '#00D166';
    const { args, instance, user, guild, interaction, channel } = options;
    try {
      if (args.length === 0) {
        return instance.messageHandler.get(guild, 'SYNTAX_ERROR');
      }

      const validateSnowflake = (id: string) => {
        const snowflakeRegex = new RegExp(/\d{18}/, 'gm');
        return snowflakeRegex.test(id) && id.length === 18;
      }
      
      const userId = args.shift();
      const reason = 'scam';

      if (!validateSnowflake(userId)) {
        const errorEmbed = new MessageEmbed()
          .setColor(WARNING_RED)
          .setDescription(`<:warning:910016022654877736> Invalid User ID \`${userId}\`. This should be an 18 digit number. If you need help getting the User ID run \`\\help-user-id\`.`);
        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        return;
      }

      if (guild) {
        if (!instance.isDBConnected()) {
          return instance.messageHandler.get(guild, 'NO_DATABASE_FOUND');
        }

        const configuration = await configurationModel
          .findOne({ guild_id: guild.id })
          .exec();

        if (!configuration?.guild_id || !process.env.DISCORD_APP_ID) {
          const errorEmbed = new MessageEmbed()
            .setColor(WARNING_RED)
            .setDescription(`<:warning:910016022654877736> bot not configured yet or DISCORD_APP_ID not defined.`);
          await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
          return;
        }

        const ban = await guild.bans.fetch(userId).catch(() => {}) as GuildBan;

        if (ban?.user?.id === userId) {
          const errorEmbed = new MessageEmbed()
            .setColor(WARNING_RED)
            .setDescription(`<:warning:910016022654877736> User ID ${userId} already banned.`);
          await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
          return;
        }

        const result = await reportModel
          .findOne({ guild_id: guild.id, user_id: userId })
          .exec();

        if (result) {
          const errorEmbed = new MessageEmbed()
            .setColor(WARNING_RED)
            .setDescription(`<:warning:910016022654877736> A report is already open for this user.`);
          await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
          return;
        }

        const adminReportingChannel = await guild.channels.fetch(configuration.admin_reporting_channel_id) as TextChannel;
        const adminReportEmbed = new MessageEmbed()
          .setColor(WARNING_RED)
          .setDescription(`<:warning:910016022654877736> User <@${userId}> with User ID ${userId} has been reported!`)
          .addFields(
            { name: 'Reason', value: reason },
          )
          .setTimestamp()

        const banButton = new MessageButton()
          .setCustomId(`${process.env.DISCORD_APP_ID}:ban:${guild.id}:${userId}`)
          .setLabel('BAN')
          .setStyle('DANGER');

        const ignoreButton = new MessageButton()
          .setCustomId(`${process.env.DISCORD_APP_ID}:ignore:${guild.id}:${userId}`)
          .setLabel('IGNORE')
          .setStyle('SECONDARY');

        const row = new MessageActionRow()
          .addComponents(
            banButton,
            ignoreButton
          );

        await adminReportingChannel.send({ embeds: [adminReportEmbed], components: [row] });
        
        const report = new reportModel({
          guild_id: guild.id,
          user_id: userId,
          reported_by_user_id: user.id,
          reason,
          description: '',
          image_url: null,
          submitted_date_time_utc: DateTime.now().toISO()
        });

        await report.save();

        const userReportEmbed = new MessageEmbed()
          .setColor(SUCCESS_GREEN)
          .setDescription(`User <@${userId}> with User ID ${userId} will be reported for ${reason}. Thank you!`);

        await interaction.reply({
          embeds: [userReportEmbed]
        });
        
        return;
      }

      return 'Command not allowed in DMs';
    } catch (e) {
      console.error(e);
      await channel.send('sorry :( an unexpected error occured');
      return;
    }
  },
} as ICommand;
