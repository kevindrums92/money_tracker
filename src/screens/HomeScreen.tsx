
import * as React from 'react';
import { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import DateSelector from '../components/DateSelector';

import Overview from '../components/Overview';
import { View } from '../components/Themed';
import TransactionList from '../components/TransactionList';
import { getTransactions } from '../store/transactions';

export default function HomeScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactions());
  }, []);
  return (
    <View
      style={styles.container}>
      <ScrollView style={styles.scrollView} alwaysBounceVertical={false} keyboardShouldPersistTaps={'never'}>
        <View style={styles.overview} >
          <Overview />
        </View>
        <DateSelector />
        <TransactionList />
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
