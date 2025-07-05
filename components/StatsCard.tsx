import React from 'react'
import {
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { ThemedText } from './ThemedText'
import { ThemedView } from './ThemedView'

const { width } = Dimensions.get('window')

interface StatsCardProps {
  title: string
  count: number
  color: string
  icon: string
  onPress?: () => void
}

export default function StatsCard({
  title,
  count,
  color,
  icon,
  onPress
}: StatsCardProps) {
  const cardWidth = (width - 60) / 2

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          width: cardWidth,
          borderLeftColor: color,
          shadowColor: color
        }
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <ThemedView style={styles.cardContent}>
        <ThemedView style={styles.topRow}>
          <ThemedView
            style={[styles.iconContainer, { backgroundColor: `${color}15` }]}
          >
            <ThemedText style={styles.icon}>{icon}</ThemedText>
          </ThemedView>
          <ThemedText style={[styles.count, { color }]}>{count}</ThemedText>
        </ThemedView>

        <ThemedText style={styles.title}>{title}</ThemedText>

        <ThemedView style={styles.progressContainer}>
          <ThemedView style={[styles.progressBar, { backgroundColor: `${color}20` }]}>
            <ThemedView
              style={[
                styles.progressFill,
                {
                  backgroundColor: color,
                  width: `${Math.min(count * 10, 100)}%`
                }
              ]}
            />
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderLeftWidth: 4,
    marginRight: 16,
    marginBottom: 16,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    minHeight: 120,
    ...Platform.select({
      ios: {
        shadowColor: '#000'
      },
      android: {
        elevation: 8
      }
    })
  },
  cardContent: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-between'
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    fontSize: 18
  },
  count: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 32,
    letterSpacing: -0.5
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'capitalize',
    opacity: 0.7
  },
  progressContainer: {
    width: '100%'
  },
  progressBar: {
    height: 3,
    borderRadius: 2,
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    borderRadius: 2
  }
})
