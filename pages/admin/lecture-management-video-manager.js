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
    const { mode, id, videoId } = router.query;


    const [lectureTitle, setLectureTitle] = useState(mode === 'edit' ? '기존 강의명' : '');
    const [lectureUrl, setLectureUrl] = useState(mode === 'edit' ? '강의 링크' : '');
    const [permissions, setPermissions] = useState('user');

    useEffect(() => {
        const fetchLectureAndVideo = async () => {
            try {
                if (mode === 'edit' && id && videoId) {
                    // mode가 'edit'이고 두 id가 모두 있을 때만 API 요청을 수행합니다.
                    const response = await axios.get(`/api/admin/lectures/${id}/videos/${videoId}`);
                    // 상태를 업데이트합니다.
                    setLectureTitle(response.data.title);
                    setLectureUrl(response.data.url);
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
    }, [router.query.id, router.query.videoId, mode]);  // router.query.id나 router.query.videoId 또는 mode가 변경될 때마다 이 useEffect가 실행됩니다.

    const handleSave = async () => {
        try {
            if (mode === 'edit') {
                // 수정 모드인 경우 PATCH 요청을 보냅니다.
                const response = await axios.patch(`/api/admin/lectures/${id}/videos/${videoId}`, {
                    title: lectureTitle,
                    url: lectureUrl,
                    // 여기에 다른 필드를 추가할 수 있습니다.
                });
                console.log('Successfully updated:', response.data);
            } else {
                // 생성 모드인 경우 POST 요청을 보냅니다.
                const response = await axios.post(`/api/admin/lectures/${id}/videos`, {
                    title: lectureTitle,
                    url: lectureUrl,
                    // 여기에 다른 필드를 추가할 수 있습니다.
                });
                console.log('Successfully created:', response.data);
            }
            router.back(); // 성공적으로 작업을 완료한 후 이전 페이지로 이동
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

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
                        강의 비디오 관리
                    </div>
                    <div className={adminLectureClassificaitonManagerStyle.lectureInsideContainer}>

                        <div className={adminLectureClassificaitonManagerStyle.lectureItemContainer}>
                            <div className={adminLectureClassificaitonManagerStyle.lectureInsideTitle}>{mode === 'edit' ? '강의 비디오 수정' : '강의 비디오 생성'} </div>
                            <TextField className={adminLectureClassificaitonManagerStyle.lectureTextField} label="강의명" value={lectureTitle} onChange={e => setLectureTitle(e.target.value)} />
                            <TextField className={adminLectureClassificaitonManagerStyle.lectureTextField} label="강의 링크" value={lectureUrl} onChange={e => setLectureUrl(e.target.value)} />
                            {/* <FormControl className={adminLectureClassificaitonManagerStyle.lectureFormControlContainer} component="fieldset" margin="normal">
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
                            </FormControl> */}
                            <div className={adminLectureClassificaitonManagerStyle.lectureBtnContainer}>
                                <Button variant="outlined" color="error" onClick={handleCancel}>
                                    취소
                                </Button>

                                <Button variant="outlined" color="primary" onClick={handleSave}>
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
