import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import AppInput from './src/component/AppInput'

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AppInput text={'Enter your email'} />
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})