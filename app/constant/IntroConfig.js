import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ITEM_WIDTH = width;
const ITEM_HEIGHT = width * 0.65;
const SPACING = 10;

export const carousel = {
  ITEM_WIDTH,
  ITEM_HEIGHT,
  SPACING
};
