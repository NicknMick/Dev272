import React, {useState} from 'react';
import { StyleSheet, TextInput, ScrollView, View, Text, Button, FlatList } from 'react-native';
import { Divider } from '@/components/ui/divider';
import Card  from '@/components/Card'
import {useEventContext} from "@/components/ui/event-context-provider";

export default function TabTwoScreen() {
    const { events } = useEventContext();
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(events)

    const handleSearch = (query: string) => {
        setSearchText(query);
        const filtered = events.filter((item) => {
                if (item.title.toLowerCase().includes(query.toLowerCase())) {
                    return item.title.toLowerCase().includes(query.toLowerCase())
                }
                else {
                    return item.type.toLowerCase().includes(query.toLowerCase())
                }
            }
        );
        setFilteredData(filtered);
    };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>Track Events</Text>
        </View>
        <Divider style={{borderWidth: 1}} />
        <TextInput
            style={styles.input}
            onChangeText={setSearchText}
            value={searchText}
            placeholder={'Search'}
        />
        <View style={styles.searchButton}>
            <Button
                title={'Search'}
                onPress={() => {handleSearch(searchText)}}
            />
        </View>
        <FlatList
            data={filteredData}
            keyExtractor={(item) => item.title}
            renderItem={({item}) => (
                <Card {...item}/>
            )}
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
