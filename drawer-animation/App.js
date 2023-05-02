import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { colors, links, routes } from './utils';
import React from 'react';

const Button = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Text style={style}>{title}</Text>
    </TouchableOpacity>
  );
};


const Drawer = ({ onPress }) => {
  return (
    <View style={{ flex: 1 }}>
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

    </View>
  )
}

export default function App() {

  const onCloseDrawer = React.useCallback(() => {

  })

  const onOpenDrawer = React.useCallback(() => {

  })

  return (
    <View style={styles.container}>
      <Drawer onPress={onCloseDrawer} />
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
