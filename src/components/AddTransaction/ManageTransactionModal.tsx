import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Text, View, StyleSheet, Alert, Modal, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { removeTransaction } from '../../store/transactions';
import { Transaction } from '../../types/transaction';
import DismissKeyboard from '../library/DismissKeyboard';
import AddTransactionComponent from './AddTransactionComponent';

interface ManageTransactionModalProps {
    modalVisible: boolean,
    setModalVisible: (state: boolean) => void,
    item?: Transaction
}

const ManageTransactionModal = (props: ManageTransactionModalProps) => {
    const { modalVisible, setModalVisible, item } = props;
    const dispatch = useDispatch();
    return (
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

                        <View style={styles.containerHeader}>
                            <TouchableOpacity style={{}} onPress={() => { setModalVisible(false); }}>
                                <Ionicons style={styles.image} size={35} name="close" color="white" />
                            </TouchableOpacity>
                            <View style={styles.containerTitleHeader}>
                                <Text style={styles.titleHeader}>{!item ? 'AGREGAR TRANSACCIÓN' : 'TRANSACCIÓN'}</Text>
                            </View>
                            {item && <TouchableOpacity style={{}} onPress={() => { dispatch(removeTransaction(item)) }}>
                                <Ionicons style={styles.image} size={30} name="trash" color="crimson" />
                            </TouchableOpacity>}
                        </View>

                        <AddTransactionComponent setModalVisible={setModalVisible} item={item} />
                    </View>
                </View>
            </DismissKeyboard>
        </Modal>
    );
};

export default ManageTransactionModal;

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
        //marginRight: 35
    }
});
