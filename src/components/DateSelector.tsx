import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { changePeriod, TransactionFiltersSlice } from '../store/transactions';

interface DateSelectorProps {
    count: number,
    filters: TransactionFiltersSlice
}

const getDateText = (filters: TransactionFiltersSlice) => {
    switch (filters.filterPeriod) {
        case "monthly":
            if (filters.startDay === 1) {
                return moment(filters.startDate).format("MMMM YYYY");
            }
            return `${moment(filters.startDate).format("DD MMM")} - ${moment(filters.endDate).format("DD MMM")}`

        case "weekly":
            return `${moment(filters.startDate).format("DD MMM")} - ${moment(filters.endDate).format("DD MMM")}`

        case "yearly":
            if (filters.startDay !== 1) {
                return `${moment(filters.startDate).format("DD MMM YYYY")} - ${moment(filters.endDate).format("DD MMM YYYY")}`
            }
            return `${moment(filters.startDate).format("YYYY")}`
        default:
            break;
    }

};

const DateSelector = (props: DateSelectorProps) => {
    const { count, filters } = props;
    const dispatch = useDispatch();
    return (
        <View
            style={styles.container}>
            <TouchableOpacity style={{ ...styles.item, ...styles.itemArrow }}
                onPress={() => dispatch(changePeriod(false))}>
                <Text>
                    <MaterialIcons name="arrow-back-ios" size={24} color="white" />
                </Text>
            </TouchableOpacity>
            <View style={{ ...styles.item, ...styles.itemContent }}>
                <View>
                    <Text style={styles.date}>{getDateText(filters)}</Text>
                </View>
                <View>
                    <Text style={styles.transactions}>{count} TRANSACCIONES</Text>
                </View>
            </View>
            <TouchableOpacity style={{ ...styles.item, ...styles.itemArrow }}
                onPress={() => dispatch(changePeriod(true))}>
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
        fontSize: 16,
        color: 'white'
    },
    transactions: {
        fontSize: 12,
        color: 'silver'
    },
});
