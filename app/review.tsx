import { ThemedText } from '@/components/ThemedText';
import { View, StyleSheet } from 'react-native';

export default function ReviewScreen(){
    return(
        <View style={styles.titleContainer}>
            <ThemedText type="title">Alarms</ThemedText>
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