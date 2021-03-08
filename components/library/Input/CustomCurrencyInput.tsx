import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, StyleProp, TextStyle } from 'react-native';
import CurrencyInput from 'react-native-currency-input';

interface CustomCurrencyInputProps {
    onChange: (...event: any[]) => void;
    value: any;
}

const CustomCurrencyInput = (props: CustomCurrencyInputProps) => {
    const { onChange, value } = props;

    const [isFocused, setIsFocused] = useState(false);

    let inputStyles:StyleProp<TextStyle> = styles.currencyInput;
    if(isFocused){
        inputStyles = {
            ...inputStyles,
            backgroundColor: '#383737',
        }
    }
    
    return (
        <CurrencyInput
            style={inputStyles}
            value={value}
            onChangeValue={onChange}
            unit="$"
            placeholder="$0"
            placeholderTextColor="white"
            delimiter="."
            precision={0}
            onBlur={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
        />
    );
};

export default CustomCurrencyInput;

const styles = StyleSheet.create({
    currencyInput: {
        color: 'white',
        fontSize: 35,
        textAlign: 'center',
        marginVertical: 10,
        marginHorizontal: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 50,
        backgroundColor:'#232325'
    }
});
