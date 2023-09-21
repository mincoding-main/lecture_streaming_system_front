import axios from 'axios';
import config from '@/config';

const api = axios.create({
    baseURL: config.apiBackPoint
});


// Members

/**
 * 새로운 멤버를 생성합니다.
 *
 * @param {Object} data - 새 멤버의 데이터.
 * @returns {Promise<Object>} - 생성된 멤버의 데이터.
 * @throws {Error} 생성 중에 에러가 발생하면 예외를 던집니다.
 */
export const createMember = async (data) => {
    try {
        const response = await api.post(`/api/members`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while creating the member:", error);
        throw error;
    }
};

/**
 * ID로 단일 멤버를 조회합니다.
 *
 * @param {string} id - 조회할 멤버의 ID.
 * @returns {Promise<Object>} - 멤버의 데이터.
 * @throws {Error} 조회 중에 에러가 발생하면 예외를 던집니다.
 */
export const fetchMember = async (id) => {
    try {
        const response = await api.get(`/api/members/${id}`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while fetching the member:", error);
        throw error;
    }
};

/**
 * 모든 멤버를 조회합니다.
 *
 * @returns {Promise<Array<Object>>} - 모든 멤버의 배열.
 * @throws {Error} 조회 중에 에러가 발생하면 예외를 던집니다.
 */
export const fetchAllMembers = async () => {
    try {
        const response = await api.get(`/api/members`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while fetching members:", error);
        throw error;
    }
};

/**
 * 멤버 정보를 업데이트합니다.
 *
 * @param {string} id - 업데이트할 멤버의 ID.
 * @param {Object} data - 업데이트할 데이터.
 * @returns {Object} 업데이트 성공 여부와 메시지를 담은 객체.
 * @throws {Error} 업데이트 중에 에러가 발생하면 예외를 던집니다.
 */
export const updateMember = async (id, data) => {
    try {
        const response = await api.patch(`/api/members/${id}`, data);
        return { success: true, message: '프로필이 업데이트되었습니다.' };
    } catch (error) {
        console.error("An error occurred while updating the member:", error);
        return { success: false, message: '프로필 업데이트에 실패했습니다.' };
    }
};

/**
 * 멤버를 삭제합니다.
 *
 * @param {string} id - 삭제할 멤버의 ID.
 * @returns {Promise<Object>} - 삭제된 멤버의 데이터.
 * @throws {Error} 삭제 중에 에러가 발생하면 예외를 던집니다.
 */
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

/**
 * 새로운 강의를 생성합니다.
 *
 * @param {Object} data - 새 강의의 데이터.
 * @returns {Promise<Object>} - 생성된 강의의 데이터.
 * @throws {Error} 생성 중에 에러가 발생하면 예외를 던집니다.
 */
export const createLecture = async (data) => {
    try {
        const response = await api.post(`/api/lectures`, data);
        return response;
    } catch (error) {
        console.error("An error occurred while creating the lecture:", error);
        throw error;
    }
};

/**
 * ID로 단일 강의를 조회합니다.
 *
 * @param {string} id - 조회할 강의의 ID.
 * @returns {Promise<Object>} - 강의의 데이터.
 * @throws {Error} 조회 중에 에러가 발생하면 예외를 던집니다.
 */
export const fetchLecture = async (id) => {
    try {
        const response = await api.get(`/api/lectures/${id}`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while fetching the lecture:", error);
        throw error;
    }
};

/**
 * 모든 강의를 조회합니다.
 *
 * @returns {Promise<Array<Object>>} - 모든 강의의 배열.
 * @throws {Error} 조회 중에 에러가 발생하면 예외를 던집니다.
 */
export const fetchAllLectures = async () => {
    try {
        const response = await api.get(`/api/lectures`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while fetching lectures:", error);
        throw error;
    }
};

/**
 * 강의 정보를 업데이트합니다.
 *
 * @param {string} id - 업데이트할 강의의 ID.
 * @param {Object} data - 업데이트할 데이터.
 * @returns {Promise<Object>} - 업데이트된 강의의 데이터.
 * @throws {Error} 업데이트 중에 에러가 발생하면 예외를 던집니다.
 */
export const updateLecture = async (id, data) => {
    try {
        const response = await api.patch(`/api/lectures/${id}`, data);
        return response;
    } catch (error) {
        console.error("An error occurred while updating the lecture:", error);
        throw error;
    }
};

/**
 * 강의를 삭제합니다.
 *
 * @param {string} id - 삭제할 강의의 ID.
 * @returns {Promise<Object>} - 삭제된 강의의 데이터.
 * @throws {Error} 삭제 중에 에러가 발생하면 예외를 던집니다.
 */
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

/**
 * 새로운 강의 비디오를 생성합니다.
 *
 * @param {string} lectureId - 강의 ID.
 * @param {Object} data - 새 비디오의 데이터.
 * @returns {Promise<Object>} 생성된 비디오의 데이터.
 * @throws {Error} 생성 중에 에러가 발생하면 예외를 던집니다.
 */
export const createLectureVideo = async (lectureId, data) => {
    try {
        const response = await api.post(`/api/lectures/${lectureId}/lecture_item`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while creating the video:", error);
        throw error;
    }
};

/**
 * ID로 단일 강의 비디오를 조회합니다.
 *
 * @param {string} lectureId - 강의 ID.
 * @param {string} videoId - 비디오 ID.
 * @returns {Promise<Object>} 조회된 비디오의 데이터.
 * @throws {Error} 조회 중에 에러가 발생하면 예외를 던집니다.
 */
export const fetchLectureVideo = async (lectureId, videoId) => {
    try {
        const response = await api.get(`/api/lectures/${lectureId}/lecture_item/${videoId}`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while fetching the video:", error);
        throw error;
    }
};

/**
 * 하나의 강의에 포함된 모든 비디오를 조회합니다.
 *
 * @param {string} lectureId - 강의 ID.
 * @returns {Promise<Array<Object>>} 모든 비디오의 배열.
 * @throws {Error} 조회 중에 에러가 발생하면 예외를 던집니다.
 */
export const fetchAllLectureVideos = async (lectureId) => {
    try {
        const response = await api.get(`/api/lectures/${lectureId}/lecture_item`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while fetching lecture videos:", error);
        throw error;
    }
};

/**
 * 강의 비디오 정보를 업데이트합니다.
 *
 * @param {string} lectureId - 강의 ID.
 * @param {string} videoId - 비디오 ID.
 * @param {Object} data - 업데이트할 데이터.
 * @returns {Promise<Object>} 업데이트된 비디오의 데이터.
 * @throws {Error} 업데이트 중에 에러가 발생하면 예외를 던집니다.
 */
export const updateLectureVideo = async (lectureId, videoId, data) => {
    try {
        const response = await api.patch(`/api/lectures/${lectureId}/lecture_item/${videoId}`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while updating the video:", error);
        throw error;
    }
};

/**
 * 강의 비디오를 삭제합니다.
 *
 * @param {string} lectureId - 강의 ID.
 * @param {string} videoId - 비디오 ID.
 * @returns {Promise<Object>} 삭제된 비디오의 데이터.
 * @throws {Error} 삭제 중에 에러가 발생하면 예외를 던집니다.
 */
export const deleteLectureVideo = async (lectureId, videoId) => {
    try {
        const response = await api.delete(`/api/lectures/${lectureId}/lecture_item/${videoId}`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while deleting the video:", error);
        throw error;
    }
};



// Tags

/**
 * 새로운 태그를 생성합니다.
 *
 * @param {Object} data - 새 태그의 데이터.
 * @returns {Promise<Object>} 생성된 태그의 데이터.
 * @throws {Error} 생성 중에 에러가 발생하면 예외를 던집니다.
 */
export const createTag = async (data) => {
    try {
        //const response = await api.post(`/api/tags`, data);
        const response = await axios.post(`http://168.126.185.94:8080/api/tags`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while creating the tag:", error);
        throw error;
    }
};

/**
 * ID로 단일 태그를 조회합니다.
 *
 * @param {string} id - 태그 ID.
 * @returns {Promise<Object>} 조회된 태그의 데이터.
 * @throws {Error} 조회 중에 에러가 발생하면 예외를 던집니다.
 */
export const fetchTag = async (id) => {
    try {
        //const response = await api.get(`/api/tags/${id}`);
        const response = await axios.get(`http://168.126.185.94:8080/api/tags/${id}`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while fetching the tag:", error);
        throw error;
    }
};

/**
 * 모든 태그를 조회합니다.
 *
 * @returns {Promise<Array<Object>>} 모든 태그의 배열.
 * @throws {Error} 조회 중에 에러가 발생하면 예외를 던집니다.
 */
export const fetchAllTags = async () => {
    try {
        //const response = await api.get(`/api/tags`);
        const response = await axios.get(`http://168.126.185.94:8080/api/tags`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while fetching all tags:", error);
        throw error;
    }
};

/**
 * 태그 정보를 업데이트합니다.
 *
 * @param {string} id - 태그 ID.
 * @param {Object} data - 업데이트할 데이터.
 * @returns {Promise<Object>} 업데이트된 태그의 데이터.
 * @throws {Error} 업데이트 중에 에러가 발생하면 예외를 던집니다.
 */
export const updateTag = async (id, data) => {
    try {
        //const response = await api.patch(`/api/tags/${id}`, data);
        const response = await axios.patch(`http://168.126.185.94:8080/api/tags/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while updating the tag:", error);
        throw error;
    }
};

/**
 * 태그를 삭제합니다.
 *
 * @param {string} id - 태그 ID.
 * @returns {Promise<Object>} 삭제된 태그의 데이터.
 * @throws {Error} 삭제 중에 에러가 발생하면 예외를 던집니다.
 */
export const deleteTag = async (id) => {
    try {
        //const response = await api.delete(`/api/tags/${id}`);
        const response = await axios.delete(`http://168.126.185.94:8080/api/tags/${id}`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while deleting the tag:", error);
        throw error;
    }
};
