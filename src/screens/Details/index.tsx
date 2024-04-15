import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { api } from "../../utils/api";
import { Pokemon } from "../../@types/pokemon";
import { RootStackParamList } from "../../@types/rootStack";

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export function Details({ navigation, route }: Props) {
    const [pokemon, setPokemon] = useState({} as Pokemon);
    const [isLoading, setIsLoading] = useState(true);

    const { id } = route.params;

    async function fetchPokemonDetails() {
        try {
            const { data } = await api.get(`/${id}`);

            setPokemon(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPokemonDetails();
    }, [])

    return (
        <>
            {isLoading ? (
                <ActivityIndicator size={30} color="#DC0A2D" />
            ) : (
                <View>
                    <Text>{pokemon.name}</Text>
                    <Pressable onPress={() => navigation.navigate("Home")}>
                        <Text>Voltar</Text>
                    </Pressable>
                </View>
            )}
        </>
    )
}