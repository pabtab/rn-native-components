import React from 'react';
import { Provider } from 'react-redux'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import ReduxThunk from 'redux-thunk'
import { StyleSheet, Text, View } from 'react-native';
import PlacesNavigation from './navigation/PlacesNavigation';

import PlacesReducer from './store/placesReducer'

const rootReducer = combineReducers({
  Places: PlacesReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigation />
    </Provider>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
