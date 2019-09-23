import React from 'react';
import { Provider } from 'react-redux'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import ReduxThunk from 'redux-thunk'
import { StyleSheet, Text, View } from 'react-native';
import PlacesNavigation from './navigation/PlacesNavigation';

import PlacesReducer from './store/placesReducer'
import { init } from './helpers/db';

init().then(() => {
  console.log('Initialized DB')
})
.catch(err => {
  console.log('Initialized DB failed')
  console.log(err)
});

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
