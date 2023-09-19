import React, { useState, useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import axios from 'axios';
import { useRouter } from 'next/router';
import adminLectureVideoViewStyle from '@/styles/admin/lecture-video-view.module.css';
import adminCommonStyle from '@/styles/admin/common.module.css';
import SideNavBar from '@/components/admin/side-navbar';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';


export default function LectureVideoView() {
    const router = useRouter();
    const [lectures, setLectures] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchLecture = async () => {
            try {
                const id = router.query.id;
                if (id) {
                    const response = await axios.get(`/api/lectures/${id}`);
                    setLectures([response.data]);
                }
            } catch (error) {
                console.error('Error fetching the lecture:', error);
            }
        };

        fetchLecture();
    }, [router.query.id]);



    const handleOpenLectureInfoPage = (video) => {
        router.push(`/admin/lecture-video-management?id=${router.query.id}&videoId=${video.id}&mode=edit`);
    };

    const handleCreate = () => {
        router.push(`/admin/lecture-video-management?id=${router.query.id}&mode=add`);
    };


    const handleDeleteVideo = async (video) => {
        try {
            const id = router.query.id;
            await axios.delete(`/api/admin/lectures/${id}/videos/${video.id}`);

            const updatedLectures = lectures.map(lecture => {
                if (lecture.id === Number(id)) {
                    lecture.videos = lecture.videos.filter(v => v.id !== video.id);
                }
                return lecture;
            });
            setLectures(updatedLectures);
        } catch (error) {
            console.error('Error deleting the video:', error);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const totalPages = Math.ceil(lectures.length / itemsPerPage);

    return (
        <>
            <Header />
            <section className={adminCommonStyle.backGroundSection}>
                <div className={adminCommonStyle.sideNavContainer}>
                    <SideNavBar />
                </div>
                <div className={adminCommonStyle.mainContainer}>
                    <div className={adminLectureVideoViewStyle.lectureCreateTitle}>
                        강의 비디오 관리
                    </div>
                    <div className={adminLectureVideoViewStyle.lectureCreateContainer}>
                        <Button variant="outlined" className={adminLectureVideoViewStyle.lectureCreateBtn} onClick={handleCreate}>
                            생성
                        </Button>
                        <div className={adminLectureVideoViewStyle.lectureCreateEmptyAear}>
                        </div>
                    </div>
                    <div className={adminLectureVideoViewStyle.lectureContainer}>
                        {lectures.slice(startIdx, endIdx).map(lecture => (
                            lecture.videos.map(video => (
                                <div key={video.id} className={adminLectureVideoViewStyle.lectureItem}>
                                    <div className={adminLectureVideoViewStyle.lectureInfo}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>{video.title}</Grid>
                                        </Grid>
                                    </div>
                                    <div className={adminLectureVideoViewStyle.lectureEditBtn}>
                                        <Button variant="contained" onClick={() => handleOpenLectureInfoPage(video)}>
                                            수정
                                        </Button>
                                        <Button variant="contained" color='error' onClick={() => handleDeleteVideo(video)}>
                                            삭제
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ))}
                    </div>
                    <div className={adminLectureVideoViewStyle.paginationContainer}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handleChangePage}
                        />
                    </div>
                </div>
            </section >
            <Footer />
        </>
    );
}