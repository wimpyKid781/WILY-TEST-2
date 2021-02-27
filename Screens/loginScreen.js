import React from 'react'
import {Text,View,ScrollView, FlatList,TextInput, KeyBoardAvoidingView, Alert, StyleSheet,TouchableOpacity} from 'react-native'
import db from '../config'
export default class LoginScreen extends React.Component {
    constructor(){
       super();
       this.state = {
           emailId : '',
           password : '',
       }
    }
    login = async(email, password) =>{
       if(email&&password){
           try{
               const response = await firebase.auth().signInWithEmailAndPassword(email, password)
               if(response){
                   this.props.navigation.navigate('Transaction')
               }
           }
           catch(error){
               switch(error.code){
                   case 'auth/user-not-found':
                       Alert.alert('Your are not in this school! Please go to your school website and try again')
                       console.log("Doesn't Exist!")
                       break
                    case 'auth/invalid-email':
                        Alert.alert('Your email or password is wrong! Please ask your librarian for help if needed!')
                        console.log("Invalid Email of Password!")
               }
           }
       }
       else{
           Alert.alert('Please eneter your email ID and your password')
       }
    }
    render() {
        return (
            <KeyBoardAvoidingView style={{alignItems: 'center', marginTop: 20,}}>
              <View>
                <Image 
                source={require('../assets/booklogo.jpg')}
                style = {{width:200, height:200}}
                />
                <Text style={{textAlign: 'center', fontSize:30,}}>
                   WILY!
                </Text>
                </View>
                <View>
                <TextInput style={styles.loginBox}
                placeholder = 'abc@gmail.com'
                keyboardType = 'email-address'
                onChangeText = {(text) => {
                    this.setState({
                        emailId: text
                    })
                }}
                />
                <TextInput style={styles.loginBox}
                placeholder = 'enter your password'
                secureTextEntry = {true}
                onChangeText = {(text) => {
                    this.setState({
                        password: text
                    })
                }}
                />
              </View>
              <View>
                <TouchableOpacity styles={{height:30, width:90, borderWidth:1,marginTop: 20,paddingTop:5,borderRadius:7}}
                onPress={()=>{
                    this.login(this.state.emailId,this.state.password)
                }}>
                  <Text style={{textAlign: 'center'}}>
                    LOGIN
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyBoardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    loginBox:{
        width:300,
        height:40,
        borderWidth:1.5,
        fontSize:20,
        margin:10,
        paddingLeft:10,
    }
})