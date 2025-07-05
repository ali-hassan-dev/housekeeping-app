import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

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
    <View style={styles.container}>
      <View style={styles.timerHeader}>
        <Text style={styles.timerLabel}>Task Timer</Text>
        <Text style={styles.estimatedTime}>Est. {estimatedDuration} min</Text>
      </View>

      <View style={styles.timerDisplay}>
        <Text
          style={[
            styles.timerText,
            { color: isOvertime ? '#dc2626' : '#1f2937' }
          ]}
        >
          {formatTime(timer)}
        </Text>
        {isOvertime && <Text style={styles.overtimeText}>OVERTIME</Text>}
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progressPercentage}%`,
                backgroundColor: isOvertime ? '#dc2626' : '#3b82f6'
              }
            ]}
          />
        </View>
        <Text
          style={[
            styles.progressText,
            { color: isOvertime ? '#dc2626' : '#3b82f6' }
          ]}
        >
          {Math.round(progressPercentage)}%
        </Text>
      </View>

      <View style={styles.timeInfo}>
        <View style={styles.timeItem}>
          <Text style={styles.timeItemLabel}>Started</Text>
          <Text style={styles.timeItemValue}>
            {startTime.toLocaleTimeString('da-DK', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        </View>
        <View style={styles.timeItem}>
          <Text style={styles.timeItemLabel}>Elapsed</Text>
          <Text style={styles.timeItemValue}>{Math.floor(timer / 60)} min</Text>
        </View>
        <View style={styles.timeItem}>
          <Text style={styles.timeItemLabel}>Remaining</Text>
          <Text
            style={[
              styles.timeItemValue,
              { color: isOvertime ? '#dc2626' : '#10b981' }
            ]}
          >
            {isOvertime
              ? `+${Math.floor((timer - estimatedDuration * 60) / 60)} min`
              : `${Math.floor((estimatedDuration * 60 - timer) / 60)} min`}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
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
    fontWeight: '600',
    color: '#1f2937'
  },
  estimatedTime: {
    fontSize: 14,
    color: '#6b7280'
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
    backgroundColor: '#e5e7eb',
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
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6'
  },
  timeItem: {
    alignItems: 'center'
  },
  timeItemLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
    textTransform: 'uppercase',
    fontWeight: '600'
  },
  timeItemValue: {
    fontSize: 14,
    color: '#4b5563',
    fontWeight: '600'
  }
})
