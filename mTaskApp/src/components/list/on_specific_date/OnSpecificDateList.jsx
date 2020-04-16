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
} from '@ui-kitten/components';
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {Image} from 'react-native'


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
    var ampm ='am'
    if(item.dateTime.getHours()> 12){
      ampm ='pm'
    }
    return (
      <ListItem
        title={`${item.name}`}
        description={`${item.description} \n${item.dateTime.getHours()}.${item.dateTime.getMinutes()} ${ampm} `}
        icon={renderItemIcon}
        accessory={renderItemAccessory}
      />
    );
  }
    if(data){
      return (
        <List
          data={data}
          renderItem={renderItem}
        />
        );
    }else{
      return(
        <Image
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      )
    }
  
  
};

