import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { BottomTabParamList, HomeParamList, SettingsParamList } from '../types/types';
import AddTransactionModal from '../components/AddTransaction/AddTransactionModal';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: '#FF8B96', style: { backgroundColor: '#303030' } }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          title: "General",
          tabBarIcon: ({ color }) => <TabBarIcon name="eye" color={color} />,
        }}

      />
      <BottomTab.Screen name="AddTransaction" component={AddTransactionComponent} options={{
        tabBarButton: () => (<AddTransactionModal />),
      }} />
      <BottomTab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="settings" color={color} />,
          title: "Configuraciones",
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator headerMode="none" >
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
      />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator<SettingsParamList>();

function SettingsNavigator() {
  return (
    <SettingsStack.Navigator >
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Configuraciones',
          headerShown: true,
          headerLeft: ()=> null,
          gestureEnabled:false
        }}
      />
    </SettingsStack.Navigator>
  );
}


const AddTransactionComponent = () => {
  return null
}