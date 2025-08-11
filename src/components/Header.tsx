import React, { memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { TAROTT_LOGO } from '../constants/cards';

const { width } = Dimensions.get('window');

interface HeaderProps {
  showAllButtons?: boolean;
  title?: string;
}

export const Header: React.FC<HeaderProps> = memo(({ 
  showAllButtons = true, 
  title = "Tarott" 
}) => {
  const navigation = useNavigation<any>();

  const handleNavigation = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Image source={TAROTT_LOGO} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>{title}</Text>
      </View>

      {showAllButtons && (
        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => handleNavigation('Home')}
            activeOpacity={0.7}
          >
            <Text style={styles.navButtonText}>Ana Sayfa</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => handleNavigation('SingleCard')}
            activeOpacity={0.7}
          >
            <Text style={styles.navButtonText}>Tek Kart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => handleNavigation('ThreeCard')}
            activeOpacity={0.7}
          >
            <Text style={styles.navButtonText}>Üç Kart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => handleNavigation('CardLibrary')}
            activeOpacity={0.7}
          >
            <Text style={styles.navButtonText}>Kartlar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(245, 158, 11, 0.3)',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 8,
  },
  navButton: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.5)',
    minWidth: 80,
    alignItems: 'center',
  },
  navButtonText: {
    color: '#f59e0b',
    fontSize: 14,
    fontWeight: '600',
  },
}); 