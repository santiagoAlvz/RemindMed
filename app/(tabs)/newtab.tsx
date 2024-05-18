import { View, Image, StyleSheet, Button } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
    return (
        <View
            style={styles.viewContainer}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Alarms</ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Hopefully I get to see this page</ThemedText>
            </ThemedView>
            <Button
                title="Add new medicine"
                color="#841584"
                accessibilityLabel="Click to add new medicine to your alarms."
            />
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
        marginBottom: 8,
    },
    viewContainer: {
        flex: 1,
        margin: 30,
        marginTop: 45,
        position: 'absolute',
    },
});