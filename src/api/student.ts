import request from './index';

const getStudents = () => {
    return request.get('/student');
}

const deleteStudentByIds = (ids: number[]) => {
    return request.delete('/student', { data: ids });
}

const addStudent = (student: { name: string; age: number; gender: string; major: string; grade: string; gpa: number }) => {
    return request.post('/student', student);
}


export { getStudents, deleteStudentByIds, addStudent };