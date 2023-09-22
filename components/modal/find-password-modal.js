import React, { useState, useEffect } from 'react';
import mainModalStyle from '@/styles/main/main-modal.module.css'
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

export default function FindPasswordModal({ open, onClose, onPasswordRecovery, error }) {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);

    useEffect(() => {
        setEmail('');
        setMessage(null);
    }, [open]);

    const handleFindPassword = () => {
        if (email === '') {
            setMessage({ type: 'error', content: '이메일을 입력해주세요.' });
            return;
        }
        setMessage(null);
        onPasswordRecovery(email);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <div className={mainModalStyle.modal}>
                <div className={mainModalStyle.title}>
                    비밀번호 찾기
                </div>
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: '1rem', borderColor: message?.type === 'error' && message?.content?.includes('이메일') ? 'red' : undefined }}
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
                    <Button variant="outlined" onClick={handleFindPassword} className={mainModalStyle.bottomBtn}>
                        비밀번호 찾기
                    </Button>
                    <Button variant="outlined" color="error" onClick={onClose} className={mainModalStyle.bottomBtn}>
                        취소
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
