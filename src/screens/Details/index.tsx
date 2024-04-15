import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Icon from 'react-native-vector-icons/Feather';

import { api } from "../../utils/api";
import { Pokemon } from "../../@types/pokemon";
import { RootStackParamList } from "../../@types/rootStack";

import { styles } from "./styles";
import { formatPokemonId } from "../../utils/formatPokemonId";

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export function Details({ navigation, route }: Props) {
    const { id } = route.params;

    const [pokemon, setPokemon] = useState({} as Pokemon);
    const [isLoading, setIsLoading] = useState(true);
    const [forceId, setForceId] = useState(id);

    async function fetchPokemonDetails() {
        setIsLoading(true);

        try {
            const { data } = await api.get(`/${forceId}`);

            setPokemon(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPokemonDetails();
    }, [forceId]);

    return (
        <>
            {isLoading ? (
                <ActivityIndicator size={30} color="#DC0A2D" />
            ) : (
                <View style={[styles.container, { backgroundColor: "red" }]}>
                    <View>
                        <Text>
                            {<Icon name="arrow-left" size={30} />}
                        </Text>
                        <Text>{pokemon.name}</Text>
                        <Text>{formatPokemonId(pokemon.id)}</Text>
                    </View>
                    <Pressable onPress={() => navigation.navigate("Home")}>
                        <Text>Voltar</Text>
                    </Pressable>

                    <Pressable onPress={() => setForceId(forceId + 1)}>
                        <Text>Next</Text>
                    </Pressable>

                    <Pressable onPress={() => setForceId(forceId - 1)}>
                        <Text>Prev</Text>
                    </Pressable>
                </View>
            )}
        </>
    )
}