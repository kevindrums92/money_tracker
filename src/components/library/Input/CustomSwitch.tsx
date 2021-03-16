import { MaterialIcons } from '@expo/vector-icons';
import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { customInputStyles } from './Styles';

interface CustomSwitchProps {
    onChange: (...event: any[]) => void;
    value: any;
    errorField: JSX.Element;
}

const CustomSwitch = (props: CustomSwitchProps) => {
    const { onChange, value, errorField } = props;
    return (
        <TouchableOpacity style={customInputStyles.container}
            onPress={() => {
                onChange(!value)
            }}>
            <View style={customInputStyles.inputContainer}>
                <View style={{ ...customInputStyles.imageContainer }}>
                    <MaterialIcons style={customInputStyles.image} name="alarm" size={30} color={"white"} />
                </View>
                <View style={customInputStyles.textInput}>
                    <Text style={customInputStyles.textInputText}>Notificar</Text>
                </View>
                <View
                    style={{
                        flex: 1
                    }}
                >
                    <Switch
                        style={{
                            alignSelf: 'flex-end',
                            marginEnd: 10
                        }}
                        onValueChange={onChange}
                        value={value}
                    />
                </View>
            </View>
            {errorField}
        </TouchableOpacity>
    );
};

export default CustomSwitch;

const styles = StyleSheet.create({
    container: {}
});
