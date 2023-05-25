import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useMainContext } from '../services/contexts/MainContext';
import apiClient from '../services/apiClient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import LineChartEntries from '../components/LineChartEntries';


export default function StatsScreen({ route, navigation }) {
    const [userData, setUserData] = useState({});
    const [stats, setStats] = useState(undefined);
    const { getUserData } = useMainContext();

    useEffect(() => {
        const onResponse = (response) => {
            setStats(response.stats());
        }

        const onError = (error) => {
            console.log(error);
        }

        getUserData((data) => {
            const client = new apiClient(data.token);
            setUserData(data);
            client.getStats(route.params.eventId, onResponse, onError);
        });
    }, [route.params.eventId]);

    const navigateToEvent = () => {
        navigation.navigate('SeeEvent', {
            'eventId': route.params.eventId
        });
    }

    return (
        <SafeAreaView>
            <Text style={styles.title}>Ingresos en el tiempo</Text>
            {stats ? 
                <LineChartEntries
                    chartData={stats}
                    fillShadowGradient="#ccc"
                />
                :
                <></>
            }
            <Button 
                style={styles.btnGoBack} 
                textColor={'black'}
                onPress={navigateToEvent}>
                Volver
            </Button>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#A5C91B',
        fontWeight: 700,
        fontSize: 20,
        marginVertical: 35,
        marginLeft: '5%'
    },
    nameTitle: {
        color: '#ffffff',
        fontWeight: 700,
        fontSize: 18,
        marginBottom: 15
    },
    messageContainer: {
        backgroundColor: '#ffffff', 
        padding: 25,
        width: 300,
        margin: 15,
        borderRadius: 5
    },
    btnGoBack: {
        width: '50%',
        padding: 2,
        marginTop: 15,
        marginBottom: 15,
        borderWidth: 2,
        borderColor: '#768395',
        marginLeft: '5%'
    },
});