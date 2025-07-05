import React, { createContext, ReactNode, useContext, useReducer } from 'react'

export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'overdue'
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface Task {
  id: string
  apartmentNumber: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  estimatedDuration: number // in minutes
  actualDuration?: number // in minutes
  startTime?: Date
  endTime?: Date
  deadline: Date
  assignedTo: string
  notes?: string
  checklistItems: {
    id: string
    text: string
    completed: boolean
  }[]
}

interface TaskState {
  tasks: Task[]
  activeTask: string | null
}

type TaskAction =
  | { type: 'START_TASK'; payload: string }
  | { type: 'STOP_TASK'; payload: string }
  | { type: 'COMPLETE_TASK'; payload: string }
  | {
      type: 'UPDATE_CHECKLIST'
      payload: { taskId: string; itemId: string; completed: boolean }
    }
  | { type: 'ADD_NOTES'; payload: { taskId: string; notes: string } }

const initialTasks: Task[] = [
  {
    id: '1',
    apartmentNumber: '101',
    title: 'Standard Room Cleaning',
    description:
      'Complete cleaning of standard room including bathroom and bedroom',
    status: 'pending',
    priority: 'medium',
    estimatedDuration: 45,
    deadline: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    assignedTo: 'Maria Hansen',
    checklistItems: [
      { id: '1', text: 'Make bed and arrange pillows', completed: false },
      { id: '2', text: 'Vacuum carpet and clean floors', completed: false },
      { id: '3', text: 'Clean and disinfect bathroom', completed: false },
      { id: '4', text: 'Dust furniture and surfaces', completed: false },
      { id: '5', text: 'Restock amenities and towels', completed: false },
      { id: '6', text: 'Check and clean windows', completed: false }
    ]
  },
  {
    id: '2',
    apartmentNumber: '205',
    title: 'Suite Deep Cleaning',
    description:
      'Thorough cleaning of luxury suite with living area and kitchenette',
    status: 'in-progress',
    priority: 'high',
    estimatedDuration: 90,
    startTime: new Date(Date.now() - 30 * 60 * 1000), // Started 30 minutes ago
    deadline: new Date(Date.now() + 1.5 * 60 * 60 * 1000), // 1.5 hours from now
    assignedTo: 'Lars Andersen',
    checklistItems: [
      { id: '1', text: 'Clean living area and kitchenette', completed: true },
      { id: '2', text: 'Complete bedroom cleaning', completed: true },
      {
        id: '3',
        text: 'Deep clean bathroom with premium products',
        completed: false
      },
      { id: '4', text: 'Polish all surfaces and fixtures', completed: false },
      { id: '5', text: 'Arrange luxury amenities', completed: false },
      { id: '6', text: 'Final inspection and quality check', completed: false }
    ]
  },
  {
    id: '3',
    apartmentNumber: '312',
    title: 'Maintenance Required',
    description: 'Room cleaning with minor maintenance issues to report',
    status: 'pending',
    priority: 'urgent',
    estimatedDuration: 60,
    deadline: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
    assignedTo: 'Anna Nielsen',
    checklistItems: [
      { id: '1', text: 'Standard room cleaning', completed: false },
      { id: '2', text: 'Check and report broken lamp', completed: false },
      { id: '3', text: 'Fix loose bathroom fixture', completed: false },
      { id: '4', text: 'Clean AC vents', completed: false },
      { id: '5', text: 'Report any additional issues', completed: false }
    ]
  },
  {
    id: '4',
    apartmentNumber: '156',
    title: 'Checkout Cleaning',
    description: 'Post-checkout cleaning and preparation for next guest',
    status: 'completed',
    priority: 'medium',
    estimatedDuration: 50,
    actualDuration: 48,
    startTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // Started 2 hours ago
    endTime: new Date(Date.now() - 1.2 * 60 * 60 * 1000), // Ended 1.2 hours ago
    deadline: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
    assignedTo: 'Erik Petersen',
    notes: 'Guest left room in excellent condition. No issues found.',
    checklistItems: [
      { id: '1', text: 'Remove all used linens', completed: true },
      { id: '2', text: 'Deep clean bathroom', completed: true },
      { id: '3', text: 'Vacuum and mop floors', completed: true },
      { id: '4', text: 'Dust and polish furniture', completed: true },
      { id: '5', text: 'Restock all amenities', completed: true },
      { id: '6', text: 'Final quality inspection', completed: true }
    ]
  },
  {
    id: '5',
    apartmentNumber: '78',
    title: 'Express Cleaning',
    description: 'Quick turnaround cleaning between same-day bookings',
    status: 'overdue',
    priority: 'urgent',
    estimatedDuration: 30,
    deadline: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes overdue
    assignedTo: 'Sofie Rasmussen',
    checklistItems: [
      { id: '1', text: 'Quick bed making', completed: false },
      { id: '2', text: 'Bathroom refresh', completed: false },
      { id: '3', text: 'Trash removal', completed: false },
      { id: '4', text: 'Towel replacement', completed: false },
      { id: '5', text: 'Surface wiping', completed: false }
    ]
  }
]

const initialState: TaskState = {
  tasks: initialTasks,
  activeTask: '2' // Suite Deep Cleaning is currently in progress
}

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'START_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? {
                ...task,
                status: 'in-progress',
                startTime: new Date()
              }
            : task
        ),
        activeTask: action.payload
      }

    case 'STOP_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? {
                ...task,
                status: 'pending',
                actualDuration: task.startTime
                  ? (task.actualDuration || 0) +
                    Math.floor((Date.now() - task.startTime.getTime()) / 60000)
                  : task.actualDuration
              }
            : task
        ),
        activeTask: null
      }

    case 'COMPLETE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? {
                ...task,
                status: 'completed',
                endTime: new Date(),
                actualDuration: task.startTime
                  ? (task.actualDuration || 0) +
                    Math.floor((Date.now() - task.startTime.getTime()) / 60000)
                  : undefined
              }
            : task
        ),
        activeTask: null
      }

    case 'UPDATE_CHECKLIST':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? {
                ...task,
                checklistItems: task.checklistItems.map(item =>
                  item.id === action.payload.itemId
                    ? { ...item, completed: action.payload.completed }
                    : item
                )
              }
            : task
        )
      }

    case 'ADD_NOTES':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? { ...task, notes: action.payload.notes }
            : task
        )
      }

    default:
      return state
  }
}

interface TaskContextType {
  state: TaskState
  dispatch: React.Dispatch<TaskAction>
  getTaskById: (id: string) => Task | undefined
  getTasksByStatus: (status: TaskStatus) => Task[]
  getOverdueTasks: () => Task[]
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialState)

  const getTaskById = (id: string) => {
    return state.tasks.find(task => task.id === id)
  }

  const getTasksByStatus = (status: TaskStatus) => {
    return state.tasks.filter(task => task.status === status)
  }

  const getOverdueTasks = () => {
    return state.tasks.filter(
      task => task.deadline < new Date() && task.status !== 'completed'
    )
  }

  return (
    <TaskContext.Provider
      value={{
        state,
        dispatch,
        getTaskById,
        getTasksByStatus,
        getOverdueTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTask() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider')
  }
  return context
}
