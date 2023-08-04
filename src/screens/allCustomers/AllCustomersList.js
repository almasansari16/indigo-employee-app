import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import { DataTable, Searchbar } from 'react-native-paper';
import { AppStyles } from '../../theme/AppStyles';
import Images from '../../theme/Images';
import { hp, wp } from '../../../App';
// import { SearchBar } from 'react-native-screens';


export default function AllCustomersList({ navigation, route }) {
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([3, 4, 5]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
  );

  const [items, setItems] = React.useState([
    {
      key: 1,
      name: 'Simão Costa',
      designation: ' Senior Buyer',
      email: 'simao.costa@grupovnc.com',
      address: 'M/S Cofemel- Sociedade de Vestuario , S.A.Rua das Cavadas, 188 4785-162 Trofa',
      contact: +351931644538,
    },
    {
      key: 2,
      name: 'Helder',
      designation: ' SENIOR RESEARCHER AND DEVELOPER',
      email: 'helder.reis@grupovnc.com',
      address: 'M/S Cofemel- Sociedade de Vestuario , S.A. Rua das Cavadas, 1884785-162 Trofa',
      contact: +351919561691,
    },
    // {
    //   key: 3,
    //   name: 'Helder',
    //   designation:' SENIOR RESEARCHER AND DEVELOPER',
    //   email: 'helder.reis@grupovnc.com',
    //   address: ': M/S Cofemel- Sociedade de Vestuario , S.A. Rua das Cavadas, 1884785-162 Trofa',
    //   contact: +351919561691,
    // },
    // {
    //   key: 4,
    //   name: 'Helder',
    //   designation:' SENIOR RESEARCHER AND DEVELOPER',
    //   email: 'helder.reis@grupovnc.com',
    //   address: ': M/S Cofemel- Sociedade de Vestuario , S.A. Rua das Cavadas, 1884785-162 Trofa',
    //   contact: +351919561691,
    // },
    // {
    //   key: 5,
    //   name: 'Helder',
    //   designation:' SENIOR RESEARCHER AND DEVELOPER',
    //   email: 'helder.reis@grupovnc.com',
    //   address: ': M/S Cofemel- Sociedade de Vestuario , S.A. Rua das Cavadas, 1884785-162 Trofa',
    //   contact: +351919561691,
    // },
    // {
    //   key: 6,
    //   name: 'Helder',
    //   designation:' SENIOR RESEARCHER AND DEVELOPER',
    //   email: 'helder.reis@grupovnc.com',
    //   address: ': M/S Cofemel- Sociedade de Vestuario , S.A. Rua das Cavadas, 1884785-162 Trofa',
    //   contact: +351919561691,
    // },
    // {
    //   key: 7,
    //   name: 'Helder',
    //   designation:' SENIOR RESEARCHER AND DEVELOPER',
    //   email: 'helder.reis@grupovnc.com',
    //   address: ': M/S Cofemel- Sociedade de Vestuario , S.A. Rua das Cavadas, 1884785-162 Trofa',
    //   contact: +351919561691,
    // },
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);
  const [searchText, setSearchText] = React.useState('');
  const [filteredItems, setFilteredItems] = React.useState(items);

  const handleSearch = (text) => {
    setSearchText(text);

    const filteredData = items.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()) ||
      item.email.toLowerCase().includes(text.toLowerCase()) ||
      item.address.toLowerCase().includes(text.toLowerCase()) ||
      item.designation.toLowerCase().includes(text.toLowerCase()) ||
      item.contact.toString().includes(text)
    );

    setFilteredItems(filteredData);
    setPage(0); // Reset the page to the first page
  };
  const customerDetail = (item) => {
    navigation.navigate('SingleCustomer', {
      item
    })
  }
  return (
    <SafeAreaView style={[AppStyles.container]}>
      <ImageBackground
        source={Images.purple_background}
        style={{ width: wp(100), height: hp(100) }}>

        <View style={{ marginTop: 0 }}>
          <Searchbar
            placeholder="Search..."
            mode='view'
            onChangeText={handleSearch}
            value={searchText}
          />
        </View>
        {/* <ScrollView horizontal > */}
          <DataTable>
            <DataTable.Header>
              <DataTable.Title textStyle={{ color: '#EEEEEE' }}>
                Name
              </DataTable.Title>
              <DataTable.Title textStyle={{ color: '#EEEEEE' }}>
                Designation
              </DataTable.Title>
              <DataTable.Title textStyle={{ color: '#EEEEEE' }}>
                Email
              </DataTable.Title>
              <DataTable.Title textStyle={{ color: '#EEEEEE' }}>
                Address
              </DataTable.Title>
              <DataTable.Title textStyle={{ color: '#EEEEEE' }} numeric>
                Contact
              </DataTable.Title>
            </DataTable.Header>
            <TouchableOpacity >
              {filteredItems.slice(from, to).map(item => (
                <DataTable.Row key={item.key} onPress={() => customerDetail(item)}>
                  <DataTable.Cell textStyle={{ color: '#EEEEEE', marginHorizontal: 5 }} >{item.name}</DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: '#EEEEEE', marginHorizontal: 10 }} >{item.designation}</DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: '#EEEEEE', marginHorizontal: 10 }} >{item.email}</DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: '#EEEEEE', marginHorizontal: 10 }} >{item.address}</DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: '#EEEEEE', marginHorizontal: 10 }} numeric>{item.contact}</DataTable.Cell>

                </DataTable.Row>
              ))}
            </TouchableOpacity>
          </DataTable>
        {/* </ScrollView> */}
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
