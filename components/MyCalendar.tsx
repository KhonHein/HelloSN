import { Calendar, LocaleConfig } from 'react-native-calendars';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { ThemedView } from './ThemedView';

// Set custom Shan Ni locale
LocaleConfig.locales['shan-ni'] = {
  monthNames: [
    'ဒိူꩫ်းꩠျၫꩫ်ဝႃꩺီ',
    'ဒိူꩫ်းꧨꧥတ်ႉဗိဝ်ဝႃꩺီ',
    'ဒိူꩫ်းမၫတ်',
    'ဒိူꩫ်းဢေပꩺေꧥ',
    'ဒိူꩫ်းမေ',
    'ဒိူꩫ်းꩠျုꩫ်',
    'ဒိူꩫ်းꩠျူလႆၫ',
    'ဒိူꩫ်းဢေႃးꩠၫတ်ႉ',
    'ဒိူꩫ်းꩬꧥပ်ႉတိꩫ်ဗႃ',
    'ဒိူꩫ်းဢွက်တူဝ်ဗႃ',
    'ဒိူꩫ်းꩫူဝ်ဗိꩫ်ဗႃ',
    'ဒိူꩫ်းဒီၸိꩫ်ဗႃ',
  ],
  monthNamesShort: [
    'ဒိူꩫ်းꩠျၫꩫ်ဝႃꩺီ',
    'ဒိူꩫ်းꧨꧥတ်ႉဗိဝ်ဝႃꩺီ',
    'ဒိူꩫ်းမၫတ်',
    'ဒိူꩫ်းဢေပꩺေꧥ',
    'ဒိူꩫ်းမေ',
    'ဒိူꩫ်းꩠျုꩫ်',
    'ဒိူꩫ်းꩠျူလႆၫ',
    'ဒိူꩫ်းဢေႃးꩠၫတ်ႉ',
    'ဒိူꩫ်းꩬꧥပ်ႉတိꩫ်ဗႃ',
    'ဒိူꩫ်းဢွက်တူဝ်ဗႃ',
    'ဒိူꩫ်းꩫူဝ်ဗိꩫ်ဗႃ',
    'ဒိူꩫ်းဒီၸိꩫ်ဗႃ',
  ],
  dayNames: ['တိတ်ႉ', 'ၸꩫ်', 'ကၫꩫ်း', 'ပုတ်ႉ', 'ꧤတ်း', 'ꩬုက်း', 'ꩬဝ်'],
  dayNamesShort: ['တိတ်ႉ', 'ၸꩫ်', 'ကၫꩫ်း', 'ပုတ်ႉ', 'ꧤတ်း', 'ꩬုက်း', 'ꩬဝ်'],
  today: 'ဝꩫ်းမိူဝ်ႍလႆႍ',
};

LocaleConfig.defaultLocale = 'shan-ni';

const MyCalendar = () => {
  const [fontsLoaded] = useFonts({
    'Shan-Ni-01': require('@/assets/fonts/ShanNi01 & English.ttf'), // Updated file name
    'ShanNiNational': require('@/assets/fonts/ShanniNational-Regular.ttf'), // Updated file name
  });

  if (!fontsLoaded) {
    return null; // Render nothing until fonts are loaded
  }

  return (
    <ThemedView style={styles.container}>
      <Calendar
        //onDayLongPress={(day) => console.log('Long-pressed date:', day)}
        theme={{
          textDayFontFamily: 'Shan-Ni-01',
          textMonthFontFamily: 'ShanNiNational',
          textDayHeaderFontFamily: 'ShanNiNational',
          textDayHeaderFontWeight:'bold',
          textSectionTitleColor:'black',
          textMonthFontWeight:'bold',
          monthTextColor:'black',
          monthTextFontWeight:'bold',
          textDayFontSize: 20,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
          todayTextColor: 'white',
          todayBackgroundColor:'black',
          calendarBackground:'#9AA6B2',
        
        }}
        style={styles.calendar}
      />
    </ThemedView>
  );
};

export default MyCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    padding: 10,

  },
  calendar: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 10,
    minWidth: 370,
    minHeight: 400,
    fontFamily: 'Shan-Ni-01', // Ensure consistent font usage
    backgroundColor:'#D9EAFD',
    
  },
});
