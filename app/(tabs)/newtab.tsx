import { View, Image, StyleSheet } from 'react-native';
import { Button, ButtonGroup, withTheme, Text } from '@rneui/themed';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { Alarm } from '@/components/Alarm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Medicine } from '@/constants/Models';

export default function HomeScreen() {
    const [medicines, setMedicines] = useState<Medicine []>([]);
    useEffect(() => {
      async function getMedicine(){
        //await AsyncStorage.setItem('medicine', JSON.stringify([{'name': 'Paracetamol','enabled': true}, {'name': 'Omeprazol','enabled': false}]));
        
        const value = await AsyncStorage.getItem('medicine');

        if(value === null){
            await AsyncStorage.setItem('medicine', JSON.stringify([]));
            setMedicines([]);
        } else setMedicines(JSON.parse(value));
      }
  
      getMedicine();
    }, []);

    return (
        <View
            style={styles.viewContainer}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Alarms</ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">List of alarms</ThemedText>
            </ThemedView>
            <Button
                buttonStyle={{
                    backgroundColor: '#8DFF8A',
                    borderWidth: 1,
                    borderColor: 'black',
                    borderRadius: 30,
                }}
                title="Add new medicine"
                titleStyle={{ color: 'black' }}
                // color="#8DFF8A"
                accessibilityLabel="Click to add new medicine to your alarms."
            />
            <View style={styles.medicinesContainer}>
                { medicines.map((item, index) => (
                    <Alarm key={index} data={item}/>
                ))}
            </View>
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
        margin: 30,
        marginTop: 45,
        position: 'absolute',
        width: 300,
    },
    medicinesContainer: {
        padding: 10,
    }
});