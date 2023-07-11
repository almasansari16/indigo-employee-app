import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {CustomerDetailStyles} from './styles';
import Button from '../../components/Button';
import { CustomModal, InputField } from '../../components';
import { TextInput } from 'react-native-paper';
import { AppStyles } from '../../theme/AppStyles';

export default function CustomerDetail({navigation}) {
  const [modalVisible, setModalVisible] = React.useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const next = () => {
    navigation.navigate("Color")
  };
  return (
    <SafeAreaView style={[AppStyles.container]}>
      <View style={[CustomerDetailStyles.center]}>
        <Text style={CustomerDetailStyles.heading}>Customer Detail</Text>
        <View style={CustomerDetailStyles.detailView}>
          <Text style={CustomerDetailStyles.detailText}>Name : John</Text>
          <Text style={CustomerDetailStyles.detailText}>
            Email : John@gmail.com
          </Text>
          <Text style={CustomerDetailStyles.detailText}>
            Address : karachi pakistan
          </Text>
          <Text style={CustomerDetailStyles.detailText}>
            Billing Address : Suite 200 clifton park tower
          </Text>
          <Text style={CustomerDetailStyles.detailText}>
            Contact : 123456789
          </Text>
          <Text style={CustomerDetailStyles.detailText}>Front ID : 92B</Text>
          <Text style={CustomerDetailStyles.detailText}>Back ID : 92B</Text>
        </View>
        <View style={CustomerDetailStyles.btnView}>
          <Button title={'Add Extra Detail'} onPress={showModal} />
          <Button title={'Next'} onPress={next} />
        </View>
      </View>
      <CustomModal visible={modalVisible} hideModal={hideModal}>
        <InputField placeholder={'price'} placeholderTextColor={'gray'}/>
        <InputField placeholder={'price'} placeholderTextColor={'gray'}/>
        <InputField placeholder={'price'} placeholderTextColor={'gray'}/>

      </CustomModal>
    </SafeAreaView>
  );
}
