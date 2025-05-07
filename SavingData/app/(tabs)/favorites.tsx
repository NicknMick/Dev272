import React, {useContext, useState} from 'react';
import { StyleSheet, TextInput, ScrollView, View, Text, Button, FlatList } from 'react-native';
import { Divider } from '@/components/ui/divider';
import Card  from '@/components/Card'
import { useEventContext } from '@/components/ui/event-context-provider'

export default function TabTwoScreen() {
    const { events } = useEventContext();
    const favoriteEvents = events.filter(event => event.isFavorite)

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>Favorite Events</Text>
        </View>
        <Divider style={{borderWidth: 1}} />
        <FlatList
            data={favoriteEvents}
            renderItem={({item}) => <Card {...item} />}
        />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center'
    },
    header: {
        marginBottom: 20,
        marginTop: 60
    },
    title: {
        textAlign: 'center',
        fontSize: 42,
        fontWeight: 'bold'
    },
    input: {
      height: 40,
      width: 340,
      margin: 12,
      borderWidth: 1
    },
    searchButton: {
        width: 340
    }
});
