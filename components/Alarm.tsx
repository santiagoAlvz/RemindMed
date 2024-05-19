import { View, Switch, Image, StyleSheet, Button } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';

import { Medicine } from '@/constants/Models';

interface AlarmProps {
    data: Medicine;
}

export function Alarm({ data }: AlarmProps) {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <ThemedView style={styles.medicinesAlarm}
            lightColor="#70BFB5"
            darkColor="#337481"
        >
            <View style={styles.textContainer} >
                <ThemedText type="subtitle">{data['name']}</ThemedText>
                <ThemedText>{'Cada ' + data['interval'] + ' horas'}</ThemedText>
            </View>
            <Switch
                trackColor={{ false: '#7A788C', true: '#81b0ff' }}
                thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    medicinesAlarm: {
        padding: '7%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 25,
        marginBottom: '5%'
    },
    textContainer: {
        flex: 1,
    }
})