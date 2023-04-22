
import * as React from 'react';
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView } from 'react-native';
const { width, height } = Dimensions.get('screen');

import data from './data'

const BG = 'https://images.pexels.com/photos/5821029/pexels-photo-5821029.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3

export default () => {

  const scrollY = React.useRef(new Animated.Value(0)).current;

  return <View style={{ flex: 1, backgroundColor: '#fff' }}>

    <Image source={{ uri: BG }} style={StyleSheet.absoluteFillObject} blurRadius={3} />
    <Animated.FlatList
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      data={data}
      keyExtractor={item => item.phone}
      contentContainerStyle={{ padding: SPACING, paddingTop: StatusBar.currentHeight || 42 }}
      renderItem={({ item, index }) => {

        const inputRange = [
          -1,
          0,
          ITEM_SIZE * index,
          ITEM_SIZE * (index + 2)
        ]

        const opacityInputRange = [
          -1,
          0,
          ITEM_SIZE * index,
          ITEM_SIZE * (index + 1)
        ]

        const scale = scrollY.interpolate({
          inputRange,
          outputRange: [1, 1, 1, 0]
        })

        const opacity = scrollY.interpolate({
          inputRange: opacityInputRange,
          outputRange: [1, 1, 1, 0]
        })

        return (
          <Animated.View
            style={{
              flexDirection: 'row',
              padding: SPACING,
              marginBottom: SPACING,
              backgroundColor: '#fff',
              borderRadius: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.3,
              shadowRadius: 20,
              transform: [{ scale }],
              opacity
            }}>
            <Image
              source={{ uri: item.picture.medium }}
              style={{
                width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE, marginRight: SPACING / 2
              }} />
            <View>
              <Text style={{ fontSize: 22, fontWeight: '600' }}>{item.name.first} {item.name.last}</Text>
              <Text style={{ fontSize: 18, opacity: .7 }}>{item.location.country}</Text>
              <Text style={{ fontSize: 14, opacity: .8, color: '#0099cc' }}>{item.email}</Text>
            </View>
          </Animated.View>
        )
      }}
    />
  </View >
}