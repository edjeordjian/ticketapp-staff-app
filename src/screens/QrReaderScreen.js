import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import { useMainContext } from '../services/contexts/MainContext';
import apiClient from '../services/apiClient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import LoadQRManuallyModal from './LoadQRManuallyModal';

export default function QrReaderScreen({ route, navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [message, setMessage] = useState('');
    const [scanned, setScanned] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({});
    const { getUserData } = useMainContext();

    useEffect(() => {
        getUserData((data) => {
            setUserData(data);
        });
    }, []);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
            })();
    }, []);

    const checkIfQRisValid = async (qrCode) => {
        const onResponse = (response) => {
            setLoading(false);
            setMessage(`Bar code successfully read`);
        }

        const onError = (error) => {
            const mensaje = error.response.data.error;
            setMessage(mensaje);
        }
        setLoading(true);
        const client = new apiClient(userData.token);
        client.checkValidateQR(route.params.eventId, qrCode, onResponse, onError);
    }

    const handleBarCodeScanned = async (result) => {
        setScanned(true);
        if (!scanned) {
            setMessage('Cargando');
            await checkIfQRisValid(result.data);
            setScanned(false);
        }
    };

    const handleManualCode = async (result) => {
        setMessage('Cargando');
        checkIfQRisValid(result.data)
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <SafeAreaView>
            <LinearGradient
                colors={['#1A55D7', '#A8BB46']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.container}
            >
                <Text style={styles.title}>Lee el QR</Text>
                <View style={styles.messageContainer}>
                    <Text>{message}</Text>
                </View>
                {scanned ? 
                  <Text>Loading</Text>
                  :
                  <Camera
                        onBarCodeScanned={handleBarCodeScanned}
                        ratio='16:9'
                        style={{width: '80%', height: 300}}
                    />
                  }
                <LoadQRManuallyModal sendCode={handleManualCode}/>
            </LinearGradient>
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
        color: '#ffffff',
        fontWeight: 700,
        fontSize: 18
    },
    messageContainer: {
        backgroundColor: '#ffffff', 
        padding: 25,
        width: 300,
        margin: 15,
        borderRadius: 5
    }
});