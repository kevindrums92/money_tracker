import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import NumberFormat from 'react-number-format';

interface OverviewProps { 
  balance:number, income:number, expenses:number
}

const Overview = (props: OverviewProps) => {
  const { balance, income, expenses } = props;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0089BA', 'rgba(0,0,0,0.5)']}
        style={styles.background}
      />
      <View style={styles.item}>
        <View>
          <Text style={styles.overviewValue}>
            <NumberFormat
              displayType='text'
              value={income}
              thousandSeparator={'.'} decimalSeparator={','} prefix={'$'}
              renderText={(value) => {
                return <Text>{value}</Text>
              }}
            />
          </Text>
        </View>
        <View>
          <Text style={styles.overviewLabel}>INGRESOS</Text>
        </View>
      </View>
      <View style={styles.item}>
        <View>
          <Text style={styles.overviewValue}>
            <NumberFormat
              displayType='text'
              value={expenses}
              thousandSeparator={'.'} decimalSeparator={','} prefix={'$'}
              renderText={(value) => {
                return <Text>{value}</Text>
              }}
            />
          </Text>
        </View>
        <View>
          <Text style={styles.overviewLabel}>GASTOS</Text>
        </View>
      </View>
      <View style={styles.item}>
        <View>
          <Text style={styles.overviewValue}>
            <NumberFormat
              displayType='text'
              value={balance}
              thousandSeparator={'.'} decimalSeparator={','} prefix={'$'}
              renderText={(value) => {
                return <Text>{value}</Text>
              }}
            />
          </Text>
        </View>
        <View>
          <Text style={styles.overviewLabel}>BALANCE</Text>
        </View>
      </View>
    </View>
  );
};

export default Overview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right
    backgroundColor: '#008F7A'

  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  item: {
    width: '33%', // is 33% of container width
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: Constants.statusBarHeight + 20,
    marginBottom: Constants.statusBarHeight
  },
  overviewValue: {
    fontSize: 18,
    color: 'white'
  },
  overviewLabel: {
    fontSize: 12,
    color: 'silver'
  },

});
