import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, Image, Dimensions, ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { colors } from './colors';
import { detailsIcon } from './detailsIcon';

import * as Animatable from 'react-native-animatable';

import { SharedElement } from 'react-navigation-shared-element';

const { width, height } = Dimensions.get('screen')
const DURATION = 400;

const ITEM_HEIGHT = height * 0.18
const TOP_HEADER_HEIGHT = height * 0.3

const SalonListDetail = ({ navigation, route }) => {

    const { item } = route.params

    return (
        <View style={{ flex: 1 }}>
            <AntDesign name="arrowleft" size={28} color="#333" onPress={() => { navigation.goBack() }} style={styles.icon} />
            <View style={{ flex: 1, padding: 10 }}>

                <SharedElement id={`item.${item.id.value}.bg`} style={StyleSheet.absoluteFillObject}>
                    <View style={[StyleSheet.absoluteFillObject, { backgroundColor: colors[0], height: TOP_HEADER_HEIGHT + 32 }]} />
                </SharedElement>

                <SharedElement id={`item.${item.id.value}.name`}>
                    <Text style={styles.name}>{item.name.first} {item.name.last}</Text>
                </SharedElement>

                <SharedElement id={`item.${item.id.value}.image`} style={styles.image}>
                    <Image source={{ uri: item.picture.large }} style={styles.image} />
                </SharedElement>

            </View>
            <View style={styles.bg}>
                <ScrollView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 40 }}>
                        {
                            detailsIcon.map((detail, index) => (
                                <Animatable.View
                                    animation='bounceIn'
                                    delay={DURATION + index * 100}
                                    key={`${detail.icon}-${index}`}
                                    style={{
                                        backgroundColor: detail.color,
                                        width: 64,
                                        height: 64,
                                        borderRadius: 32,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <AntDesign name={detail.icon} size={24} color={'white'} />
                                </Animatable.View>
                            ))
                        }
                    </View>
                    <Animatable.View style={{ marginVertical: 10 }} animation='fadeInUp' delay={DURATION * 2 + 200}>
                        <Text style={styles.title}>Supervisor</Text>
                        <View style={{ marginLeft: 10, marginTop: 5 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                                <View style={styles.dot} />
                                <Text style={styles.subTitle}>Engineer</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                                <View style={styles.dot} />
                                <Text style={styles.subTitle}>Representative</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                                <View style={styles.dot} />
                                <Text style={styles.subTitle}>Asistant</Text>
                            </View>
                        </View>
                    </Animatable.View>
                    <Animatable.View style={{ marginVertical: 10 }} animation='fadeInUp' delay={DURATION * 2 + 300}>
                        <Text style={styles.title}>Executive</Text>
                        <View style={{ marginLeft: 10, marginTop: 5 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                                <View style={styles.dot} />
                                <Text style={styles.subTitle}>Designer</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                                <View style={styles.dot} />
                                <Text style={styles.subTitle}>Specialist</Text>
                            </View>
                        </View>
                    </Animatable.View>
                </ScrollView>
            </View>

        </View>
    )
}

export default SalonListDetail

const styles = StyleSheet.create({
    icon: {
        top: 40,
        left: 20,
        position: 'absolute',
        zIndex: 2
    },
    name: {
        fontWeight: '700',
        fontSize: 20,
        position: 'absolute',
        top: TOP_HEADER_HEIGHT - 40,
        left: 10
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
        right: 20,
        top: TOP_HEADER_HEIGHT - ITEM_HEIGHT * 1.25 + 5
    },
    bg: {
        position: 'absolute',
        width,
        height,
        backgroundColor: 'white',
        transform: [{ translateY: TOP_HEADER_HEIGHT }],
        borderRadius: 32,
        padding: 10,
        paddingTop: 40
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'gold',
        marginRight: 5
    },
    title: {
        fontWeight: '700',
        fontSize: 18
    },
    subTitle: {
        opacity: 0.8
    }
})