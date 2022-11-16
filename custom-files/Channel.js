import { Channel, MessageList, MessageInput } from 'stream-chat-expo';
import { View } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import * as GlobalVariables from '../config/GlobalVariableContext';

export const ChannelMod = ({ navigation }) => {
  const headerHeight = useHeaderHeight();
  const variables = GlobalVariables.useValues();
  const setVariables = GlobalVariables.useSetValue();
  const channel = variables.CHANNEL;
  const thread = variables.THREAD;
  const setThread = t => setVariables({ key: 'TRHEAD', value: t });

  return (
    <Channel
      channel={channel}
      keyboardVerticalOffset={headerHeight}
      thread={thread}
    >
      <View style={{ flex: 1 }}>
        <MessageList
          onThreadSelect={thread => {
            setThread(thread);
            navigation.navigate('ThreadScreen');
          }}
        />
        <MessageInput />
      </View>
    </Channel>
  );
};
