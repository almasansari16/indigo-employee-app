import { View, Text, SafeAreaView, ScrollView, Alert, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { AddCollectionStyle } from './styles';
import { Icon, IconInput, IconType } from '../../components';
import Button from '../../components/Button';
import { AppStyles } from '../../theme/AppStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Images from '../../theme/Images';
import { hp, wp } from '../../../App';
import LinearGradient from 'react-native-linear-gradient'; // import LinearGradient


export default function AddCollection({ navigation }) {
  const [addCollection, setAddCollection] = useState({
    articleName: '',
    finishType: '',
    weave: '',
    fullWidth: '',
    yardFOB_LC_sight: '',
    color: '',
    beforeWashWeight: '',
    afterWashWeight: '',
    warpShrinkageRange: '',
    weftShrinkageRange: '',
    stretch: '',
    growth: '',
    composition: ''
  });

  const [validation, setValidation] = useState({});

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('ArticleName', addCollection.articleName);
      await AsyncStorage.setItem('FinishType', addCollection.finishType);
      await AsyncStorage.setItem('FullWidth', addCollection.fullWidth);
      await AsyncStorage.setItem('Weave', addCollection.weave);
      await AsyncStorage.setItem(
        'yardFOB_LC_sight',
        addCollection.yardFOB_LC_sight,
      );
      await AsyncStorage.setItem('Color', addCollection.color);
      await AsyncStorage.setItem('BeforeWashWeight', addCollection.beforeWashWeight);
      await AsyncStorage.setItem('AfterWashWeight', addCollection.afterWashWeight);
      await AsyncStorage.setItem('WarpShrinkageRange', addCollection.warpShrinkageRange);
      await AsyncStorage.setItem('WeftShrinkageRange', addCollection.weftShrinkageRange);
      await AsyncStorage.setItem('Stretch', addCollection.stretch);
      await AsyncStorage.setItem('Growth', addCollection.growth);
      await AsyncStorage.setItem('Composition', addCollection.composition)

    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSave = () => {
    const errors = {};

    if (!addCollection.articleName) {
      errors.articleName = 'Article Name is required';
    }

    if (!addCollection.finishType) {
      errors.finishType = 'Finish Type is required';
    }
    if (!addCollection.weave) {
      errors.weave = 'Weave is required';
    }
    if (!addCollection.fullWidth) {
      errors.fullWidth = 'Full Width is required';
    }
    if (!addCollection.yardFOB_LC_sight) {
      errors.yardFOB_LC_sight = 'S/yard FOB LC Sight is required';
    }
    if (!addCollection.color) {
      errors.color = 'Color is required';
    }
    if (!addCollection.beforeWashWeight) {
      errors.beforeWashWeight = 'Before Wash Weight is required';
    }
    if (!addCollection.afterWashWeight) {
      errors.afterWashWeight = 'After Wash Weight is required';
    }
    if (!addCollection.warpShrinkageRange) {
      errors.warpShrinkageRange = 'Warp Shrinkage Range is required';
    }
    if (!addCollection.weftShrinkageRange) {
      errors.weftShrinkageRange = 'Weft Shrinkage Range is required';
    }

    if (!addCollection.stretch) {
      errors.stretch = 'Strech is required';
    }
    if (!addCollection.growth) {
      errors.growth = 'Growth is required';
    }
    if (!addCollection.composition) {
      errors.composition = 'Composition is required';
    }
    setValidation(errors);

    if (Object.keys(errors).length === 0) {
      // Proceed with form submission
      saveData();
      navigation.navigate('AllCollectionList');
    }
  };

  // const handleCamera = () => {
  //   navigation.navigate("CameraPage")
  // }
  return (
    <SafeAreaView style={[AppStyles.container]}>
     <LinearGradient
        colors={['#ba6b4d', '#f9f1da', '#ba6b4d']}
        style={{flex:1}}
        start={{x: 0.3, y: 0}}
        end={{x: 1, y: 1}}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[AddCollectionStyle.center]}>
            <IconInput
              // icon={
              //   <Icon
              //     type={IconType.FontAwesome5}
              //     name={'user'}
              //     color="#282561"
              //     style={{margin: 15}}
              //   />
              // }
              placeholder={'Article Name'}
              placeholderTextColor={'#282561'}
              onChangeText={articleName => setAddCollection({ ...addCollection, articleName })}
              value={addCollection.articleName}
              style={AddCollectionStyle.input}
              error={validation.articleName}
            />
            <IconInput
              // icon={
              //   <Icon
              //     type={IconType.Feather}
              //     name={'phone'}
              //     color="#282561"
              //     style={{margin: 15}}
              //   />
              // }
              placeholder={'Finish Type'}
              placeholderTextColor={'#282561'}
              keyboardType={'number-pad'}
              onChangeText={finishType => setAddCollection({ ...addCollection, finishType })}
              value={addCollection.finishType}
              style={AddCollectionStyle.input}
              error={validation.finishType}
            />
            <IconInput
              // icon={
              //   <Icon
              //     type={IconType.Ionicons}
              //     name={'location-outline'}
              //     color="#282561"
              //     style={{margin: 15}}
              //   />
              // }
              placeholder={'Weave'}
              placeholderTextColor={'#282561'}
              onChangeText={weave => setAddCollection({ ...addCollection, weave })}
              value={addCollection.weave}
              style={AddCollectionStyle.input}
              error={validation.weave}
            />
            <IconInput
              // icon={
              //   <Icon
              //     type={IconType.Ionicons}
              //     name={'location-outline'}
              //     color="#282561"
              //     style={{margin: 15}}
              //   />
              // }
              placeholder={'Full Width'}
              placeholderTextColor={'#282561'}
              onChangeText={fullWidth =>
                setAddCollection({ ...addCollection, fullWidth })
              }
              value={addCollection.fullWidth}
              style={AddCollectionStyle.input}
              error={validation.fullWidth}
            />
            <IconInput
              // icon={
              //   <Icon
              //     type={IconType.MaterialCommunityIcons}
              //     name={'email-outline'}
              //     color="#282561"
              //     style={{margin: 15}}
              //   />
              // }
              placeholder={'$/yard FOB LC Sight'}
              placeholderTextColor={'#282561'}
              keyboardType={'email-address'}
              onChangeText={yardFOB_LC_sight => setAddCollection({ ...addCollection, yardFOB_LC_sight })}
              value={addCollection.yardFOB_LC_sight}
              style={AddCollectionStyle.input}
              error={validation.yardFOB_LC_sight}
            />
            <IconInput
              // icon={
              //   <Icon
              //     type={IconType.Feather}
              //     name={'camera'}
              //     color="#282561"
              //     style={{margin: 15}}
              //   />
              // }
              placeholder={'Color'}
              placeholderTextColor={'#282561'}
              onChangeText={color => setAddCollection({ ...addCollection, color })}
              value={addCollection.color}
              style={AddCollectionStyle.input}
              error={validation.color}
            />
            <IconInput
              // icon={
              //   <Icon
              //     type={IconType.Feather}
              //     name={'camera'}
              //     color="#282561"
              //     style={{margin: 15}}
              //   />
              // }
              placeholder={'Before wash weight (OZ)+/-5%'}
              placeholderTextColor={'#282561'}
              onChangeText={beforeWashWeight => setAddCollection({ ...addCollection, beforeWashWeight })}
              value={addCollection.beforeWashWeight}
              style={AddCollectionStyle.input}
              error={validation.beforeWashWeight}
            />
            <IconInput
              // icon={
              //   <Icon
              //     type={IconType.Feather}
              //     name={'camera'}
              //     color="#282561"
              //     style={{margin: 15}}
              //   />
              // }
              placeholder={'After wash weight (Oz)+/-5%'}
              placeholderTextColor={'#282561'}
              onChangeText={afterWashWeight => setAddCollection({ ...addCollection, afterWashWeight })}
              value={addCollection.afterWashWeight}
              style={AddCollectionStyle.input}
              error={validation.afterWashWeight}
            />
            <IconInput
              placeholder={'Warp Shrinkage Range'}
              placeholderTextColor={'#282561'}
              value={addCollection.warpShrinkageRange}
              onChangeText={warpShrinkageRange => setAddCollection({ ...addCollection, warpShrinkageRange })}
              style={AddCollectionStyle.input}
              error={validation.warpShrinkageRange} />
            <IconInput
              placeholder={'Weft Shrinkage Range'}
              placeholderTextColor={'#282561'}
              value={addCollection.weftShrinkageRange}
              onChangeText={weftShrinkageRange => setAddCollection({ ...addCollection, weftShrinkageRange })}
              style={AddCollectionStyle.input}
              error={validation.weftShrinkageRange} />
            <IconInput
              placeholder={'Stretch%'}
              placeholderTextColor={'#282561'}
              value={addCollection.stretch}
              onChangeText={stretch => setAddCollection({ ...addCollection, stretch })}
              style={AddCollectionStyle.input}
              error={validation.stretch} />
            <IconInput
              placeholder={'Growth'}
              placeholderTextColor={'#282561'}
              value={addCollection.growth}
              onChangeText={growth => setAddCollection({ ...addCollection, growth })}
              style={AddCollectionStyle.input}
              error={validation.growth} />
            <IconInput
              placeholder={'Composition'}
              placeholderTextColor={'#282561'}
              value={addCollection.composition}
              onChangeText={composition => setAddCollection({ ...addCollection, composition })}
              style={AddCollectionStyle.input}
              error={validation.composition} />
          </View>
          <View style={AddCollectionStyle.btnView}>
            <Button title={'Save'} onPress={handleSave} style={AddCollectionStyle.btn} textStyle={AddCollectionStyle.text} />
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
