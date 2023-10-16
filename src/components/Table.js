import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Table = ({ data }) => {
  return (
    <View style={styles.table}>
      {/* Header Row */}
      <View style={styles.row}>
        <Text style={styles.headerCell}>Column 1</Text>
        <Text style={styles.headerCell}>Column 2</Text>
        <Text style={styles.headerCell}>Column 3</Text>
        {/* Add more headers as needed */}
      </View>

      {/* Data Rows */}
      {data.map((row, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.cell}>{row.column1}</Text>
          <Text style={styles.cell}>{row.column2}</Text>
          <Text style={styles.cell}>{row.column3}</Text>
          {/* Add more cells as needed */}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: 'black',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  headerCell: {
    flex: 1,
    padding: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    padding: 8,
    textAlign: 'center',
  },
});

export default Table;
