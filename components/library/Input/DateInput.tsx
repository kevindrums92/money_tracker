import { MaterialIcons } from '@expo/vector-icons';
import * as React from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, Text, Button } from 'react-native';
import { useState } from 'react';
import CustomDatePicker from '../CustomDatePicker';
import { formatDate } from '../../../utils/date';
import { toCamelCase } from '../../../utils/stringUtils';
import { customInputStyles } from './Styles';

interface DateInputProps {
    onChange: (...event: any[]) => void;
    value: any;
    errorField: JSX.Element;
}

const DateInput = (props: DateInputProps) => {

    const [isPickerVisible, setIsPickerVisible] = useState(false);

    return (
        <View style={customInputStyles.container}>
            <View style={customInputStyles.inputContainer}>
                <TouchableOpacity style={{ ...customInputStyles.imageContainer }} onPress={() => { }}>
                    <MaterialIcons style={customInputStyles.image} name="date-range" size={35} color={"white"} />
                </TouchableOpacity>
                <TouchableOpacity style={customInputStyles.textInput} onPress={() => {
                    setIsPickerVisible(true);
                }}>
                    <Text style={customInputStyles.textInputText}>{toCamelCase(formatDate(props.value))}</Text>
                </TouchableOpacity>
                <CustomDatePicker value={props.value} modalVisible={isPickerVisible}
                    closeControl={() => {
                        setIsPickerVisible(false);
                    }} onChange={props.onChange}/>
            </View>
            {props.errorField}
        </View>
    );
};

export default DateInput;

const styles = StyleSheet.create({
    
});


