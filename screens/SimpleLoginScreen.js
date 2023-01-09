import React from 'react';
import * as SportsbettingAPIAuthEndpointsApi from '../apis/SportsbettingAPIAuthEndpointsApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as CustomCode from '../custom-files/CustomCode.js';
import createUserObj from '../global-functions/createUserObj';
import formattedAuthHeader from '../global-functions/formattedAuthHeader';
import {
  ButtonSolid,
  Link,
  ScreenContainer,
  Spacer,
  withTheme,
} from '@draftbit/ui';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SimpleLoginScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const canSignUp = () => {
    return username.length > 0 && password.length > 0;
  };

  const { theme } = props;
  const { navigation } = props;

  const [isSigningUp, setIsSigningUp] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');

  return (
    <ScreenContainer>
      <KeyboardAwareScrollView
        style={styles(theme).KeyboardAwareScrollView989db244}
        contentContainerStyle={
          styles(theme).KeyboardAwareScrollView2b66e99eContent
        }
      >
        {/* Header */}
        <View style={styles(theme).View39912261}>
          {/* Title */}
          <Text style={styles(theme).Textb7df8681}>{'Welcome Back!'}</Text>
          {/* Subtitle */}
          <Text style={styles(theme).Textf51af5e8}>
            {'Sign in to your account to continue'}
          </Text>
        </View>
        {/* Login Form */}
        <View style={styles(theme).View1e98c651}>
          {/* Error Message */}
          <Text style={styles(theme).Text6789b8ec}>{null}</Text>
          {/* Username */}
          <TextInput
            onChangeText={newUsernameValue => {
              try {
                setUsername(newUsernameValue);
              } catch (err) {
                console.error(err);
              }
            }}
            style={styles(theme).TextInputa4869d83}
            placeholder={'Username'}
            value={username}
            keyboardType={'email-address'}
            textContentType={'emailAddress'}
            autoCapitalize={'none'}
          />
          <Spacer top={12} right={8} bottom={12} left={8} />
          {/* Password Input */}
          <TextInput
            onChangeText={newPasswordInputValue => {
              try {
                setPassword(newPasswordInputValue);
              } catch (err) {
                console.error(err);
              }
            }}
            style={styles(theme).TextInput34ffd2e4}
            value={password}
            placeholder={'Password'}
            secureTextEntry={true}
          />
          <Spacer top={24} right={8} bottom={24} left={8} />
          {/* Sign In Button */}
          <ButtonSolid
            onPress={() => {
              const handler = async () => {
                try {
                  setIsSigningUp(true);
                  const authObj =
                    await SportsbettingAPIAuthEndpointsApi.loginPOST(
                      Constants,
                      { loginIdentity: username, passwrd: password }
                    );
                  setGlobalVariableValue({
                    key: 'USER',
                    value: createUserObj(authObj?.internalId),
                  });
                  setGlobalVariableValue({
                    key: 'AUTH_HEADER',
                    value: formattedAuthHeader(authObj?.accessToken),
                  });
                  console.log(authObj);
                  setIsSigningUp(false);
                  navigation.navigate('StackNavigator', {
                    screen: 'ChannelListScreen',
                  });
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
            style={styles(theme).ButtonSolidfe5f3af3}
            disabled={!canSignUp()}
            loading={isSigningUp}
            title={'Sign in'}
          />
          <Spacer top={16} right={8} bottom={16} left={8} />
          <View style={styles(theme).View8bb6a2bc}>
            <Text>{'New User?'}</Text>
            <Spacer top={8} right={2} bottom={8} left={2} />
            {/* Sign Up Link */}
            <Link style={styles(theme).Linkd3707c9f} title={'Sign up!'} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

const styles = theme =>
  StyleSheet.create({
    ButtonSolidfe5f3af3: {
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      fontFamily: 'System',
      fontWeight: '700',
      paddingBottom: 16,
      paddingTop: 16,
      textAlign: 'center',
    },
    KeyboardAwareScrollView2b66e99eContent: {
      flex: 1,
      justifyContent: 'center',
    },
    Linkd3707c9f: { color: theme.colors.primary },
    Text6789b8ec: {
      color: theme.colors.error,
      fontSize: 12,
      marginBottom: 16,
      textAlign: 'center',
    },
    TextInput34ffd2e4: {
      borderBottomWidth: 1,
      borderColor: theme.colors.divider,
      borderLeftWidth: 1,
      borderRadius: 8,
      borderRightWidth: 1,
      borderTopWidth: 1,
      fontFamily: 'System',
      fontWeight: '400',
      paddingBottom: 16,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 16,
    },
    TextInputa4869d83: {
      borderBottomWidth: 1,
      borderColor: theme.colors.divider,
      borderLeftWidth: 1,
      borderRadius: 8,
      borderRightWidth: 1,
      borderTopWidth: 1,
      fontFamily: 'System',
      fontWeight: '400',
      paddingBottom: 16,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 16,
    },
    Textb7df8681: {
      fontFamily: 'System',
      fontSize: 36,
      fontWeight: '600',
      textAlign: 'center',
    },
    Textf51af5e8: {
      fontFamily: 'System',
      fontSize: 14,
      fontWeight: '400',
      marginTop: 4,
    },
    View1e98c651: { marginTop: 24, paddingLeft: 36, paddingRight: 36 },
    View39912261: { alignItems: 'center' },
    View8bb6a2bc: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 12,
    },
  });

export default withTheme(SimpleLoginScreen);
