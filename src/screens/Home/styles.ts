import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#DC0A2D"
    },
    headerContainer: {
        paddingVertical: 20,
        paddingHorizontal: 17,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 18,
        marginBottom: 13,
    },
    pokeballIcon: {
        width: 30,
        height: 30,
    },
    headerText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#fff",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 15,
    },
    content: {
        backgroundColor: "#FFF",
        margin: 8,
        borderRadius: 10,
        paddingVertical: 28,
        paddingHorizontal: 20,
        flex: 1,
        justifyContent: "center"
    },
    searchTypeButton: {
        backgroundColor: "#fff",
        borderRadius: 100,
        width: 39,
        height: 39,
        alignItems: "center",
        justifyContent: "center",
    },
    searchTypeButtonText: {
        color: "#DC0A2D",
        fontSize: 17,
    }
});