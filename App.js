import React, {useState} from 'react';
import {StatusBar, StyleSheet, Text, SafeAreaView, View, Alert, TextInput, Button} from 'react-native';
import DoubleClick from "react-native-double-tap";
import {ViewProps} from "react-native-web/dist/exports/View";
import Scoreboard from "./components/Scoreboard";

export default function App() {
    const [score1, setScore1] = useState(0);
    const [score2, setScore2] = useState(0);
    const [player1, setPlayer1] = useState("Player1");
    const [player2, setPlayer2] = useState("Player2");
    const [listOfScore, setListOfScore] = useState([]);
    const [kol, setKol] = useState(0);
    const [state, setState] = useState([0, 0]);
    const resetScore = () => {
        setScore1(0);
        setScore2(0);
        setState([0, 0]);
        setListOfScore([]);
    }

    const addList = () => {
        setListOfScore((list)=>{
            return [
                ...list,
                {score1: score1, score2: score2, state: state}

            ]
        })
    }

    const back = () => {
        if(listOfScore.length > 0){
            setScore1(listOfScore[listOfScore.length-1].score1);
            setScore2(listOfScore[listOfScore.length-1].score2);
            setState(listOfScore[listOfScore.length-1].state);
            setListOfScore((list)=>{
                return listOfScore.slice(0,-1);
            })
        }
    }

    const incScore1 = () => {
        //console.log(Math.abs((score1+1) - score2));
        if((score1 >= 10) && Math.abs((score1+1) - score2)>1){
            Alert.alert("", "Победитель: "+player1);
            resetScore();
        }else{
            if(state[0] === 0 && state[1] === 0){
                setKol(kol+1);
                setState([1, 0]);
            }else{
                setKol(kol+1);
                if(kol>=2) {
                    setState([state[0] === 0 ? 1 : 0, state[1] === 0 ? 1 : 0]);
                    setKol(1);
                }
            }
            setScore1(score1+1);
            addList();
        }
    }

    const incScore2 = () => {
        //console.log(Math.abs(score1 - (score2+1)));
        if((score2 >= 10) && Math.abs(score1 - (score2+1))>1){
            Alert.alert("", "Победитель: "+player2);
            resetScore();
        }else{
            if(state[0] === 0 && state[1] === 0){
                setKol(kol+1);
                setState([0, 1]);
            }else{
                setKol(kol+1);
                if(kol>=2) {
                    setState([state[0] === 0 ? 1 : 0, state[1] === 0 ? 1 : 0]);
                    setKol(1);
                }
            }
            setScore2(score2+1);
            addList();
        }
    }

    return (
    <View  style={styles.container}>
        <View style={[{backgroundColor: state[0] === 0 ? '#8f5ef7' : 'green',}, {flex: 1}]}>
            <Scoreboard score={score1} player={player1} incScore={incScore1} setPlayer={setPlayer1}/>
            {/*<Text>{listOfScore.length}</Text>*/}
        </View>
        <View style={[{backgroundColor: '#753eed',}, {flex: 1},{flexDirection:"column"}]}>
            <View  style={styles.buttonStyle}>
                <Button onPress={() => back()} title={"Назад"}/>
            </View>
            <View  style={styles.buttonStyle}>
                <Button onPress={() => resetScore()} title={"Сбросить"}/>
            </View>
        </View>
        <View style={[{backgroundColor: state[1] === 0 ? '#8f5ef7' : 'green',}, {flex: 1}]}>
            <Scoreboard score={score2} player={player2} incScore={incScore2} setPlayer={setPlayer2}/>
        </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: "row",
    // alignItems: 'center',
    // justifyContent: 'center',
    //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  box:{
      backgroundColor: "red",
  },
    buttonStyle:{
        flex: 1,
        width:'60%',
        margin:"20%",
    }
});
