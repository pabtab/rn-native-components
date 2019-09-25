import React from 'react';
import { Provider } from 'react-redux'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'
//import ReduxThunk from 'redux-thunk'
import { StyleSheet, Text, View } from 'react-native';
import PlacesNavigation from './navigation/PlacesNavigation';

import PlacesReducer from './store/placesReducer'
import { init } from './helpers/db';
import rootSaga from './store/placesAction';

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

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))
sagaMiddleware.run(rootSaga)

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
