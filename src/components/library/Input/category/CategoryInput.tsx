import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { customInputStyles } from '../Styles';
import ModalCategorySelector from './ModalCategorySelector';

interface CategoryInputProps {
    onChange: (...event: any[]) => void;
    value: any;
    errorField: JSX.Element;
}

const CategoryInput = (props: CategoryInputProps) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    return (
        <>
            <TouchableOpacity style={customInputStyles.container}
                onPress={() => {
                    setIsModalVisible(true);
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
            <ModalCategorySelector visible={isModalVisible} closeModal={() => {setIsModalVisible(false);}} />
        </>

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
