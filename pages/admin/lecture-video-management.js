import React, { useState, useEffect } from 'react';
import { fetchLectureVideo, updateLectureVideo, createLectureVideo } from '@/utils/api'
import { useRouter } from 'next/router';
import { useAuthCheck } from '@/utils/auth-check'
import adminLectureVideoManagementStyle from '@/styles/admin/lecture-video-management.module.css';
import adminCommonStyle from '@/styles/admin/common.module.css';
import SideNavBar from '@/components/admin/side-navbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


export default function LectureVideoManagement() {
    const router = useRouter();
    const { mode, id, videoId } = router.query;
    const [lectureTitle, setLectureTitle] = useState('');
    const [lectureUrl, setLectureUrl] = useState('');

    useAuthCheck(true, true, false);

    useEffect(() => {
        const fetchLectureAndVideo = async () => {
            try {
                if (mode === 'edit' && id && videoId) {
                    const data = await fetchLectureVideo(id, videoId);
                    setLectureTitle(data.title);
                    setLectureUrl(data.video.src);
                }
            } catch (error) {
                console.error('Error fetching the lecture:', error);
            }
        };

        if (mode === 'edit') {
            fetchLectureAndVideo();
        }
    }, [id, videoId, mode]);




    const handleSave = async () => {
        try {
            if (mode === 'edit') {
                await updateLectureVideo(id, videoId, {
                    title: lectureTitle,
                    url: lectureUrl,
                });
            } else {
                await createLectureVideo(id, {
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
        </>
    );
}
