import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const CONSTANTS = {
  WIDTH: width,
  HEIGHT: height
};

export const HEIGHT_HEADER_NAVIGATE = 40;

export const HEADER_POST = {
  IMAGE_WIDTH: 50,
  IMAGE_HEIGH: 50
  // FONT_SIZE: 14
};

export const DEFAULT_AVT = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';
