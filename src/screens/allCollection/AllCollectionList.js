import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import { Appbar, DataTable, Searchbar } from 'react-native-paper';
import { AppStyles } from '../../theme/AppStyles';
import Images from '../../theme/Images';
import { hp, wp } from '../../../App';

export default function AllCollectionList({ navigation }) {
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([10]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
  );

  const [items, setItems] = React.useState([
    {
      key: 1,
      img: Images.CollectionImg1,
      articleName: 'Snoop',
      ids: '5767',
      color: 'Pure Indigo',
      finishType: 'NHP',
      weave: '3/1 RHT',
    },
    {
      key: 2,
      img: Images.CollectionImg2,
      articleName: 'SOFIA',
      ids: '5079',
      color: 'Blue',
      finishType: 'ME',
      weave: '3/1 RHT',
    },
    {
      key: 3,
      img: Images.CollectionImg2,
      articleName: 'Suez',
      ids: '4898',
      color: 'Blue',
      finishType: 'NC',
      weave: '3/1 RHT',
    },
    {
      key: 4,
      img: Images.CollectionImg1,
      articleName: 'Madonna',
      ids: '4349',
      color: 'Blue',
      finishType: 'MD',
      weave: '3/1 RHT',
    },
    {
      key: 5,
      img: Images.CollectionImg2,
      articleName: 'Vilma In Less Stretch',
      ids: '9682',
      color: 'Blue',
      finishType: 'SHM ',
      weave: '3/1 RHT',
    },
    //  {
    //   key: 6,
    //   name: 'john',
    //   email: 'john@kindacode.com',
    //   address: 'karachi pakistan',
    //   billingAddress:'Business Avenue suite 102',
    //   contact:1234567,
    // },    {
    //   key: 7,
    //   name: 'john',
    //   email: 'john@kindacode.com',
    //   address: 'karachi pakistan',
    //   billingAddress:'Business Avenue suite 102',
    //   contact:1234567,
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
      item.articleName.toLowerCase().includes(text.toLowerCase()) ||
      item.ids.toLowerCase().includes(text.toLowerCase()) ||
      item.color.toLowerCase().includes(text.toLowerCase()) ||
      item.finishType.toLowerCase().includes(text.toLowerCase()) ||
      item.weave.toString().includes(text)
    );

    setFilteredItems(filteredData);
    setPage(0); // Reset the page to the first page
  };
  const collectionDetail = (item) => {
    navigation.navigate('SingleCollection', {
      item
    })
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
            title={"All Collections"}
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
        <DataTable>
          <DataTable.Header>
            <DataTable.Title textStyle={{ color: '#EEEEEE' }}>
              Article name
            </DataTable.Title>
            <DataTable.Title textStyle={{ color: '#EEEEEE' }}>
              IDS
            </DataTable.Title>
            <DataTable.Title textStyle={{ color: '#EEEEEE' }}>
              Color
            </DataTable.Title>
            <DataTable.Title textStyle={{ color: '#EEEEEE' }}>
              Finish Type
            </DataTable.Title>
            <DataTable.Title textStyle={{ color: '#EEEEEE', marginLeft: 5 }} >
              Weave
            </DataTable.Title>
            <DataTable.Title textStyle={{ color: '#EEEEEE' }} >
              Image
            </DataTable.Title>
          </DataTable.Header>
          {filteredItems.slice(from, to).map(item => (
            <DataTable.Row
              key={item.key}
              onPress={() =>
              collectionDetail(item)}
              >
              <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >{item.articleName}</DataTable.Cell>
              <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >{item.ids}</DataTable.Cell>
              <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >{item.color}</DataTable.Cell>
              <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >{item.finishType}</DataTable.Cell>
              <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >{item.weave}</DataTable.Cell>
              <DataTable.Cell>
                <Image source={item.img} style={{ width: 50, height: 50 }} />
              </DataTable.Cell>
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


