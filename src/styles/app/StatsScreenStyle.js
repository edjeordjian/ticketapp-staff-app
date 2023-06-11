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
    explainText: {
        marginLeft: '5%',
        color: '#212A3E',
        fontWeight: 400,
        fontSize: 14,
        marginBottom: 15,
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
