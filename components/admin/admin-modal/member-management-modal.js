import React, { useState, useEffect } from 'react';
import { fetchAllMembers, fetchAllLectures, updateMember, deleteMember } from '@/utils/api';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import adminMemberEditModalStyle from '@/styles/admin/member-edit-modal.module.css'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';


export default function MemberManagementModal({ open, onClose, member, onUpdateMember, onUpdateFilteredMember, onDeleteMember }) {
    const [updatedMember, setUpdatedMember] = useState({ ...member, password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [lectures, setLectures] = useState([]);
    const [selectedLectures, setSelectedLectures] = useState(new Set());



    useEffect(() => {
        setUpdatedMember({ ...member, password: '' });
    }, [member])

    // 전체 강의 가져오기
    useEffect(() => {
        const fetchLectures = async () => {
            const data = await fetchAllLectures();
            setLectures(data);
            if (member && member.lectureId) {
                setSelectedLectures(new Set(member.lectureId));
            } else {
                setSelectedLectures(new Set());
            }
        };
        fetchLectures();
    }, [member]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedMember(prevMember => ({ ...prevMember, [name]: value }));
    };

    // 유저권한 업데이트
    const handleRadioChange = (event) => {
        const { name, value } = event.target;
        const boolValue = value === 'true'; // 문자열을 불리언으로 변환
        setUpdatedMember(prevMember => ({ ...prevMember, [name]: boolValue }));
    };


    // 삭제 대기 업데이트
    const handleDeleteRadioChange = (event) => {
        const { value } = event.target;
        setUpdatedMember(prevMember => ({ ...prevMember, isDeleted: parseInt(value, 10) }));
    };

    // DB에서 유저 삭제
    const handleDelete = async () => {
        const confirmDelete = window.confirm('해당 사용자를 삭제하시겠습니까?');

        if (confirmDelete) {
            try {
                await deleteMember(updatedMember.id);
                onUpdateMember(prevMembers => prevMembers.filter(member => member.id !== updatedMember.id));
                onUpdateFilteredMember(prevFilteredMembers => prevFilteredMembers.filter(member => member.id !== updatedMember.id));
                onDeleteMember(member.id);
                onClose();
            } catch (error) {
                console.error('Error deleting Member:', error);
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
        setUpdatedMember(prevMember => ({ ...prevMember, lectureId: sortedLectures }));
    };

    // 전체 데이터 업데이트
    const handleUpdateMember = async () => {
        try {
            // 1. 전체 유저 데이터를 가져옵니다.
            const memberList = await fetchAllMembers();

            // 2. 중복 검사
            const duplicateEmail = memberList.some(member => member.id !== updatedMember.id && member.email === updatedMember.email);
            const duplicateEmployeeNumber = memberList.some(member => member.id !== updatedMember.id && member.employeeNumber === updatedMember.employeeNumber);

            if (duplicateEmail || duplicateEmployeeNumber) {
                setErrorMessage('중복된 이메일 또는 사번입니다.');
                return; // 중복이 있으므로 업데이트를 중단합니다.
            }

            const sortedLectures = Array.from(selectedLectures).sort((a, b) => a - b); // 정렬
            let payload = { ...updatedMember, lectureId: sortedLectures };  // 정렬된 배열 사용


            // 비밀번호가 빈 문자열인 경우 해당 필드를 제외합니다.
            if (!updatedMember.password) {
                const { password, ...rest } = updatedMember;
                payload = { ...rest, lectureId: sortedLectures };  // 정렬된 배열 사용
            }

            await updateMember(updatedMember.id, payload);
            onUpdateMember(updatedMember); // 수정된 사용자 정보 전달
            onUpdateFilteredMember(updatedMember); // 수정된 사용자 정보 업데이트
            handleClose(); // 모달 닫기
        } catch (error) {
            console.error('Error updating Member:', error);
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
                    value={updatedMember.email || ''}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="사번"
                    name="employeeNumber"
                    value={updatedMember.employeeNumber || ''}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="새로운 비밀번호"
                    name="password"
                    value={updatedMember.password || ''}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <FormControl component="fieldset" margin="normal" fullWidth>
                    <FormLabel component="legend">유저 권한</FormLabel>
                    <RadioGroup
                        name="role"
                        value={String(updatedMember.role)} // 불리언을 문자열로 변환
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
                            value={String(updatedMember.isDeleted)} // 불리언을 문자열로 변환
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
                    <Button variant="contained" color='primary' onClick={handleUpdateMember}>
                        수정 완료
                    </Button>
                </div>
            </div>


        </Modal>
    );
}