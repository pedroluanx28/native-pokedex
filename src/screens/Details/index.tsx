import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Icon from 'react-native-vector-icons/Feather';
import Arrow from 'react-native-vector-icons/AntDesign';
import Weight from 'react-native-vector-icons/FontAwesome5';
import Height from 'react-native-vector-icons/FontAwesome6';

import { api } from "../../utils/api";
import { Pokemon } from "../../@types/pokemon";
import { RootStackParamList } from "../../@types/rootStack";
import ProgressBar from 'react-native-progress/Bar';
import { VerticalLine } from "../../components/VerticalLine";

import { formatPokemonId } from "../../utils/formatPokemonId";
import { TypeColors } from "../../utils/enums/typeColors";

import { styles } from "./styles";
import { StatsEnum } from "../../utils/enums/statsEnum";
import { convertMeasures } from "../../utils/convertMeasures";

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
                        <Pressable onPress={() => setForceId(forceId - 1)}>
                            {forceId > 1 && (
                                <Arrow name="left" size={30} color="#fff" />
                            )}
                        </Pressable>

                        <Image
                            style={styles.pokemonImage}
                            source={{
                                uri: `${pokemon.sprites.other["official-artwork"].front_default}`
                            }}
                        />

                        <Pressable onPress={() => setForceId(forceId + 1)}>
                            <Arrow name="right" size={30} color="#fff" />
                        </Pressable>
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

                        <Text style={[styles.titleText, {
                            color: TypeColors[
                                pokemon.types[0]["type"]['name'] as keyof typeof TypeColors
                            ]
                        }]}>Sobre</Text>

                        <View style={styles.aboutContainer}>
                            <View style={styles.statsContainer}>
                                <View style={styles.iconContainer}>
                                    <Weight name="weight-hanging" size={15} color="grey" />
                                    <Text>{convertMeasures(pokemon.weight)} kg</Text>
                                </View>

                                <Text style={styles.statsNameText}>Peso</Text>
                            </View>

                            <VerticalLine height={80} />

                            <View style={styles.statsContainer}>
                                <View style={styles.iconContainer}>
                                    <Height name="ruler-vertical" size={17} color="grey" />
                                    <Text>{convertMeasures(pokemon.height)} m</Text>
                                </View>
                                <Text style={styles.statsNameText}>Altura</Text>
                            </View>

                            <VerticalLine height={80} />

                            <View style={styles.statsContainer}>
                                <View style={{ alignItems: "center" }}>
                                    {pokemon.abilities.map((result, index) => (
                                        <Text key={index}>{result.ability.name}</Text>
                                    ))}
                                </View>
                                <Text style={styles.statsNameText}>Habilidades</Text>
                            </View>
                        </View>

                        <Text style={[styles.titleText, {
                            color: TypeColors[
                                pokemon.types[0]["type"]['name'] as keyof typeof TypeColors
                            ]
                        }]}>Status base</Text>
                        <View style={styles.baseStatsContainer}>
                            <View style={{ flexDirection: "row" }}>
                                <View>
                                    {pokemon.stats.map((result, index) => (
                                        <Text key={index}>{
                                            StatsEnum[result.stat.name as keyof typeof StatsEnum]
                                        }</Text>
                                    ))}
                                </View>

                                <VerticalLine height={135} marginHorizontal={22} />

                                <View>
                                    {pokemon.stats.map((result, index) => (
                                        <Text key={index}>{result.base_stat}</Text>
                                    ))}
                                </View>
                            </View>

                            <View style={{ gap: 15 }}>
                                {pokemon.stats.map((result, index) => (
                                    <ProgressBar
                                        key={index}
                                        color={TypeColors[
                                            pokemon.types[0]["type"]['name'] as keyof typeof TypeColors
                                        ]}
                                        progress={result.base_stat / 225}
                                        width={290}
                                    />
                                ))}
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </>
    )
}