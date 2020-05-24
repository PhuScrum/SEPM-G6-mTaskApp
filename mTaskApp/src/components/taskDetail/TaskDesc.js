import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity } from 'react-native'
import { Ionicons, AntDesign, FontAwesome, Feather, Foundation, MaterialIcons } from '@expo/vector-icons';

const TaskDesc = ({addType, openInput}) => {

    const OpenDesc = () => {
        switch(addType){
            case 'button':
                return (
                    <TouchableOpacity
                        // style={styles.openButton}
                        onPress={openInput}
                    >
                        <MaterialIcons name="text-fields" size={22} color="black" />
                    </TouchableOpacity>
                )
            default:

        }
    }

    return (
        <View>
            <OpenDesc/>
        </View>
    )
}

export default TaskDesc

const styles = StyleSheet.create({
    openButton: {
        backgroundColor: "#D1D5D8",
        borderRadius: 5,
        paddingRight: 25,
        paddingLeft: 5,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent:'space-around'
        // width: 150
    },
    textStyle: {
        // color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        alignSelf:'center'
    },
})
