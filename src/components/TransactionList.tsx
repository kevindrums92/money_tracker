import { FontAwesome5 } from '@expo/vector-icons';
import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Transaction } from '../../src/types/transaction';
import NumberFormat from 'react-number-format';
import { groupArrayOfObjects } from '../../src/utils/groupArrayOfObjects';
import { formatDate } from '../../src/utils/date';
import { useDispatch } from 'react-redux';
import { getTransactionListExpenses, getTransactionListIncome } from '../utils/transactionUtils';
import CustomButton from './library/CustomButton';
import { toCamelCase } from '../utils/stringUtils';
import { addTransactionScheduledNow } from '../store/transactions';


interface TransactionListProps {
    data: Transaction[],
    loading: boolean,
}

const renderTransactionItem = (item: Transaction) => {
    return <>
        <TouchableOpacity style={{ ...styles.imageContainer, backgroundColor: item.Category.Color }} onPress={() => { }}>
            <FontAwesome5 style={styles.image} name={item.Category.Icon} size={16} color={"white"} />
        </TouchableOpacity>
        <View style={styles.content}>
            <View>
                <Text style={styles.name}>{(item.Note ? item.Note : item.Category.Name)}</Text>
            </View>
        </View>
        <NumberFormat
            displayType='text'
            value={item.Amount}
            thousandSeparator={'.'} decimalSeparator={','} prefix={'$'}
            renderText={(value) => {
                let stylestoApply = styles.amount;
                if (item.Category.Type === 'income') {
                    stylestoApply = {
                        ...stylestoApply,
                        ...styles.colorIncome
                    };
                }
                return <Text style={stylestoApply}>{value}</Text>
            }}
        />
    </>;
}

const renderTransactionItemScheduled = (item: Transaction, loading: boolean) => {
    const dispatch = useDispatch();

    const opacityColor = 'dimgray';
    return <>
        <TouchableOpacity style={{
            ...styles.imageContainer,
            backgroundColor: item.Category.Color,
            opacity: 0.6
        }} onPress={() => { }}>
            <FontAwesome5 style={{
                ...styles.image,
                opacity: 0.6
            }} name={item.Category.Icon} size={16} color={opacityColor} />
        </TouchableOpacity>
        <View style={styles.content}>
            <View style={{
                flexDirection: 'row',
            }}>
                <FontAwesome5 style={styles.image} name="calendar-alt" size={14} color={opacityColor} />
                <View style={{
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        color: 'silver',
                        fontWeight: 'bold',
                        marginLeft: 3,
                        marginRight: 5
                    }}>AGENDADO</Text>
                </View>
                <NumberFormat
                    displayType='text'
                    value={item.Amount}
                    thousandSeparator={'.'} decimalSeparator={','} prefix={'$'}
                    renderText={(value) => {
                        return <Text style={{
                            ...styles.amount,
                            fontSize: 16,
                            color: opacityColor
                        }}>{value}</Text>
                    }}
                />
            </View>

            <View>
                <Text style={{
                    ...styles.name,
                    color: opacityColor,
                }}>{toCamelCase(item.Category.Name)}</Text>
                <Text style={{
                    ...styles.name,
                    color: opacityColor
                }}>{(item.Note ? item.Note : item.Category.Name)}</Text>
            </View>
        </View>
        {!loading && (<CustomButton style={{
            marginEnd: 10
        }} onPress={() => {
            dispatch(addTransactionScheduledNow(item));
        }} title="Añadir ya" type="flat" fontSize={12} color={'silver'} icon="plus" loading={loading} />)}
    </>;
}

const renderSection = (transactions: Transaction[], dateText: string, balance: number, key: number, loading: boolean) => {
    return (
        <React.Fragment key={key}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{dateText}</Text>
                <NumberFormat
                    displayType='text'
                    value={balance}
                    thousandSeparator={'.'} decimalSeparator={','} prefix={'$'}
                    renderText={(value) => <Text style={styles.amountHeader}>{`${balance > 0 ? "+" : ""}${value}`}</Text>}
                />
            </View>
            <View style={styles.transactionContainer}>
                {transactions.map((item: Transaction, key: number) => {
                    return (
                        <View style={styles.container} key={key}>
                            {!item.Scheduled && renderTransactionItem(item)}
                            {item.Scheduled && renderTransactionItemScheduled(item, loading)}
                        </View>
                    );
                })}
            </View>
        </React.Fragment>
    );
}

const TransactionList = (props: TransactionListProps) => {
    const { data, loading } = props;
    const groups = groupArrayOfObjects(data, "Date");
    const groupArrays = Object.keys(groups).map((key) => {
        const transactions = groups[key];
        const income = getTransactionListIncome(transactions);
        const expenses = getTransactionListExpenses(transactions);
        const balance = income - expenses;

        const date = formatDate(new Date(key));

        return {
            date,
            transactions,
            balance
        };
    });
    return <>
        {groupArrays.map((item, index) => {
            return renderSection(item.transactions, item.date, item.balance, index, loading);
        })}
    </>;
};

export default TransactionList;

const styles = StyleSheet.create({
    transactionContainer: {
        backgroundColor: '#252525'
    },
    container: {
        paddingVertical: 7,
        flexDirection: 'row',
        alignItems: 'center',
    },
    content: {
        marginLeft: 16,
        flex: 1,
    },
    imageContainer: {
        width: 30,
        height: 30,
        borderRadius: 20,
        marginLeft: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        opacity: 1
    },
    image: {
        justifyContent: 'center',
        alignSelf: 'center',
        opacity: 1
    },
    amount: {
        alignSelf: 'flex-end',
        color: 'white',
        paddingVertical: 7,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        fontSize: 18,
    },
    name: {
        fontSize: 16,
        color: 'white',
    },
    sectionHeader: {
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 5,
        backgroundColor: '#252525',
        marginTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#3f4040',
        flexDirection: 'row',
    },
    sectionHeaderText: {
        color: 'silver',
        fontSize: 14,
        fontWeight: 'bold',
        flex: 1,
    },
    amountHeader: {
        alignSelf: 'flex-end',
        color: 'silver',
        fontSize: 14,
    },
    colorIncome: {
        color: 'yellowgreen'
    }
});