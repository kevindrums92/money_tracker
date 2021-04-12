import { StyleSheet } from 'react-native';

export const customInputStyles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        borderTopWidth: 0.5,
        borderTopColor: '#303030',
        borderBottomWidth: 0.5,
        borderBottomColor: '#303030',
    },
    inputContainer: {
        flexDirection: 'row'
    },
    imageContainer: {
        width: 30,
        height: 30,
        marginRight: 10,
        flexDirection: 'row',
    },
    image: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginLeft: 0,
    },
    textInput: {
        alignSelf: 'center',
        justifyContent: 'center',
    },
    textInputText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10
    }
});