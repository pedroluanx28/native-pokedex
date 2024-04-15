import { TextInput, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import { styles } from "./styles";

type Props = {
    query: string;
    onChangeText: (text: string) => void;
}

export function SearchInput({ query, onChangeText }: Props) {
    return (
        <View style={styles.containerInput}>
            <Icon
                name="search"
                color="#DC0A2D"
                size={20}                
            />

            <TextInput
                placeholder="Pesquisar"
                style={styles.input}
                value={query}
                onChangeText={onChangeText}
            />
        </View>
    )
}