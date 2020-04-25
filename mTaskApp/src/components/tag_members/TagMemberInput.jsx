import React, { Component, useState, useEffect } from 'react';
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
      try{
        var resp = await axios.post(url.searchMembers, {searchTerm})
        var data = resp.data
        // console.log(searchTerm, 'search result: ', f)
        data = restructureData(data)
        loadToSearchResult(data)
        // return data
      }catch(err){
        console.error(err)
      }
    
    }
    const loadToSearchResult =(data)=>{
        items[0]['children'] = data
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
          searchAdornment={(searchTerm)=>{searchMembers(searchTerm)}}
          // filterItems={(searchTerm, items, props)=> {return searchMembers(searchTerm)}}
        />
      </View>
    );
  
}