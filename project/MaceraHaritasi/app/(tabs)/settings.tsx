import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, SPACING } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';
import { Settings, Bell, Lock, Moon, Volume2, Clock, Info } from 'lucide-react-native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);
  const [parentalControls, setParentalControls] = useState(false);
  const [dailyLimit, setDailyLimit] = useState(60);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Ayarlar</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Genel</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Bell size={20} color={COLORS.primary} />
              <Text style={styles.settingLabel}>Bildirimler</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: COLORS.gray, true: COLORS.primary }}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Moon size={20} color={COLORS.primary} />
              <Text style={styles.settingLabel}>Karanlık Mod</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: COLORS.gray, true: COLORS.primary }}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Volume2 size={20} color={COLORS.primary} />
              <Text style={styles.settingLabel}>Ses Efektleri</Text>
            </View>
            <Switch
              value={soundEffects}
              onValueChange={setSoundEffects}
              trackColor={{ false: COLORS.gray, true: COLORS.primary }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ebeveyn Kontrolü</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Lock size={20} color={COLORS.primary} />
              <Text style={styles.settingLabel}>Ebeveyn Kontrolünü Etkinleştir</Text>
            </View>
            <Switch
              value={parentalControls}
              onValueChange={setParentalControls}
              trackColor={{ false: COLORS.gray, true: COLORS.primary }}
            />
          </View>

          {parentalControls && (
            <View style={styles.parentalControls}>
              <View style={styles.timeControl}>
                <Clock size={20} color={COLORS.primary} />
                <Text style={styles.timeLabel}>Günlük Kullanım Süresi</Text>
              </View>
              <Text style={styles.timeLabel}>{dailyLimit} dakika</Text>
              
              <View style={styles.timeButtons}>
                <TouchableOpacity 
                  style={styles.timeButton}
                  onPress={() => setDailyLimit(Math.max(30, dailyLimit - 30))}
                >
                  <Text style={styles.timeButtonText}>-30 dk</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.timeButton}
                  onPress={() => setDailyLimit(Math.min(180, dailyLimit + 30))}
                >
                  <Text style={styles.timeButtonText}>+30 dk</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hakkında</Text>
          
          <TouchableOpacity style={styles.button}>
            <Info size={20} color={COLORS.primary} />
            <Text style={styles.buttonText}>Uygulama Hakkında</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button}>
            <Settings size={20} color={COLORS.primary} />
            <Text style={styles.buttonText}>Gizlilik Politikası</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: 'Nunito-Bold',
    color: COLORS.dark,
    padding: SPACING.large,
  },
  section: {
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.large,
    marginBottom: SPACING.large,
    borderRadius: SIZES.radius,
    padding: SPACING.medium,
  },
  sectionTitle: {
    fontSize: SIZES.medium,
    fontFamily: 'Nunito-Bold',
    color: COLORS.dark,
    marginBottom: SPACING.medium,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.small,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: SIZES.small + 2,
    fontFamily: 'Nunito-SemiBold',
    color: COLORS.dark,
    marginLeft: SPACING.medium,
  },
  parentalControls: {
    marginTop: SPACING.medium,
    padding: SPACING.medium,
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius,
  },
  timeControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.small,
  },
  timeLabel: {
    fontSize: SIZES.small + 2,
    fontFamily: 'Nunito-SemiBold',
    color: COLORS.darkGray,
    marginLeft: SPACING.small,
  },
  timeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.small,
  },
  timeButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    borderRadius: SIZES.radius,
    width: '45%',
    alignItems: 'center',
  },
  timeButtonText: {
    color: COLORS.white,
    fontFamily: 'Nunito-Bold',
    fontSize: SIZES.small + 2,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.medium,
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius,
  },
  buttonText: {
    fontSize: SIZES.small + 2,
    fontFamily: 'Nunito-SemiBold',
    color: COLORS.dark,
    marginLeft: SPACING.medium,
  },
});