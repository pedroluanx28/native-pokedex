export type Pokemon = {
    id: number;
    name: string;
    officialArtwork: string;
    types: {
        type: {
            name: string;
            url: string;
        }
    }[];
    sprites: {
        other: {
            "official-artwork": {
                front_default: string;
            }
        }
    };
    abilities: {
        ability: {
            name: string;
            url: string;
        }
    }[];
    weight: number;
    height: number;
    stats: {
        base_stat: number;
        stat: {
            name: string;
            url: string;
        }
    }[];
}