import React from "react";
import { View, Text, SafeAreaView} from "react-native";

export default function Settings ({route, navigation})
{
    console.warn(route.params)
    React.useLayoutEffect(() => {
        navigation.getParent().setOptions({
          title: "Settings"
        });
      }, [navigation]);

    return(
        <SafeAreaView>
            <Text>
                Hey, it's me! Goku!
            </Text>
        </SafeAreaView>
    )
}