import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import axios from 'axios';

export default function AdminUserInfoModal({ open, onClose, user, onUpdateUser, onUpdateFilteredUsers }) {
    const [updatedUser, setUpdatedUser] = useState({ ...user });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setUpdatedUser({ ...user });
        setErrorMessage('');
    }, [user])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleUpdateUser = async () => {
        try {
            const response = await axios.put(`/api/admin/users/${updatedUser.id}`, updatedUser);
            console.log('User updated:', response.data);
            onUpdateUser(updatedUser); // 수정된 사용자 정보 전달
            onUpdateFilteredUsers(updatedUser); // 수정된 사용자 정보 업데이트
            onClose(); // 모달 닫기
        } catch (error) {
            console.error('Error updating user:', error);
            setErrorMessage('사용자 정보 업데이트에 실패했습니다.');
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', width: '600px', height: 'auto', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px' }}>
                <TextField
                    label="이메일"
                    name="email"
                    value={updatedUser.email}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="사번"
                    name="employeeId"
                    value={updatedUser.employeeId}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                {/* ... 나머지 사용자 정보 입력 필드 ... */}
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button variant="outlined" color='error' onClick={onClose} sx={{ width: '30%', marginTop: '1rem' }}>
                        취소
                    </Button>
                    <Button variant="contained" color='primary' onClick={handleUpdateUser} sx={{ width: '30%', marginTop: '1rem' }}>
                        수정 완료
                    </Button>
                </div>
            </div>
        </Modal>
    );
}