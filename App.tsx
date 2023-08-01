
import { StyleSheet, Text, View } from 'react-native';
import { styles } from './styles';
import {requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject} from 'expo-location';
import { useEffect, useState } from 'react';
import MapView, {Marker} from 'react-native-maps';


export default function App() {
  const [location, setLocation] = useState< LocationObject| null>(null);
  
  async function requestLocationPermissions(): Promise<JSX.Element> {
   const { granted } = await requestForegroundPermissionsAsync();
   if (granted) { 
   const curretPosition =  await getCurrentPositionAsync()
   setLocation(curretPosition)
   }
   useEffect(() =>{
    requestLocationPermissions();

   }, [])
  return (
    <View style={styles.container}>
      {
        location &&
        <MapView
        style={styles.map}
        initialRegion={{
          latitude: location?.coords.latitude,
          longitude: location?.coords.latitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        }}
        >
          <Marker
            coordinate={{
              latitude:location?.coords.latitude,
              longitude: location?.coords.latitude,
            }}
          />
        </MapView>
      }
      
    </View>
  );
}
}

