/* eslint-disable no-shadow */
import { ICallbackObject, ICommand } from 'wokcommands';
import { nanoid } from 'nanoid';
import { MessageEmbed, Snowflake, MessageAttachment, Collection, Message, MessageActionRow, MessageSelectMenu } from 'discord.js';
import { DateTime } from 'luxon';
import { range, includes } from 'ramda';
import customMyloModel, { CustomMyloProcessingStatus } from '../models/custom-mylo.model';
import customBredo from '../config/custom-mylo/bredo';
import customRafo from '../config/custom-mylo/rafo';
import customMylo from '../config/custom-mylo/mylo';
import { ICustomMylo, ICustomMyloOptions } from '../config/custom-mylo/ICustomMylo';

const bredoTokenIds = range(4001, 4042);

const rafoTokenIds = [
  1001,
  1005,
  1006,
  1010,
  range(1012, 1032),
];

const myloTokenIds = [
  ...range(11, 62),
  1002,
  1003,
  1004,
  1007,
  1008,
  1009,
  1011,
];

const validTokenRanges = [
  ...bredoTokenIds,
  ...rafoTokenIds,
  ...myloTokenIds,
];

interface CustomMyloStep {
  getPrompt: () => string;
  getOption: (config: ICustomMylo) => ICustomMyloOptions
}

const steps: CustomMyloStep[] = [
  {
    getPrompt: () => {
      return 'please select your background color';
    },
    getOption: (config: ICustomMylo) => {
      return config.backgrounds;
    },
  }, {
    getPrompt: () => {
      return 'please select the body type';
    },
    getOption: (config: ICustomMylo) => {
      return config.body;
    },
  }, {
    getPrompt: () => {
      return 'please select clothing';
    },
    getOption: (config: ICustomMylo) => {
      return config.clothes;
    },
  }, {
    getPrompt: () => {
      return 'please select the eyes';
    },
    getOption: (config: ICustomMylo) => {
      return config.eyes;
    },
  }, {
    getPrompt: () => {
      return 'please select a facial feature';
    },
    getOption: (config: ICustomMylo) => {
      return config.face;
    },
  }, {
    getPrompt: () => {
      return 'please select a hat';
    },
    getOption: (config: ICustomMylo) => {
      return config.hats;
    },
  }, {
    getPrompt: () => {
      return 'please select jewlery';
    },
    getOption: (config: ICustomMylo) => {
      return config.jewlery;
    },
  }, {
    getPrompt: () => {
      return 'please select the mouth';
    },
    getOption: (config: ICustomMylo) => {
      return config.mouth;
    },
  }, {
    getPrompt: () => {
      return 'please select a tail';
    },
    getOption: (config: ICustomMylo) => {
      return config.tail;
    },
  },
];

export = {
  description: 'Allows a user to add request customizations if they own a qualifying NFT',
  category: 'Configuration',
  name: 'custom-mylo',
  maxArgs: 2,
  minArgs: 2,
  expectedArgs: '<Token ID> <ETH Address>',
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
  }, {
    name: 'address',
    description: 'The ETH/ERC-20 address where you hold this Club Mylo NFT',
    required: true,
    type: 'STRING',
  }],

  callback: async (options: ICallbackObject) => {
    const { instance, user, guild, channel, interaction, member, args } = options;
    try {
      const WARNING_RED = '#F92A3F';
      const SUCCESS_GREEN = '#00D166';

      if (guild) {
        if (!instance.isDBConnected()) {
          return instance.messageHandler.get(guild, 'NO_DATABASE_FOUND');
        }

        const tokenId = parseInt(args.shift());
        const address = args.shift();

        const isBredo = (tokenId: number) => {
          return includes(tokenId, bredoTokenIds);
        };

        const isRafo = (tokenId: number) => {
          return includes(tokenId, rafoTokenIds);
        };

        const isMylo = (tokenId: number) => {
          return includes(tokenId, myloTokenIds);
        };

        enum CustomMyloType {
          MYLO = 'Mylo',
          RAFO = 'Rafo',
          BREDO = 'Bredo',
        }

        const customValue = 'custom';
        const noneValue = 'none';

        const getConfig = (tokenId: number): { myloType: CustomMyloType, config: ICustomMylo } => {
          if (isBredo(tokenId)) {
            return { myloType: CustomMyloType.BREDO, config: customBredo };
          }

          if (isRafo(tokenId)) {
            return { myloType: CustomMyloType.RAFO, config: customRafo };
          }

          if (isMylo(tokenId)) {
            return { myloType: CustomMyloType.MYLO, config: customMylo };
          }

          const errorMessage = `tokenId ${tokenId} out of range`;
          console.error(errorMessage);
          throw new Error(errorMessage);
        };

        const { myloType, config } = getConfig(tokenId);

        // const filter = m => user.id === m.author.id;

        if (!includes(tokenId, validTokenRanges)) {
          const errorEmbed = new MessageEmbed()
            .setColor(WARNING_RED)
            .setDescription(`<:warning:910016022654877736> Invalid token ID ${tokenId}.  Please make sure it is an integer within the ranges [11-61], [1001-10031] or [4001-4042].`);
          await interaction.reply({ embeds: [errorEmbed] });
          return;
        }

        const result = await customMyloModel
          .findOne({ guild_id: guild.id, token_id: tokenId })
          .exec();

        if (result && result.user_id !== user.id) {
          const errorEmbed = new MessageEmbed()
            .setColor(WARNING_RED)
            .setDescription(`<:warning:910016022654877736> It appears another user has already registered for a token with this ID **${tokenId}**. Please make sure your token ID is correct. If you believe this is in error please open a ticket through <#901106520668926003>. We apologize for the inconvenience!`);
          await interaction.reply({ embeds: [errorEmbed] });
          return;
        }

        if (result && result.processing_status !== CustomMyloProcessingStatus.NOT_PROCESSED) {
          const errorEmbed = new MessageEmbed()
            .setColor(WARNING_RED)
            .setDescription('<:warning:910016022654877736> We\'re sorry, but your custom mylo is already being processed. Please reach out via a support ticket in <#901106520668926003> and we\'ll see what we can do.!');
          await interaction.reply({ embeds: [errorEmbed] });
          return;
        }

        await interaction.deferReply({ ephemeral: true });

        const customizationEmbed = new MessageEmbed()
          .setColor(config.themeColor)
          .setTitle('Customize Your Mylo')
          .setDescription(`<:tada:910176202080276480> Hey <@${user.id}> welcome to The 100 Club!
Thank you for being an early supporter!
Please tell us a bit about the customizations you'd like.

There will be a series of ${steps.length} select menus for each of your ${myloType}'s different features.
You can select the "${customValue}" option **for a single feature**.
While you are allowed to make further customization requests these are not guaranteed and are up to the artists discretion.
Choose wisely and make sure you are happy with the backup choice.
After completing feature selection you will be able to provide details and up to two images to assist the artist with your customizations.
          `);

        await interaction.reply({ embeds: [customizationEmbed], ephemeral: true, fetchReply: true });

        for (const step of steps) {
          const options = step.getOption(config);
          const optionValues = options.values?.map(v => ({ label: v, value: v }));
          const customId = nanoid();
          const row = new MessageActionRow()
            .addComponents(
              new MessageSelectMenu()
                .setCustomId(customId)
                .setPlaceholder('Nothing selected')
                .addOptions(optionValues),
            );

          const stepEmbed = new MessageEmbed()
            .setColor(config.themeColor)
            .setTitle(step.getPrompt())
            .setImage(options.imageUrl);

          const message = (await interaction.followUp({
            // todo: replace with embed containing image for options
            embeds: [stepEmbed],
            components: [row],
            ephemeral: true,
          })) as Message;

          const filter = i => {
            i.deferUpdate();
            return i.customId === customId && i.user.id === interaction.user.id;
          };

          const selectInteraction = await message.awaitMessageComponent({
            filter,
            componentType: 'SELECT_MENU',
            time: 60000,
          });
          // todo: delete select menu and move on to next step (we'll need to pass this interaction on to the next step or continue following-up to the original interaction)
          selectInteraction.reply(`You selected ${selectInteraction.values.join(', ')}!`);
        }


        // const customizationResponse = await channel.awaitMessages({
        //   filter, max: 1, time: 600000, errors: ['time'],
        // });

        // const customizations = customizationResponse.first().content || '';
        // await customizationResponse.first().delete();

        // const image1Embed = new MessageEmbed()
        //   .setColor(bredoBlue)
        //   .setTitle(`Step 2/${numSteps}: Image 1`)
        //   .setDescription(`Got it, thank you! Do you have any images you would like to share to complement the description of your customizations? You will have the opportunity to upload 2 and they can either be a Discord upload or an image URL (please make sure the URL will not expire). Please send the first image now or reply "no" if you do not wish to add images.`);

        // await message.delete();

        // message = await channel.send({
        //   embeds: [image1Embed]
        // });

        // const image1Response = await channel.awaitMessages({
        //   filter, max: 1, time: 600000, errors: ['time']
        // });


        // let image1Url;
        // const image1ResponseAttachments = image1Response.first().attachments as Collection<Snowflake, MessageAttachment>;
        // const image1ResponseContent = image1Response.first().content;
        // if (image1ResponseAttachments.size) {
        //   image1Url = Array.from(image1ResponseAttachments.values())[0]?.url;
        // } else if (image1ResponseContent && image1ResponseContent.trim().toLowerCase() !== "no") {
        //   image1Url = image1ResponseContent.trim();
        // }

        // await message.delete();

        // let image2Url;
        // if (image1Url) {
        //   const image2Embed = new MessageEmbed()
        //     .setColor(bredoBlue)
        //     .setTitle(`Step 3/${numSteps}: Image 2`)
        //     .setDescription(`Would you like to add a second image? Please send the second one now or reply "no" if you do not wish to add a second image.`);

        //   message = await channel.send({
        //     embeds: [image2Embed]
        //   });

        //   const image2Response = await channel.awaitMessages({
        //     filter, max: 1, time: 600000, errors: ['time']
        //   });

        //   const image2ResponseAttachments = image2Response.first().attachments as Collection<Snowflake, MessageAttachment>;
        //   const image2ResponseContent = image2Response.first().content;
        //   if (image2ResponseAttachments.size) {
        //     image2Url = Array.from(image2ResponseAttachments.values())[0]?.url;
        //   } else if (image2ResponseContent && image2ResponseContent.trim().toLowerCase() !== "no") {
        //     image2Url = image2ResponseContent.trim();
        //   }

        //   await message.delete();
        // }

        // await customMyloModel.findOneAndUpdate(
        //   {
        //     user_id: user.id,
        //     guild_id: guild.id,
        //     token_id: tokenId
        //   },
        //   {
        //     user_id: user.id,
        //     guild_id: guild.id,
        //     tokenId: tokenId,
        //     address,
        //     user_tag: user.tag,
        //     roleNames: Array.from(member.roles.cache?.values() || []).map(r => r.name).join(' || '),
        //     customizations,
        //     imageUrls: [image1Url, image2Url],
        //     updatedDateTimeUtc: DateTime.now().toISO(),
        //   },
        //   { upsert: true }
        // );

        // const finalEmbed = new MessageEmbed()
        //   .setColor(bredoBlue)
        //   .setDescription(`<:ballot_box_with_check:910020496161128488> You're all set <@${user.id}>! We have you setup for a custom NFT with the below customizations.`)
        //   .addFields(
        //     { name: 'ETH Address', value: address },
        //     { name: 'Token ID', value: `${tokenId}` },
        //     { name: 'Customizations', value: customizations },
        //   )
        //   .setTimestamp()

        // await channel.send({ embeds: [finalEmbed] });

        // if (image1Url) {
        //   await channel.send(image1Url);
        // }

        // if (image2Url) {
        //   await channel.send(image2Url);
        // }

        // const infoEmbed = new MessageEmbed()
        //   .setColor(bredoBlue)
        //   .setDescription(`<:warning:910020359904956528> If there's an issue simply re-run this command and re-submit your information.`)
        // await channel.send({ embeds: [infoEmbed] });

        // return;
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
} as ICommand;
