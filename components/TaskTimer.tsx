import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useThemeColor } from '@/hooks/useThemeColor'
import React from 'react'
import { StyleSheet } from 'react-native'

interface TaskTimerProps {
  startTime: Date
  estimatedDuration: number
  timer: number
}

export default function TaskTimer({
  startTime,
  estimatedDuration,
  timer
}: TaskTimerProps) {
  const cardBackgroundColor = useThemeColor({}, 'background')
  const shadowColor = useThemeColor({ light: '#000', dark: '#000' }, 'text')
  const progressBarBgColor = useThemeColor(
    { light: '#e5e7eb', dark: '#374151' },
    'text'
  )
  const borderColor = useThemeColor(
    { light: '#f3f4f6', dark: '#374151' },
    'text'
  )

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds
        .toString()
        .padStart(2, '0')}`
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const getProgressPercentage = () => {
    const estimatedSeconds = estimatedDuration * 60
    return Math.min((timer / estimatedSeconds) * 100, 100)
  }

  const isOvertime = timer > estimatedDuration * 60
  const progressPercentage = getProgressPercentage()

  return (
    <ThemedView
      style={[
        styles.container,
        { backgroundColor: cardBackgroundColor, shadowColor }
      ]}
    >
      <ThemedView style={styles.timerHeader}>
        <ThemedText
          style={styles.timerLabel}
          lightColor="#1f2937"
          darkColor="#f9fafb"
        >
          Task Timer
        </ThemedText>
        <ThemedText
          style={styles.estimatedTime}
          lightColor="#6b7280"
          darkColor="#9ca3af"
        >
          Est. {estimatedDuration} min
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.timerDisplay}>
        <ThemedText
          style={[
            styles.timerText,
            { color: isOvertime ? '#dc2626' : undefined }
          ]}
          lightColor={isOvertime ? '#dc2626' : '#1f2937'}
          darkColor={isOvertime ? '#dc2626' : '#f9fafb'}
        >
          {formatTime(timer)}
        </ThemedText>
        {isOvertime && <ThemedText style={styles.overtimeText}>OVERTIME</ThemedText>}
      </ThemedView>

      <ThemedView style={styles.progressContainer}>
        <ThemedView
          style={[styles.progressBar, { backgroundColor: progressBarBgColor }]}
        >
          <ThemedView
            style={[
              styles.progressFill,
              {
                width: `${progressPercentage}%`,
                backgroundColor: isOvertime ? '#dc2626' : '#3b82f6'
              }
            ]}
          />
        </ThemedView>
        <ThemedText
          style={[
            styles.progressText,
            { color: isOvertime ? '#dc2626' : '#3b82f6' }
          ]}
        >
          {Math.round(progressPercentage)}%
        </ThemedText>
      </ThemedView>

      <ThemedView style={[styles.timeInfo, { borderTopColor: borderColor }]}>
        <ThemedView style={styles.timeItem}>
          <ThemedText
            style={styles.timeItemLabel}
            lightColor="#9ca3af"
            darkColor="#6b7280"
          >
            Started
          </ThemedText>
          <ThemedText
            style={styles.timeItemValue}
            lightColor="#4b5563"
            darkColor="#d1d5db"
          >
            {startTime.toLocaleTimeString('da-DK', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.timeItem}>
          <ThemedText
            style={styles.timeItemLabel}
            lightColor="#9ca3af"
            darkColor="#6b7280"
          >
            Elapsed
          </ThemedText>
          <ThemedText
            style={styles.timeItemValue}
            lightColor="#4b5563"
            darkColor="#d1d5db"
          >
            {Math.floor(timer / 60)} min
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.timeItem}>
          <ThemedText
            style={styles.timeItemLabel}
            lightColor="#9ca3af"
            darkColor="#6b7280"
          >
            Remaining
          </ThemedText>
          <ThemedText
            style={[
              styles.timeItemValue,
              { color: isOvertime ? '#dc2626' : '#10b981' }
            ]}
            lightColor={isOvertime ? '#dc2626' : '#10b981'}
            darkColor={isOvertime ? '#dc2626' : '#10b981'}
          >
            {isOvertime
              ? `+${Math.floor((timer - estimatedDuration * 60) / 60)} min`
              : `${Math.floor((estimatedDuration * 60 - timer) / 60)} min`}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 16,
    padding: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  },
  timerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  timerLabel: {
    fontSize: 18,
    fontWeight: '600'
  },
  estimatedTime: {
    fontSize: 14
  },
  timerDisplay: {
    alignItems: 'center',
    marginBottom: 20
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    fontFamily: 'monospace'
  },
  overtimeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#dc2626',
    marginTop: 4,
    letterSpacing: 1
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  progressBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    marginRight: 12
  },
  progressFill: {
    height: '100%',
    borderRadius: 4
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600'
  },
  timeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1
  },
  timeItem: {
    alignItems: 'center'
  },
  timeItemLabel: {
    fontSize: 12,
    marginBottom: 4,
    textTransform: 'uppercase',
    fontWeight: '600'
  },
  timeItemValue: {
    fontSize: 14,
    fontWeight: '600'
  }
})
