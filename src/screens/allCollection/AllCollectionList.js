import React, { useEffect } from 'react';
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
import { getSheetData } from '../../store/actions/sheetDataAction';
import { connect, useDispatch, useSelector } from 'react-redux';

 function AllCollectionList({ navigation }) {
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([10]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
  );
  const dispatch = useDispatch();
  const sheetData = useSelector((state) => state.sheet.allData);
  // console.log(sheetData , "sheetdata")

  const [items, setItems] = React.useState([]);

  const from = page * itemsPerPage;
  const to = items.length > 0 ? Math.min((page + 1) * itemsPerPage, items.length) : 0;

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);
  const [searchText, setSearchText] = React.useState('');
  const [filteredItems, setFilteredItems] = React.useState(items);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getSheetData());
      } catch (error) {
        console.error(error);
      }
    };

    if (sheetData.length === 0) {
      fetchData();
    } else {
      setItems(sheetData);
      setFilteredItems(sheetData)
    }
  }, [dispatch, sheetData]);

  const handleSearch = (text) => {
    setSearchText(text);

    const filteredData = items.filter(item =>
      item.ArticleName.toLowerCase().includes(text.toLowerCase()) ||
      item.IDS.toLowerCase().includes(text.toLowerCase()) ||
      item.Colour.toLowerCase().includes(text.toLowerCase()) ||
      item.FinishType.toLowerCase().includes(text.toLowerCase()) ||
      item.Weave.toString().includes(text)
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
            {/* <DataTable.Title textStyle={{ color: '#EEEEEE' }} >
              Image
            </DataTable.Title> */}
          </DataTable.Header>
          {filteredItems.slice(from, to).map(item => (
            <DataTable.Row
              key={item.key}
              onPress={() =>
                collectionDetail(item)}
            >
              <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >{item.ArticleName}</DataTable.Cell>
              <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >{item.IDS}</DataTable.Cell>
              <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >{item.Colour}</DataTable.Cell>
              <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >{item.FinishType}</DataTable.Cell>
              <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >{item.Weave}</DataTable.Cell>
              {/* <DataTable.Cell>
                <Image source={item.img} style={{ width: 50, height: 50 }} />
              </DataTable.Cell> */}
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


const mapStateToProps = (state) => ({
  allData: state.sheet.allData,
  loading: state.sheet.loading,
  error: state.sheet.error,
});

// Connect your component to the Redux store
export default connect(mapStateToProps)(AllCollectionList);