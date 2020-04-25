import React, {useEffect} from 'react'
import {Text} from 'react-native'
import { CheckBox } from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux'
import {SET_ITEMS_TO_SELECTED, REMOVE_ITEMS_FROM_SELECTED} from '../../actions/types'
export default function SingleOption(props){
    const [checked, setChecked] = React.useState(false);
    const dispatch = useDispatch()
    const selectedItems = useSelector(state => state.tagMemberReducer.selectedItems)
    var idArr = selectedItems.map(unit=> unit=unit._id)
    const sendToSelected=(items)=>{
        dispatch({
            type: SET_ITEMS_TO_SELECTED,
            items

        })
    }
    const removeFromSelected=(items)=>{
        dispatch({
            type: REMOVE_ITEMS_FROM_SELECTED,
            items
        })
    }
    const onCheckedChange = (isChecked) => {

        isChecked ? sendToSelected(props.unit) : removeFromSelected(props.unit)
        props.setParentState(selectedItems)

        setChecked(isChecked);
    };

    useEffect(() => {
        setChecked(false)

        if(idArr.includes(props.unit._id)){
            setChecked(true)
        }
    }, [])


    // console.log('single option props: ', props)
    const {fName, lName} = props.unit
    const fullName = fName + ' ' + lName
    
    return(
        <React.Fragment>
            <CheckBox
                    text={fullName}
                    checked={checked}
                    onChange={onCheckedChange}
                    />
        </React.Fragment>
    )
}