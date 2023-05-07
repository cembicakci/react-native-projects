import { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

const getRandomMessage = () => {
  const number = Math.trunc(Math.random() * 10000);
  return `Random Message: ${number}`
}

const Message = ({ text }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.delay(200),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      })
    ]).start()
  }, [])

  return (
    <Animated.View style={[styles.message,
    {
      opacity,
      transform: [{
        translateY: opacity.interpolate({
          inputRange: [0, 1],
          outputRange: [-20, 0],
        })
      }]
    }]}>
      <Text>{text}</Text>
    </Animated.View>
  );
}

export default App = () => {
  return (
    <View style={styles.container}>
      <Message text={'Bu bir testtir!'} />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 45,
    left: 0,
    right: 0
  },  
  message: {
    margin: 10,
    marginBottom: 5,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 6
  },
});
