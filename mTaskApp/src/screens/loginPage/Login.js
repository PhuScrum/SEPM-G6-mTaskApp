
import React, { Component } from 'react';
import { Text, View, Image, TextInput, KeyboardAvoidingView,TouchableOpacity, AsyncStorage, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import Expo from 'expo';
import * as Facebook from 'expo-facebook';
import axios  from 'axios';



export default class Login extends Component {
  constructor(props, navigation) {
    super(props, navigation);
    this.state = {
      userInfo: null,
      isLoggedIn: 'true',
      userId: ''
      //isLoadding: true

    }

  }


 /* postMethod2 = e => {
    e.preventDefault()
    console.log('postmethod called')
    axios
      .post('http://192.168.100.28/simple-facebook-login', this.state.userInfo.email)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }*/
 

  async postMethod (){
    console.log('Post function called')
    try{
      await fetch('https://bigquery-project-medium.df.r.appspot.com/simple-facebook-login', {
        method:'post',
        mode:'no-cors',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.userInfo.email,
          fName: this.state.userInfo.first_name,
          lName: this.state.userInfo.last_name,
          displayPhoto: this.state.userInfo.picture.data.url
        })
      });

    }catch(e){
      console.log(e)
    }
  }   

  async getUserId() {
    // Simple POST request with a JSON body using fetch
    var resp = await axios.post('https://bigquery-project-medium.df.r.appspot.com/get-user-by-email', {email: this.state.userInfo.email})
    var data = resp.data._id
    this.setState({userId: data})
    console.log(this.state.userId)
    AsyncStorage.setItem('userId', this.state.userId);
    console.log('user:', this.state.userId)
    
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
        permissions: ['public_profile','email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=email,first_name,last_name,id,name,picture.type(large)`);
       // break;
        let clone = response.clone();
        const json = await clone.json();
        this.setState({userInfo: json});
        
        //this.postMethod2();
        this.postMethod();
        this.getUserId();

        //save user info to Async storage

        

        //AsyncStorage.setItem('userId', this.state.userId);
        AsyncStorage.setItem('user', JSON.stringify(this.state.userInfo));
        AsyncStorage.setItem('isLoggedIn', this.state.isLoggedIn);
        

        
        console.log(this.state.userInfo.name);
        console.log(this.state.userInfo.email);
        console.log(this.state.userInfo.first_name);
        console.log(this.state.userInfo.last_name);
        console.log(this.state.userInfo.picture.data.url);
        console.log(this.state.userInfo.id)

        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        this.props.navigation.navigate('MainApp')
        
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
      //this.props.navigation.navigate('MainApp')
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
           <View >
             <Image style = {styles.logo} source={require('../../../assets/14th.png')} />
          </View>
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


