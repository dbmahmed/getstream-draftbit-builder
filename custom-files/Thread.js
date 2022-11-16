// This import is required if you are defining react components in this module.
import React from 'react';
// import {StreamContext} from './CustomCode';
import { useHeaderHeight } from '@react-navigation/stack';

import { Channel, Thread } from 'stream-chat-expo';

import * as GlobalVariables from '../config/GlobalVariableContext';

// Add any other imports you need here. Make sure to add those imports (besides "react"
// and "react-native") to the Packages section.
// import { Text } from 'react-native';

// Define and export your components as named exports here.

// You can use components exported from this file within a Custom Code component as
// <T.MyExampleComponent />
export const Screen = () => {
  // const {channel, setThread, thread} = userContext(StreamContext)
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
