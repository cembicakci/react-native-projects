import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated } from 'react-native';
import Svg, { Polygon } from 'react-native-svg'

import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { colors, links, routes } from './utils';
import MaskedView from '@react-native-community/masked-view';

const { width, height } = Dimensions.get('screen')

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon)

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
  return (
    <MaskedView
      style={{ flex: 1 }}
      maskElement={
        <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
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

        <View style={styles.menu}>
          <View>
            {routes.map((route, index) => {
              return (
                <Button
                  label={route}
                  key={route}
                  title={route}
                  onPress={onPress}
                  style={[styles.button, { color: colors[index] }]}
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
        </View>

      </View>
    </MaskedView>
  )
}

export default function App() {

  const animatedValue = React.useRef(new Animated.ValueXY(fromCoords)).current
  const animate = (toValue) => {
    return Animated.timing(animatedValue, {
      toValue: toValue === 1 ? toCoords : fromCoords,
      duration: 2000,
      useNativeDriver: true
    })
  }

  const onCloseDrawer = React.useCallback(() => {

  }, [])

  const onOpenDrawer = React.useCallback(() => {
    animate(1).start()
  }, [])

  return (
    <View style={styles.container}>
      <Drawer onPress={onCloseDrawer} animatedValue={animatedValue} />
      <AntDesign
        onPress={onOpenDrawer}
        name='menufold'
        size={32}
        color='#222'
        style={{ position: 'absolute', top: 40, right: 30 }}
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
