import { router } from 'expo-router'
import React, { useState } from 'react'
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native'
import StatsCard from '../../components/StatsCard'
import StatusFilter from '../../components/StatusFilter'
import TaskCard from '../../components/TaskCard'
import { ThemedText } from '../../components/ThemedText'
import { TaskStatus, useTask } from '../../context/TaskContext'

export default function HomeScreen() {
  const { state, getTasksByStatus, getOverdueTasks } = useTask()
  const [selectedFilter, setSelectedFilter] = useState<TaskStatus | 'all'>(
    'all'
  )

  const filteredTasks =
    selectedFilter === 'all' ? state.tasks : getTasksByStatus(selectedFilter)

  const overdueTasks = getOverdueTasks()
  const pendingTasks = getTasksByStatus('pending')
  const inProgressTasks = getTasksByStatus('in-progress')
  const completedTasks = getTasksByStatus('completed')

  const handleTaskPress = (taskId: string) => {
    router.push({
      pathname: '/details',
      params: { taskId }
    })
  }

  const renderTask = ({ item }: { item: any }) => (
    <TaskCard task={item} onPress={() => handleTaskPress(item.id)} />
  )

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <ThemedText style={styles.welcomeText}>Velkommen, Maria! 👋</ThemedText>
      <ThemedText style={styles.dateText}>
        {new Date().toLocaleDateString('da-DK', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </ThemedText>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.statsContainer}
        contentContainerStyle={styles.statsContent}
      >
        <StatsCard
          title="Overdue"
          count={overdueTasks.length}
          color="#dc2626"
          icon="⚠️"
        />
        <StatsCard
          title="Pending"
          count={pendingTasks.length}
          color="#f59e0b"
          icon="⏳"
        />
        <StatsCard
          title="In Progress"
          count={inProgressTasks.length}
          color="#3b82f6"
          icon="🔄"
        />
        <StatsCard
          title="Completed"
          count={completedTasks.length}
          color="#10b981"
          icon="✅"
        />
      </ScrollView>

      <StatusFilter
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredTasks}
        renderItem={renderTask}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>No tasks found</ThemedText>
            <ThemedText style={styles.emptySubText}>
              All tasks for this filter are complete!
            </ThemedText>
          </View>
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4
  },
  dateText: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 20,
    textTransform: 'capitalize'
  },
  statsContainer: {
    marginBottom: 20
  },
  statsContent: {
    paddingRight: 20
  },
  listContainer: {
    paddingBottom: 20
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8
  },
  emptySubText: {
    fontSize: 14,
    opacity: 0.6,
    textAlign: 'center'
  }
})
