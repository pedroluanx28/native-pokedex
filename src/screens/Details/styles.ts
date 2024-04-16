import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 25,
        marginBottom: 170,
    },
    pokemonNameContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 13,
    },
    pokemonName: {
        fontWeight: "900",
        fontSize: 30,
        color: "#fff",
    },
    pokemonId: {
        fontWeight: "bold",
        color: "#fff",
    },
    content: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        margin: 8,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 90,
    },
    pokemonImage: {
        width: 250,
        height: 250,
    },
    pokemonImageContainer: {
        position: "absolute",
        zIndex: 1,
        top: 105,
        alignItems: "center",
        width: "100%",
    },
    badgeContainer: {
        flexDirection: "row",
        marginBottom: 23,
        gap: 15,
    },
    badge: {
        borderRadius: 17,
        paddingHorizontal: 18,
        paddingVertical: 3,
        color: "#fff",
        fontWeight: "bold",
    },
    aboutText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    aboutContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    verticalLine: {
        borderLeftColor: "#ccc",
        borderLeftWidth: 2,
        borderStyle: "solid",
        height: 80,
        marginHorizontal: 50,
    },
    statsContainer: {
        alignItems: "center",
        gap: 13,
    },
    statsNameText: {
        fontSize: 12,
        color: "#666666",
    }
});