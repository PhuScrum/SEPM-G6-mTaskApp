import React, { useState, useEffect } from 'react'
import {Text} from 'react-native'
import SingleOption from './SingleOption'
import {connect, useSelector} from 'react-redux'
export default function OptionListing(props){
     const data = useSelector(state => state.tagMemberReducer.selectedItems, [])

    const optionListing = props.data.map((unit, i)=> <SingleOption  unit={unit} key={i}/>)
    // console.log('map state to props selected items: ', this.props.selectedItems)
    const selectedMemListing = data.map((unit, i)=><Text key={i}>{unit.fName}</Text>)
        return(
            <React.Fragment>
                {selectedMemListing}
                {optionListing}
            </React.Fragment>
        )
    }
