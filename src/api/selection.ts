import request from './index'

type SelectionPayload = {
  id?: number
  courseCode?: string
  courseName?: string
  college?: string
  studentNo?: string
  studentName?: string
  className?: string
}

const getSelections = () => {
  return request.get('/selection')
}

const addSelection = (payload: SelectionPayload) => {
  return request.post('/selection', payload)
}

const deleteSelectionById = (id: number) => {
  return request.delete(`/selection/${id}`)
}

export { getSelections, addSelection, deleteSelectionById }
