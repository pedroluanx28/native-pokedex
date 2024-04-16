import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        alignItems: "center",
        borderRadius: 10,
        overflow: "hidden",
        shadowColor: 'black',
        shadowOpacity: 0.9,
        elevation: 5,
    },
    image: {
        height: 85,
        width: 90,
        marginHorizontal: 20,
    },
    backgroundShadow: {
        position: "absolute",
        bottom: 0,
        backgroundColor: "#EFEFEF",
        height: "40%",
        width: "100%",
        zIndex: -1,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
    },
    pokemonNumber: {
        textAlign: "right",
        width: "100%",
        marginRight: 15,
        marginTop: 5,
        fontSize: 12,
        color: "#666666"
    },
    pokemonName: {
        marginBottom: 10,
        fontWeight: "bold",
    }
});