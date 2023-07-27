import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

export default function LoginModal({ open, onClose, onLogin, onJoinClick, onPasswordRecoveryClick, error }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);

    useEffect(() => {
        setEmail('');
        setPassword('');
        setMessage(null);
    }, [open]);


    const handleLogin = () => {
        if (email === '') {
            setMessage({ type: 'error', content: '이메일을 입력해주세요.' });
            return;
        }

        if (password === '') {
            setMessage({ type: 'error', content: '비밀번호를 입력해주세요.' });
            return;
        }

        setMessage(null);


        onLogin(email, password);
    };

    const handlePasswordRecovery = () => {
        onPasswordRecoveryClick(); // Call the function to open the FindPasswordModal in the header
    };

    const handleRegister = () => {
        onJoinClick(); // Call the function to open the JoinModal in the header
    };

    return (
        <>
            {/* 로그인 모달 */}
            <Modal open={open} onClose={onClose}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', width: '600px', height: 'auto', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px' }}>
                    <Typography variant="h5" component="div" sx={{ textAlign: 'center', marginBottom: '1rem' }}>
                        로그인
                    </Typography>
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                        fullWidth
                        sx={{ marginBottom: '1rem', borderColor: email === '' ? 'red' : undefined }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant="outlined"
                        fullWidth
                        sx={{ marginBottom: '1rem', borderColor: password === '' ? 'red' : undefined }}
                    />
                    {error && (
                        <Alert severity="error" sx={{ width: '560px', marginBottom: '1rem' }}>
                            {error}
                        </Alert>
                    )}
                    {message && (
                        <Alert severity={message.type} sx={{ width: '560px', marginBottom: '1rem' }}>
                            {message.content}
                        </Alert>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <Button variant="outlined" onClick={handleLogin} sx={{ width: '30%', marginTop: '1rem' }}>
                            로그인
                        </Button>
                        <Button variant="outlined" onClick={handlePasswordRecovery} sx={{ width: '30%', marginTop: '1rem' }}>
                            비밀번호 찾기
                        </Button>
                        <Button variant="outlined" onClick={handleRegister} sx={{ width: '30%', marginTop: '1rem' }}>
                            회원 가입
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
