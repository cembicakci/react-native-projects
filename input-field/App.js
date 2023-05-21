import React from 'react'
import { Keyboard, SafeAreaView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import AppInput from './src/component/AppInput'

const App = () => {
  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
      <SafeAreaView style={styles.container}>
        <AppInput text={'Enter your name'} />
        <AppInput text={'Enter your email'} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContainer: {
    marginTop: 12
  }
})