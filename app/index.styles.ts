import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  scrollContainer: {
  paddingBottom: 50, // makes sure last item isn't cut off
},
emptyMessage: {
  textAlign: 'center',
  fontStyle: 'italic',
  color: '#666',
  paddingVertical: 10,
},
fixedToggle: {
  position: 'absolute',
  bottom: 20,
  right: 20,
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#eee',
  padding: 10,
  borderRadius: 10,
  elevation: 5,
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 5,
},
  // header stuff here
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3', // light grey
    
  },
  transparentContainer: {
    flex: 1, 
   

  },
   header: {
    height: 120,
    backgroundColor: '#444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  redHeader: {
    fontSize: 32,
    fontWeight: '900',
    color: '#602814',//'#603030',
  },
  headerLeft: {
  height: 120,
  backgroundColor: '#444',
  flexDirection: 'row',
  alignItems: 'center',      // vertical centering in row
  justifyContent: 'flex-start', // horizontal alignment to left
  paddingHorizontal: 15,
  paddingTop: 30,
},
 headerSmall: {
    height: 80,
    backgroundColor: '#444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 30,
    
  
  },
  menuText: {
    fontSize: 24,
    color: '#fff',
  },
  menuArrow: {
    fontSize: 60,
    color: '#fff'
  },
  menuArrowMed: {
    fontSize: 55,
    color: '#fff',
    marginTop: -30,
    //justifyContent: 'center', 
    //alignItems: 'center'
  },
  menuArrowUp: {
    alignContent: 'center',
    fontSize: 60,
    color: '#fff'
  },
  smallMenuArrow: {
    fontSize: 30,
    color: '#fff'
  },
  menuArrowTrent: {
    fontSize: 60,
    alignItems: 'center',
    color: '#fff'
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerTitleCenter: {
    fontSize: 20,
    color: '#fff',
    alignContent: 'center',
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18, // makes it circular
    borderWidth: 1,
    borderColor: '#fff',
  },
  profileImageB: {
    width: 34,
    height: 34,
    borderRadius: 40, // makes it circular
    borderWidth: 1,
    borderColor: '#FFF017',
  },
  profileImageNC: {
    width: 34,
    height: 34,
    //borderRadius: 18, // makes it circular
    //borderWidth: 1,
    //borderColor: '#fff',
  },
  sideButton: {
  width: 50,
  alignItems: 'center',
},
sideButton2: {
  width: 50,
  alignItems: 'center',
    color: '#DDDDDD',
},
logoContainer: {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: 20,
},




  // settings box stuff
  modalBackground: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  menuBox: {
    position: 'absolute',
    top: 80,
    left: 5,

    width: 140,
    height: 240,

    backgroundColor: '#fff',
    paddingVertical: 10,

    paddingHorizontal: 15,
    borderRadius: 8,

    elevation: 5, // for Android shadow
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  menuItem: {
    paddingVertical: 10,
    fontSize: 20,
  },

  closeMenuItem: {
    paddingVertical: 10,
    fontSize: 20,
    position: 'absolute',
    bottom: -60

  },

  menuDivider: {
  borderTopWidth: 1,
  borderTopColor: '#ccc',
  marginVertical: 10,
},

//image and background stuff here 
 background: {
  position: 'absolute',
  width: '100%',
height: '100%',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -10,
},

// normal content starting here
  content: {
    flex: 1,
    padding: 20,
  },
  normalContent: {
    alignContent: 'center',
    padding: 2,
    backgroundColor: '#fff',
    height: 150, 
    width: 100,
  },
  imageWrapper: {
  backgroundColor: '#fff',
  padding: 12,
  borderRadius: 10,
   borderWidth: 2,           // Add this
  borderColor: 'skyblue',  
  width: 300,
  height: 225,
  alignSelf: 'center',
  justifyContent: 'center',
  marginTop: 30,
},
imageWrapperMinion: {
  backgroundColor: '#fff',
  padding: 8,
  borderRadius: 10,
   borderWidth: 4,           // Add this
  borderColor: 'grey',  
  width: 380,
  height: 300,
  alignSelf: 'center',
  justifyContent: 'center',
  marginTop: 30,
},

imageWrapperMinionBig: {
  backgroundColor: '#fff',
  padding: 8,
  borderRadius: 10,
   borderWidth: 4,           // Add this
  borderColor: 'grey',  
  width: 380,
  height: 540,
  alignSelf: 'center',
  justifyContent: 'center',
  marginTop: 30,
},

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  topCenter: {
   
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    //borderWidth: 1,
    //backgroundColor: '#ccc'
  },
  flexImage: {
    width: '100%',
    height: '100%',
  },
  imageMinionCards: {
    width: 360,   // adjust based on your layout
    height: 300,  // or use 'aspectRatio' instead
  },
  imageMinionCardsBig: {
    width: 360,   // adjust based on your layout
    height: 800,  // or use 'aspectRatio' instead
  },
  smallImage: {
    width: '50%',
    height: '100%',

  },



  // button styles here 


  buttonStack: {
  marginTop: 30, // distance from image
  alignItems: 'center',
  width: '100%',
},

button: {
  backgroundColor: '#555',
  paddingVertical: 12,
  paddingHorizontal: 30,
  marginVertical: 8,
  borderRadius: 8,
  width: '60%',
  alignItems: 'center',
},
buttonBig: {
  backgroundColor: '#555',
  paddingVertical: 40,
  paddingHorizontal: 30,
  marginVertical: 8,
  borderRadius: 8,
  width: '80%',
  alignItems: 'center',
},
buttonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},
buttonTextCentered: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'center',
},

container2: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingTop: 40,
  },
  shopTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
    color: 'white',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  itemBox: {
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
  marginBottom: 10,
},

sectionHeader: {
  backgroundColor: '#ddd',
  padding: 10,
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderRadius: 6,
},

sectionTitle: {
  fontSize: 16,
  fontWeight: 'bold',
},



//From Trents Info Page
backgroundInfoPage: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  overlayContainerInfoPage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 140,
    width: '100%',
  },
  modalbackgroundInfoPageTrent: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: 280,
  width: '100%',
  backgroundColor: 'transparent', // this line is key!
},
closeButtonTrent: {
  position: 'absolute',
  top: 10,
  right: 10,
  zIndex: 1,
  padding: 8,
  backgroundColor: '#0008',
  borderRadius: 20,
},
modalBackgroundTouchable: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // or make fully clear: 'transparent'
  justifyContent: 'center',
  alignItems: 'center',
},

popupWrapper: {
  backgroundColor: 'white', // or any color you want
  borderRadius: 10,
  padding: 10,
  width: '80%',
  maxHeight: '80%',
},
closeButtonFixed: {
  position: 'absolute',
  bottom: 56,
  alignSelf: 'center',
  backgroundColor: '#70110a', // dark brown 4d0c07
  paddingVertical: 8,
  paddingHorizontal: 25,
  borderRadius: 8,
  zIndex: 10,
},
closeButtonText: {
  color: 'white',
  fontSize: 12,
  fontWeight: 'bold',
},
popupcontainerInfoPage: {
  backgroundColor: '#222', // or any card color
  padding: 20,
  borderRadius: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.5,
  shadowRadius: 4,
  elevation: 5,
},
  containerInfoPage: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
  },
  modalbackgroundInfoPage: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupcontainerInfoPageTrent: {
  padding: 0,           // remove padding if you want full edge-to-edge image
  borderRadius: 0,      // remove round corners
  backgroundColor: 'transparent',  // no background
  shadowOpacity: 0,     // no shadow
  elevation: 0,         // Android shadow
},
  closeButton: {
    backgroundColor: '#222',
    padding: 10,
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 12,
  },
  buttonImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: 8,
    resizeMode: 'cover',
  },
  defaultButton: {
    flex: 1,
    backgroundColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    padding: 8,
  },
  scrollContainerInfoPage: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  scroll: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#D3D3D3',
  },
  bigButton: {
    backgroundColor: '#444',
    borderRadius: 10,
    width: '90%',
    aspectRatio: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  gridSoundsPage: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '90%',
  },
  gridButton: {
    backgroundColor: '#888',
    width: '47%',
    aspectRatio: 1,
    marginBottom: 15,
    borderRadius: 8,
    // borderColor: 'grey',
    // borderWidth: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  

  drawer: {
      position: 'absolute',
      top: 0,
      right: 0,
      height: '100%',
      width: '80%',
      backgroundColor: 'white',
      padding: 20,
      shadowColor: '#000',
      shadowOpacity: 0.5,
      shadowOffset: { width: -2, height: 0 },
      shadowRadius: 5,
      elevation: 5,
      zIndex: 999
    },
    closeButtonDrawer: {
      position: 'absolute',
      top: 10,
      left: 10,
      padding: 5
    },
    titleDrawer: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 40, // give space for the close button
      marginBottom: 20
    },
    rowDrawer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20
    },

    // big modal stuff here 
  modalOverlayBig: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContentBig: {
    backgroundColor: "#222",
    borderRadius: 12,
    width: '90%',  // almost full width
    height: '85%', // limit max height so it doesn't cover entire screen
    padding: 20,
  },
  imageBackground: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
},
   
});


