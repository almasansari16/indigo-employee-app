import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Image,
  Alert,
  ToastAndroid,
  Platform,
  Text,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import { Appbar, DataTable, Searchbar } from 'react-native-paper';
import { AppStyles } from '../../theme/AppStyles';
import Images from '../../theme/Images';
import { hp, wp } from '../../../App';
import { getSheetData } from '../../store/actions/sheetDataAction';
import { connect, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/Button';
import { CustomModal, Icon, IconType, InputField } from '../../components';
import AllCollectionStyle from './styles';
import { createCollection } from '../../store/actions/selectExhibitionGarmentAction';
import Swipeable from 'react-native-gesture-handler/Swipeable';

function AllCollectionList({ navigation, createCollection }) {
  const [page, setPage] = React.useState(0);
  const [refresh, setRefresh] = useState(false);
  // const [userId, setUserId] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [collection, setCollection] = useState({
    collectionName: '',
    selectedGarments: [],
    userId: ''
  });
  const [numberOfItemsPerPageList] = React.useState([7]);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
  );
  const dispatch = useDispatch();
  const sheetData = useSelector((state) => state.sheet.allData);
  // console.log(sheetData, "sheetdata")

  const [items, setItems] = React.useState([]);

  const from = page * itemsPerPage;
  // const to = items.length > 0 ? Math.min((page + 1) * itemsPerPage, items.length) : 0;
  const to = from + itemsPerPage;

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await AsyncStorage.getItem("userData");
        const parsedData = JSON.parse(userData);
        const { _id } = parsedData;
        setCollection((collection) => ({
          ...collection,
          userId: _id,
        }));
      } catch (error) {
        console.log("Error parsing the data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
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
      const images = [
        require("../../assets/images/image1.jpeg"),
        require("../../assets/images/image2.jpeg"),
        require("../../assets/images/image3.jpeg"),
        require("../../assets/images/image4.jpeg"),
        require("../../assets/images/image5.jpeg"),
        require("../../assets/images/image6.jpeg"),
        require("../../assets/images/image7.jpeg"),
        require("../../assets/images/image8.jpeg"),
        require("../../assets/images/image9.jpeg"),
        require("../../assets/images/image10.jpeg")
      ];

      const updateItems = sheetData.map((item, index) => (
        {
          ...item,
          Image: images[index]
        }
      ))
      // console.log(updateItems, "updateitems.............")
      setItems(updateItems);
      setFilteredItems(updateItems)
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

  const handleRefresh = async () => {
    setIsRefreshing(true);

    try {
      await getSheetData();
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsRefreshing(false);
    }
  };
  const handleLongPress = (item) => {
    setSelectedItems((prevSelectedItems) => {
      setCollection((prevCollection) => ({
        ...prevCollection,
        selectedGarments: [...prevCollection.selectedGarments, item]
      }));
      // Check if the item is not already in the selectedItems array
      if (!prevSelectedItems.some((selectedItem) =>
        selectedItem.ArticleName === item.ArticleName)) {
        const message = "Item has been selected: " + item.ArticleName;

        if (Platform.OS === 'android') {
          ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
          );
        } else if (Platform.OS === 'ios') {
          Alert.alert(message);
        }

        return [...prevSelectedItems, item];
      }
      AsyncStorage.setItem('SelectedGarmentforExhibition', JSON.stringify(selectedItems))
        .then(() => {
          console.log('Array saved to AsyncStorage');
        })
        .catch(error => {
          console.error('Error saving array to AsyncStorage:', error);
        });
      // If the item is already in the array, return the previous state
      const message = item.ArticleName + " has already selected ";

      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravityAndOffset(
          message,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      } else if (Platform.OS === 'ios') {
        Alert.alert(message);
      }
      return prevSelectedItems;
    });
  };

  const handleCreateCollection = async () => {
    console.log(collection, "collection...............")

    await
      createCollection(collection)
        .then(res => {
          setCollection({ collectionName: "" })
          closeModal()
        }).catch((err) => {

          Alert.alert(err)
        })
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const LeftSwipeActions = () => {
    return (
      <View
        style={{ flex: 1, backgroundColor: '#ccffbd', justifyContent: 'center' }}
      >
        <Text
          style={{
            color: '#40394a',
            paddingHorizontal: 10,
            fontWeight: '600',
            paddingHorizontal: 30,
            paddingVertical: 20,
          }}
        >
          Bookmark
        </Text>
      </View>
    );
  };
  const rightSwipeActions = () => {
    return (
      <View
        style={{
          backgroundColor: '#ff8303',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
      >
        <TouchableOpacity onPress={handleLongPress}>
          <Text
            style={{
              color: '#1b1a17',
              paddingHorizontal: 10,
              fontWeight: '600',
              paddingHorizontal: 30,
              paddingVertical: 20,
            }}
          >
            select
          </Text>
        </TouchableOpacity>

      </View>
    );
  };
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
        <View style={{
          flexDirection: 'row',
          alignSelf: 'center',
          justifyContent: 'space-between',
          display: 'flex',
          width: wp(100),
          marginHorizontal: hp(2),

        }}>
          <Text style={{ color: '#EEEEEE', fontSize: 16, marginTop: 15, marginLeft: 10 }}>{collection.collectionName}</Text>
          <Button
            icon={<Icon name={'plus'} type={IconType.AntDesign} size={30} style={AllCollectionStyle.icon} />}
            style={AllCollectionStyle.addBtn}
            onPress={() => setModalVisible(true)}
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
            <DataTable style={{ marginTop: -10 }}>
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
                <Swipeable
                  renderLeftActions={LeftSwipeActions}
                // renderRightActions={() => rightSwipeActions(item)}
                >
                  <DataTable.Row
                    style={{ height: hp(8) }}
                    key={item.key}
                    onPress={() =>
                      collectionDetail(item)}
                    onLongPress={() => handleLongPress(item)}
                  >
                    <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >{item.ArticleName}</DataTable.Cell>
                    <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >{item.IDS}</DataTable.Cell>
                    <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >{item.Colour}</DataTable.Cell>
                    <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >{item.FinishType}</DataTable.Cell>
                    <DataTable.Cell textStyle={{ color: '#EEEEEE' }} >{item.Weave}</DataTable.Cell>
                    <DataTable.Cell >
                      <Image source={item.Image} style={{ width: 50, height: 50 }} />
                    </DataTable.Cell>
                  </DataTable.Row>
                </Swipeable>
              ))}
            </DataTable>
          ) : (
            <ActivityIndicator color='#EEEEEE' size="large" />
          )}
        </ScrollView>
        <View style={{
          flexDirection: 'row',
          alignSelf: 'center',
          justifyContent: 'space-evenly',
          display: 'flex',
          width: wp(100),

        }}>
          <Button
            title={'Collection List'}
            style={{ backgroundColor: '#EEEEEE', marginTop: hp(5) }}
            onPress={() => navigation.navigate('SelectedGarments')} />
          <Button
            title={'Save Collection'}
            style={{ backgroundColor: '#EEEEEE', marginTop: hp(5) }}
            onPress={handleCreateCollection}
          />
        </View>
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / itemsPerPage)}
          onPageChange={page => setPage(page)}
          label={`${from + 1}-${to} of ${items.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          style={AllCollectionStyle.Pagination}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={'Rows per page'}
        />

        <View>
          <CustomModal visible={modalVisible} hideModal={closeModal}>
            <InputField placeholder={'Enter Exhibition Collection Name'}
              style={AllCollectionStyle.input}
              onChangeText={collectionName => setCollection({ ...collection, collectionName })}
              value={collection.collectionName}
            />
            <Button title={'Add Name'}
              onPress={closeModal} />
          </CustomModal>
        </View>

      </ImageBackground>
    </SafeAreaView>
  );
}


const mapStateToProps = (state) => ({
  allData: state.sheet.allData,
  loading: state.sheet.loading,
  error: state.sheet.error,
  collections: state.exhibitioCollection.collections, // Assuming your reducer updates the "brands" property
  loading: state.exhibitioCollection.loading, // Assuming your reducer updates the "loading" property
  error: state.exhibitioCollection.error,
});
const mapDispatchToProps = {
  createCollection,
  getSheetData// This makes the createBrand action available as a prop
};
// Connect your component to the Redux store
export default connect(mapStateToProps, mapDispatchToProps)(AllCollectionList);