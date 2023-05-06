import React from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native'
import { data } from './data'
import { colors } from './colors'

import { SharedElement } from 'react-navigation-shared-element';

const { width, height } = Dimensions.get('screen')

const ITEM_HEIGHT = height * 0.18

const SalonList = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.name.first}
                contentContainerStyle={{ padding: 10 }}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity onPress={() => { navigation.navigate('SalonListDetail', { item }) }} style={{ marginBottom: 10, height: ITEM_HEIGHT }}>
                            <View style={{ flex: 1, padding: 10 }} >

                                <SharedElement id={`item.${item.id.value}.bg`} style={StyleSheet.absoluteFillObject}>
                                    <View
                                        style={[StyleSheet.absoluteFillObject, { backgroundColor: colors[index], borderRadius: 16 }]}
                                    />
                                </SharedElement>

                                <SharedElement id={`item.${item.id.value}.name`} >
                                    <Text style={styles.name}>{item.name.first} {item.name.last}</Text>
                                </SharedElement>

                                <Text style={styles.city}>{item.location.city}</Text>

                                <SharedElement id={`item.${item.id.value}.image`} style={styles.image}>
                                    <Image source={{ uri: item.picture.large }} style={styles.image} />
                                </SharedElement>
                            </View>
                        </TouchableOpacity>
                    )
                }}

            />
            <View style={styles.bg} />
        </SafeAreaView>
    )
}

export default SalonList

const styles = StyleSheet.create({
    name: {
        fontWeight: '700',
        fontSize: 18,
        position: 'absolute'
    },
    city: {
        fontSize: 11,
        opacity: 0.7,
        marginTop: 18 * 1.3
    },
    image: {
        width: ITEM_HEIGHT * 0.8,
        height: ITEM_HEIGHT * 0.8,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: 0,
        right: 10
    },
    bg: {
        position: 'absolute',
        width,
        height,
        backgroundColor: 'red',
        transform: [{ translateY: height }],
        borderRadius: 32
    }
})