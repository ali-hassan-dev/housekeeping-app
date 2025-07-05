import React from 'react'
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

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
      <View style={styles.cardContent}>
        <View style={styles.topRow}>
          <View
            style={[styles.iconContainer, { backgroundColor: `${color}15` }]}
          >
            <Text style={styles.icon}>{icon}</Text>
          </View>
          <Text style={[styles.count, { color }]}>{count}</Text>
        </View>

        <Text style={styles.title}>{title}</Text>

        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: `${color}20` }]}>
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: color,
                  width: `${Math.min(count * 10, 100)}%`
                }
              ]}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
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
    color: '#374151',
    marginBottom: 12,
    textTransform: 'capitalize'
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
