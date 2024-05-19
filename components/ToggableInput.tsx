import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from '@rneui/themed';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const ToggleableInput = ({ sectionName, placeholder }: { sectionName: string, placeholder: string }) => {
    const [isDisabled, setIsDisabled] = useState(true);

    const toggleDisabled = () => {
        setIsDisabled(!isDisabled);
    };

    return (
        <ThemedView style={styles.inputContainer}
            lightColor="#E0EFF5"
            darkColor="#33741">
            <ThemedText type="subtitle">{sectionName}</ThemedText>
            <View style={styles.inputRow}>
                <Input
                    style={styles.input}
                    placeholder={placeholder}
                    editable={isDisabled}
                    containerStyle={styles.input}
                />
                <Button
                    title="Edit"
                    onPress={toggleDisabled}
                    buttonStyle={{ backgroundColor: '#DA4C2E' }}
                />
            </View>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        padding: '5%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderRadius: 25,
        marginTop: '5%'
    },
    input: {
        width: '80%',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
});

export default ToggleableInput;
