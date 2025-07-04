import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Button,
  FlatList,
} from 'react-native';
import { Divider } from '@/components/ui/divider';
import Card from '@/components/Card';
import { useEventContext } from '@/components/ui/event-context-provider';
import { router } from 'expo-router';

export default function EventsScreen() {
  const { events } = useEventContext();
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(events);

  const handleSearch = (query: string) => {
    setSearchText(query);
    const filtered = events.filter((item) => {
      if (item.title.toLowerCase().includes(query.toLowerCase())) {
        return item.title.toLowerCase().includes(query.toLowerCase());
      } else {
        return item.type.toLowerCase().includes(query.toLowerCase());
      }
    });
    setFilteredData(filtered);
  };

  useEffect(() => {
    if (searchText === "") {
      setFilteredData(events);
    }
    else {
      const filtered = events.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredData(filtered);
    }
  }, [events]);

  const addEventPress = () => {
    router.push({
      pathname: '/addEvent',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Track Events</Text>
      </View>
      <Divider style={{ borderWidth: 1 }} />
      <View style={styles.addButton}>
        <Button
          title={'+'}
          onPress={() => {
            addEventPress();
          }}
        />
      </View>
      <TextInput
        style={styles.input}
        onChangeText={setSearchText}
        value={searchText}
        placeholder={'Search'}
      />
      <View style={styles.searchButton}>
        <Button
          title={'Search'}
          onPress={() => {
            handleSearch(searchText);
          }}
        />
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => <Card {...item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
    marginTop: 60,
  },
  title: {
    textAlign: 'center',
    fontSize: 42,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: 340,
    margin: 12,
    borderWidth: 1,
  },
  searchButton: {
    width: 340,
  },
  addButton: {
    paddingLeft: '90%',
    marginTop: 12,
  },
});
