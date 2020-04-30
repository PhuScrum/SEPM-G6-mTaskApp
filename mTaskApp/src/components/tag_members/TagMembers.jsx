import React from 'react'
import { Text, View, StyleSheet, TouchableHighlight, Alert, TouchableWithoutFeedback, TouchableOpacity, Modal } from 'react-native'
// import Modal from 'react-native-modal';
import { Layout, Button, Card } from '@ui-kitten/components'
import TagMemberInput from './TagMemberInput'

export default function TagMembers() {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedItems, setSelectedItems] = React.useState([])

    const toggleModal = () => {
        setModalVisible(!modalVisible)
    };

    return (
        <View
            style={{ flex: 1 }}
        >
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false)
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Select members:</Text>

                        <TagMemberInput/>

                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>

            <TouchableHighlight
                style={styles.openButton}
                onPress={() => toggleModal()}
            >
                <Text style={styles.textStyle}>Tag members</Text>
            </TouchableHighlight>
        </View>

    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
});
