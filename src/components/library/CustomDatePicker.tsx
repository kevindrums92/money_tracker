import * as React from 'react';
import { Text, View, StyleSheet, Modal, TouchableOpacity, useColorScheme, ColorSchemeName } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import DismissKeyboard from './DismissKeyboard';
import { Ionicons } from '@expo/vector-icons';

const DARK_COLOR = "#232325";
const LIGHT_COLOR = "white";

interface CustomDatePickerProps {
    value: Date;
    modalVisible: boolean;
    closeControl: () => void;
    onChange: (...event: any[]) => void;
}

const CustomDatePicker = (props: CustomDatePickerProps) => {
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

    const onChange = (event: Event, date?: Date) => {
        props.onChange(date);
      };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}>
            <DismissKeyboard dismissAction={() => { props.closeControl(); }}>
                <View style={styles.centeredViewModal}>
                    <View style={modalViewStyles}>
                        {/* header */}
                        <View style={styles.containerHeader}>
                            <View style={styles.containerTitleHeader}>
                                <Text style={{
                                    ...styles.titleHeader,
                                    color: (colorScheme === "dark") ? 'white' : 'black'
                                }}>TRANSACTION DATE</Text>
                            </View>
                            <TouchableOpacity style={{}} onPress={() => { props.closeControl(); }}>
                                <Ionicons style={styles.image} size={25} name="checkmark" color={textColor} />
                            </TouchableOpacity>
                        </View>
                        {/* Content */}
                        <DateTimePicker
                            value={props.value}
                            mode="date"
                            display="inline"
                            textColor='red'
                            style={styles.datePicker}
                            onChange={onChange}
                        />
                    </View>
                </View>
            </DismissKeyboard>
        </Modal>
    );
};

export default CustomDatePicker;

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
    datePicker: {
        //height:"90%"
    }
});
