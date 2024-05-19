import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { View, StyleSheet, Button } from 'react-native';
import ToggleableInput from '@/components/ToggableInput';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PendingMedicinesContext from '@/contexts/pendingMedicines';
import { Medicine } from '@/constants/Models';
import { router } from 'expo-router';

export default function ReviewScreen() {
    const { pendingMedicines } = useContext(PendingMedicinesContext);
    const [currentMedicine, setCurrentMedicine] = useState<Medicine>([]);

    //var pendingMedicines = [{"name": "Paracetamol", "enabled": true,"interval": 8,"dose": 1.0,"schedule": ["8:00", "16:00", "20:00"]}];

    async function addCurrentMedicine(){
        const result = await AsyncStorage.getItem('medicine');

        if(result !== null){
            var meds = JSON.parse(result);
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
        <View>
            <View style={styles.viewContainer}>
                <View style={styles.titleContainer}>
                    <ThemedText type="title">Review Medicine Details</ThemedText>
                </View>
                <ToggleableInput sectionName="Medicine Name" placeholder={currentMedicine['name']}/>
                <ToggleableInput sectionName="Dose Intervals" placeholder={"Every "+currentMedicine['interval']+" hours"} />
                <ToggleableInput sectionName="Dosage" placeholder={currentMedicine['dose']+" a day"} />
            </View>


            <Button
                onPress={addCurrentMedicine}
                title="Add"
                color="#841584"
                accessibilityLabel="Add to my medicines"
                />
            <Button
                onPress={nextMedicine}
                title="Discard"
                color="#841584"
                accessibilityLabel="Add to my medicines"
                />
        </View>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    viewContainer: {
        flex: 1,
        margin: '3%',
        marginTop: '7%',
        position: 'absolute',
        width: '90%',
    },
    textContainer: {
        flex: 1,
    },
    detailContainer: {
        padding: '1%',
        marginTop: '5%'
    },
    reviewDetail: {
        padding: '7%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 25,
        marginBottom: '5%'
    },
});