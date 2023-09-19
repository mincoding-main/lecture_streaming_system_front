import axios from 'axios';

// Members
export const createMember = async (data) => {
    const response = await axios.post(`/api/members`, data);
    return response.data;
};

export const fetchMember = async (id) => {
    const response = await axios.get(`/api/members/${id}`);
    return response.data;
};

export const updateMember = async (id, data) => {
    const response = await axios.put(`/api/members/${id}`, data);
    return response.data;
};

export const deleteMember = async (id) => {
    const response = await axios.delete(`/api/members/${id}`);
    return response.data;
};

// Lectures
export const createLecture = async (data) => {
    const response = await axios.post(`/api/lectures`, data);
    return response.data;
};

export const fetchLecture = async (id) => {
    const response = await axios.get(`/api/lectures/${id}`);
    return response.data;
};

export const updateLecture = async (id, data) => {
    const response = await axios.put(`/api/lectures/${id}`, data);
    return response.data;
};

export const deleteLecture = async (id) => {
    const response = await axios.delete(`/api/lectures/${id}`);
    return response.data;
};

// Tags
export const createTag = async (data) => {
    const response = await axios.post(`/api/tags`, data);
    return response.data;
};

export const fetchTag = async (id) => {
    const response = await axios.get(`/api/tags/${id}`);
    return response.data;
};

export const updateTag = async (id, data) => {
    const response = await axios.put(`/api/tags/${id}`, data);
    return response.data;
};

export const deleteTag = async (id) => {
    const response = await axios.delete(`/api/tags/${id}`);
    return response.data;
};

// Lecture Videos
export const createVideo = async (lectureId, data) => {
    const response = await axios.post(`/api/lectures/${lectureId}/videos`, data);
    return response.data;
};

export const fetchVideo = async (lectureId, videoId) => {
    const response = await axios.get(`/api/lectures/${lectureId}/videos/${videoId}`);
    return response.data;
};

export const updateVideo = async (lectureId, videoId, data) => {
    const response = await axios.put(`/api/lectures/${lectureId}/videos/${videoId}`, data);
    return response.data;
};

export const deleteVideo = async (lectureId, videoId) => {
    const response = await axios.delete(`/api/lectures/${lectureId}/videos/${videoId}`);
    return response.data;
};


// 추가된 메서드: 전체 멤버 목록 읽기
export const fetchMembers = async () => {
    const response = await axios.get(`/api/members`);
    return response.data;
};

// 추가된 메서드: 전체 강의 목록 읽기
export const fetchLectures = async () => {
    const response = await axios.get(`/api/lectures`);
    return response.data;
};

// 추가된 메서드: 하나의 강의에 해당하는 전체 비디오 정보 읽기
export const fetchLectureVideos = async (lectureId) => {
    const response = await axios.get(`/api/lectures/${lectureId}/videos`);
    return response.data;
};

// 추가된 메서드: 전체 태그 목록 읽기
export const fetchTags = async () => {
    const response = await axios.get(`/api/tags`);
    return response.data;
};