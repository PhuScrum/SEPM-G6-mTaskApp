import React from 'react'
import { StyleSheet, View, TouchableOpacity, TouchableHighlight, Animated, I18nManager } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { Layout, Text, Button } from '@ui-kitten/components';
import { ListItem } from '@ui-kitten/components';
import moment from 'moment-timezone'

class SwipeableRow extends React.Component {

    renderLeftActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [-20, 0, 0, 1],
        });
        return (
            <RectButton style={styles.leftAction} onPress={this.close}>
                <Animated.Text
                    style={[
                        styles.actionText,
                        {
                            transform: [{ translateX: trans }],
                        },
                    ]}>
                    Archive
            </Animated.Text>
            </RectButton>
        );
    };
    renderRightAction = (text, color, x, progress) => {
        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [x, 0],
        });
        const pressHandler = () => {
            this.close();
            alert(text);
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
    renderRightActions = progress => (
        <View style={{ width: 192, flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row', borderTopRightRadius: 10 }}>
            {this.renderRightAction('More', '#C8C7CD', 192, progress)}
            {this.renderRightAction('Flag', '#ffab00', 128, progress)}
            {this.renderRightAction('More', '#dd2c00', 64, progress)}
        </View>
    );
    updateRef = ref => {
        this._swipeableRow = ref;
    };
    close = () => {
        this._swipeableRow.close();
    };
    render() {
        const { children } = this.props;
        return (
            <Swipeable

                ref={this.updateRef}
                friction={2}
                leftThreshold={30}
                rightThreshold={40}
                renderLeftActions={this.renderLeftActions}
                renderRightActions={this.renderRightActions}>
                {children}
            </Swipeable>
        );
    }

}

const RowItem = ({ item }) => (
    <RectButton >
        <ListItem
            style={styles.item}
            title={item.name}
            description={moment(item.dateTime).format('LT')}
            onPress={() => console.log('You touched me')}
        />
    </RectButton>
)

const TaskItem = ({ item, index }) => {
    // console.log(item.dateTime)
    return (
        <TouchableHighlight
            style={styles.rowFront}
        >
            {/* <View>
                <ListItem 
                    style={styles.item}
                    title={item.name}
                    description={moment(item.dateTime).format('LT')}
                    onPress={() => console.log('You touched me')}
                />
            </View> */}
            <SwipeableRow>
                <RowItem item={item} />
            </SwipeableRow>

        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    item: {
        // marginTop:5,
        // borderColor: 'transparent',
        // borderWidth: 1,
        // borderStyle: 'solid',

        flexDirection: 'row',
        flexWrap: 'wrap',
        // backgroundColor: '#EEF7FA'
    },
    button: {
        margin: 0
    },
    rowFront: {
        marginTop: 2,
        // alignItems: 'center',
        backgroundColor: '#EEF7FA',
        justifyContent: 'center',
        // height: 50,
        borderRadius: 12

    },
    leftAction: {
        flex: 1,
        backgroundColor: '#497AFC',
        justifyContent: 'center',
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