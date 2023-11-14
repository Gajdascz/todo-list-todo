import { Task } from '../Task'

export function processTaskFormData(formData) {
  const NewTask = Task(
    {
      priority:    formData.priority.toLowerCase(),
      title:       formData.title,
      dueDate:     formData.dueDate,
      dueTime:     formData.dueTime,
      description: formData.description,
      subtasks:    formData.subtasks
    }
  )
  
  return NewTask;
}
