import { NavigationContainer } from "@react-navigation/native";
import { TabsRoutes } from "./tabs.routes";


export function Routes() {
    return (
        <NavigationContainer>
            <TabsRoutes />
        </NavigationContainer>
    )
}