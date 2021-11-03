import { ICallbackObject, ICommand } from 'wokcommands';
import { json2csvAsync } from 'json-2-csv';
import { MessageAttachment } from 'discord.js';
import whitelistModel from '../models/whitelist.model';

export = {
  description: 'Allows a user to add themselves to the whitelist',
  category: 'Configuration',
  name: 'getwhitelist',
  maxArgs: 0,
  cooldown: '2s',
  slash: true,
  permissions: ['ADMINISTRATOR'],
  requireRoles: false,
  guildOnly: true,
  testOnly: true,

  callback: async (options: ICallbackObject) => {
    const { instance, guild, interaction } = options;

    if (guild) {
      if (!instance.isDBConnected()) {
        return instance.messageHandler.get(guild, 'NO_DATABASE_FOUND');
      }

      const whitelistEntries = await whitelistModel.find(
        {
          guild_id: guild.id
        }
      );

      const result = whitelistEntries.reduce((acc, entry) => {
        const { guild_id, user_id, address } = entry;
        return [...acc, { guild_id, user_id, address }];
      }, []);

      const csv = await json2csvAsync(result);

      await interaction.reply({
        files: [
          new MessageAttachment(Buffer.from(csv), 'whitelist.csv')
        ],
        ephemeral: true
      });

      return;
    }

    return 'Command not allowed in DMs';
  },
} as ICommand;
