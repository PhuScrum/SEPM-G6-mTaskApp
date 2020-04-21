
import React, { Component } from 'react';
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


