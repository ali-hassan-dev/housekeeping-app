import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle
} from 'react-native'

interface ActionButtonProps {
  title: string
  onPress: () => void
  style?: ViewStyle
  textStyle?: TextStyle
  disabled?: boolean
}

export default function ActionButton({
  title,
  onPress,
  style,
  textStyle,
  disabled = false
}: ActionButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.buttonText,
          textStyle,
          disabled && styles.disabledButtonText
        ]}
      >
        {title}
      </Text>
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
    shadowColor: '#000',
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
    color: '#9ca3af'
  }
})
