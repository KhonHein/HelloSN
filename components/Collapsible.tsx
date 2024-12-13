import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  return (
    <ThemedView style={[styles.container,{borderBottomStartRadius:isOpen&&10||0}]}>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}>
        <IconSymbol
          name="chevron.right"
          size={20}
          weight="medium"
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
          style={[styles.iconSymbol,{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }]}
        />
        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container:{
    borderTopStartRadius:10,
    borderTopEndRadius:10,
    borderColor:'gray',
    borderWidth:0.5,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    //backgroundColor:'gray',
    height:50,
    borderTopEndRadius:10,
    borderTopStartRadius:10,
    borderWidth:0.5,
    borderColor:'gray'
  },
  iconSymbol:{
    borderRadius:10,
    borderWidth:0.5,
    borderColor:'gray',
    marginLeft:3,
  },

  content: {
    marginTop: 6,
    marginLeft: 24,
    borderRadius:10,
    padding:5,
   // backgroundColor:'red'
  },
});
