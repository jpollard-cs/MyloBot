
class CustomMylo implements ICustomMylo {
  themeColor: '#ffdd66';
  public readonly backgrounds: {
    imageUrl: 'https://cdn.discordapp.com/attachments/909877819528581190/913472775182766121/unknown.png',
    values: [
      'bredo_blue',
      'rafo_pink',
      'old_kiwi',
    ],
    supportsNone: false,
    isCustomizable: false,
  };
  public readonly body: {
    imageUrl: 'https://cdn.discordapp.com/attachments/909877819528581190/913473595047555092/body.png',
    values: [
      'cheese',
      'clean'
      'spikes',
      'mouse',
    ],
    supportsNone: false,
    isCustomizable: false
  };
  public readonly clothes: {
    imageUrl: 'https://cdn.discordapp.com/attachments/909877819528581190/913473635757465650/clothes.png',
    values: [
      'mylove_jacket',
      'club_jacket',
      'bulletproof',
      'tracksuit',
      'hula',
      'business',
      'business',
      'streamer',
      'space_suit',
    ],
    supportsNone: true,
    isCustomizable: true
  };
  public readonly eyes: {
    imageUrl: 'https://cdn.discordapp.com/attachments/909877819528581190/913473669043453962/eyes.png',
    values: [
      'scar',
      'catier',
      'red_eye',
      'crazy',
      'sunglasses',
      'vanilla',
      'dead',
      'pac',
    ],
    supportsNone: false,
    isCustomizable: true
  };
  public readonly face: {
    imageUrl: 'https://cdn.discordapp.com/attachments/909877819528581190/913473712454533160/face.png',
    values: [
      'angry',
      'sweat',
      'pirate',
      'tough_guy',
    ],
    supportsNone: true,
    isCustomizable: true
  };
  public readonly hats: {
    imageUrl: 'https://cdn.discordapp.com/attachments/909877819528581190/913473755022512189/hat.png',
    values: [
      'straw_hat',
      'cabbie',
      'snap_back',
      'bandana',
      'beanie',
    ],
    supportsNone: true,
    isCustomizable: true
  };
  public readonly jewlery: {
    imageUrl: 'https://cdn.discordapp.com/attachments/909877819528581190/913473797003280444/jewlery.png',
    values: [
      'fusion_earing',
      'bracelet',
      'gold_fish',
      'loop_earing',
      'cat_collar',
      'chain',
      'time',
    ],
    supportsNone: true,
    isCustomizable: true
  };
  public readonly mouth: {
    imageUrl: 'https://cdn.discordapp.com/attachments/909877819528581190/913473844143083560/mouth.png',
    values: [
      ':3',
      'three_gril',
      'sad',
      'vanilla',
      'joint',
      'awesome',
    ],
    supportsNone: false,
    isCustomizable: true
  };
  public readonly tail: {
    imageUrl: 'https://cdn.discordapp.com/attachments/909877819528581190/913473890792128522/tails.png',
    values: [
      'banana',
      'robot',
      'rat',
      'dubs',
      'electric',
      'vanilla',
      'triple',
    ],
    supportsNone: true,
    isCustomizable: true
  };
}

export default new CustomMylo();