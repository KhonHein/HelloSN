import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '../ThemedText'

const NotFoundItem = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ThemedText> ၸႂꧥးမဒီးၷႃႍ😢</ThemedText>
      <ThemedText>ၷႂၫမ်းဗႂꧥးၷႃꩼꩫေꧥႍ မဒႆႍꩬႂꧥဝေꧥႍကိူꩫ်ၸဝ်ႍ</ThemedText>
    </SafeAreaView>
  )
}

export default NotFoundItem

const styles = StyleSheet.create({
    container:{
        
        justifyContent:'center',
        alignItems:'center',
        width:350,
        height:200,
        borderRadius:5,
        borderColor:'gray',
        borderWidth:0.5,
        marginHorizontal:'auto',
        marginVertical:10,
    }
})