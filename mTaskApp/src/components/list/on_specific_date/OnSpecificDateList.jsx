/**
 * This example demonstrates how simply could be composed List Item
 * with classic layouts like icon at the left, forward button at the right, etc.
 *
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React from 'react';
import {
  Button,
  Icon,
  List,
  ListItem,
  Layout
} from '@ui-kitten/components';
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {Image, Text, View, StyleSheet} from 'react-native'



const renderItemAccessory = (style) => (
  <Button style={style}>COMPLETE</Button>
);

const renderItemIcon = (style) => (
  <Icon {...style} name='people-outline'/>
);
export default function ListCompositeItemShowcase (){

  const tasks = useSelector(state=> state)
  console.log('redux tasks  use selector: ', tasks.calendarOverViewReducer.tasksOnSpecificDate)
  //calendarOverViewReducer, tasksOnSpecificDate
  var tasksData = tasks.calendarOverViewReducer.tasksOnSpecificDate
  const data = tasksData

  const renderItem = ({ item, index }) => {
    var convertedDateTime = new Date(item.dateTime)
    var hr = convertedDateTime.getHours()
    var min = convertedDateTime.getMinutes()

    var ampm ='am'
    if(convertedDateTime.getHours()> 12){
      ampm ='pm'
    }
    return (
      <ListItem
        title={`${item.name}`}
        description={`${item.description ? item.description : ``} ${item.description ? `\n${hr}.${min} ${ampm}` : `${hr}.${min} ${ampm}`} `}
        icon={renderItemIcon}
        accessory={renderItemAccessory}
      />
    );
  }
    if(data && data.length >0){
      return (
        <List
          data={data}
          renderItem={renderItem}
        />
        );
    }else{
      return(
        <React.Fragment>
          <View style={style.container}>
          {/* <Text>Nothing to show</Text> */}
          <Image
            style={style.image}
            source={{
              uri: 'https://previews.123rf.com/images/jemastock/jemastock1602/jemastock160203305/52780560-rest-concept-with-tired-icon-design-vector-illustration-10-eps-graphic-.jpg',
            }}
          />
          </View>
         
        </React.Fragment>
        
      )
    }
  
  
};

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  image:{
    height: 200,
    width: 300,
    borderRadius: 50
    
  }
})