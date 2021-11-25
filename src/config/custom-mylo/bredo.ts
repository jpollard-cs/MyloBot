import { ICustomMylo, ICustomMyloOptions } from './ICustomMylo';

class CustomBredo implements ICustomMylo {
  themeColor: '#78bcf4';
  public readonly backgrounds: {
    imageUrl: '',
    values: [],
    supportsNone: false,
    isCustomizable: false,
  };
  public readonly body: {
    imageUrl: '',
    values: [],
    supportsNone: false,
    isCustomizable: false
  };
  public readonly clothes: {
    imageUrl: '',
    values: [],
    supportsNone: true,
    isCustomizable: true
  };
  public readonly eyes: {
    imageUrl: '',
    values: [],
    supportsNone: false,
    isCustomizable: true
  };
  public readonly face: {
    imageUrl: '',
    values: [],
    supportsNone: true,
    isCustomizable: true
  };
  public readonly hats: {
    imageUrl: '',
    values: [],
    supportsNone: true,
    isCustomizable: true
  };
  public readonly jewlery: {
    imageUrl: '',
    values: [],
    supportsNone: true,
    isCustomizable: true
  };
  public readonly mouth: {
    imageUrl: '',
    values: [],
    supportsNone: false,
    isCustomizable: true
  };
  public readonly tail: {
    imageUrl: '',
    values: [],
    supportsNone: true,
    isCustomizable: true
  };
}

export default new CustomBredo();