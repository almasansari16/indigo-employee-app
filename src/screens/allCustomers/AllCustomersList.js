import React from 'react';
import {View, StyleSheet, SafeAreaView , ScrollView} from 'react-native';
import {DataTable} from 'react-native-paper';
import { AppStyles } from '../../theme/AppStyles';

export default function AllCustomersList() {
  return (
    <SafeAreaView style={[AppStyles.container]}>

        <DataTable>
          <DataTable.Header>
            <DataTable.Title textStyle={{color:'#EEEEEE'}}>Name</DataTable.Title>
            <DataTable.Title textStyle={{color:'#EEEEEE'}}>Email</DataTable.Title>
            <DataTable.Title textStyle={{color:'#EEEEEE'}}>Email</DataTable.Title>
            <DataTable.Title textStyle={{color:'#EEEEEE'}}>Email</DataTable.Title>
            <DataTable.Title textStyle={{color:'#EEEEEE'}}>Email</DataTable.Title>
            <DataTable.Title textStyle={{color:'#EEEEEE'}} numeric>Age</DataTable.Title>
          </DataTable.Header>

          <DataTable.Row style={{rowGap:20}}>
            <DataTable.Cell textStyle={{color:'#EEEEEE'}}>John</DataTable.Cell>
            <DataTable.Cell textStyle={{color:'#EEEEEE'}}>John</DataTable.Cell>
            <DataTable.Cell textStyle={{color:'#EEEEEE'}}>John</DataTable.Cell>
            <DataTable.Cell textStyle={{color:'#EEEEEE'}}>john@kindacode.com</DataTable.Cell>
            <DataTable.Cell textStyle={{color:'#EEEEEE'}}>john@kindacode.com</DataTable.Cell>
            <DataTable.Cell textStyle={{color:'#EEEEEE'}} numeric>33</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell textStyle={{color:'#EEEEEE'}}>Bob</DataTable.Cell>
            <DataTable.Cell textStyle={{color:'#EEEEEE'}}>test@test.com</DataTable.Cell>
            <DataTable.Cell textStyle={{color:'#EEEEEE'}} numeric>105</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell textStyle={{color:'#EEEEEE'}}>Mei</DataTable.Cell>
            <DataTable.Cell textStyle={{color:'#EEEEEE'}}>mei@kindacode.com</DataTable.Cell>
            <DataTable.Cell textStyle={{color:'#EEEEEE'}} numeric>23</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
       
        <DataTable.Pagination
          page={1}
          numberOfPages={3}
          onPageChange={(page) => { console.log(page); }}
          label="1-2 of 6"
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 30,
  },
});
