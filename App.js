import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlacesNavigation from './navigation/PlacesNavigation';

export default function App() {
  return <PlacesNavigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
