import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { vocabType } from '@/assets/data'
import { Collapsible } from '../Collapsible'
import { ThemedText } from '../ThemedText'
import { ThemedView } from '../ThemedView'


const Item = (item:vocabType) => {
  return (
    <ThemedView style={styles.container}>
      <Collapsible title={" "+item.tai+" "}>
        <ThemedText>
          {item.myan&&"👉"+item.myan+"  "}
        </ThemedText>
        <ThemedText type="defaultSemiBold">{item.eng&&"👉"+item.eng + "  "}</ThemedText>
        <ThemedText style={styles.description} >{item.description&&"👉"+item.description}</ThemedText>
      </Collapsible>
    </ThemedView>
  )
}

export default Item

const styles = StyleSheet.create({
    container:{
        maxWidth:'99%',
        minWidth:120,
        minHeight:45,
        borderColor:'gray',
        borderRadius:10,
        borderWidth:0.17,
        marginHorizontal:0.5,
        marginVertical:2.5,
        justifyContent:'center',
    },
    description:{
        margin:0.5,
        borderRadius:10,
        fontWeight:'900'
    },
    text:{
      fontWeight:'condensedBold',
    }
})