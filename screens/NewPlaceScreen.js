import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import { View, TextInput, Text, StyleSheet, ScrollView, Button } from 'react-native'
import Colors from '../constants/Colors'

import * as placesActions from '../store/placesAction'

const NewPlaceScreen = (props) => {
  const [titleValue, setTitleValue] = useState('')

  const dispatch = useDispatch()

  const titleChangeHandler = (text) => {
    setTitleValue(text)
  }

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(titleValue))
    props.navigation.goBack()
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>new place</Text>
        <TextInput style={styles.textInput} onChangeText={titleChangeHandler} value={titleValue}/>
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  )
}

NewPlaceScreen.navigationOptions = {
  headerTitle: 'New Place'
}

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }

})


export default NewPlaceScreen
