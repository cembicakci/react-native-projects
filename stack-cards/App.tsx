import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';

import { Entypo } from '@expo/vector-icons'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import data, { locationImage } from './data';

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

function Card({ info, index, totalLength }: { info: (typeof data)[0], index: number, totalLength: number }) {
  return (
    <View style={[styles.card]}>
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
    </View>
  )
}


export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar hidden />
      <View style={{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: layout.cardsGap * 2,
      }}
        pointerEvents='box-none'
      >

        {
          data.slice(0, 1).map((c, index) => {
            return (
              <Card
                info={c}
                key={c.id}
                index={index}
                totalLength={data.length - 1}
              />
            )
          })
        }

      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary
  },
  card: {
    backgroundColor: colors.light,
    width: layout.width,
    height: layout.height,
    padding: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12
  },
  cardContent: {},
  row: {
    flexDirection: 'row'
  },
  icon: {
    marginRight: 12,
    marginBottom: 12
  },
  subtitle: {},
  locationImage: {
    width: '100%',
    height: 275
  }
});
