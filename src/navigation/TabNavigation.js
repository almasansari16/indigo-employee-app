import React, {useEffect, useReducer, useRef} from 'react';
import {
  Pressable,
  StatusBar,
  StyleSheet,
  View,
  Text,
  LayoutChangeEvent,
} from 'react-native';
// navigation
import {NavigationContainer} from '@react-navigation/native';
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// svg
import Svg, {Path} from 'react-native-svg';
// reanimated
import Animated, {
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
} from 'react-native-reanimated';
// lottie
import Lottie from 'lottie-react-native';
import {Icon, IconType} from '../components';
import {hp} from '../../App';
import Dashboard from '../screens/dashboard/Dashboard';
import AllCollectionList from '../screens/allCollection/AllCollectionList';
import AllCustomersList from '../screens/allCustomers/AllCustomersList';


// ------------------------------------------------------------------

const Tab = createBottomTabNavigator();

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export default TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <AnimatedTabBar {...props} />}>
      <Tab.Screen
        name="Dashboard"
        options={{
          tabBarIcon: (focused, color, size) => (
            <Icon
              name={'view-dashboard'}
              type={IconType.MaterialCommunityIcons}
              size={hp(2.3)}
              color={focused ? 'white' : '#00000065'}
            />
          ),
        }}
        component={Dashboard}
      />
      <Tab.Screen
        name="AllCollectionList"
        options={{
          tabBarIcon: (focused, color, size) => (
            <Icon
              name={'collections'}
              type={IconType.MaterialIcons}
              size={hp(2.3)}
              color={focused ? 'white' : '#00000065'}
            />
          ),
        }}
        component={AllCollectionList}
      />
      <Tab.Screen
        name="AllCustomersList"
        options={{
          tabBarIcon: (focused, color, size) => (
            <Icon
              name={'users'}
              type={IconType.FontAwesome}
              size={hp(2.3)}
              color={focused ? 'white' : '#00000065'}
            />
          ),
        }}
        component={AllCustomersList}
      />
    </Tab.Navigator>
  );
};

const PlaceholderScreen = () => {
  return <View style={{flex: 1, backgroundColor: '#172246'}} />;
};

const AnimatedTabBar = ({
  state: {index: activeIndex, routes},
  navigation,
  descriptors,
}) => {
  const {bottom} = useSafeAreaInsets();

  const reducer = (state, action) => {
    return [...state, {x: action?.x, index: action?.index}];
  };

  const [layout, dispatch] = useReducer(reducer, []);

  const handleLayout = (event, index) => {
    dispatch({x: event.nativeEvent.layout.x, index});
  };

  const xOffset = useDerivedValue(() => {
    if (layout.length !== routes.length) return 0;
    return [...layout].find(({index}) => index === activeIndex)?.x - 25;
  }, [activeIndex, layout]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: withTiming(xOffset.value, {duration: 250})}],
    };
  });

  return (
    <View style={[styles.tabBar, {paddingBottom: hp(1)}]}>
      <AnimatedSvg
        width={110}
        height={60}
        viewBox="0 0 110 60"
        style={[styles.activeBackground, animatedStyles]}>
        <Path
          fill="#172246"
          d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
        />
      </AnimatedSvg>

      <View style={styles.tabBarContainer}>
        {routes.map((route, index) => {
          const active = index === activeIndex;
          const {options} = descriptors[route.key];

          return (
            <TabBarComponent
              key={route.key}
              active={active}
              options={options}
              onLayout={e => handleLayout(e, index)}
              onPress={() => navigation.navigate(route.name)}
            />
          );
        })}
      </View>
    </View>
  );
};

const TabBarComponent = ({active, options, onLayout, onPress}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (active && ref?.current) {
      ref.current.play();
    }
  }, [active]);

  const animatedComponentCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(active ? 1 : 0, {duration: 250}),
        },
      ],
    };
  });

  const animatedIconContainerStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active ? 1 : 0.5, {duration: 250}),
    };
  });

  return (
    <Pressable onPress={onPress} onLayout={onLayout} style={styles.component}>
      <Animated.View
        style={[styles.componentCircle, animatedComponentCircleStyles]}
      />
      <Animated.View
        style={[styles.iconContainer, animatedIconContainerStyles]}>
        {/* @ts-ignore */}
        {options.tabBarIcon ? options.tabBarIcon({ref}) : <Text>?</Text>}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#3D3658',
  },
  activeBackground: {
    position: 'absolute',
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  component: {
    height: 60,
    width: 60,
    marginTop: -5,
  },
  componentCircle: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: '#584e7f',
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 36,
    width: 36,
  },
});