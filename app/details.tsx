import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput
} from 'react-native'
import ActionButton from '../components/ActionButton'
import ChecklistItem from '../components/ChecklistItem'
import TaskHeader from '../components/TaskHeader'
import TaskTimer from '../components/TaskTimer'
import { useTask } from '../context/TaskContext'

export default function TaskDetailScreen() {
  const { taskId } = useLocalSearchParams<{ taskId: string }>()

  const textColor = useThemeColor({}, 'text')
  const borderColor = useThemeColor(
    { light: '#d1d5db', dark: '#374151' },
    'text'
  )
  const inputBackground = useThemeColor(
    { light: '#f9fafb', dark: '#1f2937' },
    'background'
  )
  const placeholderColor = useThemeColor(
    { light: '#9ca3af', dark: '#6b7280' },
    'text'
  )

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
        <ThemedView style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>Task not found</ThemedText>
        </ThemedView>
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

        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Progress</ThemedText>
          <ThemedView style={styles.progressContainer}>
            <ThemedView style={styles.progressBar}>
              <ThemedView
                style={[
                  styles.progressFill,
                  { width: `${getProgressPercentage()}%` }
                ]}
              />
            </ThemedView>
            <ThemedText style={styles.progressText}>
              {getProgressPercentage()}% Complete
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Checklist</ThemedText>
          {task.checklistItems.map(item => (
            <ChecklistItem
              key={item.id}
              item={item}
              onToggle={completed => handleChecklistToggle(item.id, completed)}
              disabled={isCompleted}
            />
          ))}
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Notes</ThemedText>
          <TextInput
            style={[
              styles.notesInput,
              {
                borderColor: borderColor,
                backgroundColor: inputBackground,
                color: textColor
              }
            ]}
            placeholder="Add any notes about this task..."
            placeholderTextColor={placeholderColor}
            value={notes}
            onChangeText={handleNotesChange}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            editable={!isCompleted}
          />
        </ThemedView>

        <ThemedView style={styles.actionSection}>
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
            <ThemedView style={styles.completedContainer}>
              <ThemedText style={styles.completedText}>
                ✅ Task Completed
              </ThemedText>
              {task.actualDuration && (
                <ThemedText style={styles.completedDuration}>
                  Duration: {task.actualDuration} minutes
                </ThemedText>
              )}
            </ThemedView>
          )}
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
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
