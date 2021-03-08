import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';

interface CustomButtonProps {
    onPress: () => void,
    title: string,
    style?: StyleProp<ViewStyle>,
}

const CustomButton = (props: CustomButtonProps) => {
    return (
        <View style={props.style}>
            <TouchableOpacity onPress={props.onPress} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    container: {},

    appButtonContainer: {
        elevation: 10,
        backgroundColor: "deepskyblue",
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 12
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});
