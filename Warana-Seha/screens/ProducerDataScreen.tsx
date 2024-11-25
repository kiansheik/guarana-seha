import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const ProducerDataScreen = () => {
  // Fake data for demonstration
  const initialData = {
    labels: ['2019', '2020', '2021', '2022', '2023'],
    datasets: [
      {
        id: 'avg',
        data: [
          Math.random() * (600 - 500) + 500, 
          Math.random() * (650 - 550) + 550, 
          Math.random() * (700 - 600) + 600, 
          Math.random() * (750 - 650) + 650, 
          Math.random() * (800 - 700) + 700
        ].map(Math.round),
        color: (opacity = 1) => `rgba(34, 128, 186, ${opacity})`, // Blue Line
        strokeWidth: 2,
        legend: 'Média',
      },
      {
        id: 'min',
        data: [
          Math.random() * (400 - 300) + 300, 
          Math.random() * (450 - 350) + 350, 
          Math.random() * (500 - 400) + 400, 
          Math.random() * (550 - 450) + 450, 
          Math.random() * (600 - 500) + 500
        ].map(Math.round),
        color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`, // Green Line
        strokeWidth: 2,
        legend: 'Mínimo',
      },
      {
        id: 'max',
        data: [
          Math.random() * (900 - 800) + 800, 
          Math.random() * (950 - 850) + 850, 
          Math.random() * (1000 - 900) + 900, 
          Math.random() * (1050 - 950) + 950, 
          Math.random() * (1100 - 1000) + 1000
        ].map(Math.round),
        color: (opacity = 1) => `rgba(255, 87, 34, ${opacity})`, // Orange Line
        strokeWidth: 2,
        legend: 'Máximo',
      },
      {
        id: 'sum',
        data: [
          Math.random() * (6000 - 5000) + 5000, 
          Math.random() * (6500 - 5500) + 5500, 
          Math.random() * (7000 - 6000) + 6000, 
          Math.random() * (7500 - 6500) + 6500, 
          Math.random() * (8000 - 7000) + 7000
        ].map(Math.round),
        color: (opacity = 1) => `rgba(233, 30, 99, ${opacity})`, // Pink Line
        strokeWidth: 2,
        legend: 'Total',
      },
    ],
  };

  

  const [visibleLines, setVisibleLines] = useState(['avg', 'min', 'max', 'sum']);

  const toggleLine = (id) => {
    setVisibleLines((prev) =>
      prev.includes(id) ? prev.filter((line) => line !== id) : [...prev, id]
    );
  };

  // Filter datasets to display only active lines
  const filteredDatasets = initialData.datasets.filter((dataset) =>
    visibleLines.includes(dataset.id)
  );

  const sanitizedDatasets = filteredDatasets.length > 0
  ? filteredDatasets.map((dataset) => ({
      data: dataset.data.map((value) =>
        typeof value === 'number' && isFinite(value) ? value : 0 // Replace invalid values with 0
      ),
      color: dataset.color,
      strokeWidth: dataset.strokeWidth,
    }))
  : [{ data: [], color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, strokeWidth: 1 }];

  const totalFarmers = initialData.datasets.length;
  const totalYears = initialData.labels.length;
  const totalKg = initialData.datasets[3].data.reduce((total, kg) => total + kg, 0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Waraná Data</Text>
      <Text style={styles.description}>
        Dados agregados de {totalFarmers} produtores em {totalYears} anos.
      </Text>

      {sanitizedDatasets.length > 0 ? (
        <LineChart
  data={{
    labels: sanitizedDatasets.length > 0 ? initialData.labels: [],
    datasets: sanitizedDatasets.length > 0 ? sanitizedDatasets: [{ data: [] }],
  }}
  width={Dimensions.get('window').width - 30}
  height={300}
  chartConfig={{
    backgroundColor: '#1cc910',
    backgroundGradientFrom: '#eff3ff',
    backgroundGradientTo: '#efefef',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  }}
  bezier
  style={styles.chart}
/>) :       (<View style={styles.emptyChartContainer}>
        <Text style={styles.emptyChartText}>Escolha uma opcão</Text>
      </View>)}



      <View style={styles.buttonContainer}>
        {initialData.datasets.map((dataset) => (
          <TouchableOpacity
            key={dataset.id}
            style={[
              styles.toggleButton,
              visibleLines.includes(dataset.id) && styles.activeButton,
            ]}
            onPress={() => toggleLine(dataset.id)}
          >
            <Text
              style={[
                styles.toggleButtonText,
                visibleLines.includes(dataset.id) && styles.activeButtonText,
              ]}
            >
              {dataset.legend}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.statisticsContainer}>
        <Text style={styles.statisticsText}>
          Número total de produtores: {totalFarmers}
        </Text>
        <Text style={styles.statisticsText}>
          Anos de dados coletados: {totalYears}
        </Text>
        <Text style={styles.statisticsText}>
          Total produzido (kg): {totalKg}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    color: '#666',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 16,
  },
  toggleButton: {
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  activeButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  toggleButtonText: {
    fontSize: 14,
    color: '#555',
  },
  activeButtonText: {
    color: '#fff',
  },
  statisticsContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  statisticsText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyChartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 220,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
  },
  emptyChartText: {
    color: '#999',
    fontSize: 16,
  },
});

export default ProducerDataScreen;
