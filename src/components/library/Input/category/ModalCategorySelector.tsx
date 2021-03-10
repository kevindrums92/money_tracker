import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { Text, View, StyleSheet, Modal, TouchableOpacity, SectionList, FlatList } from 'react-native';
import { Category } from '../../../../types/category';
import CustomListViewControl from './CustomListViewControl';

interface ModalCategorySelectorProps {
    visible: boolean;
    closeModal: () => void;
    onChange: (category: Category) => void;
}

const ModalCategorySelector = (props: ModalCategorySelectorProps) => {
    const { visible, closeModal, onChange } = props;

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}>
            <View style={styles.centeredViewModal}>
                <LinearGradient
                    colors={['rgba(18,17,17,0.99)', 'rgba(54,53,53,0.99)']}
                    style={styles.background} />
                <View style={styles.modalView}>
                    {/* header */}
                    <View style={styles.containerHeader}>
                        <TouchableOpacity onPress={closeModal}>
                            <Ionicons style={styles.image} size={35} name="close" color={'white'} />
                        </TouchableOpacity>
                        <View style={styles.containerTitleHeader}>
                            <Text style={styles.titleHeader}>CATEGORIAS</Text>
                        </View>
                    </View>
                    {/* Content */}
                    <CustomListViewControl onChange={onChange} />
                </View>
            </View>
        </Modal>
    );
};

export default ModalCategorySelector;

const styles = StyleSheet.create({
    centeredViewModal: {
        flex: 1,
    },
    modalView: {
        margin: 0,
        paddingVertical: Constants.statusBarHeight,
        shadowColor: '#303030',
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 40,
        elevation: 1,
        height: "100%"
    },
    containerHeader: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingBottom: 15
    },
    containerTitleHeader: {
        flex: 1,
        justifyContent: 'center',
    },
    titleHeader: {
        fontSize: 18,
        alignSelf: 'center',
        marginRight: 35,
        color: 'white'
    },
    image: {
        alignSelf: 'center',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
    },


});


