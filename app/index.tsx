import { useEffect, useState } from 'react';
import { View, Switch, StyleSheet, ScrollView } from 'react-native';
import { Button } from '@rneui/themed';
import { ThemedText } from '@/components/ThemedText';
import { Alarm } from '@/components/Alarm';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Medicine } from '@/constants/Models';

export default function HomeScreen() {
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    useEffect(() => {
        async function getMedicine() {
            //create two dummy records
            //await AsyncStorage.setItem('medicine', JSON.stringify([{ "name": "Paracetamol", "enabled": true, "interval": 8, "dose": 1.0, "schedule": ["8:00", "16:00", "20:00"] }, { "name": "Omeprazol", "enabled": false, "interval": 12, "dose": 1.0, "schedule": ["8:00", "16:00"] }]));

            const value = await AsyncStorage.getItem('medicine');

            if (value === null) {
                await AsyncStorage.setItem('medicine', JSON.stringify([]));
                setMedicines([]);
            } else {
                setMedicines(JSON.parse(value));
            }
        }

        getMedicine();
    }, []);

    return (
        <View
            style={styles.viewContainer}>
            <View style={styles.titleContainer}>
                <ThemedText type="title">Alarms</ThemedText>
            </View>
            <View style={styles.stepContainer}>
                <ThemedText type="subtitle">List of alarms</ThemedText>
            </View>
            <Button
                buttonStyle={{
                    backgroundColor: '#8DFF8A',
                    borderColor: 'transparent',
                    borderWidth: 1,
                    borderRadius: 30,
                }}
                title="Add new medicine"
                titleStyle={{ color: 'black' }}
                // color="#8DFF8A"
                accessibilityLabel="Click to add new medicine to your alarms."
            />
            <ScrollView style={styles.medicinesContainer}>
                {medicines.map((item, index) => (
                    <Alarm key={index} data={item} />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 15,
    },
    viewContainer: {
        flex: 1,
        margin: '3%',
        marginTop: '13%',
        position: 'absolute',
        width: '90%',
    },
    medicinesContainer: {
        padding: '1%',
        marginTop: '5%'
    },
    textContainer: {
        flex: 1,
    }
});