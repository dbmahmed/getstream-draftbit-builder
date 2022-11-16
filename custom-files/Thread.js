import React from 'react';
import { useHeaderHeight } from '@react-navigation/stack';

import { Channel, Thread } from 'stream-chat-expo';
import * as GlobalVariables from '../config/GlobalVariableContext';

export const Screen = () => {
  const variables = GlobalVariables.useValues();
  const setVariables = GlobalVariables.useSetValue();

  const channel = variables.CHANNEL;
  const thread = variables.THREAD;
  const setThread = t => setVariables({ key: 'THREAD', value: t });

  const headerHeight = useHeaderHeight();

  return (
    <Channel
      channel={channel}
      keyboardVerticalOffset={headerHeight}
      thread={thread}
      threadList
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
        }}
      >
        <Thread onThreadDismount={() => setThread(null)} />
      </View>
    </Channel>
  );
};
