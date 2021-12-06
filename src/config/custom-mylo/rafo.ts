import { ColorResolvable } from 'discord.js';
import { ICustomMylo } from './ICustomMylo';

class CustomRafo implements ICustomMylo {
  public readonly themeColor: ColorResolvable = '#ed7fcd';
  public readonly backgrounds = {
    imageUrl: 'https://cdn.discordapp.com/attachments/909877819528581190/913472775182766121/unknown.png',
    values: [
      'old_kiwi',
      'mylo_yellow',
      'bredo_blue',
    ],
    supportsNone: false,
    isCustomizable: false,
  };
  public readonly body = {
    imageUrl: 'https://cdn.discordapp.com/attachments/909877819528581190/913474022023516220/body.png',
    values: [
      'clean',
      'lightly',
      'classic',
    ],
    supportsNone: false,
    isCustomizable: false,
  };
  public readonly clothes = {
    imageUrl: 'https://cdn.discordapp.com/attachments/909877819528581190/913474283739676692/shirts.png',
    values: [
      'ryu',
      'streamer',
      'slime',
      'hunta',
      'peach',
      'bulletproof',
      'puffy',
      'space_suit',
      'panther',
    ],
    supportsNone: true,
    isCustomizable: true,
  };
  public readonly eyes = {
    imageUrl: 'https://cdn.discordapp.com/attachments/909877819528581190/913474047495528519/eyes.png',
    values: [
      'go_yo!',
      'scars',
      'catier',
      'sharingan',
      'rinnegan',
      'mad_focus',
      'sunglasses',
      'anime',
      'awesome',
      'wuw',
      'wink',
      'dead',
      'pac',
      'pupil',
    ],
    supportsNone: false,
    isCustomizable: true,
  };
  public readonly face = {
    imageUrl: 'https://cdn.discordapp.com/attachments/909877819528581190/913474093402173471/face.png',
    values: [
      'third_eye',
      'mad',
      'pirate',
      'scar',
      'sweat',
      'ufo',
      'tear_tattoo',
      'boxer',
    ],
    supportsNone: true,
    isCustomizable: true,
  };
  public readonly hats = {
    imageUrl: 'https://cdn.discordapp.com/attachments/909877819528581190/913474175841214504/hats.png',
    values: [
      'ronin',
      'afro',
      'straw_hat',
      'cabbie',
      'snap_back',
      'teems',
      'bandana',
      'beanie',
    ],
    supportsNone: true,
    isCustomizable: true,
  };
  public readonly jewlery = {
    imageUrl: 'https://cdn.discordapp.com/attachments/909877819528581190/913474215804542976/jewlery.png',
    values: [
      'fusion_earing',
      'bracelet',
      'loop_earing',
      'cat_collar',
      'chain',
      'time',
      'gold_fish',
    ],
    supportsNone: true,
    isCustomizable: true,
  };
  public readonly mouth = {
    imageUrl: 'https://cdn.discordapp.com/attachments/909877819528581190/913474251141574776/mouths.png',
    values: [
      'gold_tooth',
      'firin_mah_lazar',
      'awesome',
      'W',
      'creeper',
      ':3',
      'joint',
      'sheesh',
      'grillz',
      'vanilla',
      'wooo',
      'slightly_open',
    ],
    supportsNone: false,
    isCustomizable: true,
  };
  public readonly tail = {
    imageUrl: 'https://cdn.discordapp.com/attachments/909877819528581190/913474317176696913/tails.png',
    values: [
      'banana',
      'skateboard',
      'katana',
      'robot',
      'rat',
      'dubs',
      'electric',
      'vanilla',
      'triple',
    ],
    supportsNone: true,
    isCustomizable: true,
  };
}

export default new CustomRafo();