import React from 'react'
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { TaskStatus } from '../context/TaskContext'

interface StatusFilterProps {
  selectedFilter: TaskStatus | 'all'
  onFilterChange: (filter: TaskStatus | 'all') => void
}

export default function StatusFilter({
  selectedFilter,
  onFilterChange
}: StatusFilterProps) {
  const filters: (TaskStatus | 'all')[] = [
    'all',
    'pending',
    'in-progress',
    'completed',
    'overdue'
  ]

  const getFilterColor = (filter: TaskStatus | 'all') => {
    switch (filter) {
      case 'all':
        return '#6b7280'
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

  const getFilterText = (filter: TaskStatus | 'all') => {
    switch (filter) {
      case 'all':
        return 'All'
      case 'pending':
        return 'Pending'
      case 'in-progress':
        return 'In Progress'
      case 'completed':
        return 'Completed'
      case 'overdue':
        return 'Overdue'
      default:
        return filter
    }
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {filters.map(filter => (
        <TouchableOpacity
          key={filter}
          style={[
            styles.filterButton,
            selectedFilter === filter && styles.selectedButton,
            { backgroundColor: getFilterColor(filter) }
          ]}
          onPress={() => onFilterChange(filter)}
        >
          <Text style={styles.filterText}>{getFilterText(filter)}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f3f4f6'
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10
  },
  selectedButton: {
    borderWidth: 2,
    borderColor: '#ffffff'
  },
  filterText: {
    color: '#ffffff',
    fontWeight: 'bold'
  }
})
