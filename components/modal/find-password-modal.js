import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
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
            <div style={{ position: 'absolute', top: '50%', left: '50%', width: '600px', height: 'auto', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px' }}>
                <Typography variant="h5" component="div" sx={{ textAlign: 'center', marginBottom: '1rem' }}>
                    비밀번호 찾기
                </Typography>
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
                    <Alert severity="error" sx={{ width: '560px', marginBottom: '1rem' }}>
                        {error}
                    </Alert>
                )}
                {message && (
                    <Alert severity={message.type} sx={{ width: '560px', marginBottom: '1rem' }}>
                        {message.content}
                    </Alert>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                    <Button variant="outlined" onClick={handleFindPassword} sx={{ width: '30%', marginTop: '1rem' }}>
                        비밀번호 찾기
                    </Button>
                    <Button variant="outlined" color="error" onClick={onClose} sx={{ width: '30%', marginTop: '1rem' }}>
                        취소
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
