import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeviceVariables = {
  AUTH_HEADER:
    'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic3RyaW5nMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkJhc2ljVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiODQzMDQ4YjktNGVkMy00Njg5LTliODQtNTdkNjM1NWFmNTM1IiwiZXhwIjoxNjc1ODU5MjUyLCJpc3MiOiJodHRwczovL3ZhdWx0c3BvcnRzaHEuY29tIiwiYXVkIjoiaHR0cHM6Ly92YXVsdHNwb3J0c2hxLmNvbSJ9.LkhyH03y_Q6vhl7dGZLAxRi3VPTq5TjA3sVOi7hIy3w',
  GS_API_KEY: 'enybq63jpds5',
  GS_USER_TOKEN:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibWFydWYifQ.kAXZEGYGQpKsbKP_aGcKRmLZFX74iijaa0_DjIj0eoc',
  USER: { id: 'maruf' },
};
const AppVariables = {};
const GlobalVariableContext = React.createContext();
const GlobalVariableUpdater = React.createContext();

// Attempt to parse a string as JSON. If the parse fails, return the string as-is.
// This is necessary to account for variables which are already present in local
// storage, but were not stored in JSON syntax (e.g. 'hello' instead of '"hello"').
function tryParseJson(str) {
  try {
    return JSON.parse(str);
  } catch {
    return str;
  }
}

class GlobalVariable {
  /**
   *  Filters an object of key-value pairs for those that should be
   *  persisted to storage, and persists them.
   *
   *  @param values Record<string, string>
   */
  static async syncToLocalStorage(values) {
    const update = Object.entries(values)
      .filter(([key]) => key in DeviceVariables)
      .map(([key, value]) => [key, JSON.stringify(value)]);

    if (update.length > 0) {
      await AsyncStorage.multiSet(update);
    }

    return update;
  }

  static async loadLocalStorage() {
    const entries = await AsyncStorage.multiGet(Object.keys(DeviceVariables));

    // If values isn't set, use the default. These will be written back to
    // storage on the next render.
    const withDefaults = entries.map(([key, value]) => [
      key,
      value ? tryParseJson(value) : DeviceVariables[key],
    ]);

    return Object.fromEntries(withDefaults);
  }
}

class State {
  static defaultValues = {
    ...AppVariables,
    ...DeviceVariables,
  };

  static reducer(state, { type, payload }) {
    switch (type) {
      case 'RESET':
        return { values: State.defaultValues, __loaded: true };
      case 'LOAD_FROM_ASYNC_STORAGE':
        return { values: { ...state.values, ...payload }, __loaded: true };
      case 'UPDATE':
        return state.__loaded
          ? {
              ...state,
              values: {
                ...state.values,
                [payload.key]: payload.value,
              },
            }
          : state;
      default:
        return state;
    }
  }

  static initialState = {
    __loaded: false,
    values: State.defaultValues,
  };
}

export function GlobalVariableProvider({ children }) {
  const [state, dispatch] = React.useReducer(State.reducer, State.initialState);

  React.useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, []);

  // This effect runs on mount to overwrite the default value of any
  // key that has a local value.
  React.useEffect(() => {
    async function initialStorageLoader() {
      try {
        const payload = await GlobalVariable.loadLocalStorage();
        dispatch({ type: 'LOAD_FROM_ASYNC_STORAGE', payload });
      } catch (err) {
        console.error(err);
      }
    }
    initialStorageLoader();
  }, []);

  // This effect runs on every state update after the initial load. Gives us
  // best of both worlds: React state updates sync, but current state made
  // durable next async tick.
  React.useEffect(() => {
    async function syncToAsyncStorage() {
      try {
        await GlobalVariable.syncToLocalStorage(state.values);
      } catch (err) {
        console.error(err);
      }
    }
    if (state.__loaded) {
      syncToAsyncStorage();
    }
  }, [state]);

  const onLayoutRootView = React.useCallback(async () => {
    if (state.__loaded) {
      await SplashScreen.hideAsync();
    }
  }, [state.__loaded]);

  // We won't want an app to read a default state when there might be one
  // incoming from storage.
  if (!state.__loaded) {
    return null;
  }

  return (
    <GlobalVariableUpdater.Provider
      value={dispatch}
      onLayout={onLayoutRootView}
    >
      <GlobalVariableContext.Provider value={state.values}>
        {children}
      </GlobalVariableContext.Provider>
    </GlobalVariableUpdater.Provider>
  );
}

// Hooks
export function useSetValue() {
  const dispatch = React.useContext(GlobalVariableUpdater);
  return ({ key, value }) => {
    dispatch({ type: 'UPDATE', payload: { key, value } });
    return value;
  };
}

export function useValues() {
  return React.useContext(GlobalVariableContext);
}
