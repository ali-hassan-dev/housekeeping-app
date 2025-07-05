import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Task, TaskStatus, TaskPriority } from '../context/TaskContext'

interface TaskHeaderProps {
  task: Task
}

export default function TaskHeader({ task }: TaskHeaderProps) {
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
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.apartmentContainer}>
          <Text style={styles.apartmentLabel}>Room</Text>
          <Text style={styles.apartmentNumber}>{task.apartmentNumber}</Text>
        </View>
        <View style={styles.badgeContainer}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(task.status) }
            ]}
          >
            <Text style={styles.badgeText}>{getStatusText(task.status)}</Text>
          </View>
          <View
            style={[
              styles.priorityBadge,
              { backgroundColor: getPriorityColor(task.priority) }
            ]}
          >
            <Text style={styles.badgeText}>
              {getPriorityText(task.priority)}
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>{task.description}</Text>

      <View style={styles.infoGrid}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Assigned to</Text>
          <Text style={styles.infoValue}>{task.assignedTo}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Est. Duration</Text>
          <Text style={styles.infoValue}>{task.estimatedDuration} min</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Deadline</Text>
          <Text
            style={[
              styles.infoValue,
              { color: task.status === 'overdue' ? '#dc2626' : '#4b5563' }
            ]}
          >
            {formatDeadline(task.deadline)}
          </Text>
        </View>
        {task.actualDuration && (
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Actual Duration</Text>
            <Text style={styles.infoValue}>{task.actualDuration} min</Text>
          </View>
        )}
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
    color: '#6b7280',
    marginRight: 8
  },
  apartmentNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937'
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
    color: '#1f2937',
    marginBottom: 8
  },
  description: {
    fontSize: 16,
    color: '#6b7280',
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
    color: '#9ca3af',
    marginBottom: 4,
    textTransform: 'uppercase',
    fontWeight: '600'
  },
  infoValue: {
    fontSize: 14,
    color: '#4b5563',
    fontWeight: '600'
  }
})
