
import * as React from 'react';
import { ScrollView, SectionList, Text, Image, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import DateSelector from '../components/DateSelector';

import Overview from '../components/Overview';
import { View } from '../components/Themed';
import TransactionList from '../components/TransactionList';

export default function HomeScreen() {
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
