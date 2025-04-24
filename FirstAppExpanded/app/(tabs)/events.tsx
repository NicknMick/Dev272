import React, {useState} from 'react';
import { StyleSheet, TextInput, ScrollView, View, Text, Button, FlatList } from 'react-native';
import { Divider } from '@/components/ui/divider';
import Card  from '@/components/Card'
import trackEventsData from '@/data/trackEventsData.json';

export default function TabTwoScreen() {
    const [searchText, setSearchText] = useState('Search');
    const [filteredData, setFilteredData] = useState(trackEventsData)

    const handleSearch = (query: string) => {
        setSearchText(query);
        const filtered = trackEventsData.filter((item) => {
            item.title.toLowerCase().includes(query.toLowerCase());
        });
        setFilteredData(filtered);
    };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>Track Events</Text>
        </View>
        <Divider />
        <TextInput
            style={styles.input}
            onChangeText={setSearchText}
            value={searchText}
        />
        <View style={styles.searchButton}>
            <Button
                title={'Search'}
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
