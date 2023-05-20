import React, { useRef, useState } from 'react'
import { Image, Animated, Text, View, Dimensions, StyleSheet, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import data from './data'

const getImage = (i) => `https://source.unsplash.com/600x${400 + i}/?blackandwhite`;

const { width, height } = Dimensions.get('screen');

export default function App() {

  const [bottomActions, setBottomActions] = useState()

  const scrollY = useRef(new Animated.Value(0)).current

  const topEdge = bottomActions?.y - height + bottomActions?.height + 47

  const inputRange = [-1, 0, topEdge - 30, topEdge, topEdge + 1]

  return (
    <SafeAreaView>
      <StatusBar hidden />
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={{ padding: 20 }}
      >
        <Text style={styles.heading}>Black and White</Text>
        {
          data.map((text, index) => {
            return (
              <View key={index}>
                {index % 3 === 0 && <Image source={{ uri: getImage(index) }} style={styles.image} />}
                <Text style={styles.paragraph}>{text}</Text>
              </View>
            )
          })
        }
        <View
          style={[styles.bottomActions, { backgroundColor: 'red' }]}
          onLayout={event => { setBottomActions(event.nativeEvent.layout) }}
        />
        <View>
          <Text style={styles.featuredTitle}>Featured</Text>
          {
            data.slice(0, 3).map((text, index) => {
              return (
                <View key={index} style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <Image source={{ uri: getImage(index) }} style={styles.featuredImage} />
                  <Text numberOfLines={3} style={styles.paragraph}>{text}</Text>
                </View>
              )
            })
          }
        </View>
      </Animated.ScrollView>
      {
        bottomActions &&
        <Animated.View style={[styles.bottomActions, {
          paddingHorizontal: 20,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          transform: [{
            translateY: scrollY.interpolate({
              inputRange,
              outputRange: [0, 0, 0, 0, -1]
            })
          }]
        }]}>
          <View style={{ flexDirection: 'row', height: 60, alignItems: 'center', justifyContent: 'center' }}>
            <Entypo name='adjust' size={24} color='black' style={{ marginHorizontal: 10 }} />
            <Animated.Text
              style={{
                opacity: scrollY.interpolate({
                  inputRange,
                  outputRange: [0, 0, 0, 1, 1]
                })
              }}
            >
              326
            </Animated.Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Animated.View style={[styles.icon, {
              opacity: scrollY.interpolate({
                inputRange,
                outputRange: [0, 0, 0, 1, 1]
              })
            }]}>
              <Entypo name='export' size={24} color='black' />
            </Animated.View>
            <Animated.View style={[styles.icon, {
              transform: [{
                translateX: scrollY.interpolate({
                  inputRange,
                  outputRange: [60, 60, 60, 0, 0]
                })
              }]
            }]}>
              <Entypo name='credit' size={24} color='green' />
            </Animated.View>
            <Animated.View style={[styles.icon, {
              opacity: scrollY.interpolate({
                inputRange,
                outputRange: [0, 0, 0, 1, 1]
              })
            }]}>
              <Entypo name='share-alternative' size={24} color='black' />
            </Animated.View>
          </View>
        </Animated.View>
      }
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  featuredImage: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    marginRight: 20,
    borderRadius: 10,
  },
  bottomActions: {
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  image: {
    width: '100%',
    height: height * 0.4,
    resizeMode: 'cover',
    marginBottom: 20
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginVertical: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 30,
  },
  paragraph: {
    flex: 1,
    marginBottom: 10,
    // fontFamily: 'Georgia'
    fontSize: 14,
    lineHeight: 16 * 1.5,
  },
  icon: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});