import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import adminTagEditModalStyle from '@/styles/admin-tag-edit-modal.module.css'


export default function AdminTagInfoModal({ open, onClose, tag, onUpdateTag, onUpdateFilteredTags, onDeleteTag, mode = 'edit' }) {
    const [updatedTag, setUpdatedTag] = useState({ ...tag });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // mode가 'create'인 경우 초기값을 빈 객체로 설정합니다.
        setUpdatedTag(mode === 'edit' ? { ...tag } : {});
    }, [tag, mode]);


    const handleCreateTag = async () => {
        try {
            // 태그 생성 로직
            const response = await axios.post('/api/admin/tags', updatedTag);
            const newTag = response.data;  // 이 부분 추가
            console.log('Tag created:', newTag);

            // 상위 컴포넌트의 태그 목록 상태 업데이트
            onUpdateTag(prevTags => [...prevTags, newTag]);
            onUpdateFilteredTags(prevFilteredTags => [...prevFilteredTags, newTag]);
            handleClose();
        } catch (error) {
            console.error('Error creating tag:', error);
            setErrorMessage('태그 생성에 실패했습니다.');
        }
    };

    // 전체 데이터 업데이트
    const handleUpdateTag = async () => {
        try {

            // 1. 전체 태그 데이터를 가져옵니다.
            const allTags = await axios.get('/api/admin/tags');
            const tagList = allTags.data;

            // 2. 중복 검사
            const duplicateSubject = tagList.some(tag => tag.id !== updatedTag.id && tag.subject === updatedTag.subject);

            if (duplicateSubject) {
                setErrorMessage('중복된 태그입니다.');
                return; // 중복이 있으므로 업데이트를 중단합니다.
            }

            let payload = { ...updatedTag };  // 정렬된 배열 사용

            const response = await axios.put(`/api/admin/tags/${updatedTag.id}`, payload);
            console.log('Tag updated:', response.data);
            onUpdateTag(updatedTag); // 수정된 사용자 정보 전달
            onUpdateFilteredTags(updatedTag); // 수정된 사용자 정보 업데이트
            handleClose(); // 모달 닫기
        } catch (error) {
            console.error('Error updating tag:', error);
            setErrorMessage('태그 정보 업데이트에 실패했습니다.');
        }
    };

    // DB에서 태그 삭제
    const handleDelete = async () => {
        const confirmDelete = window.confirm('해당 태그를 삭제하시겠습니까?');

        if (confirmDelete) {
            try {
                await axios.delete(`/api/admin/tags/${updatedTag.id}`);
                console.log('Tag deleted');

                // 부모 컴포넌트에서 전달된 업데이트 함수를 사용하여 상태를 업데이트합니다.
                onUpdateTag(prevTags => prevTags.filter(tag => tag.id !== updatedTag.id));
                onUpdateFilteredTags(prevFilteredTags => prevFilteredTags.filter(tag => tag.id !== updatedTag.id));


                onDeleteTag(tag.id);
                // 모달 닫기
                onClose();
            } catch (error) {
                console.error('Error deleting tag:', error);
            }
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedTag(prevTag => ({ ...prevTag, [name]: value }));
    };


    // 모달이 닫힐 때 실행될 로직 추가
    const handleClose = () => {
        setErrorMessage(''); // 에러 메시지 초기화
        onClose(); // 부모 컴포넌트로부터 전달받은 onClose 함수 호출
    }

    return (
        <Modal open={open} onClose={onClose}>
            <div className={adminTagEditModalStyle.modalContainer}>
                <TextField
                    label="태그 제목"
                    name="subject"
                    value={updatedTag.subject || ''}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />

                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                <div className={adminTagEditModalStyle.updateBtnContainer}>
                    <Button variant="outlined" color='error' onClick={handleClose}>
                        취소
                    </Button>
                    <Button variant="contained" color='primary' onClick={mode === 'edit' ? handleUpdateTag : handleCreateTag}>
                        {mode === 'edit' ? '수정' : '생성'}
                    </Button>
                    {mode === 'edit' && (
                        <Button variant="contained" color='error' onClick={handleDelete}>
                            삭제
                        </Button>
                    )}
                </div>
            </div>
        </Modal>
    );
}