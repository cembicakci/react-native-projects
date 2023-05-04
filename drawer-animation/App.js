import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated } from 'react-native';
import Svg, { Polygon } from 'react-native-svg'

import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { colors, links, routes } from './utils';
import MaskedView from '@react-native-community/masked-view';

const { width, height } = Dimensions.get('screen')

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon)
const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign)

const Button = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Text style={style}>{title}</Text>
    </TouchableOpacity>
  );
};

const fromCoords = { x: 0, y: height }
const toCoords = { x: width, y: 0 }

const Drawer = ({ onPress, animatedValue }) => {

  const [selectedRoute, setSelectedRoute] = useState(routes[0])

  const polygonRef = React.useRef()

  React.useEffect(() => {
    animatedValue.addListener((v) => {
      if (polygonRef?.current) {
        polygonRef.current.setNativeProps({
          points: `0,0 ${v.x},${v.y} ${width},${height} 0,${height}`
        })
      }
    })
  })

  const translateX = animatedValue.x.interpolate({
    inputRange: [0, width],
    outputRange: [-100, 0]
  })

  const opacity = animatedValue.x.interpolate({
    inputRange: [0, width],
    outputRange: [0, 1]
  })

  return (
    <MaskedView
      style={{ flex: 1 }}
      maskElement={
        <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{
          backgroundColor: 'transparent'
        }}>
          <AnimatedPolygon
            ref={polygonRef}
            fill={'red'}
            points={`0,0 ${fromCoords.x},${fromCoords.y} ${width},${height} 0,${height}`}
          />
        </Svg>
      }
    >
      <View style={styles.menuContainer}>
        <AntDesign
          onPress={onPress}
          name='close'
          size={34}
          color='white'
          style={{ position: 'absolute', top: 40, right: 30 }}
        />

        <Animated.View style={[styles.menu, { opacity, transform: [{ translateX }] }]}>
          <View>
            {routes.map((route, index) => {
              return (
                <Button
                  label={route}
                  key={route}
                  title={route}
                  onPress={() => {
                    onPress()
                    setSelectedRoute(route)
                  }}
                  style={[styles.button, { color: colors[index], textDecorationLine: route === selectedRoute ? 'line-through' : 'none' }]}
                />
              );
            })}
          </View>

          <View>
            {links.map((link, index) => {
              return (
                <Button
                  label={link}
                  key={link}
                  title={link}
                  style={[
                    styles.buttonSmall,
                    { color: colors[index + routes.length + 1] },
                  ]}
                  onPress={onPress}
                />
              );
            })}
          </View>
        </Animated.View>

      </View>
    </MaskedView>
  )
}

export default function App() {

  const animatedValue = React.useRef(new Animated.ValueXY(fromCoords)).current
  const animate = (toValue) => {
    return Animated.timing(animatedValue, {
      toValue: toValue === 1 ? toCoords : fromCoords,
      duration: 200,
      useNativeDriver: true
    })
  }

  const onCloseDrawer = React.useCallback(() => {
    animate(0).start()
  }, [])

  const onOpenDrawer = React.useCallback(() => {
    animate(1).start()
  }, [])

  const translateX = animatedValue.y.interpolate({
    inputRange: [0, height * 0.3],
    outputRange: [100, 0],
    extrapolate: 'clamp'
  })

  return (
    <View style={styles.container}>
      <Drawer onPress={onCloseDrawer} animatedValue={animatedValue} />
      <AnimatedAntDesign
        onPress={onOpenDrawer}
        name='menufold'
        size={32}
        color='#222'
        style={{ transform: [{ translateX }], position: 'absolute', top: 40, right: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maskedContainer: {
    flex: 1,
  },
  menuContainer: {
    flex: 1,
    width: Dimensions.get('screen').width,
    backgroundColor: '#222',
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  menu: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  button: {
    fontSize: 32,
    color: '#fdfdfd',
    lineHeight: 32 * 1.5,
  },
  buttonSmall: {
    fontSize: 16,
    marginBottom: 5,
    color: '#fdfdfd',
  },
});
