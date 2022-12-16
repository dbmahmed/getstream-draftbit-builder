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

  const [clientReady, setClientReady] = useState(false);

  console.log(
    'in the wrapper',
    variables.GS_API_KEY,
    variables.USER,
    variables.GS_USER_TOKEN
  );
  const chatClient = StreamChat.getInstance(variables.GS_API_KEY);
  const streami18n = new Streami18n({
    language: 'en',
  });

  useEffect(() => {
    const setupClient = async () => {
      try {
        await chatClient.connectUser(variables.USER, variables.GS_USER_TOKEN);
      } catch (e) {
        console.log('error while connecting user', e.message);
      }

      setClientReady(true);
    };

    setupClient();
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
