import { Feather, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Button, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DismissKeyboard from '../library/DismissKeyboard';
import AddTransactionComponent from './AddTransactionComponent';

export default function AddTransactionModal() {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <DismissKeyboard>
                    <View style={styles.centeredViewModal}>
                        <View style={styles.modalView}>
                            {/* header */}
                            <View style={styles.containerHeader}>
                                <TouchableOpacity style={{}} onPress={() => { setModalVisible(false); }}>
                                    <Ionicons style={styles.image} size={35} name="close" color="white" />
                                </TouchableOpacity>
                                <View style={styles.containerTitleHeader}>
                                    <Text style={styles.titleHeader}>NEW TRANSACTION</Text>
                                </View>
                            </View>
                            {/* Content */}
                            <AddTransactionComponent setModalVisible={setModalVisible}/>
                        </View>
                    </View>
                </DismissKeyboard>
            </Modal>

            <TouchableOpacity style={styles.imageContainer}
                onPress={() => { setModalVisible(true); }}>
                <Feather style={styles.image} size={45} name="plus" color="white" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        alignItems: 'center',
    },
    centeredViewModal: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    openButton: {
        backgroundColor: '#2196F3'
    },
    imageContainer: {
        marginTop: -10,
        width: 55,
        height: 55,
        borderRadius: 55,
        flexDirection: 'row',
        backgroundColor: 'teal',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#303030',
        borderStyle: 'solid'
    },
    image: {
        alignSelf: 'center',
    },
    modalView: {
        margin: 0,
        backgroundColor: '#232325',
        borderRadius: 15,
        padding: 15,
        shadowColor: '#303030',
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 40,
        elevation: 1,
        height: "90%"
    },
    containerHeader: {
        flexDirection: 'row',
    },
    containerTitleHeader: {
        flex: 1,
        justifyContent: 'center',
    },
    titleHeader: {
        color: 'silver',
        fontSize: 18,
        alignSelf: 'center',
        marginRight: 35
    }
});