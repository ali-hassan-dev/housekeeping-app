import { ThemedText } from '@/components/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import React from 'react'
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle
} from 'react-native'

interface ActionButtonProps {
  title: string
  onPress: () => void
  style?: ViewStyle
  textStyle?: TextStyle
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'danger'
}

export default function ActionButton({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  variant = 'primary'
}: ActionButtonProps) {
  const shadowColor = useThemeColor({ light: '#000', dark: '#000' }, 'text')

  // Get colors at component level
  const primaryBg = useThemeColor({ light: '#3b82f6', dark: '#2563eb' }, 'tint')
  const secondaryBg = useThemeColor(
    { light: '#f3f4f6', dark: '#374151' },
    'background'
  )
  const secondaryText = useThemeColor(
    { light: '#374151', dark: '#f9fafb' },
    'text'
  )

  const getButtonColors = () => {
    switch (variant) {
      case 'primary':
        return {
          background: primaryBg,
          text: '#ffffff'
        }
      case 'secondary':
        return {
          background: secondaryBg,
          text: secondaryText
        }
      case 'danger':
        return {
          background: '#dc2626',
          text: '#ffffff'
        }
      default:
        return {
          background: primaryBg,
          text: '#ffffff'
        }
    }
  }

  const colors = getButtonColors()

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: colors.background,
          shadowColor
        },
        style,
        disabled && styles.disabledButton
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <ThemedText
        style={[
          styles.buttonText,
          { color: colors.text },
          textStyle,
          disabled && styles.disabledButtonText
        ]}
        lightColor={disabled ? '#9ca3af' : colors.text}
        darkColor={disabled ? '#6b7280' : colors.text}
      >
        {title}
      </ThemedText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  disabledButton: {
    opacity: 0.6
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600'
  },
  disabledButtonText: {
    // Color handled by ThemedText props
  }
})
