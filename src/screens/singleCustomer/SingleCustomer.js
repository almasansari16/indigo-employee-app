import { View, Text, SafeAreaView, Dimensions, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppStyles } from '../../theme/AppStyles';
import { SingleCustomerStyle } from './styles';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Images from '../../theme/Images';
import { hp } from '../../../App';
import { CustomModal, Icon, IconInput, IconType } from '../../components';



const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function SingleCustomer({ route, navigation }) {
  const [customer, setCustomer] = useState(null); // Initialize customer as null
  const [selectedPersons, setSelectedPersons] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      // Reset the modal visibility when navigating away from the screen
      setModalVisible(false);
    })

    return unsubscribe;
  }, [navigation]);


  useEffect(() => {
    console.log('Route Params:', route.params); // Check if route params are being received
    const { item } = route.params;
    console.log('Customer Item:', item); // Check the customer item data
    setCustomer(item);
    // console.log(customer.concernPersons, "concern person")
  }, [route.params]);

  if (!customer) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }
  const { brandName, concernPersons } = customer;


  const togglePersonSelection = (person) => {
    if (selectedPersons.some(selectedPerson => selectedPerson.email === person.email)) {
      setSelectedPersons(selectedPersons.filter(selectedPerson => selectedPerson.email !== person.email));
    } else {
      setSelectedPersons([...selectedPersons, person]);
    }
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem("BrandName", customer.brandName);

      const selectedConcernPersons = concernPersons.filter(person => selectedPersons.some(selectedPerson => selectedPerson.email === person.email));
      const selectedPersonDetails = selectedConcernPersons.map(person => ({
        name: person.name,
        email: person.email,
        designation: person.designation
      }));
      const emails = concernPersons.map(person => person.email);
      await AsyncStorage.setItem("ConcernPerson Emails", JSON.stringify(emails))
      await AsyncStorage.setItem("SelectedConcernPersons", JSON.stringify(selectedPersonDetails));

      navigation.navigate("NewQrCode")

    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <SafeAreaView>
      <ImageBackground source={Images.purple_background}>
        <View style={AppStyles.center}>

          <View style={[AppStyles.center]}>
            <Text style={SingleCustomerStyle.brandName}>Brand Name : {customer.brandName}</Text>
          </View>
          <ScrollView style={{ marginVertical: hp(3) }} showsVerticalScrollIndicator={false}>
            {concernPersons.map((person, index) => (
              <TouchableOpacity key={index}
                onPress={() => togglePersonSelection(person)}
                style={[
                  SingleCustomerStyle.personView,
                  {
                    backgroundColor:
                      selectedPersons.some
                        (selectedPerson => selectedPerson.email === person.email)
                        ? '#20154d' : '#EEEEEE'
                  }
                ]}>
                <Text style={[
                  SingleCustomerStyle.detailText,
                  {
                    color:
                      selectedPersons.some
                        (selectedPerson => selectedPerson.email === person.email)
                        ? '#EEEEEE' : '#20154d'
                  }
                ]}>Name: {person.name}</Text>
                <Text style={[
                  SingleCustomerStyle.detailText,
                  {
                    color:
                      selectedPersons.some
                        (selectedPerson => selectedPerson.email === person.email)
                        ? '#EEEEEE' : '#20154d'
                  }
                ]}>Email: {person.email}</Text>
                <Text style={[
                  SingleCustomerStyle.detailText,
                  {
                    color:
                      selectedPersons.some
                        (selectedPerson => selectedPerson.email === person.email)
                        ? '#EEEEEE' : '#20154d'
                  }
                ]}>Designation: {person.designation}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={SingleCustomerStyle.btnView}>
            <Button title={"Add New Person"}
              onPress={openModal} style={SingleCustomerStyle.btn} />
            <Button title={"Scan Code"}
              onPress={handleSave} style={SingleCustomerStyle.btn} />
          </View>
          <CustomModal visible={modalVisible} hideModal={closeModal}>
            <View>
              <Text style={SingleCustomerStyle.subHeading}>Add New Concern Person Detail</Text>
              <IconInput
                icon={
                  <Icon
                    type={IconType.Ionicons}
                    name={'location-outline'}
                    color="#282561"
                    style={{ margin: 15 }}
                  />
                }
                placeholder={'Address'}
                placeholderTextColor={'#282561'}
                keyboardType={'number-pad'}
                // onChangeText={address => setCustomer({ ...customer, address })}
                // value={customer.address}
                style={SingleCustomerStyle.input}
              // error={validation.address}
              />
              <IconInput
                icon={
                  <Icon
                    type={IconType.Ionicons}
                    name={'location-outline'}
                    color="#282561"
                    style={{ margin: 15 }}
                  />
                }
                placeholder={'Address'}
                placeholderTextColor={'#282561'}
                keyboardType={'number-pad'}
                // onChangeText={address => setCustomer({ ...customer, address })}
                // value={customer.address}
                style={SingleCustomerStyle.input}
              // error={validation.address}
              />
              <IconInput
                icon={
                  <Icon
                    type={IconType.Ionicons}
                    name={'location-outline'}
                    color="#282561"
                    style={{ margin: 15 }}
                  />
                }
                placeholder={'Address'}
                placeholderTextColor={'#282561'}
                keyboardType={'number-pad'}
                // onChangeText={address => setCustomer({ ...customer, address })}
                // value={customer.address}
                style={SingleCustomerStyle.input}
              // error={validation.address}
              />
              <Button title={'Save'}
                style={[SingleCustomerStyle.modalbtn]}
                textStyle={{ color: '#EEEEEE' }}
                onPress={closeModal} />
            </View>
          </CustomModal>
        </View>
      </ImageBackground>
    </SafeAreaView>

  )
}