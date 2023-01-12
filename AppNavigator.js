import * as React from 'react';
import { I18nManager, Platform, StyleSheet, Text, View } from 'react-native';
import { systemWeights } from 'react-native-typography';
import { Icon, Touchable } from '@draftbit/ui';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import theme from './themes/DraftbitTheme.js';
import LinkingConfiguration from './LinkingConfiguration.js';

import ChannelListScreen from './screens/ChannelListScreen';
import ChannelListVaultScreen from './screens/ChannelListVaultScreen';
import ChannelScreen from './screens/ChannelScreen';
import GetStreamChatScreen from './screens/GetStreamChatScreen';
import SimpleLoginScreen from './screens/SimpleLoginScreen';
import ThreadScreen from './screens/ThreadScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Placeholder() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#131A2A',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 36,
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 12,
          color: '#FFF',
        }}
      >
        Missing Screen
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          color: '#FFF',
          marginBottom: 8,
        }}
      >
        This screen is not in a navigator.
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          color: '#FFF',
          marginBottom: 8,
        }}
      >
        Go to Navigation mode, and click the + (plus) icon in the Navigator tab
        on the left side to add this screen to a Navigator.
      </Text>
      <Text style={{ textAlign: 'center', fontSize: 16, color: '#FFF' }}>
        If the screen is in a Tab Navigator, make sure the screen is assigned to
        a tab in the Config panel on the right.
      </Text>
    </View>
  );
}
function StackNavigator() {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="ChannelListVaultScreen"
    >
      <Stack.Screen
        name="ChannelListVaultScreen"
        component={ChannelListVaultScreen}
        options={{ headerTitle: 'Channel List', title: 'ChannelList Vault' }}
      />
      <Stack.Screen
        name="ChannelScreen"
        component={ChannelScreen}
        options={{
          headerTitle: 'Channel',
          headerLeft: ({ tintColor, onPress, canGoBack }) =>
            canGoBack ? null : (
              <View
                style={[styles.headerContainer, styles.headerContainerLeft]}
              >
                <Icon
                  name="AntDesign/arrowleft"
                  size={Platform.OS === 'ios' ? 21 : 24}
                  color={tintColor}
                  onPress={onPress}
                  style={[styles.headerIcon, styles.headerIconLeft]}
                />
              </View>
            ),
          title: 'Channel',
        }}
      />
      <Stack.Screen
        name="ThreadScreen"
        component={ThreadScreen}
        options={{
          headerTitle: 'Thread',
          headerLeft: ({ tintColor, onPress, canGoBack }) =>
            canGoBack ? null : (
              <View
                style={[styles.headerContainer, styles.headerContainerLeft]}
              >
                <Icon
                  name="AntDesign/arrowleft"
                  size={Platform.OS === 'ios' ? 21 : 24}
                  color={tintColor}
                  onPress={onPress}
                  style={[styles.headerIcon, styles.headerIconLeft]}
                />
              </View>
            ),
          title: 'Thread',
        }}
      />
      <Stack.Screen
        name="ChannelListScreen"
        component={ChannelListScreen}
        options={{ title: 'ChannelList' }}
      />
      <Stack.Screen
        name="SimpleLoginScreen"
        component={SimpleLoginScreen}
        options={{ title: 'Simple Login' }}
      />
    </Stack.Navigator>
  );
}

export default function RootAppNavigator() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <Stack.Navigator
        headerMode="none"
        initialRouteName="StackNavigator"
        screenOptions={{
          headerTransparent: false,
        }}
      >
        <Stack.Screen
          name="GetStreamChatScreen"
          component={GetStreamChatScreen}
          options={{ title: 'GetStreamChat' }}
        />
        <Stack.Screen name="StackNavigator" component={StackNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerIcon: Platform.select({
    ios: {
      marginVertical: 12,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
    default: {
      margin: 3,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
  }),
  headerIconLeft: Platform.select({
    ios: {
      marginRight: 6,
    },
  }),
  headerIconRight: Platform.select({
    ios: {
      marginLeft: 6,
    },
  }),
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    ...Platform.select({
      ios: null,
      default: {
        marginVertical: 3,
        marginHorizontal: 11,
      },
    }),
  },
  headerContainerLeft: Platform.select({
    ios: {
      marginLeft: 8,
    },
  }),
  headerContainerRight: Platform.select({
    ios: {
      marginRight: 8,
    },
  }),
  headerLabelWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headerLabel: {
    fontSize: 17,
    letterSpacing: 0.35,
  },
});
