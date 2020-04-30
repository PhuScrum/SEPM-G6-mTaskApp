import React, { useState, useEffect } from 'react'
import {Text} from 'react-native'
import SingleOption from './SingleOption'
import {connect} from 'react-redux'
class OptionListing extends React.Component{
    constructor(props){
        super(props)
    }
    
    render(){
    const optionListing = this.props.data.map((unit, i)=> <SingleOption  unit={unit} key={i}/>)
    // console.log('map state to props selected items: ', this.props.selectedItems)
    const selectedMemListing = this.props.selectedItems.map((unit, i)=><Text key={i}>{unit.fName}</Text>)
        return(
            <React.Fragment>
                {optionListing}
            </React.Fragment>
        )
    }
    
}
const mapStateToProps = state=>{
    // console.log('mapStateToProps state', state)
    return{
        selectedItems : state.tagMemberReducer.selectedItems
    }
}
export default connect(mapStateToProps)(OptionListing)
