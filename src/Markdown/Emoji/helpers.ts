const RGB_KEY = 'rgb';
const regExp = /\((.*)\)/;
const rgbDefaultWhite = '255, 255, 255';

export const getColor = (color: string) =>
  color.startsWith(RGB_KEY) ? color.match(regExp)?.pop() ?? rgbDefaultWhite : `from ${color} r g b / 1`;
