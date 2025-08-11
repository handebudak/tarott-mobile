import React, { memo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Switch,
} from 'react-native';
import { FormSectionProps, ReadingType } from '../types';

export const FormSection: React.FC<FormSectionProps> = memo(({
  name,
  setName,
  question,
  setQuestion,
  isLoading,
  selectedCards,
  type,
  onRandomSelect,
  enableReversed,
  setEnableReversed,
}) => {
  const requiredCards = type === 'single' ? 1 : 3;
  const isFormValid = question.trim().length > 0 && selectedCards.length === requiredCards;

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      removeClippedSubviews={true}
      scrollEventThrottle={16}
    >
      <Text style={styles.title}>Fal Bilgileri</Text>
      
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>İsminiz (Opsiyonel)</Text>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="İsminizi girin..."
            placeholderTextColor="#9ca3af"
            maxLength={50}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Sorunuz *</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            value={question}
            onChangeText={setQuestion}
            placeholder="Tarot falınızı baktırabilmek için sorunuzu yazın..."
            placeholderTextColor="#9ca3af"
            multiline
            numberOfLines={4}
            maxLength={500}
            textAlignVertical="top"
          />
          <Text style={styles.characterCount}>
            {question.length}/500
          </Text>
        </View>

        <View style={styles.switchContainer}>
          <View style={styles.switchLabelContainer}>
            <Text style={styles.switchLabel}>Ters Kart Seçeneği</Text>
            <Text style={styles.switchDescription}>
              Açıkken kartlar ters de gelebilir
            </Text>
          </View>
          <Switch
            value={enableReversed}
            onValueChange={setEnableReversed}
            trackColor={{ false: '#767577', true: '#f59e0b' }}
            thumbColor={enableReversed ? '#ffffff' : '#f4f3f4'}
            ios_backgroundColor="#767577"
          />
        </View>

        {selectedCards.length < requiredCards && (
          <View style={styles.selectionStatus}>
            <Text style={styles.warningText}>
              {type === 'single'
                ? 'Lütfen bir kart seçin'
                : 'Lütfen üç kart seçin'
              }
            </Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.randomButton}
            onPress={onRandomSelect}
            activeOpacity={0.7}
          >
            <Text style={styles.randomButtonText}>
              Rastgele Seç
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>🔮 Önemli Bilgiler</Text>
          <Text style={styles.infoText}>
            Sorunuzu net ve açık bir şekilde yazın, evren yanıtınızı daha kolay bulsun ✨
          </Text>
          <Text style={styles.infoText}>
            İç sesinize güvenin ve kartınızı sezgilerinizle seçin
          </Text>
          <Text style={styles.infoText}>
            Falınız, AI tarafından size özel olarak hazırlanır
          </Text>
          <Text style={styles.infoText}>
            Unutmayın, bu yorumlar yalnızca rehberlik amaçlıdır
          </Text>
          <Text style={styles.infoText}>
            • Sonuçlar sadece rehberlik amaçlıdır
          </Text>
        </View>
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 24,
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    color: '#ffffff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  characterCount: {
    color: '#9ca3af',
    fontSize: 12,
    textAlign: 'right',
    marginTop: 4,
  },
  selectionStatus: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  statusTitle: {
    color: '#f59e0b',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statusText: {
    color: '#e5e7eb',
    fontSize: 14,
    marginBottom: 4,
  },
  warningText: {
    color: '#ef4444',
    fontSize: 12,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  randomButton: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.5)',
  },
  randomButtonText: {
    color: '#f59e0b',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#f59e0b',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#6b7280',
    opacity: 0.5,
  },
  infoContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    padding: 16,
  },
  infoTitle: {
    color: '#f59e0b',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  infoText: {
    color: '#d1d5db',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 8,
  },
  switchLabelContainer: {
    flex: 1,
    marginRight: 16,
  },
  switchLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  switchDescription: {
    color: '#9ca3af',
    fontSize: 12,
  },
}); 