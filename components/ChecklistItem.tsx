import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

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
  const handleToggle = () => {
    if (!disabled) {
      onToggle(!item.completed)
    }
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        item.completed && styles.completedContainer,
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
            item.completed && styles.checkedCheckbox,
            disabled && styles.disabledCheckbox
          ]}
        >
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </View>

      <Text
        style={[
          styles.text,
          item.completed && styles.completedText,
          disabled && styles.disabledText
        ]}
      >
        {item.text}
      </Text>
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
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb'
  },
  completedContainer: {
    backgroundColor: '#d1fae5',
    borderColor: '#10b981'
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
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkedCheckbox: {
    backgroundColor: '#10b981',
    borderColor: '#10b981'
  },
  disabledCheckbox: {
    borderColor: '#9ca3af'
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    lineHeight: 20
  },
  completedText: {
    color: '#059669',
    textDecorationLine: 'line-through'
  },
  disabledText: {
    color: '#9ca3af'
  }
})
