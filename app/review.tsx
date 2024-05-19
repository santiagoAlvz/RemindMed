import { ThemedText } from '@/components/ThemedText';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import PendingMedicinesContext from '@/contexts/pendingMedicines';
import { useContext } from 'react';

export default function ReviewScreen(){
    const pendingMedicines = useContext(PendingMedicinesContext);

    return(
        <View>
        <View style={styles.titleContainer}>
            <ThemedText type="title">Alarms</ThemedText>
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
    }
});