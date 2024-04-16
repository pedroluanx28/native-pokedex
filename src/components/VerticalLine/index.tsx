import { View } from "react-native";
import { globalStyles } from "../../../global";

type Props = {
    height: number;
    marginHorizontal?: number;
}

export function VerticalLine({ height, marginHorizontal = 50 }: Props) {
    return (
        <View style={[globalStyles.verticalLine, {
            height: height,
            marginHorizontal: marginHorizontal
        }]} />
    )
}