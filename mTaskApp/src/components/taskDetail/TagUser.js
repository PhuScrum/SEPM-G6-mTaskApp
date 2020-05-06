import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Ionicons, AntDesign, FontAwesome, Feather } from '@expo/vector-icons';
import RBSheet from "react-native-raw-bottom-sheet";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import {
    Input,
    Icon
  } from '@ui-kitten/components';
import { searchUserAction } from '../../actions/UserActions';
import axios from 'axios';

MDIcon.loadFont();

const TagUser = ({ propStyle, userList }) => {
    const refRBSheet = useRef();
    const dispatch =useDispatch()
    const [name, setName] = useState('')
    const [searchResult, setSearchResult] = useState([])

    const searchUser = async (term) => {
        setName(term)
        try{
            var res = await axios.post('https://bigquery-project-medium.df.r.appspot.com/search-members', {searchTerm: term})
            setSearchResult(res.data)
        } catch(err) {
            console.log(err)
        }
    }

    console.log('search: ', searchResult)

    const renderIcon = (style) => (<Icon {...style} name={name ? 'close-outline' : 'corner-down-left-outline'} />)

    return (
        <>
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
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown
                customStyles={{
                    container: {
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10
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
                <View style={styles.inputContainer}>
                    <Input
                        value={name}
                       style={styles.input} 
                       onIconPress={()=>setName('')} 
                       icon={renderIcon}
                       onChangeText={searchUser}
                    />
                    <MDIcon
                        name="send"
                        style={[styles.inputIcon, styles.inputIconSend]}
                        onPress={() => refRBSheet.current.close()}
                    />
                </View>
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
})

export default TagUser
