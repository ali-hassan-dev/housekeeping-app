import { ThemedText } from '@/components/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

interface ChecklistItemProps {
  item: {
    id: string
    text: string
    completed: boolean
  }
  onToggle: (completed: boolean) => void
  disabled?: boolean
}

export default function ChecklistItem({
  item,
  onToggle,
  disabled = false
}: ChecklistItemProps) {
  const containerBgColor = useThemeColor(
    { light: '#f9fafb', dark: '#1f2937' },
    'background'
  )
  const completedBgColor = useThemeColor(
    { light: '#d1fae5', dark: '#064e3b' },
    'background'
  )
  const borderColor = useThemeColor(
    { light: '#e5e7eb', dark: '#374151' },
    'text'
  )
  const completedBorderColor = useThemeColor(
    { light: '#10b981', dark: '#10b981' },
    'text'
  )
  const checkboxBgColor = useThemeColor(
    { light: '#ffffff', dark: '#374151' },
    'background'
  )
  const checkboxBorderColor = useThemeColor(
    { light: '#d1d5db', dark: '#6b7280' },
    'text'
  )
  const disabledBorderColor = useThemeColor(
    { light: '#9ca3af', dark: '#6b7280' },
    'text'
  )

  const handleToggle = () => {
    if (!disabled) {
      onToggle(!item.completed)
    }
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: item.completed ? completedBgColor : containerBgColor,
          borderColor: item.completed ? completedBorderColor : borderColor
        },
        disabled && styles.disabledContainer
      ]}
      onPress={handleToggle}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={styles.checkboxContainer}>
        <View
          style={[
            styles.checkbox,
            {
              backgroundColor: item.completed ? '#10b981' : checkboxBgColor,
              borderColor: item.completed
                ? '#10b981'
                : disabled
                ? disabledBorderColor
                : checkboxBorderColor
            }
          ]}
        >
          {item.completed && (
            <ThemedText style={styles.checkmark}>✓</ThemedText>
          )}
        </View>
      </View>

      <ThemedText
        style={[
          styles.text,
          item.completed && styles.completedText,
          disabled && styles.disabledText
        ]}
        lightColor={
          disabled ? '#9ca3af' : item.completed ? '#059669' : '#374151'
        }
        darkColor={
          disabled ? '#6b7280' : item.completed ? '#34d399' : '#f9fafb'
        }
      >
        {item.text}
      </ThemedText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 1
  },
  disabledContainer: {
    opacity: 0.6
  },
  checkboxContainer: {
    marginRight: 12
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  text: {
    flex: 1,
    fontSize: 16,
    lineHeight: 20
  },
  completedText: {
    textDecorationLine: 'line-through'
  },
  disabledText: {
    // Color handled by ThemedText props
  }
})
