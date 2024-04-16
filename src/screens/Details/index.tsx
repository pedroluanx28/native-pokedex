import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Icon from 'react-native-vector-icons/Feather';

import { api } from "../../utils/api";
import { Pokemon } from "../../@types/pokemon";
import { RootStackParamList } from "../../@types/rootStack";

import { formatPokemonId } from "../../utils/formatPokemonId";
import { TypeColors } from "../../utils/enums/typeColors";

import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export function Details({ navigation, route }: Props) {
    const { id } = route.params;

    const [pokemon, setPokemon] = useState({} as Pokemon);
    const [isLoading, setIsLoading] = useState(true);
    const [forceId, setForceId] = useState(0);

    // const typeColor = TypeColors[
    //     pokemon.types[0]["type"]['name'] as keyof typeof TypeColors
    // ];

    async function fetchPokemonDetails() {
        setIsLoading(true);

        try {
            const { data } = await api.get(`/${forceId || id}`);

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
                <View style={[styles.container, {
                    backgroundColor: TypeColors[
                        pokemon.types[0]["type"]['name'] as keyof typeof TypeColors
                    ]
                }]}>
                    <View style={styles.header}>
                        <View style={styles.pokemonNameContainer}>
                            <Pressable onPress={() => navigation.navigate("Home")}>
                                {<Icon name="arrow-left" size={30} color="#fff" />}
                            </Pressable>
                            <Text style={styles.pokemonName}>{pokemon.name}</Text>
                        </View>

                        <Text style={styles.pokemonId}>{formatPokemonId(pokemon.id)}</Text>
                    </View>

                    <View style={styles.pokemonImageContainer}>
                        <Image
                            style={styles.pokemonImage}
                            source={{
                                uri: `${pokemon.sprites.other["official-artwork"].front_default}`
                            }}
                        />
                    </View>

                    <View style={styles.content}>
                        <View style={styles.badgeContainer}>
                            {pokemon.types.map((result, index) => (
                                <Text key={index} style={[styles.badge, {
                                    backgroundColor: TypeColors[result.type.name as keyof typeof TypeColors]
                                }]}>
                                    {result.type.name}
                                </Text>
                            ))}
                        </View>

                        <Text style={[styles.aboutText, {
                            color: TypeColors[
                                pokemon.types[0]["type"]['name'] as keyof typeof TypeColors
                            ]
                        }]}>ABOUT</Text>

                        <View style={styles.aboutContainer}>
                            <View style={styles.statsContainer}>
                                <Text>{pokemon.weight}</Text>
                                <Text style={styles.statsNameText}>Peso</Text>
                            </View>

                            <View style={styles.verticalLine} />

                            <View style={styles.statsContainer}>
                                <Text>{pokemon.height}</Text>
                                <Text style={styles.statsNameText}>Altura</Text>
                            </View>

                            <View style={styles.verticalLine} />

                            <View style={styles.statsContainer}>
                                <View style={{ alignItems: "center" }}>
                                    {pokemon.abilities.map((result, index) => (
                                        <Text key={index}>{result.ability.name}</Text>
                                    ))}
                                </View>
                                <Text style={styles.statsNameText}>Habilidades</Text>
                            </View>
                        </View>
                    </View>

                    {/* <Pressable onPress={() => setForceId(forceId + 1)}>
                        <Text>Next</Text>
                    </Pressable>

                    <Pressable onPress={() => setForceId(forceId - 1)}>
                        <Text>Prev</Text>
                    </Pressable> */}
                </View>
            )}
        </>
    )
}