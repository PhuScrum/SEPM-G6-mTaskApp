import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Ionicons, AntDesign, FontAwesome, Feather } from '@expo/vector-icons';

const TagUser = ({propStyle}) => {

    return (
        <View style={[styles.tagStyle, propStyle.borderStyle]}>
            <View style={styles.tagInputStyle}>
                <Text>Tagged Users:</Text>
                <TouchableOpacity
                    style={{ paddingHorizontal: 5 }}
                    onPress={() => console.log('Tag Users')}
                >
                    <AntDesign name="adduser" size={propStyle.iconSize} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tagStyle: {
        paddingVertical: 20,
        // backgroundColor: 'gray'
    },
    tagInputStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    }
})

export default TagUser
