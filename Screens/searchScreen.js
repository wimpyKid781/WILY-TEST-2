import React from 'react'
import {Text,View,ScrollView, FlatList,TextInput} from 'react-native'
import db from '../config'
export default class SearchScreen extends React.Component{
    constructor(props){
        super(props)
            this.state = {
                allTransactions: [],
                lastVisibleTransaction: null,
                search: ''
            }
        }
    

    componentDidMount = async()=>{
      const query = await db.collection('transactions').get();
      query.docs.map((doc)=>{
          this.setState({allTransactions:[...this.state.allTransactions,doc.data()]})
      })
    }
    fetchMoreTrasaction = async() =>{
        var enteredText = text.split('')
       var text = text.toUpperCase()
       if(enteredText[0].toUpperCase()==='B'){
        const query = await db.collection('transactions').where('Book ID','==',text).startAfter(this.state.lastVisibleTransaction).list(10).get()
        query.docs.map((doc)=>{
            this.setState({
                allTransactions:[...this.state.allTransactions,doc.data()],
                lastVisibleTransaction: doc
            })
        })
       }
       else if (enteredText[0].toUpperCase()==='S'){
        const query = await db.collection('transactions').where('Student ID','==',text).startAfter(this.state.lastVisibleTransaction).list(10).get()
        query.docs.map((doc)=>{
            this.setState({
                allTransactions:[...this.state.allTransactions,doc.data()],
                lastVisibleTransaction: doc
            })
        })
       }
    } 
    searchTransaction = async(text) =>{
       var enteredText = text.split('')
       var text = text.toUpperCase()
       if(enteredText[0].toUpperCase()==='B'){
           const transaction = db.collection('transactions').where('Book ID','==',text).get();
           transaction.docs.map((doc)=>{
            this.setState({
                allTransactions:[...this.state.allTransactions,doc.data()],
                lastVisibleTransaction: doc
            })
           })
       }
       else if (enteredText[0].toUpperCase()==='S'){
        const transaction = db.collection('transactions').where('Student ID','==',text).get();
        transaction.docs.map((doc)=>{
         this.setState({
             allTransactions:[...this.state.allTransactions,doc.data()],
             lastVisibleTransaction: doc
         })
        })
       }
    }
    render() {
        return (
            <View style = {styles.container}>
        <View style = {styles.searchBar}>
            <TextInput style = {styles.bar}
            placeholder = 'Enter your Book ID or your Student ID. '
            onChangeText = {(text) => {
                this.setState({
                  search: text,
                })
            }}
            />
          <TouchableOpacity style = {styles.searchButton} 
          onPress = {()=>
          this.searchTransaction(this.state.search)
          }>
              <Text>
                  SEARCH
              </Text>
          </TouchableOpacity>
        </View>
            <FlatList 
              data = {this.state.allTransactions}
              renderItem = {({item})=>{
                    <View style={{borderBottomWidth: 2}}>
                    <Text>
                        {'Book Id : '+transaction.bookId}
                    </Text>
                    <Text>
                        {'StudentID : '+transaction.studentId}
                    </Text>
                    <Text>
                        {'Transaction Type : '+transaction.transactionType}
                    </Text>
                    <Text>
                        {'Date : '+transaction.Date.toDate()}
                    </Text>
                    </View>
               }}
               keyExtracter = {(item,index) => index.toString()}
               onEndReached ={this.fetchMoreTrasaction()}
               onEndReachedThreshold ={0.7}
                />
                </View>
        )
    }
}