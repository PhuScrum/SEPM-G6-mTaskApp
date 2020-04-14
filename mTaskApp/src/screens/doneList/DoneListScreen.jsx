import React, { Component } from 'react'
import {Layout, Text, Button } from '@ui-kitten/components';
import TopNavigationBarBackButton from '../../components/cores/TopNavigationBarBackButton'
import {Modal, FlatList, StyleSheet, View, ActivityIndicator, TouchableOpacity} from 'react-native';


export default class DoneListScreen extends Component {

   constructor() {
       super();
       this.state = {
        isLoading: true,
        dataSource: [],
        show: false,
        selectedItemName:'',
        selectedItemId: '',
        selectedDescription:'',
        selectedCompletedDate:'',
       
        
       }
   }
   


   componentDidMount () {
       return fetch('http://192.168.100.28:19000/task')
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


   _renderItem2 = ({ item }) => (
    
    
    <View>
    
         <Modal
            
            transparent={true}
            visible={this.state.show}
            >
    
            <View style={{backgroundColor: "#000000aa", flex: 1}}>
            <View  style={{backgroundColor:"#ffffff", marginHorizontal:50,marginVertical:100, padding:40, borderRadius:10, flex:1}}>
                <View style={{marginBottom:20}}>
                 <Text style={{fontSize:20, textAlign:"center"}}>Task Title</Text>
                 <Text style={{fontSize:15, textAlign:"center"}}>{this.state.selectedItemName}</Text>
                </View>

                <View style={{marginBottom:20}}>
                 <Text style={{fontSize:20, textAlign:"center"}}>Description</Text>
                 <Text style={{fontSize:15, textAlign:"center"}}>{this.state.selectedDescription}</Text>
                </View>

                <View style={{marginBottom:20}}>
                
                 <Text style={{fontSize:20, textAlign:"center"}}>Completed Time</Text>
                 <Text style={{fontSize:15, textAlign:"center"}}>{this.state.selectedCompletedDate}</Text>
                </View>

                 <View style={{marginLeft:'50%', marginBottom:36, position: 'absolute', bottom:0}}>
                    
                <Button onPress={()=>{this.setState({show:false})}}>Back</Button>   
                 </View>  
            </View>    
            </View>
         </Modal>
   
    <TouchableOpacity onPress={() => {this.setState(
        {show: true, selectedItemId: item._id, selectedItemName:item.name, selectedDescription:item.description, selectedCompletedDate:item.dateTime})}}>

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
                    renderItem={this._renderItem2}
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