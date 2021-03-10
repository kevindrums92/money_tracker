import * as React from 'react';
import { View, StyleSheet } from 'react-native';

const SeparatorLine = () => {
    return (
        <View style={styles.container}>
        </View>
    );
};

export default SeparatorLine;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'silver',
        height: 1,
        marginTop: 10
    }
});
