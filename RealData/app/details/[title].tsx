import React from 'react';
import {View, Text, StyleSheet} from 'react-native'
import {Divider} from "@/components/ui/divider";
import {useLocalSearchParams, Stack} from "expo-router";
import {Box} from "@/components/ui/box";


export default function FullDetailsPage({route}) {
    const { title, type, description, record, recordHolder } = useLocalSearchParams()

    return (
        <View style={styles.container}>
            <Box className='p-4 m-4 bg-white max-h-screen-safe'>
                <Stack.Screen options={{title: title}}/>
                <View style={styles.header}>
                    <Text style={styles.title}>Full Event Details</Text>
                </View>
                <Divider style={{borderWidth: 1, width: 'auto'}} />
                <Text style={styles.eventType}>Type: {type}</Text>
                <Text style={styles.eventDesc}>{description}</Text>
                <Text style={styles.eventRecord}>World Record: {record}</Text>
                <Text style={styles.eventRecord}>Record held by {recordHolder}</Text>
            </Box>
        </View>
    )
}

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
        textAlign: 'center',
        fontSize: 42,
        fontWeight: 'bold'
    },
    eventType: {
        fontWeight: 'bold',
        marginVertical: 5,
        fontSize: 20
    },
    eventDesc: {
        fontStyle: 'italic',
        marginVertical: 10,
        fontSize: 32
    },
    eventRecord: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center'
    },
    header: {
        marginBottom: 20,
        marginTop: 60
    },
})