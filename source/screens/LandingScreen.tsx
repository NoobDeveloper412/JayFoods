import React, { useState, useReducer, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import * as Location from 'expo-location'

const screenWidth = Dimensions.get('screen').width
const LandingScreen = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [address, setAddress] = useState()
  const [displayAddress, setDisplayAddress] = useState(
    'Waiting for Current Location'
  )

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestPermissionsAsync()

      if (status !== 'granted') {
        setErrorMessage('Permission to access location was not granted!')
      }

      let location: any = await Location.getCurrentPositionAsync({})

      const { coords } = location

      if (coords) {
        const { latitude, longitude } = coords

        let addressResponse: any = await Location.reverseGeocodeAsync({
          latitude,
          longitude
        })

        for (let item of addressResponse) {
          setAddress(item)
          //   onUpdateLocation(item)
          let currentAddress = `${item.name},${item.street}, ${item.postalCode}, ${item.country}`
          setDisplayAddress(currentAddress)

          //   if (currentAddress.length > 0) {
          //     setTimeout(() => {
          //       navigate('homeStack')
          //     }, 2000)
          //   }

          return
        }
      } else {
        //notify user something went wrong with location
      }
    })()
  }, [])

  const { addressContainer } = styles
  return (
    <View style={styles.container}>
      <View style={styles.navigation} />
      <View style={styles.body}>
        <Image
          source={require('../images/delivery_icon.png')}
          style={styles.deliveryIcon}
        />
        <View style={addressContainer}>
          <Text> Your Delivery Address</Text>
        </View>
        <Text style={styles.addressText}>{displayAddress}</Text>
      </View>
      <View style={styles.footer}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(242,242,242,1)'
  },
  navigation: {
    flex: 2
  },
  body: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deliveryIcon: {
    width: 120,
    height: 120
  },
  addressContainer: {
    width: screenWidth - 100,
    borderBottomColor: 'red',
    borderBottomWidth: 0.5,
    padding: 5,
    marginBottom: 10,
    alignItems: 'center'
  },
  addressTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#7D7D7D'
  },
  addressText: {
    fontSize: 20,
    fontWeight: '200',
    color: '#4F4F4F'
  },

  footer: {
    flex: 1
  }
})

export { LandingScreen }
