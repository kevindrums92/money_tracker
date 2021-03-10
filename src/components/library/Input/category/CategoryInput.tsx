import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Category } from '../../../../types/category';
import { customInputStyles } from '../Styles';
import ModalCategorySelector from './ModalCategorySelector';

interface CategoryInputProps {
    onChange: (...event: any[]) => void;
    value?: Category;
    errorField: JSX.Element;
}

const CategoryInput = (props: CategoryInputProps) => {
    const {value, onChange} = props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    return (
        <>
            <TouchableOpacity style={customInputStyles.container}
                onPress={() => {
                    setIsModalVisible(true);
                }}>
                <View style={customInputStyles.inputContainer}>
                    <View style={{ ...styles.imageContainer, backgroundColor: value ? value.Color : "gray" }} >
                        <FontAwesome5 style={styles.image} name="archive" size={16} color={"white"} />
                    </View>
                    <View style={customInputStyles.textInput} >
                        <Text style={{ ...customInputStyles.textInputText, color: value ? 'white' : 'silver' }}>
                            {value ? value.Name : "Categoría"}
                        </Text>
                    </View>
                </View>
                {props.errorField}
            </TouchableOpacity>
            <ModalCategorySelector
                visible={isModalVisible}
                closeModal={() => { setIsModalVisible(false); }} 
                onChange={(cat)=>{
                    onChange(cat);
                    setIsModalVisible(false);
                }}/>
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
        justifyContent: 'center'

    },
    image: {
        alignSelf: 'center',
    },
});
