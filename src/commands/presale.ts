import { ICallbackObject, ICommand } from 'wokcommands';
import { MessageEmbed } from 'discord.js';
const fetch = require('node-fetch');

export = {
  description: 'Allows a qualifying user to register for the presale',
  category: 'Club Mylo',
  name: 'presale',
  maxArgs: 0,
  cooldown: '2s',
  slash: true,
  requireRoles: false,
  guildOnly: true,
  testOnly: false,

  callback: async (options: ICallbackObject) => {
    const { instance, user, guild, member, interaction } = options;
    try {
      if (guild) {
        const url = `https://api.manage-invite.xyz/guilds/${process.env.BOT_GUILD_ID}/members/${user.id}`
        const inviteResponse = await fetch(url, {
          headers: {
            'accept': 'application/json',
            'authorization': `Bearer ${process.env.MANAGE_INVITE_API_KEY}`
          }
        });
        const inviteData: any = await inviteResponse.json();

        let embed = new MessageEmbed()
          .setTitle('Club Mylo Presale')
          .setDescription(`Sorry, something unexpected happened :confused:`);
        if (inviteData?.data?.invites && inviteData.data.invites > 4) {
          embed = new MessageEmbed()
          .setTitle('Club Mylo Presale')
          .setDescription(`Congratulations :tada: You have ${inviteData.data.invites} invites! You've made it into the presale!`);
          await member.roles.add(process.env.PRESALE_ROLE_ID);
        } else if (inviteData?.data?.invites && inviteData.data.invites <= 4) {
          embed = new MessageEmbed()
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
    } catch (e) {
      console.error(e);
      return instance.messageHandler.get(guild, 'EXCEPTION');
    }
  },
} as ICommand;
