import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

export default function LoginModal({ open, onClose, onLogin, error }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleLogin = () => {
        onLogin(email, password);
        setEmail(''); // 로그인 이후 초기화
        setPassword(''); // 로그인 이후 초기화
    };

    const handlePasswordRecovery = () => {
        setIsPasswordRecovery(true);
    };

    const handleRegister = () => {
        setIsRegister(true);
    };

    const handleClosePasswordRecoveryModal = () => {
        setIsPasswordRecovery(false);
    };

    const handleCloseRegisterModal = () => {
        setIsRegister(false);
    };


    return (
        <>
            {/* 로그인 모달 */}
            <Modal open={open} onClose={onClose}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', width: '500px', height: '400px', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px' }}>
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
                    {error ? (
                        <Alert severity="error" sx={{ marginBottom: '1rem', textAlign: 'center' }}>
                            {error}
                        </Alert>
                    ) : <div style={{ height: '3.5rem' }} />}
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <Button variant="contained" onClick={handleLogin} sx={{ width: '30%', marginTop: '1rem' }}>
                            로그인
                        </Button>
                        <Button variant="contained" onClick={handlePasswordRecovery} sx={{ width: '30%', marginTop: '1rem' }}>
                            비밀번호 찾기
                        </Button>
                        <Button variant="contained" onClick={handleRegister} sx={{ width: '30%', marginTop: '1rem' }}>
                            회원 가입
                        </Button>
                    </div>
                </div>

            </Modal>

            {/* <Modal open={isPasswordRecovery} onClose={handleClosePasswordRecoveryModal}>
            </Modal>

            <Modal open={isRegister} onClose={handleCloseRegisterModal}>
            </Modal> */}
        </>
    );
}
