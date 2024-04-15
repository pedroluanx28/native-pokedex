import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

type Props = {
    id: number;
    name: string;
    officialArtwork: string;
    navigation: any;
}

export function Card({ id, name, officialArtwork, navigation }: Props) {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate("Details", {
                id: id,
            })}
        >
            <Text style={styles.pokemonNumber}>#{id}</Text>
            <Image
                source={{
                    uri: `${officialArtwork}`
                }}
                style={styles.image}
            />
            <Text style={styles.pokemonName}>{name}</Text>
            <View style={styles.backgroundShadow} />
        </TouchableOpacity>
    )
}