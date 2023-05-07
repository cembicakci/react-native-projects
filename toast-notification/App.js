import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Animated, Button, Pressable, SafeAreaView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


const getRandomMessage = () => {
  const number = Math.trunc(Math.random() * 10000);
  return `Random Message: ${number}`
}

const Message = ({ text, status }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  const iconName = status === 'success' ? `checkcircleo` : status === 'error' ? 'closecircleo' : 'infocirlceo'

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
      }],
      backgroundColor: status === 'success' ? 'green' : status === 'error' ? 'red' : 'orange'
    }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <AntDesign
          name={iconName}
          size={24}
          color="#fff"
        />
        <Text style={{ color: '#fff', marginLeft: 10 }}>{text}</Text>
      </View>
    </Animated.View>
  );
}

export default () => {

  const [messages, setMessages] = useState([])

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.container}>
        {
          messages.map((message, index) => (
            <Message
              text={message}
              key={`${index}-message`}
              status={'error'}
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
    paddingHorizontal: 10,
    paddingVertical: 15,
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
