import React from 'react';
import { useContext } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { View, StyleSheet } from 'react-native';
import ToggleableInput from '@/components/ToggableInput';

import PendingMedicinesContext from '@/contexts/pendingMedicines';

export default function ReviewScreen() {
    const { pendingMedicines } = useContext(PendingMedicinesContext);
    return (
        <View>
            <View style={styles.viewContainer}>
                <View style={styles.titleContainer}>
                    <ThemedText type="title">Review Medicine Details</ThemedText>
                </View>
                <ToggleableInput sectionName="Medicine Name" placeholder="Medicine 1" />
                <ToggleableInput sectionName="Dose Intervals" placeholder="Every 4 hours" />
                <ToggleableInput sectionName="Dosage" placeholder="3 a day" />
            </View>
            <ThemedText>{JSON.stringify(pendingMedicines)}</ThemedText>
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