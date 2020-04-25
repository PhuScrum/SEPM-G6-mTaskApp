import React, { useState, useEffect } from 'react'
import {Text} from 'react-native'
import SingleOption from './SingleOption'
export default function OptionListing(props){
    const [selectedMembers, setSelectedMembers] = useState([])
    const setParentState = (selectedItems) =>{
        setSelectedMembers(selectedItems)
        console.log('selected members in optionListing: ', selectedMembers)
    }
    useEffect(()=>{
        setParentState(selectedMembers)
    })
    const optionListing = props.data.map((unit, i)=> <SingleOption setParentState={setParentState} unit={unit} key={i}/>)
    const selectedMembersListing = selectedMembers.map((unit, i)=><Text>{unit.fName}</Text>)
    return(
        <React.Fragment>
            {selectedMembersListing}
            {optionListing}
        </React.Fragment>
    )
}