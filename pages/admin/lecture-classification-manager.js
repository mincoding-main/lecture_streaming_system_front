import React, { useState, useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import axios from 'axios';
import { useRouter } from 'next/router';
import adminLectureClassificaitonManagerStyle from '@/styles/admin-lecture-classification-manager.module.css';
import adminCommonStyle from '@/styles/admin-common.module.css';
import AdminSideNavBar from '@/components/admin-side-navbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function LectureClassificationManager() {
    const router = useRouter();
    const { mode } = router.query;


    const [lectureTitle, setLectureTitle] = useState(mode === 'edit' ? '기존 강의명' : '');
    const [lectureDescription, setLectureDescription] = useState(mode === 'edit' ? '기존 강의 소개' : '');
    const [permissions, setPermissions] = useState('user');

    // 가정: 수정 모드일 때 기존 데이터를 불러옵니다.
    useEffect(() => {
        const fetchLectureAndVideo = async () => {
            try {
                // router.query에서 쿼리 파라미터로 들어오는 id와 videoId를 가져옵니다.
                const id = router.query.id;

                if (mode === 'edit' && id) {
                    // mode가 'edit'이고 두 id가 모두 있을 때만 API 요청을 수행합니다.
                    const response = await axios.get(`/api/admin/lectures/${id}`);
                    // 상태를 업데이트합니다.
                    setLectureTitle(response.data.title);
                    setLectureDescription(response.data.description);
                    // 또는 다른 상태 변수를 사용할 수 있습니다.
                }
            } catch (error) {
                console.error('Error fetching the lecture:', error);
            }
        };

        // mode가 'edit'인 경우에만 API 요청을 수행합니다.
        if (mode === 'edit') {
            fetchLectureAndVideo();
        }
    }, [router.query.id, mode]);

    const handleCancel = () => {
        router.back();  // 이전 페이지로 이동
    };

    return (
        <>
            <Header />
            <section className={adminCommonStyle.backGroundSection}>
                <div className={adminCommonStyle.sideNavContainer}>
                    <AdminSideNavBar />
                </div>
                <div className={adminCommonStyle.mainContainer}>
                    <div className={adminLectureClassificaitonManagerStyle.lectureCreateTitle}>
                        강의 분류
                    </div>
                    <div className={adminLectureClassificaitonManagerStyle.lectureInsideContainer}>

                        <div className={adminLectureClassificaitonManagerStyle.lectureItemContainer}>
                            <div className={adminLectureClassificaitonManagerStyle.lectureInsideTitle}>{mode === 'edit' ? '분류 수정' : '분류 생성'} </div>
                            <TextField className={adminLectureClassificaitonManagerStyle.lectureTextField} label="강의명" value={lectureTitle} onChange={e => setLectureTitle(e.target.value)} />
                            <TextField className={adminLectureClassificaitonManagerStyle.lectureTextField} label="강의 소개" value={lectureDescription} onChange={e => setLectureDescription(e.target.value)} />
                            <FormControl className={adminLectureClassificaitonManagerStyle.lectureFormControlContainer} component="fieldset" margin="normal">
                                <FormLabel component="legend">유저 권한</FormLabel>
                                <RadioGroup
                                    name="permissions"
                                    value={permissions}
                                    onChange={(e) => setPermissions(e.target.value)}

                                >
                                    <FormControlLabel value="user" control={<Radio />} label="User" />
                                    <FormControlLabel value="manager" control={<Radio />} label="Manager" />
                                    <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                                </RadioGroup>
                            </FormControl>
                            <div className={adminLectureClassificaitonManagerStyle.lectureBtnContainer}>
                                <Button variant="outlined" color="error" onClick={handleCancel}>
                                    취소
                                </Button>

                                <Button variant="outlined" color="primary">
                                    {mode === 'edit' ? '수정' : '생성'}
                                </Button>

                            </div>
                        </div>

                    </div>

                </div>
            </section >
            <Footer />
        </>
    );
}
