import { ThemedText } from '@/components/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Task, TaskPriority, TaskStatus } from '../context/TaskContext'

interface TaskHeaderProps {
  task: Task
}

export default function TaskHeader({ task }: TaskHeaderProps) {
  const cardBackgroundColor = useThemeColor({}, 'background')
  const shadowColor = useThemeColor({ light: '#000', dark: '#000' }, 'text')

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'pending':
        return '#f59e0b'
      case 'in-progress':
        return '#3b82f6'
      case 'completed':
        return '#10b981'
      case 'overdue':
        return '#dc2626'
      default:
        return '#6b7280'
    }
  }

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'low':
        return '#10b981'
      case 'medium':
        return '#f59e0b'
      case 'high':
        return '#f97316'
      case 'urgent':
        return '#dc2626'
      default:
        return '#6b7280'
    }
  }

  const getStatusText = (status: TaskStatus) => {
    switch (status) {
      case 'pending':
        return 'Pending'
      case 'in-progress':
        return 'In Progress'
      case 'completed':
        return 'Completed'
      case 'overdue':
        return 'Overdue'
      default:
        return status
    }
  }

  const getPriorityText = (priority: TaskPriority) => {
    switch (priority) {
      case 'low':
        return 'Low Priority'
      case 'medium':
        return 'Medium Priority'
      case 'high':
        return 'High Priority'
      case 'urgent':
        return 'Urgent'
      default:
        return priority
    }
  }

  const formatDeadline = (deadline: Date) => {
    return new Date(deadline).toLocaleString('da-DK', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: cardBackgroundColor, shadowColor }
      ]}
    >
      <View style={styles.headerRow}>
        <View style={styles.apartmentContainer}>
          <ThemedText
            style={styles.apartmentLabel}
            lightColor="#6b7280"
            darkColor="#9ca3af"
          >
            Room
          </ThemedText>
          <ThemedText
            style={styles.apartmentNumber}
            lightColor="#1f2937"
            darkColor="#f9fafb"
          >
            {task.apartmentNumber}
          </ThemedText>
        </View>
        <View style={styles.badgeContainer}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(task.status) }
            ]}
          >
            <ThemedText style={styles.badgeText}>
              {getStatusText(task.status)}
            </ThemedText>
          </View>
          <View
            style={[
              styles.priorityBadge,
              { backgroundColor: getPriorityColor(task.priority) }
            ]}
          >
            <ThemedText style={styles.badgeText}>
              {getPriorityText(task.priority)}
            </ThemedText>
          </View>
        </View>
      </View>

      <ThemedText style={styles.title} lightColor="#1f2937" darkColor="#f9fafb">
        {task.title}
      </ThemedText>
      <ThemedText
        style={styles.description}
        lightColor="#6b7280"
        darkColor="#9ca3af"
      >
        {task.description}
      </ThemedText>

      <View style={styles.infoGrid}>
        <View style={styles.infoItem}>
          <ThemedText
            style={styles.infoLabel}
            lightColor="#9ca3af"
            darkColor="#6b7280"
          >
            Assigned to
          </ThemedText>
          <ThemedText
            style={styles.infoValue}
            lightColor="#4b5563"
            darkColor="#d1d5db"
          >
            {task.assignedTo}
          </ThemedText>
        </View>
        <View style={styles.infoItem}>
          <ThemedText
            style={styles.infoLabel}
            lightColor="#9ca3af"
            darkColor="#6b7280"
          >
            Est. Duration
          </ThemedText>
          <ThemedText
            style={styles.infoValue}
            lightColor="#4b5563"
            darkColor="#d1d5db"
          >
            {task.estimatedDuration} min
          </ThemedText>
        </View>
        <View style={styles.infoItem}>
          <ThemedText
            style={styles.infoLabel}
            lightColor="#9ca3af"
            darkColor="#6b7280"
          >
            Deadline
          </ThemedText>
          <ThemedText
            style={styles.infoValue}
            lightColor={task.status === 'overdue' ? '#dc2626' : '#4b5563'}
            darkColor={task.status === 'overdue' ? '#dc2626' : '#d1d5db'}
          >
            {formatDeadline(task.deadline)}
          </ThemedText>
        </View>
        {task.actualDuration ? (
          <View style={styles.infoItem}>
            <ThemedText
              style={styles.infoLabel}
              lightColor="#9ca3af"
              darkColor="#6b7280"
            >
              Actual Duration
            </ThemedText>
            <ThemedText
              style={styles.infoValue}
              lightColor="#4b5563"
              darkColor="#d1d5db"
            >
              {task.actualDuration} min
            </ThemedText>
          </View>
        ) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16
  },
  apartmentContainer: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  apartmentLabel: {
    fontSize: 14,
    marginRight: 8
  },
  apartmentNumber: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  badgeContainer: {
    alignItems: 'flex-end'
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 8
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8
  },
  infoItem: {
    width: '50%',
    paddingHorizontal: 8,
    marginBottom: 16
  },
  infoLabel: {
    fontSize: 12,
    marginBottom: 4,
    textTransform: 'uppercase',
    fontWeight: '600'
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600'
  }
})
