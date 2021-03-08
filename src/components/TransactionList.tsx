import { MaterialIcons } from '@expo/vector-icons';
import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { dummyData, Transaction } from '../../src/types/transaction';
import NumberFormat from 'react-number-format';
import { groupArrayOfObjects } from '../../src/utils/groupArrayOfObjects';
import { formatDate } from '../../src/utils/date';


interface TransactionListProps { }

const renderSection = (transactions: Transaction[], dateText: string, balance: number, key: number) => {
    return (
        <React.Fragment key={key}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{dateText}</Text>
                <NumberFormat
                    displayType='text'
                    value={balance}
                    thousandSeparator={'.'} decimalSeparator={','} prefix={'$'}
                    renderText={(value) => <Text style={styles.amountHeader}>{`${balance> 0 ? "+": ""}${value}`}</Text>}
                />
            </View>
            <View style={styles.transactionContainer}>
                {transactions.map((item: Transaction, key: number) => {
                    return (
                        <View style={styles.container} key={key}>
                            <TouchableOpacity style={{ ...styles.imageContainer, backgroundColor: item.Category.Color }} onPress={() => { }}>
                                <MaterialIcons style={styles.image} name={item.Category.Icon} size={20} color={"white"} />
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
                        </View>
                    );
                })}
            </View>
        </React.Fragment>
    );
}

const TransactionList = (props: TransactionListProps) => {
    dummyData.sort((a: Transaction, b: Transaction) => b.Date.getTime() - a.Date.getTime());
    const groups = groupArrayOfObjects(dummyData, "Date");
    const groupArrays = Object.keys(groups).map((key) => {
        const transactions = groups[key];
        const income = transactions.filter((i: Transaction) => i.Category.Type === 'income')
            .reduce((sum: number, current: Transaction) => sum + current.Amount, 0);
        const expenses = transactions.filter((i: Transaction) => i.Category.Type === 'expenses')
            .reduce((sum: number, current: Transaction) => sum + current.Amount, 0);
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
            return renderSection(item.transactions, item.date, item.balance, index);
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
    },
    image: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginLeft: 5,
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
        flex:1,
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