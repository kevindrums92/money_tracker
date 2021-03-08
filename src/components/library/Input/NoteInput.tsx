import { MaterialIcons } from '@expo/vector-icons';
import * as React from 'react';
import { RefObject, useRef } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { customInputStyles } from './Styles';

interface NoteInputProps {
    onChange: (...event: any[]) => void;
    value: any;
    errorField: JSX.Element;
}



const NoteInput = (props: NoteInputProps) => {
    let _textInput: any = React.createRef();

    return (
        <TouchableOpacity style={customInputStyles.container}
            onPress={() => {
                _textInput.focus();
            }}>
            <View style={customInputStyles.inputContainer}>
                <View style={{ ...customInputStyles.imageContainer }}>
                    <MaterialIcons style={customInputStyles.image} name="sticky-note-2" size={35} color={"white"} />
                </View>
                <TextInput
                    ref={(ref) => {
                        _textInput = ref;
                    }}
                    style={customInputStyles.textInputText}
                    onChangeText={props.onChange}
                    value={props.value}
                    placeholder={"Note"}
                    placeholderTextColor={"silver"}

                />
            </View>
            {props.errorField}
        </TouchableOpacity>

    );
};

export default NoteInput;

const styles = StyleSheet.create({

});
