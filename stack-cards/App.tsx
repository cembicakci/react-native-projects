import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, Image, Alert, Pressable } from 'react-native';

import { Entypo } from '@expo/vector-icons'
import { Directions, Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated, { Extrapolate, FadeIn, FadeInRight, FadeOut, FadeOutRight, SharedValue, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import data, { locationImage } from './data';
import { useState } from 'react';

const { width } = Dimensions.get('window')
const duration = 300
const _size = width * 0.9
const layout = {
  borderRadius: 16,
  width: _size,
  height: _size * 1.27,
  spacing: 12,
  cardsGap: 22
}

const maxVisibleItems = 6

const colors = {
  primary: '#6667AB',
  light: '#fff',
  dark: '#111'
}

function Card({ info, index, totalLength, activeIndex }: { info: (typeof data)[0], index: number, totalLength: number, activeIndex: SharedValue<number> }) {

  const stylez = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      zIndex: totalLength - index,
      opacity: interpolate(
        activeIndex.value,
        [index - 1, index, index + 1],
        [1 - 1 / maxVisibleItems, 1, 1]
      ),
      shadowOpacity: interpolate(activeIndex.value,
        [index - 1, index, index + 1],
        [0, 0, 1],
        {
          extrapolateRight: Extrapolate.CLAMP
        }
      ),
      transform: [
        {
          translateY: interpolate(activeIndex.value,
            [index - 1, index, index + 1],
            [-layout.cardsGap, 0, layout.height - layout.cardsGap]
          )
        },
        {
          scale: interpolate(activeIndex.value,
            [index - 1, index, index + 1],
            [0.96, 1, 1]
          )
        }
      ]
    }
  })

  return (
    <Animated.View style={[styles.card, stylez]}>
      <Text style={[
        styles.title,
        {
          position: 'absolute',
          top: -layout.spacing,
          right: layout.spacing,
          fontSize: 102,
          color: colors.primary,
          opacity: 0.05
        }
      ]}>
        {index}
      </Text>
      <View style={[styles.cardContent]}>
        <Text style={styles.title}>{info.type}</Text>
        <View style={styles.row}>
          <Entypo name='clock' size={16} style={styles.icon} />
          <Text style={styles.subtitle}>{info.from} - {info.to}</Text>
        </View>
        <View style={styles.row}>
          <Entypo name='location' size={16} style={styles.icon} />
          <Text style={styles.subtitle}>{info.distance}</Text>
        </View>
        <View style={styles.row}>
          <Entypo name='suitcase' size={16} style={styles.icon} />
          <Text style={styles.subtitle}>{info.role}</Text>
        </View>
      </View>
      <Image source={{ uri: locationImage }} style={styles.locationImage} />
    </Animated.View>
  )
}

const menu = ['Home', 'About', 'Contact', 'Settings', 'Logout']
function Menu({
  menu,
  activeMenuIndex = 0,
  onClose,
  onMenuPress,
  isMenuVisible
}: {
  menu: string[],
  activeMenuIndex?: number,
  onClose: () => void,
  onMenuPress: (index: number) => void
  isMenuVisible: boolean
}) {

  if (!isMenuVisible) {
    return null;
  }

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut.delay(500)}
      style={[StyleSheet.absoluteFillObject, { zIndex: 999999 }]}
      pointerEvents={'box-none'}
    >
      <Pressable onPress={onClose} style={StyleSheet.absoluteFillObject}>
        <View style={{ backgroundColor: colors.dark, opacity: 0.75, flex: 1 }}></View>
      </Pressable>
      <View style={{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: layout.cardsGap * 2,
        gap: layout.spacing
      }}
        pointerEvents='box-none'
      >
        {
          menu.map((item, index) => {
            return (
              <Pressable onPress={() => { onMenuPress(index) }} key={index}>
                <Animated.Text
                  entering={FadeInRight.delay(50 * index)}
                  exiting={FadeOutRight.delay((menu.length) * 50)}
                  style={{
                    fontSize: 32,
                    fontWeight: 'bold',
                    color: colors.light
                  }}
                >
                  {index === activeMenuIndex ? '👉🏻' : ''}
                  {item}
                </Animated.Text>
              </Pressable>
            )
          })
        }
      </View>

    </Animated.View>

  )
}


export default function App() {

  const floatActiveIndex = useSharedValue(0)

  const [activeIndex, setActiveIndex] = useState(0)
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  console.log(isMenuVisible)

  const flingUp = Gesture.Fling().direction(Directions.UP).onStart(() => {
    if (floatActiveIndex.value === 0) {
      return;
    }
    floatActiveIndex.value = withTiming(floatActiveIndex.value - 1, { duration })
    console.log('fling up')
  })

  const flingDown = Gesture.Fling().direction(Directions.DOWN).onStart(() => {
    if (floatActiveIndex.value === data.length) {
      return;
    }
    floatActiveIndex.value = withTiming(floatActiveIndex.value + 1, { duration })
    console.log('fling down')
  })

  const flingRight = Gesture.Fling().direction(Directions.RIGHT).onStart(() => {
    'worklet'
    runOnJS(setIsMenuVisible)(false)

  })

  const flingLeft = Gesture.Fling().direction(Directions.LEFT).onStart(() => {
    'worklet'
    runOnJS(setIsMenuVisible)(true)
  })

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar hidden />

      <Menu
        menu={menu}
        activeMenuIndex={activeIndex}
        onMenuPress={(index) => {
          setIsMenuVisible(false)
        }}
        onClose={() => { setIsMenuVisible(false) }}
        isMenuVisible={isMenuVisible}
      />

      <GestureDetector
        gesture={Gesture.Exclusive(flingUp, flingDown, flingRight, flingLeft)}
      >
        <View style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'flex-end',
          marginBottom: layout.cardsGap * 2
        }}
          pointerEvents='box-none'
        >

          {
            data.map((c, index) => {
              return (
                <Card
                  info={c}
                  key={c.id}
                  index={index}
                  totalLength={data.length - 1}
                  activeIndex={floatActiveIndex}
                />
              )
            })
          }

        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 16
  },
  card: {
    backgroundColor: colors.light,
    width: layout.width,
    height: layout.height,
    padding: layout.spacing,
    borderRadius: layout.borderRadius,
    shadowColor: colors.dark,
    shadowRadius: 10,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0
    },
    elevation: 5
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12
  },
  cardContent: {
    gap: layout.spacing,
    marginBottom: layout.spacing
  },
  row: {
    flexDirection: 'row'
  },
  icon: {
    marginRight: 12,
    marginBottom: 12
  },
  subtitle: {},
  locationImage: {
    flex: 1
  }
});
