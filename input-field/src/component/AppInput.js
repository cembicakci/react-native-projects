import { StyleSheet, Text, TextInput, View, Animated, Easing, Alert } from 'react-native'
import React, { useRef, useState } from 'react'

const AppInput = ({ text }) => {

    const [value, setValue] = useState('')

    const translateY = useRef(new Animated.Value(0)).current
    const borderWidth = useRef(new Animated.Value(1)).current

    const translateX = translateY.interpolate({
        inputRange: [-24, 0],
        outputRange: [-5, 0]
    })

    const borderColor = borderWidth.interpolate({
        inputRange: [1, 2],
        outputRange: ['gray', '#8ad6ff']
    })

    const textColor = borderWidth.interpolate({
        inputRange: [1, 2],
        outputRange: ['gray', '#8ad6ff']
    })

    const fontSize = borderWidth.interpolate({
        inputRange: [1, 2],
        outputRange: [14, 12]
    })

    const handleFocus = () => {
        animateTransform(-24)
        animateBorderWidth(2)
    }

    const handleBlur = () => {
        if (value) { return; }
        animateTransform(-0)
        animateBorderWidth(1)
    }

    const animateTransform = (toValue) => {
        Animated.timing(translateY, {
            toValue,
            duration: 300,
            useNativeDriver: true
        }).start()
    }

    const animateBorderWidth = (toValue) => {
        Animated.timing(borderWidth, {
            toValue,
            duration: 300,
            useNativeDriver: false
        }).start()
    }


    return (
        <Animated.View style={[styles.container, { borderWidth, borderColor }]}>
            <Animated.View style={[styles.textContainer, { transform: [{ translateY }, { translateX }] }]}>
                <Animated.Text style={[styles.text, { color: textColor, fontSize }]}>{text}</Animated.Text>
            </Animated.View>
            <TextInput
                style={styles.input}
                onFocus={() => { handleFocus() }}
                onBlur={() => { handleBlur() }}
                value={value}
                onChangeText={(text) => { setValue(text) }}
            />
        </Animated.View>
    )
}

export default AppInput

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#bdbdbd',
        borderRadius: 8,
        width: '80%',
        marginTop: 12
    },
    input: {
        padding: 14,
    },
    textContainer: {
        position: 'absolute',
        padding: 14,
    },
    text: {
        backgroundColor: '#fff',
        paddingHorizontal: 3
    }
})