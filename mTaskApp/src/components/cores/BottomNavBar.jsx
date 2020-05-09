import React, { Component } from 'react'
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Layout, Text, Icon } from '@ui-kitten/components';
import HomeScreen from '../../screens/home_screen/HomeScreen';
import ProfileScreen from '../../screens/userProfile/Profile';
import NotificationScreen from '../../screens/notification/NotificationScreen'
import NotificationListing from '../../screens/notification/NotificationListing'
import ListScreen from '../../screens/categoryList/ListScreen';
const BottomTab = createBottomTabNavigator();

const PersonIcon = (style) => (
    <Icon {...style} name='person-outline' />
);

const BellIcon = (style) => (
        <Icon {...style} name='bell-outline' />
);

const HomeIcon = (style) => (
    <Icon {...style} name='home-outline' />
);

const ListIcon = (style) => (
    <Icon {...style} name='list-outline' />
);

const BottomTabBar = ({ navigation, state }) => {

    const onSelect = (index) => {
        navigation.navigate(state.routeNames[index]);
    };

    return (
        <SafeAreaView>
            <BottomNavigation selectedIndex={state.index} onSelect={onSelect}>
                <BottomNavigationTab  icon={ListIcon} />
                <BottomNavigationTab  icon={HomeIcon} />

                <BottomNavigationTab  icon={BellIcon} />
                <BottomNavigationTab  icon={PersonIcon} />
            </BottomNavigation>
        </SafeAreaView>
    );
};

const TabNavigator = () => (
    <BottomTab.Navigator tabBar={props => <BottomTabBar {...props} />}>
        <BottomTab.Screen name='List' component={ListScreen} />
        <BottomTab.Screen name='Home' component={HomeScreen} />

        <BottomTab.Screen name='Notifications' component={NotificationListing} />
        <BottomTab.Screen name='Users' component={ProfileScreen} />

    </BottomTab.Navigator>
);

export default class BottomNavBar extends Component {
    render() {
        return (
            <TabNavigator />
        )
    }
}
