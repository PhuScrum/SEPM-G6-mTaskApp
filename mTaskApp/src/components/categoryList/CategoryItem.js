import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'
import { Ionicons, AntDesign, FontAwesome, Feather } from '@expo/vector-icons';

const CategoryItem = ({ item }) => {
    return (
        <Layout style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Feather name="list" size={24} />
                    <View style={{ paddingHorizontal: 12 }}>
                        <Text category="h6">{item.name}</Text>
                    </View>
                </View>

            </View>
        </Layout>
    )
}

export default CategoryItem

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
        flex: 1
    }
})
