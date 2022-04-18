import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";

export default function RecipeCard({name, desc, country, onPress})
{
    return (
        <View style={{flex: 1}} onStartShouldSetResponder={onPress}>
            <View style={styles.rect}>
                <View style={styles.imageRow}>
                    <Image
                        style={{width:80, height:80, borderRadius:0, alignSelf:"center", marginTop: "0%"}}
                        source={{
                        uri: 'https://cdn.discordapp.com/attachments/963149385875738684/963149436173832222/darth_early_2020_pfp.jpg',
                        }}>
                    </Image>
                    <View style={styles.recipeNameColumn}>
                        <Text style={styles.recipeName}>{name}</Text>
                        <Text style={styles.recipeDesc}>{desc}</Text>
                        <Text style={styles.recipeCountry}>{country}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    rect: {
      width: 324,
      height: 134,
      backgroundColor: "#E6E6E6",
      marginTop: 92,
      alignSelf: "center"
    },
    image: {
      width: 102,
      height: 88
    },
    recipeName: {
      color: "#121212"
    },
    recipeDesc: {
      color: "#121212",
      marginTop: 19
    },
    recipeCountry: {
      color: "#121212",
      marginTop: 17
    },
    recipeNameColumn: {
      width: 94,
      marginLeft: 50,
      marginBottom: 2
    },
    imageRow: {
      height: 88,
      flexDirection: "row",
      marginTop: 26,
      marginLeft: 21,
      marginRight: 57
    }
  });
  