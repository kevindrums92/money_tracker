import { MaterialIcons } from '@expo/vector-icons';
import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import { useState } from 'react';
import CustomDatePicker from '../CustomDatePicker';
import { customInputStyles } from './Styles';
import { toCamelCase } from '../../../utils/stringUtils';
import { formatDate } from '../../../utils/date';
import DateTimePicker from '@react-native-community/datetimepicker';


interface DateInputProps {
    onChange: (...event: any[]) => void;
    value: any;
    errorField: JSX.Element;
}

const DateInput = (props: DateInputProps) => {
    const [isPickerVisible, setIsPickerVisible] = useState(false);

    return (
        <TouchableOpacity style={customInputStyles.container}
            onPress={() => {
                setIsPickerVisible(true);
            }}>
            <View style={customInputStyles.inputContainer}>
                <View style={{ ...customInputStyles.imageContainer }}>
                    <MaterialIcons style={customInputStyles.image} name="date-range" size={35} color={"white"} />
                </View>
                <View style={customInputStyles.textInput}>
                    <Text style={customInputStyles.textInputText}>{toCamelCase(formatDate(props.value))}</Text>
                </View>
                {Platform.OS === 'ios' && <CustomDatePicker value={props.value} modalVisible={isPickerVisible}
                    closeControl={() => {
                        setIsPickerVisible(false);
                    }} onChange={props.onChange} />}
                {/* Content */}
                {isPickerVisible && Platform.OS === 'android' && <DateTimePicker
                    value={props.value}
                    mode="date"
                    textColor='red'
                    onChange={(event, selectedDate) => {
                        setIsPickerVisible(false);
                        if (selectedDate) {
                            props.onChange(selectedDate);
                        }
                    }}
                />}
            </View>
            {props.errorField}
        </TouchableOpacity>
    );
};

export default DateInput;

const styles = StyleSheet.create({

});


