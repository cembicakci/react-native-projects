import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Animated, Button, Pressable, SafeAreaView, TouchableOpacity } from 'react-native';

const getRandomMessage = () => {
  const number = Math.trunc(Math.random() * 10000);
  return `Random Message: ${number}`
}

const Message = (props) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.delay(2000),
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
      <Text>{props.text}</Text>
    </Animated.View>
  );
}

export default () => {

  const [messages, setMessages] = useState([])

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {
          messages.map((message, index) => (
            <Message
              text={message}
              key={`${index}-message`}
            />
          ))
        }
      </View>

      <Button
        title="Add message"
        onPress={() => {
          const message = getRandomMessage();
          setMessages([...messages, message]);
        }}
      />

    </SafeAreaView>
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
