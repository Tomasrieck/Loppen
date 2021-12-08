import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, Image, SafeAreaView, useColorScheme, TouchableWithoutFeedback, ScrollView } from 'react-native';



const Home = ({ navigation }) => {

    const colorScheme = useColorScheme();

    // const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
    const themeContainerStyle = colorScheme === 'light' ? styles.lightTheme : styles.darkTheme;

    return (
        <View style={[styles.background, themeContainerStyle]}>
            <SafeAreaView style={[styles.bar, {top: 0}]}>
                <Image style={[styles.icons, themeContainerStyle]} source={require("../assets/homeIcon.png")} />
                <Image style={[styles.icons, themeContainerStyle]} source={require("../assets/homeIcon.png")} />
                <TouchableWithoutFeedback onPress = {() => navigation.navigate('Settings')} >
                    <Image style={[styles.icons, themeContainerStyle]} source={require("../assets/settingsIcon.png")} />
                </TouchableWithoutFeedback>
            </SafeAreaView>

            <ScrollView style={styles.scroll}>
                <View style={styles.content}>
                    <View style={styles.item}>
                        <Image style={styles.itemImage} source={{uri: "https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=0d3f33fb6aa6e0154b7713a00454c83d"}} />
                    </View>
                </View>
            </ScrollView>

            <SafeAreaView style={[styles.bar, {bottom: 0}]}>
                <Image style={[styles.icons, themeContainerStyle]} source={require("../assets/homeIcon.png")} />
                <Image style={[styles.icons, themeContainerStyle]} source={require("../assets/homeIcon.png") } />
                <Image style={[styles.icons, themeContainerStyle]} source={require("../assets/menuIcon.png")} />
            </SafeAreaView>
            <StatusBar style="auto" />
        </View>
    );
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    lightTheme: {
        backgroundColor: 'white',
        tintColor: 'black',
    },
    darkTheme: {
        backgroundColor: 'black',
        tintColor: 'white',
    },
    bar: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    icons: {
        width: 35,
        height: 35,
        marginTop: 15,
        marginBottom: 15,
    },
    scroll: {
        backgroundColor: 'white',
        flex: 1,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    item: {
        width: '85%',
    },
    itemImage: {
        
        width: '100%',
        height: 400,
    }
})


export default Home;