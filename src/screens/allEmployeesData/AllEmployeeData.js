import { View, Text, SafeAreaView, ImageBackground, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppStyles } from '../../theme/AppStyles'
import Images from '../../theme/Images'
import { getAllUsers } from '../../store/actions/authActions'
import { connect, useDispatch, useSelector } from 'react-redux'
import { DataTable } from 'react-native-paper'

function AllEmployeeData({ getAllUsers }) {
    const [userData, setUserData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const dispatch = useDispatch();
    const userdata = useSelector((state) => state.auth.users);


    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getAllUsers());
            } catch (error) {
                console.error(error);
            }
        };

        if (userdata.length === 0 || refresh) {
            fetchData();
            setRefresh(false)
        } else {
            setUserData(userdata);
            //   setFilteredItems(userdata)
        }
    }, [dispatch, userdata, refresh]);

    console.log(userData)
    // Function to filter data based on role
    const filterUserDataByRole = (role) => {
        return userData.filter(user => user.role === role);
    };

    // Separate data based on role
    const employees = filterUserDataByRole('employee');
    const users = filterUserDataByRole('user');
    const admins = filterUserDataByRole('admin');
    console.log(employees);
    console.log(users);
    console.log(admins)
    return (
        <SafeAreaView style={[AppStyles.container]}>
            <ImageBackground source={Images.purple_background} style={{ flex: 1 }}>
                <View >
                    <ScrollView>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title textStyle={{ color: '#EEEEEE' }}>Name</DataTable.Title>
                                <DataTable.Title textStyle={{ color: '#EEEEEE' }}>Email</DataTable.Title>
                                <DataTable.Title textStyle={{ color: '#EEEEEE' }}>Role</DataTable.Title>
                            </DataTable.Header>
                            {/* Loop through the filtered items and display them */}
                            {employees.length > 0 ? (
                                employees.map((item, index) => (
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell textStyle={{ color: '#EEEEEE' }}
                                            numberOfLines={2}>{item.name}</DataTable.Cell>
                                        <DataTable.Cell textStyle={{ color: '#EEEEEE' }}
                                            numberOfLines={2}>{item.email}</DataTable.Cell>
                                        <DataTable.Cell textStyle={{ color: '#EEEEEE' }}
                                            numberOfLines={2}>{item.role}</DataTable.Cell>
                                    </DataTable.Row>
                                ))
                            ) : (
                                <View style={[AppStyles.center, { marginTop: 20 }]}>
                                    <Text style={{ color: '#EEEEEE', fontSize: 16 }}>Sorry, there are no employees available.</Text>
                                </View>
                            )}
                        </DataTable>
                    </ScrollView>

                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({
    users: state.brand.users, // Assuming your reducer updates the "brands" property
    loading: state.auth.loading,
    error: state.auth.error, // Assuming your reducer updates the "error" property
});

// Connect your component to the Redux store
export default connect(mapStateToProps, { getAllUsers })(AllEmployeeData);




