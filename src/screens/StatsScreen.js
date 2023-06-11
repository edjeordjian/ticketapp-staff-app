import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useMainContext } from '../services/contexts/MainContext';
import apiClient from '../services/apiClient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import LineChartEntries from '../components/LineChartEntries';
import {statsScreenStyle} from "../styles/app/StatsScreenStyle";


export default function StatsScreen({ route, navigation }) {
    const [userData, setUserData] = useState({});
    const [stats, setStats] = useState(undefined);
    const [userEntries, setUserEntries] = useState(undefined);
    const { getUserData } = useMainContext();

    useEffect(() => {
        const onResponse = (response) => {
            setStats(response.stats());
        }

        const onResponse2 = (response) => {
            setUserEntries(response.data.stats);
        }

        const onError = (error) => {
            console.log(error);
        }

        getUserData((data) => {
            const client = new apiClient(data.token);

            setUserData(data);

            client.getStats(route.params.eventId, onResponse, onError);

            client.getUserStats(route.params.eventId,
                onResponse2,
                onError);
        });
    }, [route.params.eventId]);

    const navigateToEvent = () => {
        navigation.navigate('SeeEvent', {
            'eventId': route.params.eventId
        });
    }

    return (
        <SafeAreaView>
            <Text style={statsScreenStyle.title}>Ingresos en el tiempo</Text>
            {stats ? 
                <LineChartEntries
                    chartData={stats}
                    userEntries={userEntries}
                    fillShadowGradient="#ccc"
                />
                :
                <></>
            }
            <Text style={statsScreenStyle.explainText}>
                Cantidad de ingresos a través del tiempo
            </Text>
            <Button 
                style={statsScreenStyle.btnGoBack}
                textColor={'black'}
                onPress={navigateToEvent}>
                Volver
            </Button>
        </SafeAreaView>
      );
}
