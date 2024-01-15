import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Text,
  RefreshControl,
  TouchableOpacity,
  Alert,

} from 'react-native';
import { ActivityIndicator, Appbar, DataTable, Searchbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/Button';
import { Icon, IconType } from '../../components';
import { AppStyles } from '../../theme/AppStyles';
import { AllCustomersListStyle } from './styles';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../../store/actions/brandAction';
import Images from '../../theme/Images';
import { hp, wp } from '../../../App';

function AllCustomersList({ navigation, route }) {
  const [page, setPage] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [numberOfItemsPerPageList] = useState([6]);
  const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.brand.brands);
  console.log(brands, 'brands.......')
  const [items, setItems] = useState([]);

  const from = page * itemsPerPage;
  const to = items.length > 0 ? Math.min((page + 1) * itemsPerPage, items.length) : 0;
  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getBrands());
      } catch (error) {
        console.error(error);
      }
    };

    if (brands.length === 0 || refresh) {
      fetchData();
      setRefresh(false)
    } else {
      setItems(brands);
      setFilteredItems(brands)
    }
  }, [dispatch, brands, refresh]);

  console.log(brands, "brands")

  const handleSearch = (text) => {
    setSearchText(text);

    const filteredData = items.filter(
      (item) =>
        item.brandName.toLowerCase().includes(text.toLowerCase()) ||
        item.address.toLowerCase().includes(text.toLowerCase())
    );
    console.log(filteredData, "filter data");
    setFilteredItems(filteredData);
    setPage(0);
  };

  const customerDetail = (item) => {
    navigation.navigate('SingleCustomer', {
      item,
    });
  };

  const addNewBrandName = () => {
    navigation.navigate('AddBrand');
  };
  console.log(filteredItems, "filterdItems...")

  const handleRefresh = async () => {
    setIsRefreshing(true);

    try {
      await getBrands();
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsRefreshing(false);
    }
  };




  return (
    <SafeAreaView style={AppStyles.container}>
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
            title={'All Customers'}
            mode="small"
            style={{ color: 'white' }}
            color="black"
            titleStyle={AppStyles.headerText}
          />
        </Appbar.Header>
        <View style={{ marginTop: 0 }}>
          <Searchbar
            placeholder="Search..."
            mode="view"
            onChangeText={handleSearch}
            value={searchText}
          />
        </View>
        <View>
          <Button
            icon={<Icon name={'plus'} type={IconType.AntDesign} size={30} style={AllCustomersListStyle.icon} />}
            style={AllCustomersListStyle.addBtn}
            onPress={addNewBrandName}
          />
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }>
          {filteredItems.length > 0 ? (
            <DataTable>
              <DataTable.Header>
                <DataTable.Title textStyle={{ color: '#EEEEEE' }}>Brand Name</DataTable.Title>
                <DataTable.Title textStyle={{ color: '#EEEEEE' }}>Address</DataTable.Title>
              </DataTable.Header>
              <TouchableOpacity>
                {filteredItems.slice(from, to).map((item) => (

                  <DataTable.Row key={item.key} onPress={() => customerDetail(item)} style={{ height: hp(8) }}>
                    <DataTable.Cell textStyle={{ color: '#EEEEEE', marginHorizontal: 5 }}>{item.brandName}</DataTable.Cell>
                    <DataTable.Cell textStyle={{ color: '#EEEEEE', marginHorizontal: 10 }}>{item.address}</DataTable.Cell>
                  </DataTable.Row>

                ))}
              </TouchableOpacity>
            </DataTable>
          ) : (
            <ActivityIndicator color='#EEEEEE' size="large" />
          )}

        </ScrollView>
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${items.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          style={AllCustomersListStyle.Pagination}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={'Rows per page'}

        />
      </ImageBackground>
    </SafeAreaView>
  );
}



const mapStateToProps = (state) => ({
  brands: state.brand.brands, // Assuming your reducer updates the "brands" property
  loading: state.brand.loading, // Assuming your reducer updates the "loading" property
  error: state.brand.error, // Assuming your reducer updates the "error" property
});

// Connect your component to the Redux store
export default connect(mapStateToProps, { getBrands })(AllCustomersList);
