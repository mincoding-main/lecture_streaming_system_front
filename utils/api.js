import axios from 'axios';
import config from '@/config';

const api = axios.create({
    baseURL: config.apiBackPoint
});
// Members

// Create
export const createMember = async (data) => {
    try {
        const response = await api.post(`/api/members`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while creating the member:", error);
        throw error;
    }
};

// Read (single)
export const fetchMember = async (id) => {
    try {
        const response = await api.get(`/api/members/${id}`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while fetching the member:", error);
        throw error;
    }
};

// Read (all)
export const fetchAllMembers = async () => {
    try {
        const response = await api.get(`/api/members`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while fetching members:", error);
        throw error;
    }
};

// Update
export const updateMember = async (id, data) => {
    try {
        const response = await api.put(`/api/members/${id}`, data);
        return { success: true, message: '프로필이 업데이트되었습니다.' };
    } catch (error) {
        console.error("An error occurred while updating the member:", error);
        return { success: false, message: '프로필 업데이트에 실패했습니다.' };
    }
};

// Delete
export const deleteMember = async (id) => {
    try {
        const response = await api.delete(`/api/members/${id}`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while deleting the member:", error);
        throw error;
    }
};

// Lectures

// Create
export const createLecture = async (data) => {
    try {
        const response = await api.post(`/api/lectures`, data);
        return response;
    } catch (error) {
        console.error("An error occurred while creating the lecture:", error);
        throw error;
    }
};

// Read (single)
export const fetchLecture = async (id) => {
    try {
        const response = await api.get(`/api/lectures/${id}`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while fetching the lecture:", error);
        throw error;
    }
};

// Read (all)
export const fetchAllLectures = async () => {
    try {
        const response = await api.get(`/api/lectures`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while fetching lectures:", error);
        throw error;
    }
};

// Update
export const updateLecture = async (id, data) => {
    try {
        const response = await api.put(`/api/lectures/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while updating the lecture:", error);
        throw error;
    }
};

// Delete
export const deleteLecture = async (id) => {
    try {
        const response = await api.delete(`/api/lectures/${id}`);
        return response;
    } catch (error) {
        console.error("An error occurred while deleting the lecture:", error);
        throw error;
    }
};


// Lecture Videos

// Create
export const createLectureVideo = async (lectureId, data) => {
    try {
        const response = await api.post(`/api/lectures/${lectureId}/videos`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while creating the video:", error);
        throw error;
    }
};

// Read (single)
export const fetchLectureVideo = async (lectureId, videoId) => {
    try {
        const response = await api.get(`/api/lectures/${lectureId}/videos/${videoId}`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while fetching the video:", error);
        throw error;
    }
};

// Read (all)
export const fetchAllLectureVideos = async (lectureId) => {
    try {
        const response = await api.get(`/api/lectures/${lectureId}/videos`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while fetching lecture videos:", error);
        throw error;
    }
};

// Update
export const updateLectureVideo = async (lectureId, videoId, data) => {
    try {
        const response = await api.put(`/api/lectures/${lectureId}/videos/${videoId}`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while updating the video:", error);
        throw error;
    }
};

// Delete
export const deleteLectureVideo = async (lectureId, videoId) => {
    try {
        const response = await api.delete(`/api/lectures/${lectureId}/videos/${videoId}`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while deleting the video:", error);
        throw error;
    }
};



// Tags

// Create
export const createTag = async (data) => {
    try {
        const response = await api.post(`/api/tags`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while creating the tag:", error);
        throw error;
    }
};

// Read (single)
export const fetchTag = async (id) => {
    try {
        const response = await api.get(`/api/tags/${id}`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while fetching the tag:", error);
        throw error;
    }
};

// Read (all)
export const fetchAllTags = async () => {
    try {
        const response = await api.get(`/api/tags`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while fetching all tags:", error);
        throw error;
    }
};

// Update
export const updateTag = async (id, data) => {
    try {
        const response = await api.put(`/api/tags/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while updating the tag:", error);
        throw error;
    }
};

// Delete
export const deleteTag = async (id) => {
    try {
        const response = await api.delete(`/api/tags/${id}`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while deleting the tag:", error);
        throw error;
    }
};
