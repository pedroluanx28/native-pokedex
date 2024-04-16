import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { Details } from "../screens/Details";
import { RootStackParamList } from "../@types/rootStack";

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function TabsRoutes() {
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen
                name="Home"
                component={Home}
            />

            <Screen
                name="Details"
                component={Details}
            />
        </Navigator>
    )
}