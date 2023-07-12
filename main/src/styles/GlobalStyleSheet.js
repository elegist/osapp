import {StyleSheet, Dimensions, PixelRatio} from 'react-native';

/**
 * Global style sheet for the app
 * use for global components only
 * ------------------------------
 * Note that drop shadows only work on iOS devices, make sure that there's an elevation for Android
 */

const {width, height} = Dimensions.get('window');
const PIXEL_RATIO = PixelRatio.get();

//1920

export const getResponsiveSizing = size => {
  const adjustedSize = size - 6;
  const standardScreenWidth = 1080;
  const standardScreenHeight = 1920;
  const widthPercentage = (
    adjustedSize *
    (width / standardScreenWidth)
  ).toFixed(2);
  const heightPercentage = (
    adjustedSize *
    (height / standardScreenHeight)
  ).toFixed(2);
  const convertedSize = PixelRatio.roundToNearestPixel(
    Math.sqrt(
      widthPercentage * widthPercentage + heightPercentage * heightPercentage,
    ) * PIXEL_RATIO,
  );
  return convertedSize;
};

export default StyleSheet.create({
  flexContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  mainBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
  readingTaskTextContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBar: {
    maxHeight: '10%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 16,
    paddingHorizontal: 32,
  },
  smallButton: {
    backgroundColor: '#8CBA45',
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
  },
  smallButtonDisabled: {
    backgroundColor: '#ABABAB',
    borderRadius: 10,
    padding: 12,
  },
  // Typography
  textHeading: {
    fontFamily: 'PTSans-Bold',
    fontSize: getResponsiveSizing(40),
    color: '#1C2327',
  },
  textHeadingSecondary: {
    fontFamily: 'PTSans-Regular',
    fontSize: getResponsiveSizing(20),
    color: '#1C2327',
  },
  textSecondary: {
    fontFamily: 'PTSans-Italic',
    fontSize: getResponsiveSizing(14),
    color: '#4b4b4b',
  },
  textReadingTask: {
    fontFamily: 'PTSans-Bold',
    fontSize: getResponsiveSizing(32),
    lineHeight: getResponsiveSizing(52),
    color: '#1C2327',
    textShadowColor: 'rgba(0, 0, 0, .6)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
    textAlign: 'center',
    padding: 10,
  },
  textParagraph: {
    fontFamily: 'PTSans-Regular',
    fontSize: getResponsiveSizing(18),
    color: '#1C2327',
  },
  textParagraphBold: {
    fontFamily: 'PTSans-Bold',
    fontSize: getResponsiveSizing(18),
    color: '#1C2327',
  },
  textSmallButton: {
    fontFamily: 'PTSans-Bold',
    fontSize: getResponsiveSizing(20),
    color: 'white',
    textAlign: 'center',
  },
  textChoiceButton: {
    fontFamily: 'PTSans-Bold',
    fontSize: getResponsiveSizing(16),
    color: '#1C2327',
  },
  textCodeRegular: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: getResponsiveSizing(16),
    color: '#1C2327',
  },
  textCodeItalic: {
    fontFamily: 'JetBrainsMono-Italic',
    fontSize: getResponsiveSizing(16),
    color: '#1C2327',
  },
  textCodeBold: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: getResponsiveSizing(16),
    color: '#1C2327',
  },
  textLink: {
    fontFamily: 'PTSans-Bold',
    fontSize: getResponsiveSizing(16),
    color: '#8CBA45',
  },
  textSummaryScreenTitle: {
    fontFamily: 'PTSans-Bold',
    fontSize: getResponsiveSizing(24),
    color: '#1C2327',
  },
  textSummarySection: {
    fontFamily: 'PTSans-Regular',
    fontSize: getResponsiveSizing(22),
    color: '#1C2327',
  },
  textSummarySubSection: {
    fontFamily: 'PTSans-Regular',
    fontSize: getResponsiveSizing(19),
    color: '#1C2327',
  },
  textSummaryItem: {
    fontFamily: 'PTSans-Regular',
    fontSize: getResponsiveSizing(18),
    color: '#1C2327',
  },
  //images
  osaImage: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    borderRadius: 50,
    zIndex: -1,
    opacity: 0.5,
  },
  horizontalLine: {
    borderBottomColor: '#9b9b9b',
    borderBottomWidth: 1,
  },
});
