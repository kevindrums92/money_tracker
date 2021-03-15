
import * as React from 'react';
import { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DateSelector from '../components/DateSelector';

import Overview from '../components/Overview';
import { View } from '../components/Themed';
import TransactionList from '../components/TransactionList';
import { RootState } from '../store';
import { getTransactions, TransactionSlice } from '../store/transactions';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { itemUpdated,
    data,
    loading,
    count,
    filters,
    balance,
    income,
    expenses
  } = useSelector<RootState, TransactionSlice>((state) => state.transactions);

  useEffect(() => {
    dispatch(getTransactions());
  }, []);

  useEffect(() => {
    if (itemUpdated)
      dispatch(getTransactions());
  }, [itemUpdated]);
  return (
    <View
      style={styles.container}>
      <ScrollView style={styles.scrollView} alwaysBounceVertical={false} keyboardShouldPersistTaps={'never'}
      >
        <View style={styles.overview} >
          <Overview balance={balance} income={income} expenses={expenses}/>
        </View>
        <DateSelector count={count} filters={filters} />
        <TransactionList data={data} loading={loading} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollView: {
    marginHorizontal: 0,
    height: '100%',
    backgroundColor: '#151515'
  },
  overview: {
    backgroundColor: 'transparent',
  },

});
