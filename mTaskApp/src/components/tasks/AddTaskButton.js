import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { clearSelectedAction } from '../../actions/tag-members-actions';
import { clearTaskItemAction } from '../../actions/TaskAction';
import { useDispatch } from 'react-redux';

const AddToDoButton = ({toggleBottomSheet}) =>{

  const dispatch = useDispatch()

  const onPressHandle = () => {
    toggleBottomSheet()
    dispatch(clearSelectedAction())
    dispatch(clearTaskItemAction())
  }
   return(
    <TouchableOpacity onPress={() => onPressHandle()} style={styles.fab}>
    <Text style={styles.fabIcon}>+</Text>
    </TouchableOpacity>
);
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 25,
        bottom: 25,
        backgroundColor: '#36D1DC',
        borderRadius: 30,
        elevation: 10
      },
      fabIcon: {
        fontSize: 40,
        color: '#24243e',
        marginBottom:4
      }

})

export default AddToDoButton