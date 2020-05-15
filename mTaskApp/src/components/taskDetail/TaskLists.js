import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons, AntDesign, FontAwesome, Feather } from '@expo/vector-icons';

import RBSheet from "react-native-raw-bottom-sheet";
import { FlatList } from 'react-native-gesture-handler';

const TaskLists = ({ propStyle, saveList, id, taskLists, removeList }) => {
    const { headerStyle } = propStyle

    const refRBSheet = useRef();
    const lists = useSelector(state => state.listReducer.lists, [])

    const listId = (taskLists && taskLists.length !==0) ? taskLists.map(list=>list._id) : []

    const displayTitle = (taskLists && taskLists.length !==0) ? 'Added to My Lists' : 'Add to My Lists'

    const renderItem = ({ item }) => {
        const listData = {
            listId: [item._id]
        }

        const removeListData = {
            listId : item._id
        }

        return (
            <>
                <View style={styles.itemContainerStyle}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>{item.name}</Text>
                        {listId.includes(item._id) ? (
                            <TouchableOpacity
                                onPress={() => {
                                    console.log(removeListData)
                                    removeList(id,removeListData)
                                }}
                            >
                                <Feather name="check" size={24} color="black" />
                            </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    onPress={() => {
                                        console.log(listData)
                                        saveList(id,listData)
                                    }}
                                >
                                    <Feather name="plus" size={24} color="black" />
                                </TouchableOpacity>
                            )
                        }
                    </View>
                </View>
            </>
        )
    }

    return (
        <>
            <Feather name="sun" size={propStyle.iconSize} />
            <TouchableOpacity
                style={styles.touchableStyle}
                onPress={() => {
                    console.log('My List')
                    refRBSheet.current.open()
                    // setDisplayLists(!displayLists)
                }}
            >
                <Text style={styles.textStyle}>{displayTitle}</Text>
            </TouchableOpacity>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown
                closeOnPressBack
                height={330}
                customStyles={{
                    container: {
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        // minHeight: 400
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
                </View>
                <View style={styles.listContainer}>
                    <FlatList
                        data={lists}
                        renderItem={renderItem}
                        keyExtractor={list => list._id}
                    />
                </View>

            </RBSheet>
        </>
    )
}

export default TaskLists

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15,
        color: '#6F7274'
        // height:'100%'
    },
    touchableStyle: {
        paddingHorizontal: 20
    },
    listContainer: {
        padding: 25
    },
    itemContainerStyle: {
        backgroundColor: '#EDF1F7',
        marginVertical: 2,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15
    }
})
