import {StyleSheet} from 'react-native';

/**
 * Global style sheet for the app
 * use for global components only
 * ------------------------------
 * Note that drop shadows only work on iOS devices, make sure that there's an elevation for Android
 */
export default StyleSheet.create({
  flexContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  mainBackground: {
    flex: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  topBar: {
    maxHeight: '10%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 16,
    paddingHorizontal: 32,
  },
  bigButton: {
    backgroundColor: '#8CBA45',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  bigButtonPressed: {
    backgroundColor: '#FFFFFF',
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
    fontSize: 40,
    color: '#1C2327',
  },
  textHeadingSecondary: {
    fontFamily: 'PTSans-Regular',
    fontSize: 20,
    color: '#1C2327',
  },
  textSecondary: {
    fontFamily: 'PTSans-Italic',
    fontSize: 14,
    color: '#9b9b9b',
  },
  textParagraph: {
    fontFamily: 'PTSans-Regular',
    fontSize: 16,
    color: '#1C2327',
  },
  textBigButton: {
    fontFamily: 'PTSans-Bold',
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
  textSmallButton: {
    fontFamily: 'PTSans-Bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  textChoiceButton: {
    fontFamily: 'PTSans-Bold',
    fontSize: 16,
    color: '#1C2327',
  },
});
