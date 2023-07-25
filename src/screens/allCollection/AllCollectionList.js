import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {DataTable} from 'react-native-paper';
import {AppStyles} from '../../theme/AppStyles';
import Images from '../../theme/Images';
import {hp, wp} from '../../../App';

export default function AllCollectionList() {
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([3,4,5]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
  );

  const [items , setItems] = React.useState([
    {
      key: 1,
      name: 'john',
      email: 'john@kindacode.com',
      address: 'karachi pakistan',
      billingAddress:'Business Avenue suite 102',
      contact:1234567,
    },
    {
      key: 2,
      name: 'john',
      email: 'john@kindacode.com',
      address: 'karachi pakistan',
      billingAddress:'Business Avenue suite 102',
      contact:1234567,
    },
    {
      key: 3,
      name: 'john',
      email: 'john@kindacode.com',
      address: 'karachi pakistan',
      billingAddress:'Business Avenue suite 102',
      contact:1234567,
    },
    {
      key: 4,
      name: 'john',
      email: 'john@kindacode.com',
      address: 'karachi pakistan',
      billingAddress:'Business Avenue suite 102',
      contact:1234567,
    },
    {
      key: 5,
      name: 'john',
      email: 'john@kindacode.com',
      address: 'karachi pakistan',
      billingAddress:'Business Avenue suite 102',
      contact:1234567,
    },    {
      key: 6,
      name: 'john',
      email: 'john@kindacode.com',
      address: 'karachi pakistan',
      billingAddress:'Business Avenue suite 102',
      contact:1234567,
    },    {
      key: 7,
      name: 'john',
      email: 'john@kindacode.com',
      address: 'karachi pakistan',
      billingAddress:'Business Avenue suite 102',
      contact:1234567,
    },
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <SafeAreaView style={[AppStyles.container]}>
      <ImageBackground
        source={Images.purple_background}
        style={{width: wp(100), height: hp(100)}}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title textStyle={{color: '#EEEEEE'}}>
              Name
            </DataTable.Title>
            <DataTable.Title textStyle={{color: '#EEEEEE'}}>
              Email
            </DataTable.Title>
            <DataTable.Title textStyle={{color: '#EEEEEE'}}>
              Address
            </DataTable.Title>
            <DataTable.Title textStyle={{color: '#EEEEEE'}}>
              Billing Addres
            </DataTable.Title>
            <DataTable.Title textStyle={{color: '#EEEEEE'}} numeric>
              Contact
            </DataTable.Title>
          </DataTable.Header>
          {items.slice(from, to).map(item => (
            <DataTable.Row key={item.key}>
              <DataTable.Cell textStyle={{color:'#EEEEEE'}} >{item.name}</DataTable.Cell>
              <DataTable.Cell textStyle={{color:'#EEEEEE'}} >{item.email}</DataTable.Cell>
              <DataTable.Cell textStyle={{color:'#EEEEEE'}} >{item.address}</DataTable.Cell>
              <DataTable.Cell textStyle={{color:'#EEEEEE'}} >{item.billingAddress}</DataTable.Cell>
              <DataTable.Cell textStyle={{color:'#EEEEEE'}} numeric>{item.contact}</DataTable.Cell>

            </DataTable.Row>
          ))}

        </DataTable>

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / itemsPerPage)}
          onPageChange={page => setPage(page)}
          label={`${from + 1}-${to} of ${items.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={'Rows per page'}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 30,
  },
});
