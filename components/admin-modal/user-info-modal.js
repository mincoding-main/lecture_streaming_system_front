import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';



export default function AdminUserInfoModal({ open, onClose, user, onUpdateUser, onUpdateFilteredUsers }) {
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
            const allUsers = await axios.get('/api/users');
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

            const response = await axios.put(`/api/admin/users/${updatedUser.id}`, payload);
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
            <div style={{ position: 'absolute', top: '50%', left: '50%', width: '600px', height: 'auto', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px' }}>
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


                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button variant="outlined" color='error' onClick={handleClose} sx={{ width: '30%', marginTop: '1rem' }}>
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