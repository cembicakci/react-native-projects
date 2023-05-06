import React from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native'
import { data } from './data'
import { colors } from './colors'

const { width, height } = Dimensions.get('screen')

const ITEM_HEIGHT = height * 0.18

const SalonList = () => {
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.name.first}
                contentContainerStyle={{ padding: 10 }}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity onPress={() => { }} style={{ marginBottom: 10, height: ITEM_HEIGHT }}>
                            <View style={{ flex: 1, padding: 10 }}>
                                <View style={[StyleSheet.absoluteFillObject, { backgroundColor: colors[index], borderRadius: 16 }]} />
                                <Text style={styles.name}>{item.name.first} {item.name.last}</Text>
                                <Text style={styles.city}>{item.location.city}</Text>
                                <Image source={{ uri: item.picture.large }} style={styles.image} />
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export default SalonList

const styles = StyleSheet.create({
    bg: {},
    name: {
        fontWeight: '700',
        fontSize: 18
    },
    city: {
        fontSize: 11,
        opacity: 0.7
    },
    image: {
        width: ITEM_HEIGHT * 0.8,
        height: ITEM_HEIGHT * 0.8,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: 12,
        right: 10
    }
})