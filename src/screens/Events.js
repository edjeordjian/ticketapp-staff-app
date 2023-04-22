import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventBox from '../components/EventBox';
import { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';
import { useMainContext } from '../services/contexts/MainContext';
import EventBoxPlaceHolder from '../components/EventBoxPlaceHolder';


export default function Events({ navigation }) {
    const [events, setEvents] = useState([]);
    const [loading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState({});
    const { getUserData } = useMainContext();

    useEffect(() => {
        const onResponse = (response) => {
            setIsLoading(false);
            setEvents(response.events());
        }
        const onError = (error) => {
            console.log(error);
        }

        getUserData((data) => {
            setUserData(data);
            console.log(data);
            const client = new apiClient(data.token);
            client.getEventsList(onResponse, onError, data.id);
        });

    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#1A55D7', '#A8BB46']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.searchBarContainer}
            />
            <ScrollView 
                contentContainerStyle={{ flexGrow: 1, alignItems: 'center'}}
                style={styles.scrollContainer}>
                {loading ? 
                    <EventBoxPlaceHolder/>
                : 
                    events.map((event,i) => {
                        return (
                            <EventBox key={event.id} eventInfo={event} navigation={navigation}/>
                        );
                    })
                }
            </ScrollView>
            <StatusBar style="auto" />
      </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F4F4F4',
      width: '100%',
    },
    searchBarContainer: {
        backgroundColor: '#1A55D7',
        width: '100%',
        height: 100,
        marginBottom: 25,
        display: 'flex',
        alignItems: 'center'
    },
    scrollContainer: {
        width: '100%',
        backgroundColor: '#F4F4F4',
      },
});