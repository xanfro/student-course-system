import request from './index';

const getCourses = () => {
    return request.get('/course');
}

export { getCourses };