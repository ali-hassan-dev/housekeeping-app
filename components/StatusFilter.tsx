import React from 'react'
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import { TaskStatus } from '../context/TaskContext'
import { ThemedText } from './ThemedText'

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

  const getFilterIcon = (filter: TaskStatus | 'all') => {
    switch (filter) {
      case 'all':
        return '📋'
      case 'pending':
        return '⏳'
      case 'in-progress':
        return '🔄'
      case 'completed':
        return '✅'
      case 'overdue':
        return '⚠️'
      default:
        return '📋'
    }
  }

  const renderFilterButton = (filter: TaskStatus | 'all') => {
    const isSelected = selectedFilter === filter
    const color = getFilterColor(filter)
    const text = getFilterText(filter)
    const icon = getFilterIcon(filter)

    return (
      <TouchableOpacity
        key={filter}
        style={[
          styles.filterButton,
          isSelected && styles.selectedFilterButton,
          isSelected && {
            backgroundColor: color,
            borderColor: color,
            shadowColor: color
          }
        ]}
        onPress={() => onFilterChange(filter)}
        activeOpacity={0.8}
      >
        <View style={styles.filterContent}>
          <View
            style={[
              styles.iconContainer,
              isSelected && styles.selectedIconContainer,
              !isSelected && { backgroundColor: `${color}15` }
            ]}
          >
            <ThemedText
              style={[
                styles.filterIcon,
                isSelected && styles.selectedFilterIcon
              ]}
            >
              {icon}
            </ThemedText>
          </View>
          <ThemedText
            style={[
              styles.filterText,
              isSelected && styles.selectedFilterText,
              !isSelected && { color }
            ]}
          >
            {text}
          </ThemedText>

          {isSelected && (
            <View style={[styles.activeDot, { backgroundColor: '#ffffff' }]} />
          )}
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.filtersWrapper}>
        {filters.map(renderFilterButton)}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  contentContainer: {
    paddingRight: 20
  },
  filtersWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4
  },
  filterButton: {
    marginRight: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    minWidth: 100,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    ...Platform.select({
      ios: {
        shadowColor: '#000'
      },
      android: {
        elevation: 3
      }
    })
  },
  selectedFilterButton: {
    borderWidth: 0,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    transform: [{ scale: 1.02 }]
  },
  filterContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8
  },
  selectedIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  },
  filterIcon: {
    fontSize: 12
  },
  selectedFilterIcon: {
    fontSize: 12
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center'
  },
  selectedFilterText: {
    color: '#ffffff',
    fontWeight: '700'
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    position: 'absolute',
    top: -2,
    right: -6
  }
})
