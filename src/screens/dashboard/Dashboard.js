import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import {AppStyles} from '../../theme/AppStyles';
import {dashboardStyles} from './styles';

export default function Dashboard({navigation}) {
  return (
    <SafeAreaView style={[AppStyles.container]}>
      <View style={dashboardStyles.div}>
        <TouchableOpacity style={dashboardStyles.links}
        onPress={() => navigation.navigate("AddCustomer")}>
          <Text style={[dashboardStyles.linksText, AppStyles.text]}>
            Add Customer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={dashboardStyles.links}>
          <Text style={[dashboardStyles.linksText, AppStyles.text]}>
            Add Collection
          </Text>
        </TouchableOpacity>
      </View>
      <View style={dashboardStyles.div}>
        <TouchableOpacity style={dashboardStyles.links}>
          <Text style={[dashboardStyles.linksText, AppStyles.text]}>
            All Customers
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={dashboardStyles.links}>
          <Text style={[dashboardStyles.linksText, AppStyles.text]}>
            All Collections
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
