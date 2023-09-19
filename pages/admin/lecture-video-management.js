import React, { useState, useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import axios from 'axios';
import { useRouter } from 'next/router';
import adminLectureVideoManagementStyle from '@/styles/admin/lecture-video-management.module.css';
import adminCommonStyle from '@/styles/admin/common.module.css';
import SideNavBar from '@/components/admin/side-navbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


export default function LectureVideoManagement() {
    const router = useRouter();
    const { mode, id, videoId } = router.query;


    const [lectureTitle, setLectureTitle] = useState(mode === 'edit' ? '기존 강의명' : '');
    const [lectureUrl, setLectureUrl] = useState(mode === 'edit' ? '강의 링크' : '');

    useEffect(() => {
        const fetchLectureAndVideo = async () => {
            try {
                if (mode === 'edit' && id && videoId) {
                    const response = await axios.get(`/api/lectures/${id}/videos/${videoId}`);
                    setLectureTitle(response.data.title);
                    setLectureUrl(response.data.url);
                }
            } catch (error) {
                console.error('Error fetching the lecture:', error);
            }
        };

        if (mode === 'edit') {
            fetchLectureAndVideo();
        }
    }, [router.query.id, router.query.videoId, mode]);

    const handleSave = async () => {
        try {
            if (mode === 'edit') {
                const response = await axios.patch(`/api/lectures/${id}/videos/${videoId}`, {
                    title: lectureTitle,
                    url: lectureUrl,
                });
            } else {

                const response = await axios.post(`/api/lectures/${id}/videos`, {
                    title: lectureTitle,
                    url: lectureUrl,
                });
            }
            router.back();
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <>
            <Header />
            <section className={adminCommonStyle.backGroundSection}>
                <div className={adminCommonStyle.sideNavContainer}>
                    <SideNavBar />
                </div>
                <div className={adminCommonStyle.mainContainer}>
                    <div className={adminLectureVideoManagementStyle.lectureVideoTitle}>
                        강의 비디오 관리
                    </div>
                    <div className={adminLectureVideoManagementStyle.lectureVideoInsideContainer}>
                        <div className={adminLectureVideoManagementStyle.lectureVideoItemContainer}>
                            <div className={adminLectureVideoManagementStyle.lectureVideoInsideTitle}>{mode === 'edit' ? '강의 비디오 수정' : '강의 비디오 생성'} </div>
                            <TextField className={adminLectureVideoManagementStyle.lectureVideoTextField} label="강의명" value={lectureTitle} onChange={e => setLectureTitle(e.target.value)} />
                            <TextField className={adminLectureVideoManagementStyle.lectureVideoTextField} label="강의 링크" value={lectureUrl} onChange={e => setLectureUrl(e.target.value)} />
                            <div className={adminLectureVideoManagementStyle.lectureVideoBtnContainer}>
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
