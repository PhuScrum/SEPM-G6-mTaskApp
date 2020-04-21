
import React, { Component } from 'react';
import { Text, View, Image, TextInput, KeyboardAvoidingView,TouchableOpacity, AsyncStorage, StyleSheet, Alert,} from 'react-native';
import Expo from 'expo';
import * as Facebook from 'expo-facebook';




export default class Login extends Component {
  constructor(props, navigation) {
    super(props, navigation);
    this.state = {
      username:'',
      passward:'',
    }

  }

  async logInFB() {
    try {
      await Facebook.initializeAsync('3153512351365949');
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        this.props.navigation.navigate('MainApp')
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  

  get button(){
    return(
      <TouchableOpacity onPress={() => this.logInFB()}>
        <View style={{width:'70%', borderRadius:4, padding: 24, backgroundColor:'#3b5998'}}> 
         <Text style={{color:'white'}}>Login Via Facebook</Text>
        </View>
      </TouchableOpacity>
    )
  }

 

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.paragraph}>
            Welcome to mTask
          </Text>
        {this.button}
        </View>
    );
  }
  

}

const styles =StyleSheet.create({
  wrapper:{
    flex:1,
  },
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#ecf0f1',
    paddingLeft:40,
    paddingRight:40,
    paddingTop: 50,
  },
  header: {
    fontSize:24,
    marginBottom:60,
    color:'black',
    fontWeight:'bold',
  },
  textInput:{
    borderWidth:1,
    borderColor:'#7b7a79',
    alignSelf:'stretch',
    padding:16,
    marginBottom:20,
    backgroundColor:'#fff',
  },
  btn:{
    alignSelf:'stretch',
    backgroundColor:'#659dea',
    padding:20,
    alignItems:'center',
  },
  logo:{
    resizeMode: "contain",
    height: 100,
    width: 200,
    marginBottom:50,
  },
  paragraph:{
    margin:24,
    fontSize:18,
    fontWeight:'bold',
    textAlign:'center',
    color:'#34495e'


  },

});



{/*import React, { Component } from 'react';
import { Text, View, Image, TextInput, KeyboardAvoidingView,TouchableOpacity, AsyncStorage, StyleSheet,} from 'react-native';




export default class Login extends Component {

  constructor(props, navigation) {
    super(props, navigation);
    this.state = {
      username:'',
      passward:'',
    }

  }
  componentDidMount(){
    this._loadInitialState().done();
  }

  _loadInitialState = async () =>{
    var value = await AsyncStorage.getItem('user');
    if (value !== null){
      //go to app
    }
  }



  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
        <View style={styles.container}>
          
        <View >
         <Image style = {styles.logo} source={require('../../../assets/14th.png')} />
        </View>
       
        
        <TextInput style={styles.textInput} placeholder='Username' onChangeText={(username) => this.setState({username})}
        underlineColorAndroid='transparent'/>

        <TextInput style={styles.textInput} placeholder='Passward' onChangeText={(passward) => this.setState({passward})}
        underlineColorAndroid='transparent'/>

        <TouchableOpacity style={styles.btn} onPress={this.login}>
          <Text>
            Log in
          </Text>
        </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    );
  }
  login = () => {
   
   this.props.navigation.navigate('MainApp')
    
  }

}

const styles =StyleSheet.create({
  wrapper:{
    flex:1,
  },
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',
    paddingLeft:40,
    paddingRight:40,
  },
  header: {
    fontSize:24,
    marginBottom:60,
    color:'black',
    fontWeight:'bold',
  },
  textInput:{
    borderWidth:1,
    borderColor:'#7b7a79',
    alignSelf:'stretch',
    padding:16,
    marginBottom:20,
    backgroundColor:'#fff',
  },
  btn:{
    alignSelf:'stretch',
    backgroundColor:'#659dea',
    padding:20,
    alignItems:'center',
  },
  logo:{
    resizeMode: "contain",
    height: 100,
    width: 200,
    marginBottom:50,
  },

});


*/}


