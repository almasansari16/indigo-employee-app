import {View, Text, SafeAreaView, ScrollView, Alert} from 'react-native';
import React, {useState} from 'react';
import {AddCustomerStyle} from './styles';
import {Icon, IconInput, IconType} from '../../components';
import Button from '../../components/Button';

export default function AddCustomer({navigation}) {
  const [customer, setCustomer] = useState({
    name:'',
    contact:'',
    address:'',
    billingAddress:'',
    email: '',
    password: '',
  });
  const handleSave = () => {
    Alert.alert("save.........")
    navigation.navigate("BarcodeScan")
  }

  const handleCamera = () => {
    navigation.navigate("CameraPage")
  }
  return (
    <SafeAreaView style={AddCustomerStyle.container}>
      <ScrollView
       showsVerticalScrollIndicator={false}>
      <View style={[AddCustomerStyle.center]}>
        <IconInput
          icon={
            <Icon type={IconType.AntDesign} name={'plus'} color='black' style={{ margin: 15 }}/>
          }
          placeholder={'Name'}
          onChangeText={email => setCustomer({...customer, email})}
          value={customer.email}
          style={AddCustomerStyle.input}
        />
        <IconInput
         icon={
          <Icon type={IconType.AntDesign} name={'plus'} color='black' style={{ margin: 15 }}/>
        }
          placeholder={'Contact'}
          keyboardType={'number-pad'}
          onChangeText={email => setCustomer({...customer, email})}
          value={customer.email}
          style={AddCustomerStyle.input}
        />
        <IconInput
        icon={
          <Icon type={IconType.AntDesign} name={'plus'} color='black' style={{ margin: 15 }}/>
        }
          placeholder={'Address'}
          onChangeText={email => setCustomer({...customer, email})}
          value={customer.email}
          style={AddCustomerStyle.input}
        />
        <IconInput
          icon={
            <Icon type={IconType.AntDesign} name={'plus'} color='black' style={{ margin: 15 }}/>
          }
          placeholder={'Billing Address'}
          onChangeText={email => setCustomer({...customer, email})}
          value={customer.email}
          style={AddCustomerStyle.input}
        />
        <IconInput
         icon={
          <Icon type={IconType.AntDesign} name={'plus'} color='black' style={{ margin: 15 }}/>
        }
          placeholder={'Email'}
          keyboardType={'email-address'}
          onChangeText={email => setCustomer({...customer, email})}
          value={customer.email}
          style={AddCustomerStyle.input}
        />
           <IconInput
         icon={
          <Icon type={IconType.AntDesign} name={'plus'} color='black' style={{ margin: 15 }}/>
        }
          placeholder={'Front ID'}
          onChangeText={email => setCustomer({...customer, email})}
          value={customer.email}
          style={AddCustomerStyle.input}
        />
           <IconInput
          icon={
            <Icon type={IconType.AntDesign} onPress={handleCamera} name={'plus'} color='black' style={{ margin: 15 }}/>
          }
          placeholder={'Back ID'}
          onChangeText={email => setCustomer({...customer, email})}
          value={customer.email}
          style={AddCustomerStyle.input}
        />
      </View>
      <View style={AddCustomerStyle.btnView}>
        <Button title={"Save"} onPress={handleSave}/>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
