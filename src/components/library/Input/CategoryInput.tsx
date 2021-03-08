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
        <TouchableOpacity style={customInputStyles.container}
            onPress={() => {

            }}>
            <View style={customInputStyles.inputContainer}>
                <View style={{ ...styles.imageContainer, backgroundColor: 'gray' }} >
                    <MaterialCommunityIcons style={styles.image} name={'bag-personal'} size={20} color={"white"} />
                </View>
                <View style={customInputStyles.textInput} >
                    <Text style={{ ...customInputStyles.textInputText, color: 'silver' }}>Category</Text>
                </View>
            </View>
            {props.errorField}

        </TouchableOpacity>
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
