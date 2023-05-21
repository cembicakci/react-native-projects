import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const AppInput = ({ text }) => {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{text}</Text>
            </View>
            <TextInput style={styles.input} />
        </View>
    )
}

export default AppInput

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#bdbdbd',
        borderRadius: 8,
        width: '80%'
    },
    input: {
        padding: 12,
    },
    textContainer: {
        position: 'absolute',
        padding: 12
    },
    text: {}
})