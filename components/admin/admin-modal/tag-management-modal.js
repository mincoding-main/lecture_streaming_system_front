import React, { useState, useEffect } from 'react';
import { createTag, fetchAllTags, updateTag, deleteTag } from '@/utils/api'
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import adminTagEditModalStyle from '@/styles/admin/tag-edit-modal.module.css'


export default function TagManagementModal({ open, onClose, tag, onUpdateTag, onDeleteTag, mode = 'edit', onAddTag }) {
    const [updatedTag, setUpdatedTag] = useState({ ...tag });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // mode가 'create'인 경우 초기값을 빈 객체로 설정합니다.
        setUpdatedTag(mode === 'edit' ? { ...tag } : {});
    }, [tag, mode]);


    const handleCreateTag = async () => {
        try {
            // 1. 전체 태그 데이터를 가져옵니다.
            const tagList = await fetchAllTags();

            // 2. 중복 검사
            const duplicateSubject = tagList.some(tag => tag.name === updatedTag.name);

            if (duplicateSubject) {
                setErrorMessage('중복된 태그입니다.');
                return; // 중복이 있으므로 생성을 중단합니다.
            }

            // 3. 태그 생성 로직
            const newTag = await createTag(updatedTag);

            onAddTag(newTag);
            // 4. 상위 컴포넌트의 태그 목록 상태 업데이트
            // onUpdateTag(prevTags => [...prevTags, newTag]);
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
            const tagList = await fetchAllTags();

            // 2. 중복 검사
            const duplicateSubject = tagList.some(tag => tag.id !== updatedTag.id && tag.name === updatedTag.name);

            if (duplicateSubject) {
                setErrorMessage('중복된 태그입니다.');
                return; // 중복이 있으므로 업데이트를 중단합니다.
            }

            let payload = { ...updatedTag };  // 정렬된 배열 사용

            await updateTag(updatedTag.id, payload);
            onUpdateTag(updatedTag); // 수정된 사용자 정보 전달
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
                await deleteTag(updatedTag.id);

                // 부모 컴포넌트에서 전달된 업데이트 함수를 사용하여 상태를 업데이트합니다.
                onUpdateTag(prevTags => prevTags.filter(tag => tag.id !== updatedTag.id));
                onUpdateTag(prevFilteredTags => prevFilteredTags.filter(tag => tag.id !== updatedTag.id));


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
        setUpdatedTag({});
        onClose(); // 부모 컴포넌트로부터 전달받은 onClose 함수 호출
    }

    return (
        <Modal open={open} onClose={onClose}>
            <div className={adminTagEditModalStyle.modalContainer}>
                <TextField
                    label="태그 제목"
                    name="name"
                    value={updatedTag.name || ''}
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