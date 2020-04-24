import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import axios from 'axios'
import * as url from '../../constants/url/url'
const items = [
  {childr: [
      {
        name: 'Justin',
        id: '0',
      },
      {
        name: 'Tu Bui',
        id: '1',
      },
   
    ]
    }
 


];

export default function TagMemberInput() {
    const [selectedItems, setSelectedItems] = React.useState([])
    const [searchResult, setSearchResult] = React.useState(items)
    const searchMembers = async (searchTerm)=>{
        var resp = await axios.post(url.searchMembers, {searchTerm})
        var data = resp.data
        // console.log(searchTerm, 'search result: ', data)
        data = restructureData(data)
        loadToSearchResult(data)

    }
    const loadToSearchResult =(data)=>{
        var fake = [
            {name: 'hoang long',id: 'asdfasklfi'},
            {name: 'vu pham', id: 'fadsf413423'}
          ]
        console.log('fake: ',fake)
        console.log('data: ', data)
        
        items[0]['children'] = fake
        console.log('loadToSearchResult: ', items)
        setSearchResult(items)

    }
    const restructureData = (data)=>{
        data.map((unit)=>{
            unit.id = unit._id
            unit.name = unit.fName + ' ' + unit.lName
            delete unit._id
            delete unit.fName
            delete unit.lName
            delete unit.email
            return unit
        })
        console.log('restructure data: ', data)
        return data
    }
    return (
      <View>
        <Text>Tag members</Text>
        <SectionedMultiSelect
          items={searchResult}
          uniqueKey="id"
          subKey="children"
          selectText="Choose some things..."
          showDropDowns={true}
          readOnlyHeadings={true}
          onSelectedItemsChange={(selectedItems)=> setSelectedItems(selectedItems)}
          selectedItems={selectedItems}
          searchPlaceholderText='Search members1...'
          selectText='Tag members'
        //   searchAdornment={(searchTerm)=>{searchMembers(searchTerm)}}
        //   filterItems={(searchTerm, items, props)=> {searchMembers(searchTerm)}}
        />
      </View>
    );
  
}