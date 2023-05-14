import * as React from 'react';
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { data } from './data';

const { width, height } = Dimensions.get('screen');

const imageW = width * 0.7;
const imageH = imageW * 1.54;

export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={[StyleSheet.absoluteFillObject]}>
        {
          data.map((image, index) => {
            const inputRange = [
              (index - 1) * width, //prev
              index * width, //curr
              (index + 1) * width //next
            ]

            //display the current image only when the index calls the own image
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0]
            })
            return (
              <Animated.Image
                source={{ uri: image }}
                key={index}
                style={[StyleSheet.absoluteFillObject, { opacity }]}
                blurRadius={50}
              />
            )
          })
        }
      </View>
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        data={data}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        renderItem={({ item }) => {
          return (
            <View style={{
              width,
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOpacity: 0.5,
              shadowOffset: {
                width: 0,
                height: 0
              },
              shadowRadius: 20
            }}>
              <Image
                source={{ uri: item }}
                style={{
                  width: imageW,
                  height: imageH,
                  resizeMode: 'cover',
                  borderRadius: 16
                }}
              />
            </View>
          )
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
