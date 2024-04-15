import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Pressable, Text, View } from "react-native";

import { ApolloClient, ApolloQueryResult, InMemoryCache, gql } from "@apollo/client";

import { Pokemon } from "../../@types/pokemon";

import { SearchInput } from "../../components/SearchInput";
import { Card } from "../../components/Card";

import { styles } from "./styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../@types/rootStack";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export function Home({ navigation }: Props) {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [offset, setOffset] = useState(0);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [searchById, setSearchById] = useState(true);

    async function fetchPokemons() {
        const client = new ApolloClient({
            uri: "https://beta.pokeapi.co/graphql/v1beta",
            cache: new InMemoryCache(),
        });

        client.query({
            query: gql`
                      query GetPokemons {
                        pokemon: pokemon_v2_pokemon(limit: 20, offset: ${offset}) {
                          id
                          name
                          types: pokemon_v2_pokemontypes {
                            id
                            slot
                            type: pokemon_v2_type {
                              name
                            }
                          }
                        }
                      }
                    `
        })
            .then((response: ApolloQueryResult<any>) => {
                const data = response.data.pokemon.map((pokemon: any): Pokemon => {
                    return {
                        ...pokemon,
                        officialArtwork: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
                    };
                }) as Pokemon[];

                setPokemons([...pokemons, ...data]);
                setOffset(offset + 20);
            })
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
    }

    const pokemonNameSearch = pokemons.filter(pokemon => pokemon.name.includes(search));
    const pokemonIdSearch = pokemons.filter(pokemon => String(pokemon.id).includes(search));

    const filteredData = search
        ? searchById
            ? pokemonIdSearch
            : pokemonNameSearch
        : pokemons;

    useEffect(() => {
        fetchPokemons();
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <Image
                        source={require("../../assets/pokeball.png")}
                        style={styles.pokeballIcon}
                    />
                    <Text style={styles.headerText}>Pokédex</Text>
                </View>

                <View style={styles.searchContainer}>
                    <SearchInput query={search} onChangeText={(text) => setSearch(text)} />
                    <Pressable style={styles.searchTypeButton} onPress={() => setSearchById(!searchById)}>
                        <Text style={styles.searchTypeButtonText}>
                            {searchById ? "#" : "A"}
                        </Text>
                    </Pressable>
                </View>
            </View>

            <View style={styles.content}>
                {isLoading ? (
                    <ActivityIndicator
                        size={100}
                        color="#DC0A2D"
                    />
                ) : (
                    <FlatList
                        data={filteredData}
                        numColumns={3}
                        renderItem={({ item }) => (
                            <Card
                                id={item.id}
                                name={item.name}
                                officialArtwork={item.officialArtwork}
                                navigation={navigation}
                            />
                        )}
                        columnWrapperStyle={{ justifyContent: "space-around" }}
                        contentContainerStyle={{ gap: 13 }}
                        showsVerticalScrollIndicator={false}
                        onEndReached={() => fetchPokemons()}
                    />
                )}
            </View>
        </View >
    )
}