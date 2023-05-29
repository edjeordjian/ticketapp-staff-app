import {StyleSheet} from "react-native";

const statsScreenStyle = StyleSheet.create({
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

export {
    statsScreenStyle
};
