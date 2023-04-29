import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, Text, View, StyleSheet, FlatList, Dimensions, Image, Animated } from 'react-native';
import { getMovies } from './api';

import Genres from './Genres';
import Rating from './Rating';

import MaskedView from '@react-native-masked-view/masked-view';
import Svg, { Rect } from 'react-native-svg'
import { LinearGradient } from 'expo-linear-gradient'

const AnimatedSvg = Animated.createAnimatedComponent(Svg)

const { width, height } = Dimensions.get('window');

const SPACING = 10;
const ITEM_SIZE = width * 0.72;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);


export default function App() {

  const [movies, setMovies] = useState([]);

  const scrollX = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies();
      setMovies([{ key: 'left-spacer' }, ...movies, { key: 'right-spacer' }]);
    };

    if (movies.length === 0) {
      fetchData(movies);
    }
  }, [movies]);

  if (movies.length === 0) {
    return <Loading />;
  }

  const Backdrop = ({ movies, scrollX }) => {
    return (
      <View style={styles.backdrop}>
        <FlatList
          data={movies}
          keyExtractor={item => item.key}
          renderItem={({ item, index }) => {
            if (!item.backdrop) return null;

            const inputRange = [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE]
            const translateX = scrollX.interpolate({
              inputRange,
              outputRange: [-width, 0]
            })


            return (
              <MaskedView
                style={{ position: 'absolute' }}
                maskElement={
                  <AnimatedSvg
                    width={width}
                    height={height}
                    viewBox={`0 0 ${width} ${height}`}
                    style={{ transform: [{ translateX }] }}
                  >
                    <Rect x='0' y='0' width={width} height={height} fill={'red'} />
                  </AnimatedSvg>
                }
              >
                <Image source={{ uri: item.backdrop }} style={styles.backdropImage} />
              </MaskedView>
            )
          }}
        />
        <LinearGradient colors={['transparent', 'white']}
          style={{ width: width, height: height * 0.6, position: 'absolute', bottom: 0 }} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Backdrop movies={movies} scrollX={scrollX} />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={(item) => item.key}
        horizontal
        snapToInterval={ITEM_SIZE}
        decelerationRate={0}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16} //16 fps

        renderItem={({ item, index }) => {
          if (!item.poster) {
            return <View style={{ width: SPACER_ITEM_SIZE }} />
          }

          const inputRange = [
            (index - 2) * ITEM_SIZE, //prev item
            (index - 1) * ITEM_SIZE, //curr item
            (index) * ITEM_SIZE //next item
          ]
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, 50, 100]
          })

          return (
            <View style={{ width: ITEM_SIZE }}>
              <Animated.View
                style={{
                  marginHorizontal: SPACING,
                  padding: SPACING * 2,
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: 34,
                  transform: [{ translateY }]
                }}
              >
                <Image source={{ uri: item.poster }} style={styles.posterImage} />
                <Text style={{ fontSize: 24 }} numberOfLines={1}>{item.title}</Text>
                <Rating rating={item.rating} />
                <Genres genres={item.genres} />
                <Text style={{ fontSize: 12 }} numberOfLines={3}>{item.description}</Text>
              </Animated.View>
            </View>
          );
        }}
      />
    </View >
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
  backdrop: {
    position: 'absolute',
    width: width,
    height: height * 0.6
  },
  backdropImage: {
    width: width,
    height: height * 0.6,
    resizeMode: 'cover'
  }
});