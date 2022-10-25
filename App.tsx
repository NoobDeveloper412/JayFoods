import { StatusBar } from 'expo-status-bar'
import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import { LandingScreen } from './source/screens/LandingScreen'

export default function App () {
  return (
    // <Provider store={store}>
    //   <AppNavigation />
    // </Provider>
    <LandingScreen />
  )
}

const styles = StyleSheet.create({
  tabIcon: {
    width: 30,
    height: 30
  }
})
