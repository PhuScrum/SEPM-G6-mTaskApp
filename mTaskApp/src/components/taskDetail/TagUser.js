import React, { useRef, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, TextInput, ScrollView, TouchableHighlight } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Ionicons, AntDesign, FontAwesome, Feather } from '@expo/vector-icons';
import RBSheet from "react-native-raw-bottom-sheet";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import {
    Input,
    Text,
    Icon,
    List, ListItem,
    Button
} from '@ui-kitten/components';
import TagMemberInput from '../tag_members/TagMemberInput';
import { editTaskAction } from '../../actions/TaskAction';

MDIcon.loadFont();

const TagUser = ({ propStyle, tagType, saveTagUser, id, isSaveTag }) => {
    const { headerStyle } = propStyle
    const refRBSheet = useRef();
    const data = useSelector(state => state.tagMemberReducer.selectedItems, [])

    const OpenTag = () => {
        switch (tagType) {
            case 'input':
                return (
                    <View style={[styles.tagStyle, propStyle.borderStyle]}>
                        <View style={styles.tagInputStyle}>
                            <Text category='s1'>Tagged Users:</Text>
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
                    <TouchableOpacity
                        style={styles.openButton}
                        onPress={() => refRBSheet.current.open()}
                    >
                        <>
                            <FontAwesome name="user-circle-o" size={24} color="black" />
                            <Text category='s1' style={styles.textStyle}>Tag users</Text>
                        </>
                    </TouchableOpacity>
                )
            case 'icon':
                return (
                    <TouchableOpacity
                        onPress={() => refRBSheet.current.open()}
                    >
                        <FontAwesome name="user-circle-o" size={22} color="black" />
                    </TouchableOpacity>
                )

            default:
        }
    }

    return (
        <>
            <OpenTag />
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
                <View style={headerStyle.headerContainer}>
                    <TouchableOpacity
                        onPress={() => refRBSheet.current.close()}
                        style={headerStyle.headerButton}
                    >
                        <Text style={headerStyle.headerButtonCancel}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            refRBSheet.current.close()
                            { isSaveTag && saveTagUser(id, { taggedUsers: data }) }
                        }}
                        style={[headerStyle.headerButton]}
                    >

                        <Text style={headerStyle.headerButtonDone}>Done</Text>
                    </TouchableOpacity>
                </View>

                <TagMemberInput />

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
        backgroundColor: "#D1D5D8",
        borderRadius: 5,
        paddingRight: 25,
        paddingLeft: 5,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
        // width: 150
    },
    textStyle: {
        // color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center"
    },
})

export default TagUser
