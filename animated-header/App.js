
import React, { useRef } from 'react';
import { Animated, FlatList, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const HEADER_HEIGHT_EXPANDED = 35;
const HEADER_HEIGHT_NARROWED = 90;

const PROFILE_PICTURE_URI =
  'https://pbs.twimg.com/profile_images/1295728524490350592/li5FAiq7_400x400.jpg';

const PROFILE_BANNER_URI =
  'https://plus.unsplash.com/premium_photo-1690297972256-cfefd2ba6578?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1658&q=80';

const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default function WrappedApp() {
  return (
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  );
}

function App() {
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Back button */}
      <View
        style={{
          zIndex: 2,
          position: 'absolute',
          top: insets.top - 10,
          left: 20,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          height: 30,
          width: 30,
          borderRadius: 15,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Feather name="chevron-left" color="white" size={26} />
      </View>

      {/* Refresh arrow */}
      <Animated.View
        style={{
          zIndex: 2,
          position: 'absolute',
          top: insets.top + 13,
          left: 0,
          right: 0,
          alignItems: 'center',
          opacity: scrollY.interpolate({
            inputRange: [-20, 0],
            outputRange: [1, 0],
          }),
          transform: [
            {
              rotate: scrollY.interpolate({
                inputRange: [-45, -35],
                outputRange: ['180deg', '0deg'],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      >
        <Feather name="arrow-down" color="white" size={25} />
      </Animated.View>

      {/* Name + tweets count */}
      <Animated.View
        style={{
          zIndex: 2,
          position: 'absolute',
          top: insets.top - 8,
          left: 0,
          right: 0,
          alignItems: 'center',
          opacity: scrollY.interpolate({
            inputRange: [90, 110],
            outputRange: [0, 1],
          }),
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [90, 120],
                outputRange: [30, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      >
        <Text style={[styles.text, styles.username]}>Cem</Text>

        <Text style={[styles.text, styles.tweetsCount]}>
          101 tweets
        </Text>
      </Animated.View>


      {/* Banner */}
      <AnimatedImageBackground
        source={{ uri: PROFILE_BANNER_URI }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: HEADER_HEIGHT_EXPANDED + HEADER_HEIGHT_NARROWED,
          transform: [
            {
              scale: scrollY.interpolate({
                inputRange: [-200, 0],
                outputRange: [5, 1],
                extrapolateLeft: 'extend',
                extrapolateRight: 'clamp'
              })
            }
          ]
        }}
      >
        <AnimatedBlurView
          tint='dark'
          intensity={96}
          style={{
            ...StyleSheet.absoluteFillObject,
            zIndex: 2,
            opacity: scrollY.interpolate({
              inputRange: [-50, 0, 50, 100],
              outputRange: [1, 0, 0, 1]
            })
          }}
        />
      </AnimatedImageBackground>

      {/* Tweets/profile */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={
          Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY
                }
              }
            }
          ], { useNativeDriver: true })
        }
        style={{
          zIndex: 3,
          marginTop: HEADER_HEIGHT_NARROWED,
          paddingTop: HEADER_HEIGHT_EXPANDED,
        }}
      >
        <View style={[styles.container, { backgroundColor: 'black' }]}>

          <View style={[styles.container, { paddingHorizontal: 20 }]}>
            <Animated.Image source={{ uri: PROFILE_PICTURE_URI }}
              style={{
                width: 75,
                height: 75,
                borderRadius: 40,
                borderWidth: 4,
                borderColor: 'black',
                marginTop: -30,
                transform: [
                  {
                    scale: scrollY.interpolate({
                      inputRange: [0, HEADER_HEIGHT_EXPANDED],
                      outputRange: [1, 0.6],
                      extrapolate: 'clamp',
                    }),
                  },
                  {
                    translateY: scrollY.interpolate({
                      inputRange: [0, HEADER_HEIGHT_EXPANDED],
                      outputRange: [0, 16],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              }}
            />

            <Text style={[styles.text, { fontSize: 24, fontWeight: 'bold', marginTop: 10 }]}>Cem</Text>
            <Text style={[styles.text, { fontSize: 15, color: 'gray', marginBottom: 15 }]}>@cem</Text>
            <Text style={[styles.text, { marginBottom: 15, fontSize: 15 }]}>a lover of react native</Text>

            {/* Profile stats */}
            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
              <Text style={[styles.text, { fontWeight: 'bold', marginRight: 10 }]}>230{' '}
                <Text style={{ color: 'gray', fontWeight: 'normal' }}>Following</Text>
              </Text>

              <Text style={[styles.text, { fontWeight: 'bold' }]}>230{' '}
                <Text style={{ color: 'gray', fontWeight: 'normal' }}>Followers</Text>
              </Text>
            </View>

          </View>

          <View style={styles.container}>

            <FlatList
              data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              keyExtractor={(_, index) => index}
              renderItem={() => {
                return (
                  <View style={styles.tweet}>
                    <Image source={{ uri: PROFILE_PICTURE_URI }} style={{
                      height: 50,
                      width: 50,
                      borderRadius: 25,
                      marginRight: 10,
                    }}
                    />

                    <View style={styles.container}>
                      <Text style={[styles.text, { fontWeight: 'bold', fontSize: 15 }]}>Cem{' '}
                        <Text style={{ color: 'gray', fontWeight: 'normal' }}>1d</Text>
                      </Text>

                      <Text style={[styles.text, { fontSize: 15 }]}>lorem ipsum</Text>
                    </View>
                  </View>
                )
              }}
            />
          </View>

        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    color: 'white',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: -3,
  },
  tweetsCount: {
    fontSize: 13,
  },
  tweet: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255, 255, 255, 0.25)',
  },
});