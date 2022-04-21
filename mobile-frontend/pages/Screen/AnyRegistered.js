import React from 'react'
import {Text, StyleSheet, View, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton, SecondaryButton } from '../../components/Button';



const AnyRegistered = ({navigation}) => {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View>
          <Image
            style={{
              width: "100%",
              marginTop: "20%",
              resizeMode: "contain",
            }}
            source={require("../../assets/register.png")}
          ></Image>
        </View>

        <View style={style.textContainer}>
          <View>
            

            <PrimaryButton onPress={()=>navigation.navigate('Log In')} title = "Log in"> </PrimaryButton>

            <Text> 

            {"\n"}

            </Text>


            <SecondaryButton onPress={()=>navigation.navigate('Sign Up')} title = "Create Account"> </SecondaryButton>
            

            <Text
              style={{
                marginTop: 40,
                fontSize: 18,
                textAlign: "center",
                color: "grey",
              }}
            >
              Not already a user? Create an account with us now! 
            </Text>
          </View>

          <View style={style.indicatorContainer}>
            <View style={style.indicator}></View>
            <View style={style.currentIndicator}></View>
            <View style={style.indicator}></View>
          </View>

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

export default AnyRegistered;