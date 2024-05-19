import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { View, StyleSheet, Button } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

import ToggleableInput from '@/components/ToggableInput';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PendingMedicinesContext from '@/contexts/pendingMedicines';
import { Medicine } from '@/constants/Models';
import { Schedules } from '@/constants/schedules';
import { router } from 'expo-router';

export default function ReviewScreen() {
    const { pendingMedicines } = useContext(PendingMedicinesContext);
    const [currentMedicine, setCurrentMedicine] = useState<Medicine>([]);

    //var pendingMedicines = [{"name": "Paracetamol", "enabled": true,"interval": 8,"dose": 1.0,"schedule": ["8:00", "16:00", "20:00"]}];

    async function addCurrentMedicine(){
        const result = await AsyncStorage.getItem('medicine');

        if(result !== null){
            var meds = JSON.parse(result);

            currentMedicine['schedule'] = Schedules[currentMedicine['interval'].toString()];
            meds.push(currentMedicine);

            await AsyncStorage.setItem('medicine', JSON.stringify(meds));
        }

        nextMedicine();
    }

    function nextMedicine() {
        if(pendingMedicines.length > 0){
            setCurrentMedicine(pendingMedicines.shift());
        } else {
            router.replace('/');
        }
    }

    useEffect(() => {
        nextMedicine();
    }, []);

    return (
        <GestureHandlerRootView style={styles.mainContainer}>
            <ScrollView style={styles.viewContainer}>
                <View style={styles.titleContainer}>
                    <ThemedText type="subtitle">Review Medicine Details</ThemedText>
                </View>
                <ToggleableInput sectionName="Medicine Name" placeholder={currentMedicine['name']}/>
                <ToggleableInput sectionName="Dose Intervals" placeholder={"Every "+currentMedicine['interval']+" hours"} />
                <ToggleableInput sectionName="Dosage" placeholder={currentMedicine['dose']+" a day"} />
                <Button
                    style={styles.button}
                    onPress={addCurrentMedicine}
                    title="Add"
                    color="#841584"
                    accessibilityLabel="Add to my medicines"
                    />
                <Button
                    style={styles.button}
                    onPress={nextMedicine}
                    title="Discard"
                    color="#841584"
                    accessibilityLabel="Add to my medicines"
                    />
            </ScrollView>

        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    viewContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: '3%',
        marginTop: '7%',
        width: '90%',
        display: 'flex',
        gap: 20
    },
    textContainer: {
        flex: 1,
    },
    detailContainer: {
        padding: '1%',
        marginTop: '5%'
    },
    button: {
    }
});