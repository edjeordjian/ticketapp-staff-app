import { StyleSheet, View } from "react-native";
import * as React from 'react';
import { ProgressBar } from 'react-native-paper';

export default function ProgressBarTickets(props){
    return (
        <ProgressBar
                progress={props.progressPercentage} 
                style={styles.progressBar}
                color="#8CE09A"/>
    )
}

const styles = StyleSheet.create({
    progressBar: {
        height: 45,
        width: undefined,
        backgroundColor: '#6D6D6D',
        borderRadius: 15
    }
});