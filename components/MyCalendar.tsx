import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import { Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { ThemedView } from './ThemedView';
import { useState } from 'react';
import { ThemedText } from './ThemedText';
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
// Define the type for markedDates
type MarkedDates = {
  [key: string]: {
    marked?: boolean;
    dotColor?: string;
    activeOpacity?: number;
  };
};
LocaleConfig.defaultLocale = 'shan-ni';

const MyCalendar = () => {
  const [fontsLoaded] = useFonts({
    'Shan-Ni-01': require('@/assets/fonts/ShanNi01 & English.ttf'), // Updated file name
    'ShanNiNational': require('@/assets/fonts/ShanniNational-Regular.ttf'), // Updated file name
  });
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

 // Generate marked dates for March 13
 const generateSpecialDay = (): MarkedDates => {

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i); // Next 10 years
  return years.reduce<MarkedDates>((acc, year) => {
    const date = `${year}-03-13`;
    acc[date] = {
      marked: true,
      dotColor: 'red', // Customize the dot color
      activeOpacity: 0.8,
    };
    return acc;
  }, {});
};

const markedDates = generateSpecialDay();

if (!fontsLoaded) {
  return null; // Return a loading state or null
}
const closeDialog = () => {
  setDialogVisible(false);
  setSelectedDay(null);
};
const handleDayPress = (day: DateData) => {
  if (markedDates[day.dateString]) {
    setSelectedDay(day.dateString);
    setDialogVisible(true);
  }
};
  return (
    <ThemedView style={styles.container}>
      <Calendar
       markedDates={markedDates}
       onDayPress={handleDayPress}
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
          textMonthFontSize: 20,
          textDayHeaderFontSize: 14,
          todayTextColor: 'white',
          todayBackgroundColor:'black',
          calendarBackground:'#9AA6B2',
        }}
        style={styles.calendar}
      />
            <Modal
        visible={isDialogVisible}
        transparent
        animationType="slide"
        onRequestClose={closeDialog}
      >
        <ThemedView style={styles.modalOverlay}>
          <ThemedView style={styles.dialog}>
            <ThemedText style={styles.dialogTitle}>ၷိူဝ်းꩥႂꧥးၷိူဝ်းꩺႃၸႃ</ThemedText>
            <ThemedText style={styles.dialogContent}>
              ဝꩫ်းၸိူဝ်ႉၸၫတ်ႍၸၫဝ်းၷိူဝ်းတႆးꩫꧥင်း
            </ThemedText>
            <ThemedText style={{fontFamily:'Shan-Ni-01'}}>{selectedDay}</ThemedText>
            <TouchableOpacity style={styles.closeButton} onPress={closeDialog}>
              <ThemedText style={styles.closeButtonText}>Close</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </Modal>
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

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    width: 300,
    padding: 20,
    //backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent:'center',
    margin:'auto'
  },
  dialogTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop:5,
    padding:5,
  },
  dialogContent: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#007BFF',
    padding: 5,
    borderRadius: 5,
    width:70,
    alignItems:'center',
    marginVertical:2,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

});
