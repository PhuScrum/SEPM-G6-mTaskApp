import React, { createRef } from 'react'
import { StyleSheet, View, TouchableOpacity, TouchableHighlight, Animated, I18nManager } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { Layout, Text, Button } from '@ui-kitten/components';
import { ListItem } from '@ui-kitten/components';
import moment from 'moment-timezone'

class TrashIcon extends React.Component {
    render() {
        return <Ionicons name="ios-trash" size={32} color="white" />
    }
}


const RowItem = ({ item }) => (
    <RectButton >
        <ListItem
            style={styles.item}
            title={item.name}
            description={moment(item.dateTime).format('LT')}
            onPress={() => console.log(item.name)}
        />
    </RectButton>
)

const TaskItem = ({ item, deleteHandler, editTaskHandler }) => {
    const scrollRef = createRef()

    const renderLeftAction = (text, color, x, progress) => {
        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [x, 0],
        });
        const pressHandler = () => {
            switch (text) {
                case 'Delete':
                    deleteHandler(item._id)

                case 'Delay':

                default:
            }
        }
        return (
            <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
                <RectButton style={[styles.leftAction, { backgroundColor: color }]} onPress={pressHandler}>
                    <Text style={styles.actionText}>{text}</Text>
                </RectButton>
            </Animated.View>
        );
    }
    const renderLeftActions = (progress) => (
        <View style={{ width: 192, flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse' }}>
            {renderLeftAction('Delay', '#394F68', -64, progress)}
            {renderLeftAction('Delete', '#EE001D', -32, progress)}
        </View>
    )

    const renderRightAction = (text, color, x, progress) => {
        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [x, 0],
        });
        const pressHandler = () => {
            switch(text){
                case 'Done':
                    editTaskHandler(item._id, { completed: !item.completed })
                default:
            }
        };
        return (
            <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
                <RectButton
                    style={[styles.rightAction, { backgroundColor: color }]}
                    onPress={pressHandler}>
                    <Text style={styles.actionText}>{text}</Text>
                </RectButton>
            </Animated.View>
        );
    };
    const renderRightActions = progress => (
        <View style={{ width: 192, flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' }}>
            {renderRightAction('More', '#65AEE0', 192, progress)}
            {renderRightAction('Done', '#4CBB87', 128, progress)}
        </View>
    );

    return (
        <TouchableHighlight
            style={styles.rowFront}
        >
            <Swipeable
                ref={scrollRef}
                friction={2}
                leftThreshold={40}
                rightThreshold={40}
                renderLeftActions={renderLeftActions}
                renderRightActions={renderRightActions}
            >
                <RowItem item={item} />
            </Swipeable>
        </TouchableHighlight>
    );

}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // backgroundColor: '#EEF7FA'
    },
    button: {
        margin: 0
    },
    rowFront: {
        marginTop: 2,
        backgroundColor: '#EEF7FA',
        justifyContent: 'center',
        borderRadius: 12
    },
    leftAction: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    actionText: {
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        padding: 10,
    },
    rightAction: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    rectButton: {
        flex: 1,
        height: 80,
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        flexDirection: 'column',
        backgroundColor: 'white',
    },
})

export default TaskItem