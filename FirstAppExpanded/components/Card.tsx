import React from 'react';
import {View, Text, StyleSheet } from 'react-native'
import {Divider} from "@/components/ui/divider";

interface CardProps {
    title: string,
    type: string,
    description: string,
    record: string
}

const Card: React.FC<CardProps> = ({ title, type, description, record }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <Divider style={{borderWidth: 1}} />
            <Text style={styles.eventType}>Type: {type}</Text>
            <Text style={styles.eventDesc}>{description}</Text>
            <Text style={styles.eventRecord}>World Record: {record}</Text>
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
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    eventType: {
        fontWeight: 'bold',
        marginVertical: 5
    },
    eventDesc: {
        fontStyle: 'italic',
        marginVertical: 10
    },
    eventRecord: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export default Card