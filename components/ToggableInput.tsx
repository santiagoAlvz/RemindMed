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
            lightColor="#70BFB5"
            darkColor="#337481">
            <ThemedText type="subtitle">{sectionName}</ThemedText>
            <Input
                placeholder={placeholder}
                disabled={isDisabled}
                containerStyle={styles.input}
            />
            <Button
                title={isDisabled ? "Enable" : "Disable"}
                onPress={toggleDisabled}
            />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    // textContainer: {
    //     flex: 1,
    // },
    input: {
        flex: 1,
        marginRight: 10,
    },
});

export default ToggleableInput;
