import request from './index';

const getCourses = () => {
    return request.get('/course');
}

const deleteCourseByIds = (ids: number[]) => {
    return request.delete('/course', { data: ids });
}

const addCourse = (course: { name: string; credits: number; instructor: string; schedule: string }) => {
    return request.post('/course', course);
}

export { getCourses, deleteCourseByIds, addCourse };