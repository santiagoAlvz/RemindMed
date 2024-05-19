import { useEffect, useState, createContext } from 'react';
import { View, Switch, StyleSheet, ScrollView, Pressable, Text } from 'react-native';
import { Button } from '@rneui/themed';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Alarm } from '@/components/Alarm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from "expo-router";

import { Medicine } from '@/constants/Models';

export default function HomeScreen() {
    const [medicines, setMedicines] = useState<Medicine []>([{"name": "Paracetamol", "enabled": true,"interval": 8,"dose": 1.0,"schedule": ["8:00", "16:00", "20:00"]}, {"name": "Omeprazol", "enabled": false,"interval": 12,"dose": 1.0,"schedule": ["8:00", "16:00"]}]);
    useEffect(() => {
      async function getMedicine(){
        //create two dummy records
        //await AsyncStorage.setItem('medicine', JSON.stringify([{"name": "Paracetamol", "enabled": true,"interval": 8,"dose": 1.0,"schedule": ["8:00", "16:00", "20:00"]}, {"name": "Omeprazol", "enabled": false,"interval": 12,"dose": 1.0,"schedule": ["8:00", "16:00"]}]));
        
        const value = await AsyncStorage.getItem('medicine');

        if(value === null){
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
            <Link
                href={{'pathname': "/review"}}
                asChild>
                <Pressable
                    style={{
                    backgroundColor: '#8DFF8A',
                    borderColor: 'transparent',
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 30}}>
                    <Text
                        style={{ color: 'black', textAlign: 'center', fontSize: 18}}
                        accessibilityLabel="Click to add new medicine to your alarms.">
                        Add new medicine
                    </Text>
                </Pressable>
            </Link>

            <ScrollView style={styles.medicinesContainer}>
                { medicines.map((item, index) => (
                    <Alarm key={index} data={item}/>
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
        margin: 20,
        marginTop: 45,
        position: 'absolute',
        width: 350,
    },
    medicinesContainer: {
        padding: 10,
        marginTop: 10
    },
    medicinesAlarm: {
        backgroundColor: '#BBBBBB',
        padding: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 25
    },
    textContainer: {
        flex: 1,
    }
});