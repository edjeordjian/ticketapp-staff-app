import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';


export default function LineChartEntries({chartData, fillShadowGradient}) {
  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#fff',
    backgroundGradientToOpacity: 0.5,

    fillShadowGradient,
    fillShadowGradientOpacity: 0,
    color: (opacity = 1) => `#023047`,
    labelColor: (opacity = 1) => `#333`,
    strokeWidth: 2,

    useShadowColorFromDataset: false,
    decimalPlaces: 0,
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={chartData}
        width={380}
        height={220}
        chartConfig={chartConfig}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  }
});
