import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import mainModalStyle from '@/styles/main/main-modal.module.css';
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
        onPasswordRecoveryClick();
    };

    const handleRegister = () => {
        onJoinClick();
    };

    return (
        <>
            <Modal open={open} onClose={onClose}>
                <div className={mainModalStyle.modal}>
                    <div className={mainModalStyle.title}>
                        로그인
                    </div>
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                        fullWidth
                        sx={{ marginBottom: '1rem', borderColor: email === '' ? 'red' : undefined }}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                handleLogin();
                            }
                        }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant="outlined"
                        fullWidth
                        sx={{ marginBottom: '1rem', borderColor: password === '' ? 'red' : undefined }}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                handleLogin();
                            }
                        }}
                    />
                    {error && (
                        <Alert severity="error" className={mainModalStyle.alert}>
                            {error}
                        </Alert>
                    )}
                    {message && (
                        <Alert severity={message.type} className={mainModalStyle.alert}>
                            {message.content}
                        </Alert>
                    )}
                    <div className={mainModalStyle.bottomBtnContainer}>
                        <Button variant="outlined" onClick={handleLogin} className={mainModalStyle.bottomBtn}>
                            로그인
                        </Button>
                        <Button variant="outlined" onClick={handlePasswordRecovery} className={mainModalStyle.bottomBtn}>
                            비밀번호 찾기
                        </Button>
                        <Button variant="outlined" onClick={handleRegister} className={mainModalStyle.bottomBtn}>
                            회원 가입
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
