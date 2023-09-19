import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import adminMemberEditModalStyle from '@/styles/admin/member-edit-modal.module.css'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';




export default function UserManagementModal({ open, onClose, user, onUpdateUser, onUpdateFilteredUsers, onDeleteUser }) {
    const [updatedUser, setUpdatedUser] = useState({ ...user, password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [lectures, setLectures] = useState([]);
    const [selectedLectures, setSelectedLectures] = useState(new Set());



    useEffect(() => {
        setUpdatedUser({ ...user, password: '' });
    }, [user])

    // 전체 강의 가져오기
    useEffect(() => {
        const fetchLectures = async () => {
            const response = await axios.get('/api/lectures');
            setLectures(response.data);
            if (user && user.lectureId) {
                setSelectedLectures(new Set(user.lectureId));
            } else {
                setSelectedLectures(new Set()); // empty set if user or user.lectureId is null
            }
        };
        fetchLectures();
    }, [user]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    // 유저권한 업데이트
    const handleRadioChange = (event) => {
        const { name, value } = event.target;
        const boolValue = value === 'true'; // 문자열을 불리언으로 변환
        setUpdatedUser(prevUser => ({ ...prevUser, [name]: boolValue }));
    };


    // 삭제 대기 업데이트
    const handleDeleteRadioChange = (event) => {
        const { value } = event.target;
        setUpdatedUser(prevUser => ({ ...prevUser, isDeleted: parseInt(value, 10) }));
    };

    // DB에서 유저 삭제
    const handleDelete = async () => {
        const confirmDelete = window.confirm('해당 사용자를 삭제하시겠습니까?');

        if (confirmDelete) {
            try {
                await axios.delete(`/api/admin/members/${updatedUser.id}`);
                console.log('User deleted');

                // 부모 컴포넌트에서 전달된 업데이트 함수를 사용하여 상태를 업데이트합니다.
                onUpdateUser(prevUsers => prevUsers.filter(user => user.id !== updatedUser.id));
                onUpdateFilteredUsers(prevFilteredUsers => prevFilteredUsers.filter(user => user.id !== updatedUser.id));


                onDeleteUser(user.id);
                // 모달 닫기
                onClose();
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };


    // 강의 종류 업데이트
    const handleCheckboxChange = (e) => {
        const lectureId = parseInt(e.target.name);
        const newSelectedLectures = new Set(selectedLectures);
        if (newSelectedLectures.has(lectureId)) {
            newSelectedLectures.delete(lectureId);
        } else {
            newSelectedLectures.add(lectureId);
        }
        const sortedLectures = Array.from(newSelectedLectures).sort((a, b) => a - b);
        setSelectedLectures(new Set(sortedLectures));
        setUpdatedUser(prevUser => ({ ...prevUser, lectureId: sortedLectures }));
    };

    // 전체 데이터 업데이트
    const handleUpdateUser = async () => {
        try {

            // 1. 전체 유저 데이터를 가져옵니다.
            const allUsers = await axios.get('/api/members');
            const userList = allUsers.data;

            // 2. 중복 검사
            const duplicateEmail = userList.some(user => user.id !== updatedUser.id && user.email === updatedUser.email);
            const duplicateEmployeeId = userList.some(user => user.id !== updatedUser.id && user.employeeId === updatedUser.employeeId);

            if (duplicateEmail || duplicateEmployeeId) {
                setErrorMessage('중복된 이메일 또는 사번입니다.');
                return; // 중복이 있으므로 업데이트를 중단합니다.
            }

            const sortedLectures = Array.from(selectedLectures).sort((a, b) => a - b); // 정렬
            let payload = { ...updatedUser, lectureId: sortedLectures };  // 정렬된 배열 사용


            // 비밀번호가 빈 문자열인 경우 해당 필드를 제외합니다.
            if (!updatedUser.password) {
                const { password, ...rest } = updatedUser;
                payload = { ...rest, lectureId: sortedLectures };  // 정렬된 배열 사용
            }

            const response = await axios.put(`/api/admin/members/${updatedUser.id}`, payload);
            console.log('User updated:', response.data);
            onUpdateUser(updatedUser); // 수정된 사용자 정보 전달
            onUpdateFilteredUsers(updatedUser); // 수정된 사용자 정보 업데이트
            handleClose(); // 모달 닫기
        } catch (error) {
            console.error('Error updating user:', error);
            setErrorMessage('사용자 정보 업데이트에 실패했습니다.');
        }
    };

    // 모달이 닫힐 때 실행될 로직 추가
    const handleClose = () => {
        setErrorMessage(''); // 에러 메시지 초기화
        onClose(); // 부모 컴포넌트로부터 전달받은 onClose 함수 호출
    }

    return (
        <Modal open={open} onClose={onClose}>
            <div className={adminMemberEditModalStyle.modalContainer}>
                <TextField
                    label="이메일"
                    name="email"
                    value={updatedUser.email || ''}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="사번"
                    name="employeeId"
                    value={updatedUser.employeeId || ''}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="새로운 비밀번호"
                    name="password"
                    value={updatedUser.password || ''}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <FormControl component="fieldset" margin="normal" fullWidth>
                    <FormLabel component="legend">유저 권한</FormLabel>
                    <RadioGroup
                        name="isAdmin"
                        value={String(updatedUser.isAdmin)} // 불리언을 문자열로 변환
                        onChange={handleRadioChange}
                        row
                    >
                        <FormControlLabel value="true" control={<Radio />} label="관리자" />
                        <FormControlLabel value="false" control={<Radio />} label="사용자" />
                    </RadioGroup>
                </FormControl>
                <FormControl component="fieldset" margin="normal" fullWidth>
                    <FormLabel component="legend">강의 종류</FormLabel>
                    {lectures.map((lecture) => (
                        <FormControlLabel
                            key={lecture.id}
                            control={
                                <Checkbox
                                    checked={selectedLectures.has(lecture.id)}
                                    onChange={handleCheckboxChange}
                                    name={String(lecture.id)}
                                />
                            }
                            label={lecture.title}
                        />
                    ))}
                </FormControl>
                <div className={adminMemberEditModalStyle.deleteContainer}>
                    <FormControl component="fieldset" margin="normal">
                        <FormLabel component="legend">삭제 대기</FormLabel>
                        <RadioGroup
                            name="isDeleted"
                            value={String(updatedUser.isDeleted)} // 불리언을 문자열로 변환
                            onChange={handleDeleteRadioChange}
                            row
                        >
                            <FormControlLabel value="0" control={<Radio />} label="일반 유저" />
                            <FormControlLabel value="1" control={<Radio />} label="삭제 대기자" />
                        </RadioGroup>
                    </FormControl>
                    <IconButton aria-label="delete" color="error" onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                </div>



                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                <div className={adminMemberEditModalStyle.updateBtnContainer}>
                    <Button variant="outlined" color='error' onClick={handleClose} >
                        취소
                    </Button>
                    <Button variant="contained" color='primary' onClick={handleUpdateUser}>
                        수정 완료
                    </Button>
                </div>
            </div>


        </Modal>
    );
}