import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, StyleSheet } from 'react-native';

interface DateSelectorProps { }

const DateSelector = (props: DateSelectorProps) => {
    return (
        <View
            style={styles.container}>
            <TouchableOpacity style={{ ...styles.item, ...styles.itemArrow }}
                onPress={() => alert('Hello, world!')}>
                <Text>
                    <MaterialIcons name="arrow-back-ios" size={24} color="white" />
                </Text>
            </TouchableOpacity>
            <View style={{ ...styles.item, ...styles.itemContent }}>
                <View>
                    <Text style={styles.date}>March 2021</Text>
                </View>
                <View>
                    <Text style={styles.transactions}>4 TRANSACTIONS</Text>
                </View>
            </View>
            <TouchableOpacity style={{ ...styles.item, ...styles.itemArrow }}
                onPress={() => alert('Hello, world!')}>
                <Text>
                    <MaterialIcons name="arrow-forward-ios" size={24} color="white" />
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default DateSelector;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: '#252525',
        margin: 10,
        borderRadius: 50
    },
    item: {
        alignItems: 'center',
    },
    itemArrow: {
        width: '20%',
    },
    itemContent: {
        width: '60%',
    },
    date: {
        fontSize: 18,
        color: 'white'
    },
    transactions: {
        fontSize: 12,
        color: 'silver'
    },
});
