import { StreamContext } from '../CustomCode';
import { Channel, MessageList, MessageInput } from 'stream-chat-expo';
import { View } from 'react-native';
import { useContext } from 'native';
import { useHeaderHeight } from '@react-navigation/stack';

export const ChannelMod = ({ navigation }) => {
  const headerHeight = useHeaderHeight();
  const { setThread, channel, thread } = useContext(StreamContext);

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
            navigation.navigate('Thread');
          }}
        />
        <MessageInput />
      </View>
    </Channel>
  );
};
