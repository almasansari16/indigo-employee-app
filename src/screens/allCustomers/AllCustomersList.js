import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Appbar, DataTable, Searchbar } from 'react-native-paper';
import { AppStyles } from '../../theme/AppStyles';
import Images from '../../theme/Images';
import { hp, wp } from '../../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/Button';
import { Icon, IconType } from '../../components';
import { AllCustomersListStyle } from './styles';
// import { SearchBar } from 'react-native-screens';


export default function AllCustomersList({ navigation, route }) {
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([10]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
  );

  const [items, setItems] = React.useState([
    {
      brandName: "ASOS",
      address: "Greater London House, Hampstead Road, London, NW1 7FB",
      concernPersons: [
        {
          name: "Joanna Richards",
          email: "joanna.richards@asos.com",
          designation: "Junior Fabric Sourcing Partner"
        },
        {
          name: "'Mariano Vanlook",
          email: "mariano.vanlook@asos.com",
          designation: "Junior Fabric Sourcing Partner"
        }, {
          name: "Natalie Goss",
          email: "natalie.goss@asos.com",
          designation: "Junior Fabric Sourcing Partner"
        }, {
          name: "David Crerar",
          email: "DavidCrerar@asos.com",
          designation: "Junior Fabric Sourcing Partner"
        },
      ]
    },
    {
      brandName: "Tiffosi",
      address: "M/S Cofemel- Sociedade de Vestuario , S.A. Rua das Cavadas, 188 4785-162 Trofa",
      concernPersons: [
        {
          name: "Simão Costa",
          email: "simao.costa@grupovnc.com",
          designation: "Senior Buyer"
        },
        {
          name: "Helder",
          email: "helder.reis@grupovnc.com",
          designation: "SENIOR RESEARCHER AND DEVELOPER"
        },
      ]
    },
    {
      brandName: "H&M",
      address: "MÄSTER SAMUELSGATAN 46A, 106 38 STOCKHOLM, SWEDEN",
      concernPersons :[]
    },
    {
      brandName: "Mayoral",
      address: "Mayoral international stores S.A. La Oratava 118. 29006 MALAGA",
      concernPersons :[]
    },
    {
      brandName: "Inditex",
      address: "Avda de la Diputaciona 15143 Arteixo ACoruna",
      concernPersons :[]
    },
    {
      brandName: "KappAhl",
      address: "KAPPAHL SVERIGE AB, IDROTTSVAGEN 14 BOX 303 431 24 MOLDAL,SWEDEN",
      concernPersons :[]
    },
  ]);
  useEffect(async () => {
    try {
      await AsyncStorage.setItem("AllCustomer", JSON.stringify(items))
    } catch (error) {
      console.log(error.message)
    }
  }, [])
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
      item.brandName.toLowerCase().includes(text.toLowerCase()) ||
      item.address.toLowerCase().includes(text.toLowerCase())
      // item.address.toLowerCase().includes(text.toLowerCase()) ||
      // item.designation.toLowerCase().includes(text.toLowerCase()) ||
      // item.contact.toString().includes(text)
    );

    setFilteredItems(filteredData);
    setPage(0); // Reset the page to the first page
  };
  const customerDetail = (item) => {
    navigation.navigate('SingleCustomer', {
      item
    })
  };

  const addNewBrandName = () => {
    navigation.navigate("AddBrand")
  }
  return (
    <SafeAreaView style={[AppStyles.container]}>
      <ImageBackground
        source={Images.purple_background}
        style={{ width: wp(100), height: hp(100) }}>
        <Appbar.Header
          style={{
            backgroundColor: '#EEEEEE',
          }}
          theme={{
            colors: {
              backgroundColor: '#D11F27',
              accent: 'white',
              secondary: 'yellow',
            },
          }}>
          <Appbar.BackAction
            animated
            android_ripple
            style={{ color: '#000' }}
            color="#000"
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Appbar.Content
            title={"All Customers"}
            mode="small"
            style={{ color: 'white' }}
            color="black"
            titleStyle={AppStyles.headerText}
          />
        </Appbar.Header>
        <View style={{ marginTop: 0 }}>
          <Searchbar
            placeholder="Search..."
            mode='view'
            onChangeText={handleSearch}
            value={searchText}
          />
        </View>
        <View>
          <Button
            icon={<Icon name={'plus'}
              type={IconType.AntDesign} size={30}
              style={AllCustomersListStyle.icon} />}
            style={AllCustomersListStyle.addBtn}
            onPress={addNewBrandName} />
        </View>
        {/* <ScrollView horizontal > */}
        <DataTable>
          <DataTable.Header>
            <DataTable.Title textStyle={{ color: '#EEEEEE' }}>
              Brand Name
            </DataTable.Title>
            <DataTable.Title textStyle={{ color: '#EEEEEE' }}>
              Address
            </DataTable.Title>
          </DataTable.Header>
          <TouchableOpacity >
            {filteredItems.slice(from, to).map(item => (
              <DataTable.Row key={item.key} onPress={() => customerDetail(item)}>
                <DataTable.Cell textStyle={{ color: '#EEEEEE', marginHorizontal: 5 }} >{item.brandName}</DataTable.Cell>
                <DataTable.Cell textStyle={{ color: '#EEEEEE', marginHorizontal: 10 }} >{item.address}</DataTable.Cell>
                {/* <DataTable.Cell textStyle={{ color: '#EEEEEE', marginHorizontal: 10 }} >{item.email}</DataTable.Cell>
                <DataTable.Cell textStyle={{ color: '#EEEEEE', marginHorizontal: 10 }} >{item.address}</DataTable.Cell>
                <DataTable.Cell textStyle={{ color: '#EEEEEE', marginHorizontal: 10 }} numeric>{item.contact}</DataTable.Cell> */}

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
