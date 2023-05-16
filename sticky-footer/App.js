import React from 'react'
import { Image, Animated, Text, View, Dimensions, StyleSheet, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import data from './data'

const getImage = (i) => `https://source.unsplash.com/600x${400 + i}/?blackandwhite`;

const { width, height } = Dimensions.get('screen');

export default function App() {
  return (
    <SafeAreaView>
      <StatusBar hidden />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.heading}>Black and White</Text>
        {data.map((text, index) => {
          return (
            <View key={index}>
              {index % 3 === 0 && <Image source={{ uri: getImage(index) }} style={styles.image} />}
              <Text style={styles.paragraph}>{text}</Text>
            </View>
          )
        })}
        <View style={styles.bottomActions} />
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
      </ScrollView>
      <View style={[styles.bottomActions, { paddingHorizontal: 20 }]}>
        <View style={{ flexDirection: 'row', height: 60, alignItems: 'center', justifyContent: 'center' }}>
          <Entypo name='adjust' size={24} color='black' style={{ marginHorizontal: 10 }} />
          <Text>326</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.icon]}>
            <Entypo name='export' size={24} color='black' />
          </View>
          <View style={[styles.icon]}>
            <Entypo name='credit' size={24} color='green' />
          </View>
          <View style={[styles.icon]}>
            <Entypo name='share-alternative' size={24} color='black' />
          </View>
        </View>
      </View>
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
    backgroundColor: 'white',
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