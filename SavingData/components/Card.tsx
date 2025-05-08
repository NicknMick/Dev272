import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native'
import {Divider} from "@/components/ui/divider";
import {Event, useEventContext} from "@/components/ui/event-context-provider";
import {useRouter} from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";


const Card: React.FC<Event> = ({ title, type, description, eventID, isFavorite, record, recordHolder }: Event) => {
    const {toggleFavorite} = useEventContext();
    const router = useRouter();

    const handleLinkPress = () => {
        router.push({
            pathname: '/details/[title]',
            params: { title, type, description, record, recordHolder }
        });
    }

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <Pressable onPress={() => toggleFavorite(eventID)}>
                <Entypo name="heart" size={28} color={isFavorite ? 'red' : 'gray'} />
            </Pressable>
            <Divider style={{borderWidth: 1}} />
            <Text style={styles.eventType}>Type: {type}</Text>
            <Text style={styles.eventDesc}>{description}</Text>
            <Text style={styles.eventRecord}>World Record: {record}</Text>
            <Text style={styles.link} onPress={handleLinkPress}>See Full Details</Text>
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
    },
    link: {
        color: 'blue',
        textAlign: 'center',
        fontWeight: 'bold'
    }
})

export default Card