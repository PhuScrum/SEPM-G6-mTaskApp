import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { BottomSheet } from 'react-native-btr';
import RBSheet from "react-native-raw-bottom-sheet";

const BottomSheetComponent = ({ visible, children, onBackButtonPress, onBackdropPress, ref }) => {
    return (
        <View>
            <BottomSheet
                visible={visible}
                onBackButtonPress={onBackButtonPress}
                onBackdropPress={onBackdropPress}
            >
                <View style={styles.bottomNavigationView}>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Text style={styles.bottomSheetTitle}>Create a new task</Text>
                    </View>
                    <View style={{
                        width: '100%',
                        flex: 16,
                        marginTop: 2
                    }}>
                        {children}
                    </View>
                </View>
            </BottomSheet>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomNavigationView: {
        borderRadius: 15,
        backgroundColor: '#fff',
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        // marginVertical: 10
    },
    bottomSheetTitle: {
        // flexDirection:'row',
        fontFamily: 'Lato-Regular',
        fontWeight: 'bold',
        fontSize: 18
    }

})


export default BottomSheetComponent
