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
    borderWidth: 1
  },
  defaultText: {
    fontSize: 16,
    fontWeight: 'medium',
    color: '#1C2327',
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
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'space-between',
    paddingTop: 2,
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
  bigButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  }
});
