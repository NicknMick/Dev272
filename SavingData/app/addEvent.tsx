import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, SafeAreaView, TextInput, Button} from 'react-native'
import {Picker} from "@react-native-picker/picker";
import {Divider} from "@/components/ui/divider";
import {Event, useEventContext} from "@/components/ui/event-context-provider";
import {useLocalSearchParams, useRouter, Stack} from "expo-router";
import trackEventsData from '@/data/trackEventsData.json'
import {Box} from "@/components/ui/box";


export default function FullDetailsPage({route}) {
    const { title, type, description, record, recordHolder } = useLocalSearchParams()

    const [eventType, setEventType] = useState("")

    return (
        <View style={styles.container}>
            <Box className='p-4 m-4 bg-white shadow-md max-h-screen-safe'>
                <Stack.Screen options={{title: 'Add Custom Event'}}/>
                <View style={styles.header}>
                    <Text style={styles.title}>Event Info Form</Text>
                </View>
                <Divider style={{borderWidth: 1, width: 'auto'}} />
                <View style={styles.formData}>
                    <Text style={styles.eventInfo}>Title:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={'Type'}
                    />
                </View>
                <View style={styles.formData}>
                    <Text style={styles.eventInfo}>Type:</Text>
                    <View style={{borderWidth: 1, height: 40, margin: 12, justifyContent: 'center'}}>
                        <Picker
                            style={{width: 200}}
                            mode={"dropdown"}
                            selectedValue={eventType}
                            onValueChange={(itemValue) => setEventType(itemValue)}
                        >
                            <Picker.Item label={'Sprints'} value={'sprints'}/>
                            <Picker.Item label={'Hurdles'} value={'hurdles'}/>
                            <Picker.Item label={'Distance'} value={'distance'}/>
                            <Picker.Item label={'Jumps'} value={'jumps'}/>
                            <Picker.Item label={'Throws'} value={'throws'}/>
                        </Picker>
                    </View>
                </View>
                <View style={styles.formData}>
                    <Text style={styles.eventDesc}>Description:</Text>
                    <TextInput
                        style={styles.descInput}
                        multiline={true}
                        maxLength={100}
                    />
                </View>
                <View style={styles.formData}>
                    <Text style={styles.eventInfo}>World Record:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={'(Include Units)'}
                    />
                </View>
                <View style={styles.formData}>
                    <Text style={styles.eventInfo}>Record Held By:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={'Person'}
                    />
                </View>
                <View style={styles.submitButton}>
                    <Button title={'Submit'} />
                </View>
            </Box>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 42,
        fontWeight: 'bold'
    },
    eventInfo: {
        fontWeight: 'bold',
        marginVertical: 5,
        fontSize: 20,
        width: 110
    },
    eventDesc: {
        fontWeight: 'bold',
        marginVertical: 10,
        fontSize: 20
    },
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    header: {
        marginBottom: 20,
        marginTop: 60
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        paddingLeft: 15
    },
    descInput: {
        height: 100,
        width: 200,
        margin: 12,
        borderWidth: 1,
        paddingLeft: 15,
        textAlignVertical: 'top'
    },
    formData: {
        flexDirection: "row",
        alignItems: "center"
    },
    submitButton: {
        marginTop: 12
    }
})