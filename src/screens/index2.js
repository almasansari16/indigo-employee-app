import { Text, View } from "react-native";
import { Table } from ".";

export const MyComponent = () => {
    const data = [
      { column1: 'Row 1 Data 1', column2: 'Row 1 Data 2', column3: 'Row 1 Data 3' },
      { column1: 'Row 2 Data 1', column2: 'Row 2 Data 2', column3: 'Row 2 Data 3' },
      // Add more data rows as needed
    ];
  
    return (
      <View>
        <Text>Table Example</Text>
        <Table data={data} />
      </View>
    );
  };