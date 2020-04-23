import React from 'react'
import { StyleSheet, View, TouchableOpacity, TouchableHighlight, Animated, I18nManager } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { Layout, Text, Button } from '@ui-kitten/components';
import { ListItem } from '@ui-kitten/components';
import moment from 'moment-timezone'

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

class GmailStyleSwipeableRow extends React.Component {

    renderLeftActions = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [0, 80],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });
        return (
            <RectButton style={styles.leftAction} onPress={this.close}>
               <Ionicons name="ios-trash" size={32} color="white" />
            </RectButton>
        );
    };
    renderRightActions = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [-80, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });
        return (
            <RectButton style={styles.rightAction} onPress={this.close}>
                <Ionicons name="ios-trash" size={32} color="white" />
            </RectButton>
        );
    };
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
                leftThreshold={80}
                rightThreshold={40}
                renderLeftActions={this.renderLeftActions}
                renderRightActions={this.renderRightActions}
            >
                {children}
            </Swipeable>
        )
    }

}

const RowItem = ({item}) => (
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
        // underlayColor={'#f0ffff'}
        >
            {/* <View>
                <ListItem 
                    style={styles.item}
                    title={item.name}
                    description={moment(item.dateTime).format('LT')}
                    onPress={() => console.log('You touched me')}
                />
            </View> */}
            <GmailStyleSwipeableRow>
                <RowItem item={item}/>
            </GmailStyleSwipeableRow>

        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    item: {
        // marginTop:5,
        // borderColor: 'transparent',
        // borderWidth: 1,
        // borderStyle: 'solid',
        // borderRadius: 10,
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
        backgroundColor: '#388e3c',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse'
    },
    actionIcon: {
        width: 30,
        marginHorizontal: 10
    },
    rightAction: {
        alignItems: 'center',
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        backgroundColor: '#dd2c00',
        flex: 1,
        justifyContent: 'flex-end'
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