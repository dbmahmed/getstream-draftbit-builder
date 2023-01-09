import { OverlayProvider, Chat, Streami18n } from 'stream-chat-expo';
import { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStreamChatTheme } from '../useStreamChatTheme.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { StreamChat } from 'stream-chat';

export const GetStreamChatProvider = ({ children }) => {
  const bottom = useSafeAreaInsets();
  const theme = useStreamChatTheme();
  const variables = GlobalVariables.useValues();
  const setVariables = GlobalVariables.useSetValue();

  const [clientReady, setClientReady] = useState(false);

  // console.log('in the wrapper', variables.GS_API_KEY, variables.USER, variables.GS_USER_TOKEN)
  const chatClient = StreamChat.getInstance(variables.GS_API_KEY);
  const streami18n = new Streami18n({
    language: 'en',
  });

  useEffect(() => {
    const setupClient = async () => {
      try {
        console.log(
          `Connecting with api_key ${variables.GS_API_KEY} user_id: ${variables.USER.id} GSTOKEN: ${variables.GS_USER_TOKEN}`
        );
        await chatClient.connectUser(variables.USER, variables.GS_USER_TOKEN);
        await setVariables({ key: 'GS_CLIENT_CONNECTED', value: true });
      } catch (e) {
        console.log('error while connecting user', e.message);
      }

      setClientReady(true);
    };
    if (
      !variables.GS_CLIENT_CONNECTED &&
      variables.GS_USER_TOKEN &&
      variables.USER?.id
    )
      setupClient();
    return async () => {
      if (variables.GS_CLIENT_CONNECTED) {
        chatClient.disconnectUser();
        await setVariables({ key: 'GS_CLIENT_CONNECTED', value: true });
      }
    };
  }, [variables.USER?.id, variables.GS_USER_TOKEN]);
  return clientReady ? (
    <OverlayProvider
      bottomInset={bottom}
      i18nInstance={streami18n}
      translucentStatusBar
      value={{ style: theme }}
    >
      <Chat client={chatClient} i18nInstance={streami18n}>
        {children}
      </Chat>
    </OverlayProvider>
  ) : (
    <View style={styles.Viewbf78ff24}>
      <ActivityIndicator
        style={styles.ActivityIndicator89fafeca}
        animating={true}
        hidesWhenStopped={true}
        size={'large'}
      />
    </View>
  );
};

export const GetStreamChatProvider1 = ({ children }) => {
  const bottom = useSafeAreaInsets();
  const theme = useStreamChatTheme();
  const variables = GlobalVariables.useValues();

  const [clientReady, setClientReady] = useState(false);

  // console.log('in the wrapper', variables.GS_API_KEY, variables.USER, variables.GS_USER_TOKEN)
  const chatClient = StreamChat.getInstance('x65f7n98t9nq');
  const streami18n = new Streami18n({
    language: 'en',
  });

  const User = { id: '843048b9-4ed3-4689-9b84-57d6355af535' };

  const GSTOKEN =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiODQzMDQ4YjktNGVkMy00Njg5LTliODQtNTdkNjM1NWFmNTM1In0.imJl_ZZg0yNYBRA5VHYMEUaTmRt6O0y6fN7m_A6upzk';

  useEffect(() => {
    const setupClient = async () => {
      try {
        console.log(`Connecting with user_id: ${User.id} GSTOKEN: ${GSTOKEN}`);
        await chatClient.connectUser(User, GSTOKEN);
      } catch (e) {
        console.log('error while connecting user', e.message);
      }

      setClientReady(true);
    };
    if (GSTOKEN && User?.id) setupClient();
    return () => chatClient.disconnectUser();
  }, []);
  return clientReady ? (
    <OverlayProvider
      bottomInset={bottom}
      i18nInstance={streami18n}
      translucentStatusBar
      value={{ style: theme }}
    >
      <Chat client={chatClient} i18nInstance={streami18n}>
        {children}
      </Chat>
    </OverlayProvider>
  ) : (
    <View style={styles.Viewbf78ff24}>
      <ActivityIndicator
        style={styles.ActivityIndicator89fafeca}
        animating={true}
        hidesWhenStopped={true}
        size={'large'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ActivityIndicator89fafeca: { height: 36, width: 36 },
  View2200bac7: { height: '100%' },
  Viewbf78ff24: { alignItems: 'center', flex: 1, justifyContent: 'center' },
});
