import { View, Text, SafeAreaView, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'; // import LinearGradient
import { AppStyles } from '../../theme/AppStyles';
import { Icon, IconInput, IconType } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddBrandStyle } from './styles';
import Button from '../../components/Button';
import { createBrand } from '../../store/actions/brandAction';
import { connect } from 'react-redux';

function AddBrand({ navigation, createBrand }) {
  const [brand, setBrand] = useState({
    brandName: '',
    address: '',
  });
  console.log(brand, "brand...........")
  const [validation, setValidation] = useState({});

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('BrandName', brand.brandName);
      await AsyncStorage.setItem('BrandAddress', brand.address);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSave = () => {
    const errors = {};

    if (!brand.brandName) {
      errors.brandName = 'Brand Name is required';
    }
    if (!brand.address) {
      errors.address = 'Address is required';
    }

    setValidation(errors);

    if (Object.keys(errors).length === 0) {
      // Proceed with form submission
      handleCreateBrand()
      saveData()
      setBrand({ brandName: " ", address: " "})
      navigation.navigate('TabNavigation')
    }

  };
  const handleCreateBrand = async () => {
   
    await createBrand(brand);


  };
  const handleConcernPersonChange = (index, key, value) => {
    const updatedConcernPersons = [...brand.concernPersons];
    updatedConcernPersons[index][key] = value;
    setBrand({
      ...brand,
      concernPersons: updatedConcernPersons,
    });
  };

  const addConcernPerson = () => {
    setBrand({
      ...brand,
      concernPersons: [...brand.concernPersons, { name: '', email: '', designation:'' }],
    });
  };

  return (
    <SafeAreaView style={[AppStyles.container]}>
      <LinearGradient
        colors={['#ba6b4d', '#f9f1da', '#ba6b4d']}
        style={{ flex: 1 }}
        start={{ x: 0.3, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[AddBrandStyle.center]}>
            <IconInput
              icon={
                <Icon
                  type={IconType.FontAwesome5}
                  name={'user'}
                  color="#282561"
                  style={{ margin: 15 }}
                />
              }
              placeholder={'Brand Name'}
              placeholderTextColor={'#282561'}
              onChangeText={brandName => setBrand({ ...brand, brandName })}
              value={brand.brandName}
              style={AddBrandStyle.input}
              error={validation.brandName}
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
              onChangeText={address => setBrand({ ...brand, address })}
              value={brand.address}
              style={AddBrandStyle.input}
              error={validation.address}
            />
            {/* {brand.concernPersons.map((person, index) => (
              <View key={index}>
                <IconInput
                  placeholder={`Name ${index + 1}`}
                  placeholderTextColor={'#282561'}
                  value={person.name}
                  style={AddBrandStyle.input}
                  onChangeText={(text) =>
                    handleConcernPersonChange(index, 'name', text)
                  }
                />
                <IconInput
                  placeholder={`Email ${index + 1}`}
                  placeholderTextColor={'#282561'}
                  value={person.email}
                  style={AddBrandStyle.input}
                  onChangeText={(text) =>
                    handleConcernPersonChange(index, 'email', text)
                  }
                />
                  <IconInput
                  placeholder={`Designation ${index + 1}`}
                  placeholderTextColor={'#282561'}
                  value={person.designation}
                  style={AddBrandStyle.input}
                  onChangeText={(text) =>
                    handleConcernPersonChange(index, 'designation', text)
                  }
                />
              </View>
            ))}
            <Button title="Add Concern Person" onPress={addConcernPerson} /> */}

          </View>
          <View style={AddBrandStyle.btnView}>
            <Button title={'Save'} onPress={handleSave} style={AddBrandStyle.btn} textStyle={AddBrandStyle.text} />
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  brands: state.brand.brands, // Assuming your reducer updates the "brands" property
  loading: state.brand.loading, // Assuming your reducer updates the "loading" property
  error: state.brand.error, // Assuming your reducer updates the "error" property
});

const mapDispatchToProps = {
  createBrand, // This makes the createBrand action available as a prop
};
export default connect(mapStateToProps, mapDispatchToProps)(AddBrand);