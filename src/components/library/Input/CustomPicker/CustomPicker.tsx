import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { getRecurrencyTypes } from '../../../../utils/transactionUtils';
import { customInputStyles } from '../Styles';
import ModalPicker from './ModalPicker';
import { Picker } from "@react-native-community/picker";
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
        <TouchableOpacity style={{...customInputStyles.container, paddingVertical:10}}
            onPress={() => {
                setIsPickerVisible(true);
            }}>
           {Platform.OS === 'ios' && <View style={customInputStyles.inputContainer}>
                <View style={{ ...customInputStyles.imageContainer }}>
                    <MaterialIcons style={customInputStyles.image} name="repeat" size={35} color={"white"} />
                </View>
                <View style={customInputStyles.textInput}>
                    <Text style={textInputTextStyle}>{`${textValue}${getRecurrencyComplement()}`}</Text>
                </View>
                 
                <ModalPicker {...props} modalVisible={isPickerVisible} closeControl={() => {
                    setIsPickerVisible(false);
                }} options={getRecurrencyTypes}/>
                 
            </View>}
            {Platform.OS === 'android' && <View style={{flexDirection:'row'}}>
                <View style={{
                    width: 30,
                    height: 30,
                    marginRight: 10,
                }}>
                    <MaterialIcons style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        marginLeft: 0,
                    }} name="repeat" size={35} color={"white"} />
                </View>
                <Picker
                    style={{
                        color: 'white',
                        fontSize: 14,
                        flex:1,
                    }}
                    selectedValue={value}
                    onValueChange={props.onChange}
                    itemStyle={{ color: "white" }}
                >
                    {getRecurrencyTypes.map((i: any, index: any) => {
                        return <Picker.Item key={index} label={i[0]} value={i[1]} />;
                    })}
                </Picker>
            </View>}

        </TouchableOpacity>

    );
};

export default CustomPicker;

const styles = StyleSheet.create({
    container: {}
});
