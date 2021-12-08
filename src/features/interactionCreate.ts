import { Client, ButtonInteraction, MessageEmbed, Message, MessageButton, MessageActionRow } from 'discord.js'
import reportModel from '../models/report.model';

const WARNING_RED = '#F92A3F';
const SUCCESS_GREEN = '#00D166';

export default (client: Client) => {
  client.on('interactionCreate', async (interaction) => {
    try {
      if (!interaction.isButton()) { return; }
      const buttonInteraction = interaction as ButtonInteraction;
      const { message, customId } = buttonInteraction;

      if (!customId.startsWith(process.env.DISCORD_APP_ID)) {
        // we don't care about this one
        // hopefully someone else does
        return;
      }

      const [appId, action, guildId, userId] = customId.split(':');

      const reportRecord = await reportModel
        .findOne({ guild_id: buttonInteraction.guild.id, user_id: userId })
        .exec();

      if (action === 'ban') {
        await buttonInteraction.guild.members.ban(userId, { reason: reportRecord.reason });
      } else if (action !== 'ignore') {
        const failureResponse = new MessageEmbed()
          .setColor(WARNING_RED)
          .setDescription(`<:warning:910016022654877736> unknown action ${action}!`);

        await buttonInteraction.reply({ embeds: [failureResponse] });
        return;
      }

      // delete report record
      await reportModel.deleteOne({ guild_id: guildId, user_id: userId });
      // remove button components
      const successButton = new MessageButton()
        .setCustomId(`${appId}:success:${guildId}:${userId}`)
        .setLabel('RESOLVED')
        .setStyle('SUCCESS')
        .setDisabled(true);
      const row = new MessageActionRow()
          .addComponents(successButton);
      await (message as Message).edit({ components: [row] });

      let response;
      if (action === 'ban') {
        response = new MessageEmbed()
          .setColor(SUCCESS_GREEN)
          .setDescription(`<:ballot_box_with_check:910020496161128488> user ${userId} succesfully banned!`);
      } else {
        response = new MessageEmbed()
          .setColor(SUCCESS_GREEN)
          .setDescription(`<:ballot_box_with_check:910020496161128488> report for user <@${userId}> ignored!`);
      }

      await buttonInteraction.reply({ embeds: [response] });
      return;
    } catch (e) {
      console.error(e);
      const failureResponse = new MessageEmbed()
        .setColor(WARNING_RED)
        .setDescription(`<:warning:910016022654877736> sorry :( an unknown error occured!`);
      await (interaction as ButtonInteraction).reply({ embeds: [failureResponse] });
      return;
    }
  });
}

export const config = {
  displayName: 'Interaction Created',
  dbName: 'INTERACTION-CREATED',
};
