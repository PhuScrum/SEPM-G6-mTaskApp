import React, {createRef} from 'react'
import { StyleSheet, View } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'
import { Ionicons, AntDesign, FontAwesome, Feather } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const CategoryItem = ({ item }) => {
    const scrollRef = createRef()

    const renderLeftAction = () => {

    }

    return (
        <Swipeable
            ref={scrollRef}
        >
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
        </Swipeable>
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
