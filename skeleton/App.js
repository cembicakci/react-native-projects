import { useRef } from 'react'
import { Animated, Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import { useEffect } from 'react'

const { width, height } = Dimensions.get('window')

const cardWidth = width * 0.9
const skeWidth = cardWidth - 32

const Item = ({ itemWidth, itemHeight, style }) => {
  const translateX = useRef(new Animated.Value(-itemWidth)).current

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: itemWidth,
        useNativeDriver: true,
        duration: 1000
      })
    ).start()
  }, [itemWidth])

  return (
    <View style={[StyleSheet.flatten([{ width: itemWidth, height: itemHeight, backgroundColor: 'rgba(0, 0, 0, 0.12)', overflow: 'hidden' }, style])]}>
      <Animated.View style={{ width: '100%', height: '100%', transform: [{ translateX: translateX }] }}>
        <LinearGradient
          style={{ width: '100%', height: '100%' }}
          colors={["transparent", "rgba(0, 0, 0, 0.05)", "transparent"]}
          start={{ x: 1, y: 1 }}
        />
      </Animated.View>
    </View>
  )
}


const Skeleton = () => {
  return (
    <SafeAreaView>
      <View style={[styles.card]}>
        <Item itemWidth={40} itemHeight={40} borderRadius={20} style={{ borderRadius: 20 }} />
        <Item itemWidth={skeWidth} itemHeight={height / 10} borderRadius={20} style={{ borderRadius: 20, marginTop: 16 }} />
        <Item itemWidth={skeWidth} itemHeight={height / 50} borderRadius={20} style={{ borderRadius: 20, marginTop: 8 }} />
      </View>
    </SafeAreaView>
  )
}

export default Skeleton

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.24,
    shadowRadius: 4,
    margin: 16,
    width: cardWidth
  }

})