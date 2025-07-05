import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { Task, TaskStatus, TaskPriority } from '../context/TaskContext'

interface TaskCardProps {
  task: Task
  onPress: () => void
}

export default function TaskCard({ task, onPress }: TaskCardProps) {
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
        return 'Low'
      case 'medium':
        return 'Medium'
      case 'high':
        return 'High'
      case 'urgent':
        return 'Urgent'
      default:
        return priority
    }
  }

  const getTimeRemaining = () => {
    if (task.status === 'completed') return null

    const now = new Date()
    const deadline = new Date(task.deadline)
    const diff = deadline.getTime() - now.getTime()

    if (diff < 0) {
      const overdue = Math.abs(diff)
      const hours = Math.floor(overdue / (1000 * 60 * 60))
      const minutes = Math.floor((overdue % (1000 * 60 * 60)) / (1000 * 60))
      return `${hours}h ${minutes}m overdue`
    }

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m remaining`
  }

  const getProgressPercentage = () => {
    const completedItems = task.checklistItems.filter(
      item => item.completed
    ).length
    return Math.round((completedItems / task.checklistItems.length) * 100)
  }

  const timeRemaining = getTimeRemaining()
  const progressPercentage = getProgressPercentage()

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.cardHeader}>
        <View style={styles.apartmentContainer}>
          <Text style={styles.apartmentNumber}>
            Room {task.apartmentNumber}
          </Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(task.status) }
            ]}
          >
            <Text style={styles.statusText}>{getStatusText(task.status)}</Text>
          </View>
        </View>
        <View
          style={[
            styles.priorityBadge,
            { backgroundColor: getPriorityColor(task.priority) }
          ]}
        >
          <Text style={styles.priorityText}>
            {getPriorityText(task.priority)}
          </Text>
        </View>
      </View>

      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {task.description}
      </Text>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progressPercentage}%`,
                backgroundColor:
                  task.status === 'completed' ? '#10b981' : '#3b82f6'
              }
            ]}
          />
        </View>
        <Text style={styles.progressText}>{progressPercentage}%</Text>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeLabel}>Est. Duration:</Text>
          <Text style={styles.timeValue}>{task.estimatedDuration} min</Text>
        </View>

        {timeRemaining && (
          <View style={styles.timeContainer}>
            <Text
              style={[
                styles.timeValue,
                { color: task.status === 'overdue' ? '#dc2626' : '#6b7280' }
              ]}
            >
              {timeRemaining}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.assigneeContainer}>
        <Text style={styles.assigneeLabel}>Assigned to:</Text>
        <Text style={styles.assigneeValue}>{task.assignedTo}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  apartmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  apartmentNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginRight: 12
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff'
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff'
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 16
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    marginRight: 12
  },
  progressFill: {
    height: '100%',
    borderRadius: 3
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280'
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  timeLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginRight: 4
  },
  timeValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280'
  },
  assigneeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6'
  },
  assigneeLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginRight: 8
  },
  assigneeValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4b5563'
  }
})
