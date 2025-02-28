import _ from 'lodash';
import {Dimensions, PixelRatio} from 'react-native';

export const screenWidth = Dimensions.get('screen').width;
export const screenHeight = Dimensions.get('screen').height;

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

//Tasarimda verilen base cozunurluk, eger verilen size'ler dp degil px ise butun size'leri PixelRatio.get() ile bolmek gerekir.
const guidelineBaseWidth = 393;
const guidelineBaseHeight = 852;

export const smallestDimension =
  screenWidth < screenHeight ? screenWidth : screenHeight;
export const largestDimension =
  screenHeight < screenWidth ? screenWidth : screenHeight;

/** Ekran genişliğine göre yeniden şekillendirir (marginLeft veya marginRight gibi style'ler bununla kullanılmalı) **/
export const horizontalScale = (size: number) =>
  (screenWidth / guidelineBaseWidth) * size;

/**  Ekran uzunluğuna göre yeniden şekillendirir (marginTop veya marginBottom gibi style'ler bununla kullanılmalı)  **/
export const verticalScale = (size: number) =>
  (windowHeight / guidelineBaseHeight) * size;

/**  Ekranın en kısa dimensionuna göre font size belirler  **/
export const fontSize = (size: number) => {
  // return size;
  return (smallestDimension / guidelineBaseWidth) * size;
};

/** Ekran genisligine gore factor carpaniyla daha ufak degisiklik yapmayi saglar (borderRadius etc.) **/
export const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

/** Ekranın enb az büyüyen dimensionuna göre yeniden şekillendirir (icon gibi oran korunmak istendiginde kullanılmalı) **/
export const squareScale = (size: number) =>
  Math.min(verticalScale(size), horizontalScale(size));

export const responsiveFont = (
  fontSize: number,
  maxFontSize?: number,
  minFontSize?: number,
): number => {
  try {
    const fontScale = PixelRatio.getFontScale();

    let adjustedFontSize: number;
    if (fontScale <= 1) {
      adjustedFontSize = fontSize * (1 + (2 - fontScale) * (1 - fontScale));
    } else {
      const adjustedSize = fontSize / fontScale;
      adjustedFontSize = _.clamp(fontSize * fontScale, 0, adjustedSize);
    }

    if (maxFontSize !== undefined) {
      adjustedFontSize = Math.min(adjustedFontSize, maxFontSize);
    }

    if (minFontSize !== undefined) {
      adjustedFontSize = Math.max(adjustedFontSize, minFontSize);
    }

    return moderateVerticalScale(adjustedFontSize);
  } catch (error) {
    console.error('Error in responsiveFont:', error);
    return moderateVerticalScale(fontSize);
  }
};

export const moderateVerticalScale = (size: number, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor;
