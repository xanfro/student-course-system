import request from './index';

const getStudents = () => {
    return request.get('/student');
}

export { getStudents };