import {createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import {Platform} from 'react-native'
import PlaceListScreen from '../screens/PlaceListScreen'
import PlaceDetailScreen from '../screens/PlaceDetailScreen'
import NewPlaceScreen from '../screens/NewPlaceScreen'
import MapScreen from '../screens/MapScreen'
import Colors from '../constants/Colors'

const PlacesNavigator = createStackNavigator({
  Places: PlaceListScreen,
  PlacesDetail: PlaceDetailScreen,
  NewPlace: NewPlaceScreen,
  Map: MapScreen
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
  }
})

export default createAppContainer(PlacesNavigator)

