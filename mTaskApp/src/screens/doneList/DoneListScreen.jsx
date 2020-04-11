import React, { Component } from 'react'
import {Layout, Text } from '@ui-kitten/components';
import TopNavigationBarBackButton from '../../components/cores/TopNavigationBarBackButton'
import {FlatList, StyleSheet, View, ActivityIndicator, TouchableOpacity} from 'react-native';


export default class DoneListScreen extends Component {

   constructor() {
       super();
       this.state = {
        isLoading: true,
        dataSource: [],
       
        
       }
   }

   componentDidMount () {
       return fetch('http://192.168.0.10:19000/task')
        .then((response) => response.json())
       // .then((responseJson) => {
     //       this.setState({
     //       isLoading: false,
     //       dataSource: responseJson
    //    })

    //   })
        .then(dataSource => {
            this.setState({dataSource: dataSource.filter(d => d.completed === true)})
        })

      
   }

    //fetchData = async () => {
    //    const response = await fetch("http://localhost:19000/task");
    //    const json =await response.json();
    //       this.setState({data: json.task});


   // }

   _renderItem = ({ item }) => (
    
    <View>
   
    <TouchableOpacity onPress={() => alert(item.completed)}>
        <View style={styles.item}> 
            <Text style={{fontSize:18, fontWeight:"bold", }}>{item.name}</Text> 
            <Text style={{fontSize:15}}>{item.description}</Text>
        </View>
    </TouchableOpacity>
    
    </View>
    
   );


    render() {
       

        
        return (
            
            <View  style={{paddingTop: 20, paddingBottom: 0,  }}>
                <View style={{marginVertical: 10, borderBottomColor:'black'}}>
                <TopNavigationBarBackButton {...this.props} title='Back'/>
                
                </View>
                <Text style={{textAlign:"center"}}category='h1'>Done List</Text>
                <View style={{paddingBottom:260}}>
                <FlatList 
                    data={this.state.dataSource}
                    renderItem={this._renderItem}
                    keyExtractor={(item, i) => i}
                    />
                </View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({

    item:{
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',   
        marginLeft:10,
        marginRight:10,


    },
});