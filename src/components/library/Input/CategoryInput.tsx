import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { customInputStyles } from './Styles';

interface CategoryInputProps {
    onChange: (...event: any[]) => void;
    value: any;
    errorField: JSX.Element;
}

const CategoryInput = (props: CategoryInputProps) => {
    return (
        <View style={customInputStyles.container}>
            <View style={customInputStyles.inputContainer}>
                <TouchableOpacity style={{ ...styles.imageContainer, backgroundColor: 'gray' }} onPress={() => { }}>
                    <MaterialCommunityIcons style={styles.image} name={'bag-personal'} size={20} color={"white"} />
                </TouchableOpacity>
                <TouchableOpacity style={customInputStyles.textInput} onPress={() => {

                }}>
                    <Text style={{ ...customInputStyles.textInputText, color: 'silver' }}>Category</Text>
                </TouchableOpacity>
            </View>
            {props.errorField}

        </View>
    );
};

export default CategoryInput;

const styles = StyleSheet.create({
    imageContainer: {
        width: 30,
        height: 30,
        borderRadius: 20,
        marginRight: 10,
        flexDirection: 'row',
    },
    image: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginLeft: 5,
    },
});
