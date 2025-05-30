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
  // header stuff here
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3', // light grey
    
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
  menuText: {
    fontSize: 24,
    color: '#fff',
  },
  menuArrow: {
    fontSize: 60,
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
  sideButton: {
  width: 50,
  alignItems: 'center',
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



// normal content starting here
  content: {
    flex: 1,
    padding: 20,
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

buttonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
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



});


