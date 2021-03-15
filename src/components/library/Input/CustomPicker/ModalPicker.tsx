import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Text, View, StyleSheet, ColorSchemeName, Modal, TouchableOpacity, useColorScheme } from 'react-native';
import { getRecurrencyTypes } from '../../../../utils/transactionUtils';
import { Picker } from "@react-native-community/picker";

const DARK_COLOR = "#232325";
const LIGHT_COLOR = "white";

interface ModalPickerProps {
    value: any;
    modalVisible: boolean;
    closeControl: () => void;
    onChange: (...event: any[]) => void;
}

const ModalPicker = (props: ModalPickerProps) => {
    const { onChange, value } = props;

    let modalViewStyles = styles.modalView;
    let textColor: string;
    let colorScheme: ColorSchemeName = useColorScheme();
    if (colorScheme === "dark") {
        modalViewStyles = {
            ...modalViewStyles,
            backgroundColor: DARK_COLOR
        };
        textColor = LIGHT_COLOR;
    } else {
        modalViewStyles = {
            ...modalViewStyles,
            backgroundColor: LIGHT_COLOR
        };
        textColor = DARK_COLOR;
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}>

            <View style={styles.centeredViewModal}>
                <View style={modalViewStyles}>
                    {/* header */}
                    <View style={styles.containerHeader}>
                        <View style={styles.containerTitleHeader}>
                            <Text style={{
                                ...styles.titleHeader,
                                color: (colorScheme === "dark") ? 'white' : 'black'
                            }}>RECURRENCIA</Text>
                        </View>
                        <TouchableOpacity style={{}} onPress={() => { props.closeControl(); }}>
                            <Ionicons style={styles.image} size={25} name="checkmark" color={textColor} />
                        </TouchableOpacity>
                    </View>
                    {/* Content */}
                    <Picker
                        selectedValue={value}
                        onValueChange={onChange}
                        itemStyle={{ color: textColor }}
                    >
                        {getRecurrencyTypes.map((i, index) => {
                            return <Picker.Item key={index} label={i[0]} value={i[1]} />;
                        })}
                    </Picker>
                </View>
            </View>

        </Modal>
    );
};

export default ModalPicker;

const styles = StyleSheet.create({
    container: {},
    centeredViewModal: {
        flex: 1,
        justifyContent: 'flex-end',
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
    },
    containerHeader: {
        flexDirection: 'row',
    },
    containerTitleHeader: {
        flex: 1,
        justifyContent: 'center',
    },
    titleHeader: {
        fontSize: 16,
        alignSelf: 'flex-start',
        marginRight: 35
    },
    image: {
        alignSelf: 'center',
    },
});
