import "react-native-gesture-handler";
import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";

const Drawer= createDrawerNavigator();
export default function Testo(){
    return(
        <NavigationContainer>
           <Drawer.Navigator>
                <Drawer.Screen name="Home"/>
                <Drawer.Screen name="Settings" />
            </Drawer.Navigator> 
        </NavigationContainer>
    )
}