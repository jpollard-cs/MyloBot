import { ColorResolvable } from 'discord.js';

export interface ICustomMyloOptions {
  imageUrl: string;
  values: string[];
  // if the user doesn't need to select a value
  supportsNone: boolean;
  isCustomizable: boolean;
}

export interface ICustomMylo {
  themeColor: ColorResolvable;
  backgrounds: ICustomMyloOptions;
  body: ICustomMyloOptions;
  clothes: ICustomMyloOptions;
  eyes: ICustomMyloOptions;
  face: ICustomMyloOptions;
  hats: ICustomMyloOptions;
  jewlery: ICustomMyloOptions;
  mouth: ICustomMyloOptions;
  tail: ICustomMyloOptions;
}