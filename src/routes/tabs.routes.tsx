import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { Details } from "../screens/Details";
import { RootStackParamList } from "../@types/rootStack";

export function TabsRoutes() {
    const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

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