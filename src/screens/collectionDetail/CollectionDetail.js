import { View, Text, SafeAreaView, ImageBackground, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CollectionDetailStyles } from './styles';
import Button from '../../components/Button';
import { CustomModal, InputField } from '../../components';
import { TextInput } from 'react-native-paper';
import { AppStyles } from '../../theme/AppStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Images from '../../theme/Images';
import { wp } from '../../../App';


export default function CollectionDetail({ navigation }) {

    const next = () => {
        navigation.navigate('SendEmail');
    };



    const [articleName, setArticleName] = useState('');
    const [IDS , setIDS] = useState('');
    const [finishType, setFinishType] = useState('');
    const [weave, setWeave] = useState('');
    const [fullWidth, setFullWidth] = useState('');
    const [yardFOB_LC_sight, setYardFOB_LC_sight] = useState('');
    const [color, setColor] = useState('');
    const [beforeWashWeight, setBeforeWashWeight] = useState('');
    const [afterWashWeight , setAfterWashWeight] = useState('');
    const [warpShrinkageRange , setWarpShrinkageRange] = useState('');
    const [weftShrinkageRange , setWeftShrinkageRange] = useState('');
    const [stretch , setStretch] = useState('');
    const [growth , setGrowth] = useState('');
    const [composition , setComposition] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const articleName = await AsyncStorage.getItem('ArticleName');
                if (articleName !== null) {
                    setArticleName(articleName);
                }
                const IDS = await AsyncStorage.getItem('IDS');
                if (IDS !== null) {
                    setIDS(IDS);
                }
                const finishType = await AsyncStorage.getItem('FinishType');
                if (finishType !== null) {
                    setFinishType(finishType);
                }
                const weave = await AsyncStorage.getItem('Weave');
                if (weave !== null) {
                    setWeave(weave);
                }
                const fullWidth = await AsyncStorage.getItem('FullWidth');
                if (fullWidth !== null) {
                    setFullWidth(fullWidth);
                }
                const yardFOB_LC_sight = await AsyncStorage.getItem('yardFOB_LC_sight');
                if (yardFOB_LC_sight !== null) {
                    setYardFOB_LC_sight(yardFOB_LC_sight);
                }
                const color = await AsyncStorage.getItem('Color');
                if (color !== null) {
                    setColor(color);
                }
                const beforeWashWeight = await AsyncStorage.getItem('BeforeWashWeight');
                if (beforeWashWeight !== null) {
                    setBeforeWashWeight(beforeWashWeight);
                }
                const afterWashWeight = await AsyncStorage.getItem('AfterWashWeight');
                if (afterWashWeight !== null) {
                    setAfterWashWeight(afterWashWeight);
                }    
                const warpShrinkageRange = await AsyncStorage.getItem('WarpShrinkageRange');
                if (warpShrinkageRange !== null) {
                    setWarpShrinkageRange(warpShrinkageRange);
                }    
                const weftShrinkageRange = await AsyncStorage.getItem('weftShrinkageRange');
                if (weftShrinkageRange !== null) {
                    setWeftShrinkageRange(weftShrinkageRange);
                }
                const stretch = await AsyncStorage.getItem('Stretch');
                if (stretch !== null) {
                    setStretch(stretch);
                }
                const growth = await AsyncStorage.getItem('Growth');
                if (growth !== null) {
                    setGrowth(growth);
                }
                const composition = await AsyncStorage.getItem('Composition');
                if (composition !== null) {
                    setComposition(composition);
                }
            } catch (error) {
                console.log('Error retrieving data:', error);
            }
        };

        fetchData();
    }, []);
    

    return (
        <SafeAreaView style={[AppStyles.container]}>
            <ImageBackground source={Images.purple_background} style={{ flex: 1 }}>
                <View style={[CollectionDetailStyles.center]}>
                    <Text style={CollectionDetailStyles.heading}>
                        Collection Detail
                    </Text>
                    <View style={[AppStyles.horizontalLine, { width: wp(40) }]} />
                    <View style={CollectionDetailStyles.detailView}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={CollectionDetailStyles.detailText}>
                            Article Name : {articleName}
                        </Text>
                        <Text style={CollectionDetailStyles.detailText}>
                            IDS : {IDS}
                        </Text>
                        <Text style={CollectionDetailStyles.detailText}>

                            Finish Type : {finishType}
                        </Text>
                        <Text style={CollectionDetailStyles.detailText}>
                            Full Width : {fullWidth}
                        </Text>
                        <Text style={CollectionDetailStyles.detailText}>
                            Weave : {weave}
                        </Text>
                        <Text style={CollectionDetailStyles.detailText}>
                            Color : {color}
                        </Text>
                        <Text style={CollectionDetailStyles.detailText}>
                            After wash Weight Oz(+/+-5%) : {afterWashWeight}
                        </Text>
                        <Text style={CollectionDetailStyles.detailText}>
                            Before wash Weight Oz(+/-5%) : {beforeWashWeight}
                        </Text>
                        <Text style={CollectionDetailStyles.detailText}>
                            Shrink% Warp : {warpShrinkageRange}
                        </Text>
                        <Text style={CollectionDetailStyles.detailText}>
                            Shrink% Weft : {weftShrinkageRange}
                        </Text>
                        <Text style={CollectionDetailStyles.detailText}>
                            Stretch% : {stretch}
                        </Text>
                        <Text style={CollectionDetailStyles.detailText}>
                            Growth% : {growth}
                        </Text>
                        <Text style={CollectionDetailStyles.detailText}>
                            Composition : {composition}
                        </Text>
                        </ScrollView>
                    </View>
                    <View style={CollectionDetailStyles.btnView}>
                        <Button title={'next'} onPress={next} style={CollectionDetailStyles.btn} />
                        <Button title={'Add Extra Detail'} onPress={() => navigation.navigate("AddExtraDetail")} style={CollectionDetailStyles.btn} />
                    </View>
                </View>

            </ImageBackground>
        </SafeAreaView>
    );
}
