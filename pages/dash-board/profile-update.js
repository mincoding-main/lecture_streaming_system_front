import React, { useState, useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import dashBoardStyle from '@/styles/main/dash-board.module.css';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';

export default function ProfileUpdate() {
    const router = useRouter();
    const [member, setMember] = useState(null);
    const [employeeId, setEmployeeId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const fetchMemberAndLectureData = async () => {
        try {
            const member = JSON.parse(sessionStorage.getItem('member'));
            const memberId = member && member.id;
            const memberResponse = await axios.get(`/api/members/${memberId}`);
            const memberData = memberResponse.data;
            setMember(memberData);
            setEmployeeId(memberData.employeeId);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    useEffect(() => {
        fetchMemberAndLectureData();
    }, []);

    const handleUpdateProfile = () => {
        const isConfirmed = window.confirm('프로필을 업데이트하시겠습니까?');

        if (isConfirmed) {
            if (password !== confirmPassword) {
                setMessage({ type: 'error', content: '비밀번호와 비밀번호 확인이 일치하지 않습니다.' });
                return;
            }

            axios
                .put(`/api/members/${member.id}`, { employeeId, password })
                .then((response) => {
                    setMessage({ type: 'success', content: '프로필이 업데이트되었습니다.' });
                })
                .catch((error) => {
                    setMessage({ type: 'error', content: '프로필 업데이트에 실패했습니다.' });
                });
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
                        <div style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'black' }}>내 정보 수정</div>
                    </div>
                    <div>
                        <TextField
                            label="Email"
                            value={member?.email}
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
                            수정
                        </Button>
                    </div>
                </Box>
            </section>
            <Footer />
        </>
    );
}
