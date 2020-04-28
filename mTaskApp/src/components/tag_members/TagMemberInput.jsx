import React, { Component, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import axios from 'axios'
import * as url from '../../constants/url/url'
import {
  Icon,
  Input,
} from '@ui-kitten/components';
import OptionListing from './OptionListing'
import { useSelector } from 'react-redux';
import SelectedMembers from './SelectedMembers'
export default function TagMemberInput() {
  

  // input
  const [value, setValue] = useState('');
  const [searchResult, setSearchResult] = useState([])

    const searchMembers = async (searchTerm) => {
      setValue(searchTerm)
      try {
        var resp = await axios.post(url.searchMembers, { searchTerm })
        var data = resp.data
        console.log(data)
        setSearchResult(data)
        // return data
      } catch (err) {
        console.error(err)
      }
  }
  const onIconPress = () => {
    setValue('');
  };
  const renderIcon = (style) => (
    <Icon {...style} name={value ? 'close-outline' : 'corner-down-left-outline'}/>
  );
  
// const selectedMembersListing = selectedItems.map((unit, index)=> <Text key={index}>{unit.fName}</Text>)
  return (
    <View>
      {/* <SelectedMembers/> */}
      <Input
        value={value}
        placeholder='search members'
        icon={renderIcon}
        onIconPress={onIconPress}
        onChangeText={searchMembers}
      />
      <OptionListing data={searchResult}/>
    </View>
  );

}



























// const [selectedItems, setSelectedItems] = React.useState([])
//   const [searchResult, setSearchResult] = React.useState(items)
//   const searchMembers = async (searchTerm) => {
//     try {
//       var resp = await axios.post(url.searchMembers, { searchTerm })
//       var data = resp.data
//       // console.log(searchTerm, 'search result: ', f)
//       data = restructureData(data)
//       loadToSearchResult(data)
//       // return data
//     } catch (err) {
//       console.error(err)
//     }

//   }
//   const loadToSearchResult = (data) => {
//     items[0]['children'] = data
//     console.log('loadToSearchResult: ', items)
//     setSearchResult(items)

//   }
//   const restructureData = (data) => {
//     data.map((unit) => {
//       unit.id = unit._id
//       unit.name = unit.fName + ' ' + unit.lName
//       delete unit._id
//       delete unit.fName
//       delete unit.lName
//       delete unit.email
//       return unit
//     })
//     console.log('restructure data: ', data)
//     return data
//   }