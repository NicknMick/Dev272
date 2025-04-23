import React, {useState} from 'react';
import { StyleSheet, Image, Platform, TextInput, ScrollView, View, Text, Button } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
    const [searchText, setSearchText] = useState('Search');

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>Track Events</Text>
        </View>
        <TextInput
            style={styles.input}
            onChangeText={setSearchText}
            value={searchText}
        />
        <Button
            title={'Search'}
        />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold'
    },
    input: {
      height: 40,
      width: 340,
      margin: 12,
      borderWidth: 1
    },
});
