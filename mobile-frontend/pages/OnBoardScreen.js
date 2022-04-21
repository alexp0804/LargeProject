import { StackActions } from '@react-navigation/routers';
import React from 'react'
import {Text, StyleSheet, View, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton } from '../components/Button';
import LogIn from './LogIn';


const OnBoardScreen = ({navigation}) => {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View>
          <Image
            style={{
              width: "100%",
              marginTop: "20%",
              resizeMode: "contain",
            }}
            source={require("../assets/abstract2.png")}
          ></Image>
        </View>

        <View style = {style.textContainer}>
          <View>
            <Text
              style={{ marginTop: 20, fontSize: 32, fontWeight: "bold", textAlign: "center" }}
            >
              ReciPin
            </Text>

            <Text
              style={{
                marginTop: 20,
                fontSize: 18,
                textAlign: "center",
                color: "grey",
              }}
            >
              When it comes to a great recipe, you know it when you see it
            </Text>
          </View>

          <View style = {style.indicatorContainer}>
              <View style = {style.currentIndicator}></View>
              <View style = {style.indicator}></View>
              <View style = {style.indicator}></View>
          </View>

              <PrimaryButton onPress={()=>navigation.dispatch(StackActions.replace('AnyRegistered'))} title = "Get Started"> </PrimaryButton>
              
        </View>
      </SafeAreaView>
    );
}

const style = StyleSheet.create ({
    textContainer: {
        flex: 1, 
        paddingHorizontal: 50, 
        justifyContent: 'space-between',
        paddingBottom: 40,
    },
    indicatorContainer: {
        height: 50,
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
      },
      currentIndicator: {
        height: 12,
        width: 30,
        borderRadius: 10,
        backgroundColor: '#a1483a',
        marginHorizontal: 5,
      },
      indicator: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: 'grey',
        marginHorizontal: 5,
      },
      
     
});

export default OnBoardScreen;