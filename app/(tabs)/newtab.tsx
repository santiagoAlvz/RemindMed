import { useState } from 'react'
import { View, Switch, StyleSheet } from 'react-native';
import { Button, ButtonGroup, withTheme, Text } from '@rneui/themed';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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
            <View
                style={styles.medicinesContainer}>
                <ThemedView style={styles.medicinesAlarm}>
                    <ThemedText type="subtitle">Medicine Name</ThemedText>
                    <ThemedText>Frecuencia </ThemedText>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </ThemedView>
            </View>
        </View >
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
    },
    medicinesAlarm: {
        backgroundColor: '#BBBBBB',
    }
});