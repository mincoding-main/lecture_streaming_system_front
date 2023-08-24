import React, { useState, useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import dashBoardStyle from '@/styles/dash-board.module.css';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';

export default function ProfileUpdate() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [employeeId, setEmployeeId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const fetchUserAndLectureData = async () => {
        try {
            const user = JSON.parse(sessionStorage.getItem('user'));
            const userId = user && user.id;
            const userResponse = await axios.get(`/api/users/${userId}`);
            const userData = userResponse.data;
            setUser(userData);
            setEmployeeId(userData.employeeId);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    useEffect(() => {
        fetchUserAndLectureData();
    }, []);

    const handleUpdateProfile = async () => {
        try {
            if (password !== confirmPassword) {
                setMessage({ type: 'error', content: '비밀번호와 비밀번호 확인이 일치하지 않습니다.' });
                return;
            }

            const response = await axios.put(`/api/users/${user.id}`, { employeeId, password });
            setMessage({ type: 'success', content: '프로필이 업데이트되었습니다.' });
        } catch (error) {
            setMessage({ type: 'error', content: '프로필 업데이트에 실패했습니다.' });
        }
    };

    return (
        <>
            <Header />
            <section className={dashBoardStyle.dashBoardTop}>
                <div className={dashBoardStyle.dashBoardBtnBar}>
                    <Button
                        variant="contained"
                        className={dashBoardStyle.dashBoardBtn}
                        onClick={() => router.push('/dash-board/lecture-list')}
                    >
                        강의 목록
                    </Button>
                    <Button
                        variant="contained"
                        className={dashBoardStyle.dashBoardBtn}
                        onClick={() => router.push('/dash-board/profile-update')}
                    >
                        내 정보 수정
                    </Button>
                </div>
            </section>

            <section className={dashBoardStyle.dashBoardView}>
                <div className={dashBoardStyle.sectionTitle}>내 정보 수정</div>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    height="100%"
                    width={"50%"}
                    margin={"3rem auto"}
                    padding={"3rem"}
                    borderRadius={"0.6rem"}
                    sx={{ backgroundColor: '#62b1ff2e' }}
                >
                    <div>
                        <TextField
                            label="Email"
                            value={user?.email}
                            disabled
                            fullWidth
                            sx={{ marginBottom: '1rem' }}
                            InputLabelProps={{ shrink: true }}
                        />
                    </div>
                    <div>
                        <TextField
                            label="새로운 비밀번호"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            sx={{ marginBottom: '1rem' }}
                        />
                    </div>
                    <div>
                        <TextField
                            label="새로운 비밀번호 확인"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            fullWidth
                            sx={{ marginBottom: '1rem' }}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Employee ID (사번)"
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                            fullWidth
                            sx={{ marginBottom: '1rem' }}
                        />
                    </div>
                    {message && (
                        <div style={{ marginBottom: '1rem', color: message.type === 'error' ? 'red' : 'green' }}>
                            {message.content}
                        </div>
                    )}
                    <div>
                        <Button variant="contained" onClick={handleUpdateProfile}>
                            프로필 수정
                        </Button>
                    </div>
                </Box>
            </section>
            <Footer />
        </>
    );
}
