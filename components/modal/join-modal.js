import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

export default function JoinModal({ open, onClose, onJoin, users }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [message, setMessage] = useState(null);
    const [isDuplicateChecked, setIsDuplicateChecked] = useState(false);

    // useEffect를 사용하여 email 값이 변할 때마다 중복확인 플래그 변경
    useEffect(() => {
        setIsDuplicateChecked(false);
        setMessage(null);
    }, [email]);

    // useEffect를 사용하여 모달이 열릴 때마다 입력 상태 초기화
    useEffect(() => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setEmployeeId('');
        setMessage(null);
        setIsDuplicateChecked(false);
    }, [open]);

    // 중복확인 버튼 클릭 시 호출되는 함수
    const handleDuplicateCheck = () => {
        // Check if the entered email already exists in the users array
        const isDuplicate = users.some((user) => user.email === email);
        if (isDuplicate) {
            setMessage({ type: 'error', content: '이미 존재하는 이메일입니다.' });
        } else {
            setMessage({ type: 'info', content: '중복된 이메일이 없습니다.' });
            setIsDuplicateChecked(true);
        }
    };

    const handleJoin = () => {
        // Validation checks before joining
        if (email === '') {
            setMessage({ type: 'error', content: '이메일을 입력해주세요.' });
            return;
        }

        if (!isDuplicateChecked) { // 중복확인을 하지 않았을 때의 에러 처리
            setMessage({ type: 'error', content: '중복확인을 먼저 해주세요.' });
            return;
        }

        if (password === '') {
            setMessage({ type: 'error', content: '비밀번호를 입력해주세요.' });
            return;
        }

        if (confirmPassword === '') {
            setMessage({ type: 'error', content: '비밀번호 확인을 입력해주세요.' });
            return;
        }

        if (password !== confirmPassword) {
            setMessage({ type: 'error', content: '비밀번호와 비밀번호 확인이 일치하지 않습니다.' });
            return;
        }

        if (employeeId === '') { // 사번을 입력하지 않으면 에러 처리
            setMessage({ type: 'error', content: '사번을 입력해주세요.' });
            return;
        }

        setMessage(null); // Clear the message when there are no errors

        // Call the function to handle join logic in the header
        onJoin(email, password, employeeId);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', width: '600px', height: 'auto', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px' }}>
                <Typography variant="h5" component="div" sx={{ textAlign: 'center', marginBottom: '1rem' }}>
                    회원 가입
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                        fullWidth
                        sx={{ borderColor: message?.type === 'error' && message?.content?.includes('이메일') ? 'red' : undefined, flex: 1 }}
                    />
                    {/* 추가된 중복 확인 버튼 */}
                    <Button variant="outlined" onClick={handleDuplicateCheck} sx={{ marginLeft: '1rem', height: '55px' }}>
                        중복 확인
                    </Button>
                </div>
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: '1rem', borderColor: message?.type === 'error' && message?.content?.includes('비밀번호') ? 'red' : undefined, height: '55px' }}
                />
                <TextField
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: '1rem', borderColor: message?.type === 'error' && message?.content?.includes('비밀번호 확인') ? 'red' : undefined, height: '55px' }}
                />
                <TextField
                    label="Employee ID (사번)"
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: '1rem', borderColor: message?.type === 'error' && message?.content?.includes('사번') ? 'red' : undefined, height: '55px' }}
                />
                {/* 중복된 이메일 여부에 따른 정보 또는 에러 메시지 */}
                {message && (
                    <Alert severity={message.type} sx={{ marginBottom: '1.3rem', textAlign: 'center' }}>
                        {message.content}
                    </Alert>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button variant="outlined" onClick={handleJoin} sx={{ width: '30%', marginTop: '1rem' }}>
                        회원 가입
                    </Button>
                    <Button variant="outlined" color='error' onClick={onClose} sx={{ width: '30%', marginTop: '1rem' }}>
                        취소
                    </Button>
                </div>
            </div>
        </Modal>
    );
}