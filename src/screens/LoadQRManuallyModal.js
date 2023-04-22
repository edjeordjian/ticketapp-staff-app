import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { Button } from "react-native-paper";

export default function LoadQRManuallyModal(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [code, setCode] = useState("");

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const readCode = async () => {
     toggleModal();
     props.sendCode({data: code});
  }

  return (
    <View style={{ flex: 0.5}}>
      <Button style={styles.btnSoldEvent} onPress={() => toggleModal()}>
          Ingresar Manual
      </Button>

      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
          <View  style={{backgroundColor: 'white', height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.text}>Código Manual</Text>
            
            <View
              style={{
                backgroundColor: 'white',
                borderColor: '#1A55D7',
                borderWidth: 1,
                width: '80%',
                marginTop: 10
              }}>
            <TextInput
              editable
              maxLength={10}
              onChangeText={text => setCode(text)}
              value={code}
              style={{padding: 10}}
            />
            </View>

            <View style={styles.btnsRow}>
              <Button mode="outlined" 
                      textColor={'black'} 
                      style={styles.optionsBtn}
                      onPress={toggleModal}>
                Cancelar
              </Button>
              <Button mode="contained" 
                      buttonColor={'#1A55D7'} 
                      textColor={'white'} 
                      style={styles.optionsBtn}
                      onPress={readCode}>
                Leer
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create ({
   container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   text: {
      color: '#708BA6',
      fontSize: 25,
      textAlign: 'center'
   },
   btnGetEvent: {
      backgroundColor: '#1A55D7',
      width: '90%',
      alignSelf: 'center',
      padding: 2,
      marginTop: 15,
      marginBottom: 15
  },
  btnSoldEvent: {
    width: '90%',
    alignSelf: 'center',
    padding: 2,
},
  btnsRow: {
   display: 'flex', 
   flexDirection: 'row', 
   padding: 25,
   justifyContent: 'space-around'
  },
  optionsBtn: {
     width: '40%'
  }
})