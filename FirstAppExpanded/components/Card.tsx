import React from 'react';
import {View, Text, StyleSheet } from 'react-native'

interface CardProps {
    title: string,
    type: string,
    description: string,
    record: string
}

const Card: React.FC<CardProps> = ({ title, type, description, record }) => {
    return (
        <View style={styles.card}>
            <Text style={{fontSize: 28}}>{title}</Text>
            <Text style={{fontWeight: 'bold'}}>Type: {type}</Text>
            <Text>Description: {description}</Text>
            <Text>World Record: {record}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    card: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 10
    }
})

export default Card