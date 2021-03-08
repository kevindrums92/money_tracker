import { MaterialIcons } from '@expo/vector-icons';
import * as React from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { customInputStyles } from './Styles';

interface NoteInputProps {
    onChange: (...event: any[]) => void;
    value: any;
    errorField: JSX.Element;
}

const NoteInput = (props: NoteInputProps) => {
    return (
        <View style={customInputStyles.container}>
            <View style={customInputStyles.inputContainer}>
                <TouchableOpacity style={{ ...customInputStyles.imageContainer }} onPress={() => { }}>
                    <MaterialIcons style={customInputStyles.image} name={'event-note'} size={35} color={"white"} />
                </TouchableOpacity>
                <TextInput
                    style={customInputStyles.textInputText}
                    onChangeText={props.onChange}
                    value={props.value}
                    placeholder={"Note"}
                    placeholderTextColor={"silver"}
                />
            </View>
            {props.errorField}
        </View>

    );
};

export default NoteInput;

const styles = StyleSheet.create({
  
});
