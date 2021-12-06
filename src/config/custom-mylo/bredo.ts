import { ICustomMylo, ICustomMyloOptions } from './ICustomMylo';

class CustomBredo implements ICustomMylo {
  themeColor: '#78bcf4';
public readonly backgrounds: {
    imageUrl: 'https://cdn.discordapp.com/attachments/909877819528581190/913472775182766121/unknown.png',
    values: [
      'mylo_yellow',
      'old_kiwi',
      'rafo_pink',
    ],
    supportsNone: false,
    isCustomizable: false,
  };
  public readonly body: {
    imageUrl: 'https://cdn.discordapp.com/attachments/909877819528581190/913472959262375996/body.png',
    values: [
      'clean',
      'lightly',
      'classic',
    ],
    supportsNone: false,
    isCustomizable: false
  };
  public readonly clothes: {
    imageUrl: 'https://cdn.discordapp.com/attachments/909877819528581190/913473233615986749/shirts.png',
    values: [
      'chancha',
      'star_jacket',
      'hula',
      'fate',
      'kilu_x_mylo',
      'avocado',
      'kilu',
      'mom',
      'streamer',
      'gnome',
      'slime',
      'plaid',
      'bullet_proof',
      'puffy',
      'space_suit',
      'panther',
    ],
    supportsNone: true,
    isCustomizable: true
  };
  public readonly eyes: {
    imageUrl: 'https://cdn.discordapp.com/attachments/909877819528581190/913472995593445436/eyes.png',
    values: [
      'lashes',
      'cat',
      '><',
      'scars',
      'catier',
      'sharingan',
      'rinnegan',
      'sunglasses',
      'awesome',
      'uwu',
      'wink',
      'anime',
      'dead',
      'pac',
      'clout',
      'pupil',
    ],
    supportsNone: false,
    isCustomizable: true
  };
  public readonly face: {
    imageUrl: 'https://cdn.discordapp.com/attachments/909877819528581190/913473043374956544/face.png',
    values: [
      'third_eye',
      'angry',
      'sweat',
      'boxer',
      'ufo',
      'bandaid',
      'beard',
      'tear_tattoo',
      'pirate',
    ],
    supportsNone: true,
    isCustomizable: true
  };
   public readonly hats: {
    imageUrl: 'https://cdn.discordapp.com/attachments/909877819528581190/913473499308388414/hats.png',
    values: [
      'afro',
      'straw_hat',
      'snap_back',
      'beanie',
      'cabie',
      'bandana',
      'teems',
    ],
    supportsNone: true,
    isCustomizable: true
  };
  public readonly jewlery: {
    imageUrl: 'https://cdn.discordapp.com/attachments/909877819528581190/913473087633227886/jewlery.png',
    values: [
      'loop_earing',
      'fusion_earing',
      'chain',
      'gold_fish',
      'time',
      'bracelet',
      'cat_collar',
    ],
    supportsNone: true,
    isCustomizable: true
  };
  public readonly mouth: {
    imageUrl: 'https://cdn.discordapp.com/attachments/909877819528581190/913473139487408199/mouth.png',
    values: [
      ':3',
      'gold_tooth',
      'firin_mah_lazer',
      'awesome',
      'W',
      'creeper',
      'wooo',
      'joint',
      'sheesh',
      'grillz',
      'vanilla',
      'slightly_open',
    ],
    supportsNone: false,
    isCustomizable: true
  };
  public readonly tail: {
    imageUrl: 'https://cdn.discordapp.com/attachments/909877819528581190/913473385114271804/tails.png',
    values: [
      'skateboard',
      'katana',
      'robot',
      'rat',
      'dubs',
      'banana',
      'electric',
      'vanilla',
      'triples',
    ],
    supportsNone: true,
    isCustomizable: true
  };
}

export default new CustomBredo();