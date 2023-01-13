// This import is required if you are defining react components in this module.
import React from 'react';

// Add any other imports you need here. Make sure to add those imports (besides "react"
// and "react-native") to the Packages section.

import { IconButton } from '@draftbit/ui';
import {
  OverlayProvider,
  Streami18n,
  Chat,
  Channel,
  ChannelList,
  MessageInput,
  MessageList,
  Thread,
} from 'stream-chat-expo';
import { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStreamChatTheme } from '../useStreamChatTheme.js';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { StreamChat } from 'stream-chat';
// Define and export your components as named exports here.
const useClient = ({ apiKey, userData, tokenOrProvider }) => {
  const [chatClient, setChatClient] = useState(null);

  useEffect(() => {
    const client = new StreamChat(apiKey);
    // prevents application from setting stale client (user changed, for example)
    let didUserConnectInterrupt = false;

    const connectionPromise = client
      .connectUser(userData, tokenOrProvider)
      .then(() => {
        if (!didUserConnectInterrupt) setChatClient(client);
      });

    return () => {
      didUserConnectInterrupt = true;
      setChatClient(null);
      // wait for connection to finish before initiating closing sequence
      connectionPromise
        .then(() => client.disconnectUser())
        .then(() => {
          console.log('connection closed');
        });
    };
  }, [apiKey, userData.id, tokenOrProvider]);

  return chatClient;
};
// You can use components exported from this file within a Custom Code component as
// <G.MyExampleComponent />
export const GSChat = ({ APIKEY, USER, GSTOKEN, filters, theme }) => {
  const bottom = useSafeAreaInsets();
  const stheme = useStreamChatTheme();
  const [channel, setChannel] = useState();
  const [thread, setThread] = useState();
  const onBackPress = () => {
    if (thread) {
      setThread(undefined);
    } else if (channel) {
      setChannel(undefined);
    }
  };

  const streami18n = new Streami18n({
    language: 'en',
  });

  const chatClient = GSTOKEN
    ? useClient({
        apiKey: APIKEY,
        userData: USER,
        tokenOrProvider: GSTOKEN,
      })
    : null;

  const sort = { last_message_at: -1 };
  const options = {
    state: true,
    watch: true,
  };

  return chatClient ? (
    <OverlayProvider
      bottomInset={bottom}
      i18nInstance={streami18n}
      translucentStatusBar
      value={{ style: stheme }}
    >
      <>
        {!channel ? null : (
          <IconButton
            onPress={() => {
              try {
                onBackPress();
              } catch (err) {
                console.error(err);
              }
            }}
            style={styles(theme).IconButtonb180632a}
            size={32}
            icon={'Ionicons/arrow-back'}
            color={theme.colors['Light']}
          />
        )}
      </>
      <View style={{ flex: 1 }}>
        <Chat client={chatClient}>
          {channel ? (
            <Channel
              channel={channel}
              keyboardVerticalOffset={60}
              thread={thread}
              threadList={!!thread}
            >
              {thread ? (
                <Thread />
              ) : (
                <>
                  <MessageList onThreadSelect={setThread} />
                  <MessageInput />
                </>
              )}
            </Channel>
          ) : (
            <ChannelList
              onSelect={setChannel}
              filters={filters}
              sort={sort}
              options={options}
            />
          )}
        </Chat>
      </View>
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

const styles = theme =>
  StyleSheet.create({
    ActivityIndicator89fafeca: { height: 36, width: 36 },
    View2200bac7: { height: '100%' },
    Viewbf78ff24: { alignItems: 'center', flex: 1, justifyContent: 'center' },
    IconButtonb180632a: { marginLeft: 16, marginTop: 16 },
  });
