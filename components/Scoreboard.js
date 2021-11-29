import React, {useState} from 'react';
import {StatusBar, StyleSheet, Text, SafeAreaView, View, Alert,TextInput} from 'react-native';
import DoubleClick from "react-native-double-tap";


export default function Scoreboard({score, player, incScore, setPlayer}) {
    const [visibleText, setVisibleText] = useState('flex');
    const [visibleEdit, setVisibleEdit] = useState('none');
    const hideText = () => {
        setVisibleText("none");
        setVisibleEdit('flex');
    };
    const showText = () => {
        setVisibleText("flex");
        setVisibleEdit('none');
    }
    // const [text, setText] = useState(player);
    return (
        <View  style={styles.container}>
            <Text onPress={() => incScore()} style={[{fontSize:150}, {color: "white"}]}>{score}</Text>
            <DoubleClick
                doubleTap={() => hideText()}
                delay={400}>
                <Text  style={[styles.box, {color: "white"},{display: visibleText},{fontSize:50}]}>{player}</Text>
            </DoubleClick>
            <TextInput   onBlur={() => showText()}
                style={[styles.box,{display: visibleEdit},{fontSize:50}]}
                placeholder="Type here to translate!"
                onChangeText={text => setPlayer(text)}
                defaultValue={player}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#fff',
        // flexDirection: "row",
        //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    textstyle:{
        color: "white",
    }
});
