import { useState } from 'react'
import { View, Switch, StyleSheet, ScrollView } from 'react-native';
import { Button } from '@rneui/themed';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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
                    borderWidth: 1,
                    borderRadius: 30,
                }}
                title="Add new medicine"
                titleStyle={{ color: 'black' }}
                // color="#8DFF8A"
                accessibilityLabel="Click to add new medicine to your alarms."
            />
            <ScrollView
                style={styles.medicinesContainer}>
                <ThemedView
                    style={styles.medicinesAlarm}
                    lightColor="red" // Your custom light color
                    darkColor="blue"  // Your custom dark color
                >
                    <View style={styles.textContainer} >
                        <ThemedText type="subtitle">Medicine Name</ThemedText>
                        <ThemedText>Frecuencia</ThemedText>
                    </View>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </ThemedView>
            </ScrollView>
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