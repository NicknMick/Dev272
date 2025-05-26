import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Divider } from '@/components/ui/divider';
import { useEventContext } from '@/components/ui/event-context-provider';
import { router, Stack } from 'expo-router';
import { Box } from '@/components/ui/box';

export default function CustomEventAdd() {
  const { addEvent } = useEventContext();

  const [eventType, setEventType] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventRecord, setEventRecord] = useState('');
  const [eventRecordHolder, setEventRecordHolder] = useState('');

  const submitInfo = () => {
    if (
      eventType === '' ||
      eventTitle === '' ||
      eventDesc === '' ||
      eventRecord === '' ||
      eventRecordHolder === ''
    ) {
      Alert.alert('Info Invalid', 'Some fields are invalid or empty!', [
        { text: 'Ok' },
      ]);
      return;
    }
    addEvent({
      eventID: eventTitle.toLowerCase().replace(/ /g, '_'),
      title: eventTitle,
      type: eventType,
      description: eventDesc,
      record: eventRecord,
      recordHolder: eventRecordHolder,
      isFavorite: false,
    });
    setEventType('');
    setEventTitle('');
    setEventType('');
    setEventDesc('');
    setEventRecord('');
    setEventRecordHolder('');
    router.push({
      pathname: '(tabs)/events',
    });
  };

  return (
    <View style={styles.container}>
      <Box className="p-4 m-4 bg-white shadow-md max-h-screen-safe">
        <Stack.Screen options={{ title: 'Add Custom Event' }} />
        <View style={styles.header}>
          <Text style={styles.title}>Event Info Form</Text>
        </View>
        <Divider style={{ borderWidth: 1, width: 'auto' }} />
        <View style={styles.formData}>
          <Text style={styles.eventInfo}>Title:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEventTitle}
            value={eventTitle}
            placeholder={'Type'}
          />
        </View>
        <View style={styles.formData}>
          <Text style={styles.eventInfo}>Type:</Text>
          <View
            style={{
              borderWidth: 1,
              height: 40,
              margin: 12,
              justifyContent: 'center',
            }}
          >
            <Picker
              style={{ width: 200 }}
              mode={'dropdown'}
              selectedValue={eventType}
              onValueChange={(itemValue) => setEventType(itemValue)}
            >
              <Picker.Item label={'Sprints'} value={'Sprints'} />
              <Picker.Item label={'Hurdles'} value={'Hurdles'} />
              <Picker.Item label={'Distance'} value={'Distance'} />
              <Picker.Item label={'Jumps'} value={'Jumps'} />
              <Picker.Item label={'Throws'} value={'Throws'} />
            </Picker>
          </View>
        </View>
        <View style={styles.formData}>
          <Text style={styles.eventDesc}>Description:</Text>
          <TextInput
            style={styles.descInput}
            multiline={true}
            maxLength={100}
            onChangeText={setEventDesc}
            value={eventDesc}
          />
        </View>
        <View style={styles.formData}>
          <Text style={styles.eventInfo}>World Record:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEventRecord}
            value={eventRecord}
            placeholder={'(Include Units)'}
          />
        </View>
        <View style={styles.formData}>
          <Text style={styles.eventInfo}>Record Held By:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEventRecordHolder}
            value={eventRecordHolder}
            placeholder={'Person'}
          />
        </View>
        <View style={styles.submitButton}>
          <Button
            title={'Submit'}
            onPress={() => {
              submitInfo();
            }}
          />
        </View>
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 42,
    fontWeight: 'bold',
  },
  eventInfo: {
    fontWeight: 'bold',
    marginVertical: 5,
    fontSize: 20,
    width: 110,
  },
  eventDesc: {
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
    marginTop: 60,
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    paddingLeft: 15,
  },
  descInput: {
    height: 100,
    width: 200,
    margin: 12,
    borderWidth: 1,
    paddingLeft: 15,
    textAlignVertical: 'top',
  },
  formData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitButton: {
    marginTop: 12,
  },
});
