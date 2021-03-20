import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { getRecurrencyTypes } from '../../../../utils/transactionUtils';
import { customInputStyles } from '../Styles';
import ModalPicker from './ModalPicker';

interface CustomPickerProps {
    onChange: (...event: any[]) => void;
    value: any;
    errorField: JSX.Element;
    selectedDate: Date
}

const CustomPicker = (props: CustomPickerProps) => {
    const { value, selectedDate } = props;
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const selectedValue = getRecurrencyTypes.find(i => i[1] === value);

    const getRecurrencyComplement = () => {
        const momentDate = moment(selectedDate);
        if (!selectedValue) return "";
        switch (selectedValue[1]) {
            case "everyWeek":
            case "every2Weeks":
            case "every3Weeks":
                return `, ${momentDate.format("dddd")}`;
            case "everyMonth":
            case "every2Months":
            case "every3Months":
            case "every4Months":
            case "every6Months":
                return `, día ${momentDate.format("D")}`;
            case "everyYear":
                return `, ${momentDate.format("MMM-D")}`;

            default:
                return "";
        }
    }

    let textInputTextStyle = customInputStyles.textInputText;
    let textValue = selectedValue && selectedValue[0];
    if (selectedValue && selectedValue[1] === "none") {
        textInputTextStyle = {
            ...textInputTextStyle,
            color: 'silver'
        };
        textValue = "Hacer recurrencia"
    }

    return (
        <TouchableOpacity style={customInputStyles.container}
            onPress={() => {
                setIsPickerVisible(true);
            }}>
            <View style={customInputStyles.inputContainer}>
                <View style={{ ...customInputStyles.imageContainer }}>
                    <MaterialIcons style={customInputStyles.image} name="repeat" size={35} color={"white"} />
                </View>
                <View style={customInputStyles.textInput}>
                    <Text style={textInputTextStyle}>{`${textValue}${getRecurrencyComplement()}`}</Text>
                </View>
                <ModalPicker {...props} modalVisible={isPickerVisible} closeControl={() => {
                    setIsPickerVisible(false);
                }} options={getRecurrencyTypes}/>
            </View>
        </TouchableOpacity>

    );
};

export default CustomPicker;

const styles = StyleSheet.create({
    container: {}
});
