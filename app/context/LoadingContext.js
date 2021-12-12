import React, { useReducer, createContext } from 'react';
import * as _ from 'lodash';
import { useMemo } from 'react/cjs/react.development';
import { View, ActivityIndicator, Text } from 'react-native';
import Popup from '../components/Popup';
import { COLOR_ZALO } from '../constant/ColorCommon';

export const LoadingContext = createContext({}, () => {});

const LoadingEvent = {
  START: 'START_LOADING',
  END: 'END_LOADING'
};

const stateDefault = {
  isLoading: false
};

function loadingReducer(state = stateDefault, action) {
  switch (action.type) {
    case LoadingEvent.START: {
      return { ...state, isLoading: true };
    }
    case LoadingEvent.END: {
      return { ...state, isLoading: false };
    }
    default:
      return state;
  }
}

const LoadingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(loadingReducer, stateDefault);

  const loadingContext = useMemo(
    () => ({
      startLoading: () => {
        dispatch({ type: LoadingEvent.START });
      },
      endLoading: () => {
        dispatch({ type: LoadingEvent.END });
      }
    }),
    []
  );

  return (
    <LoadingContext.Provider value={loadingContext}>
      <Popup open={state.isLoading} backgroundColor="rgba(52, 52, 52, 0.2)">
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 5,
            paddingHorizontal: 10,
            backgroundColor: '#FFFFFF',
            borderRadius: 5
          }}
        >
          <ActivityIndicator size="small" color={COLOR_ZALO.statusBar} />
          <Text style={{ fontSize: 14, fontWeight: '600', marginLeft: 5 }}>Đang xử lý</Text>
        </View>
      </Popup>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
