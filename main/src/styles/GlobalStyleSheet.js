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
    paddingTop: 8,
    paddingHorizontal: 32,
  },
  bigButton: {
    backgroundColor: '#8CBA45',
    borderRadius: 10,
    padding: 15,
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
  textParagraph: {
    fontFamily: 'PTSans-Regular',
    fontSize: 16,
    color: '#1C2327',
  },
  textBigButton: {
    fontFamily: 'PTSans-Bold',
    fontSize: 20,
    color: 'white',
  },
  textSmallButton: {
    fontFamily: 'PTSans-Bold',
    fontSize: 16,
    color: 'white',
  },
  textChoiceButton: {
    fontFamily: 'PTSans-Bold',
    fontSize: 16,
    color: '#1C2327',
  },
});
