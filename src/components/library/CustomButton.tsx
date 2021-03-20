import { FontAwesome5 } from '@expo/vector-icons';
import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
type CustomButtonType = "flat" | "default";
interface CustomButtonProps {
    onPress: () => void,
    title: string,
    style?: StyleProp<ViewStyle>,
    type?: CustomButtonType,
    fontSize?: number,
    color?: string,
    icon?: any,
    loading?: boolean
}

const CustomButton = (props: CustomButtonProps) => {
    const type: CustomButtonType = props.type || "default";
    const fontSize = props.fontSize || 18;
    const color = props.color || "white";
    let appButtonTextStyle = { ...styles.appButtonText, fontSize, color };
    const { icon, loading } = props;
    switch (type) {
        case "flat":
            return (
                <View style={props.style}>
                    <TouchableOpacity disabled={loading} onPress={props.onPress} style={styles.appButtonContainerFlat}>
                        {icon && <FontAwesome5 style={styles.image} name={icon} size={14} color={color} />}
                        <Text style={appButtonTextStyle}>{props.title}</Text>
                    </TouchableOpacity>
                </View>)
            break;

        default:
            return (
                <View style={props.style}>
                    <TouchableOpacity disabled={loading} onPress={props.onPress} style={styles.appButtonContainer}>
                        <Text style={appButtonTextStyle}>{props.title}</Text>
                    </TouchableOpacity>
                </View>)
    }
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
        textTransform: "uppercase",
    },
    appButtonContainerFlat: {
        flexDirection: 'row',
        elevation: 10,
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: 'silver',
        marginTop:5,
        justifyContent:'center'
    },
    image: {
        justifyContent: 'center',
        alignSelf: 'center',
        opacity: 1,
        marginRight: 3,
    },
});
