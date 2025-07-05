import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  TextInput
} from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import ActionButton from '../components/ActionButton'
import { useTask } from '../context/TaskContext'
import TaskHeader from '../components/TaskHeader'
import TaskTimer from '../components/TaskTimer'
import ChecklistItem from '../components/ChecklistItem'

export default function TaskDetailScreen() {
  const { taskId } = useLocalSearchParams<{ taskId: string }>()

  const { getTaskById, dispatch, state } = useTask()
  const [notes, setNotes] = useState('')
  const [timer, setTimer] = useState(0)

  const task = getTaskById(taskId)

  useEffect(() => {
    if (task?.notes) {
      setNotes(task.notes)
    }
  }, [task])

  useEffect(() => {
    let interval: number
    if (task?.status === 'in-progress' && task.startTime) {
      interval = setInterval(() => {
        const elapsed = Math.floor(
          (Date.now() - task.startTime!.getTime()) / 1000
        )
        setTimer(elapsed)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [task?.status, task?.startTime])

  if (!task) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Task not found</Text>
        </View>
      </SafeAreaView>
    )
  }

  const handleStartTask = () => {
    if (state.activeTask && state.activeTask !== taskId) {
      Alert.alert(
        'Another Task Active',
        'You have another task in progress. Please complete it first.',
        [{ text: 'OK', style: 'default' }]
      )
      return
    }

    Alert.alert(
      'Start Task',
      `Are you ready to start cleaning apartment ${task.apartmentNumber}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Start',
          style: 'default',
          onPress: () => dispatch({ type: 'START_TASK', payload: taskId })
        }
      ]
    )
  }

  const handleStopTask = () => {
    const completedItems = task.checklistItems.filter(
      item => item.completed
    ).length
    const totalItems = task.checklistItems.length

    if (completedItems < totalItems) {
      Alert.alert(
        'Incomplete Checklist',
        `You have ${
          totalItems - completedItems
        } items remaining. Are you sure you want to complete this task?`,
        [
          { text: 'Continue Working', style: 'cancel' },
          {
            text: 'Complete Anyway',
            style: 'destructive',
            onPress: () => dispatch({ type: 'STOP_TASK', payload: taskId })
          }
        ]
      )
    } else {
      Alert.alert('Complete Task', 'Mark this task as completed?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Complete',
          style: 'default',
          onPress: () => dispatch({ type: 'STOP_TASK', payload: taskId })
        }
      ])
    }
  }

  const handleChecklistToggle = (itemId: string, completed: boolean) => {
    dispatch({
      type: 'UPDATE_CHECKLIST',
      payload: { taskId, itemId, completed }
    })
  }

  const handleNotesChange = (text: string) => {
    setNotes(text)
    dispatch({
      type: 'ADD_NOTES',
      payload: { taskId, notes: text }
    })
  }

  const getProgressPercentage = () => {
    const completedItems = task.checklistItems.filter(
      item => item.completed
    ).length
    return Math.round((completedItems / task.checklistItems.length) * 100)
  }

  const canStartTask = task.status === 'pending' || task.status === 'overdue'
  const canStopTask = task.status === 'in-progress'
  const isCompleted = task.status === 'completed'

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <TaskHeader task={task} />

        {task.status === 'in-progress' && (
          <TaskTimer
            startTime={task.startTime!}
            estimatedDuration={task.estimatedDuration}
            timer={timer}
          />
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progress</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${getProgressPercentage()}%` }
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {getProgressPercentage()}% Complete
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Checklist</Text>
          {task.checklistItems.map(item => (
            <ChecklistItem
              key={item.id}
              item={item}
              onToggle={completed => handleChecklistToggle(item.id, completed)}
              disabled={isCompleted}
            />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Add any notes about this task..."
            placeholderTextColor="#9ca3af"
            value={notes}
            onChangeText={handleNotesChange}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            editable={!isCompleted}
          />
        </View>

        <View style={styles.actionSection}>
          {canStartTask && (
            <ActionButton
              title="Start Task"
              onPress={handleStartTask}
              style={styles.startButton}
              textStyle={styles.startButtonText}
            />
          )}

          {canStopTask && (
            <ActionButton
              title="Complete Task"
              onPress={handleStopTask}
              style={styles.completeButton}
              textStyle={styles.completeButtonText}
            />
          )}

          {isCompleted && (
            <View style={styles.completedContainer}>
              <Text style={styles.completedText}>✅ Task Completed</Text>
              {task.actualDuration && (
                <Text style={styles.completedDuration}>
                  Duration: {task.actualDuration} minutes
                </Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc'
  },
  scrollView: {
    flex: 1
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    fontSize: 18,
    color: '#dc2626'
  },
  section: {
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
    backgroundColor: '#10b981',
    borderRadius: 4
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10b981'
  },
  notesInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1f2937',
    backgroundColor: '#f9fafb',
    minHeight: 100
  },
  actionSection: {
    margin: 16,
    marginBottom: 32
  },
  startButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600'
  },
  completeButton: {
    backgroundColor: '#10b981',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4
  },
  completeButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600'
  },
  completedContainer: {
    backgroundColor: '#d1fae5',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center'
  },
  completedText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#059669',
    marginBottom: 8
  },
  completedDuration: {
    fontSize: 14,
    color: '#047857'
  }
})
