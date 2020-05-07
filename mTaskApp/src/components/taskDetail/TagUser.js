import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, TouchableHighlight } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Ionicons, AntDesign, FontAwesome, Feather } from '@expo/vector-icons';
import RBSheet from "react-native-raw-bottom-sheet";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import {
    Input,
    Icon,
    List, ListItem,
    Button
} from '@ui-kitten/components';
import TagMemberInput from '../tag_members/TagMemberInput';

MDIcon.loadFont();

const TagUser = ({ propStyle, tagType }) => {
    const refRBSheet = useRef();
    const data = useSelector(state => state.tagMemberReducer.selectedItems, [])

    const OpenTag = () => {
        switch(tagType){
            case 'input':
                return (
                    <View style={[styles.tagStyle, propStyle.borderStyle]}>
                        <View style={styles.tagInputStyle}>
                            <Text>Tagged Users:</Text>
                            <TouchableOpacity
                                style={{ paddingHorizontal: 5 }}
                                onPress={() => {
                                    refRBSheet.current.open()
                                }}
                            >
                                <AntDesign name="adduser" size={propStyle.iconSize} />
                            </TouchableOpacity>
                        </View>
                </View>
                )
            case 'button':
                return (
                <TouchableHighlight
                style={styles.openButton}
                onPress={()=>refRBSheet.current.open()}
                >
                    <Text style={styles.textStyle}>Tag members</Text>
                </TouchableHighlight>
                )
                
            default:
        }
    }

    return (
        <>
            <OpenTag/>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown
                customStyles={{
                    container: {
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        minHeight: 400
                    }
                }}
            >
                <View style={styles.dateHeaderContainer}>
                    <TouchableOpacity
                        onPress={() => refRBSheet.current.close()}
                        style={styles.dateHeaderButton}
                    >
                        <Text style={styles.dateHeaderButtonCancel}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            refRBSheet.current.close()

                        }}
                        style={[styles.dateHeaderButton]}
                    >
                        <Text style={styles.dateHeaderButtonDone}>Done</Text>
                    </TouchableOpacity>
                </View>

                <TagMemberInput/>

            </RBSheet>

        </>
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
    },
    dateHeaderContainer: {
        height: 45,
        borderBottomWidth: 1,
        borderColor: "#ccc",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    dateHeaderButton: {
        height: "100%",
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    dateHeaderButtonCancel: {
        fontSize: 18,
        color: "#666",
        fontWeight: "400"
    },
    dateHeaderButtonDone: {
        fontSize: 18,
        color: "#006BFF",
        fontWeight: "500"
    },
    inputContainer: {
        borderTopWidth: 1.5,
        borderTopColor: "#ccc",
        flexDirection: "row",
        alignItems: "center",
        padding: 10
    },
    inputIcon: {
        fontSize: 24,
        color: "#666",
        marginHorizontal: 5
    },
    inputIconSend: {
        color: "#006BFF"
    },
    input: {
        flex: 1,
        height: 36,
        borderRadius: 36,
        paddingHorizontal: 15,
        backgroundColor: "#f1f1f1",
        marginHorizontal: 10
    },
    searchUserItem: {
        paddingVertical: 15,
        backgroundColor: '#EEF7FA',
        marginHorizontal: 20,
        marginVertical: 5,
        borderRadius: 25
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 150
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
})

export default TagUser
