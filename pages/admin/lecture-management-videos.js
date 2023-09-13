import React, { useState, useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import axios from 'axios';
import { useRouter } from 'next/router';
import adminLectureClassificaitonStyle from '@/styles/admin-lecture-classification.module.css';
import adminCommonStyle from '@/styles/admin-common.module.css';
import AdminSideNavBar from '@/components/admin-side-navbar';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';


export default function LectureClassification() {
    const router = useRouter();
    const [lectures, setLectures] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 8;
    const [selectedLecture, setSelectedLecture] = useState(null);

    useEffect(() => {
        const fetchLecture = async () => {
            try {
                // router.query.id에서 쿼리 파라미터로 들어오는 id를 가져옵니다.
                const id = router.query.id;
                if (id) {
                    const response = await axios.get(`/api/lectures/${id}`);
                    setLectures([response.data]); // 또는 다른 상태 변수를 사용


                }
            } catch (error) {
                console.error('Error fetching the lecture:', error);
            }
        };

        fetchLecture();
    }, [router.query.id]);  // router.query.id가 변경될 때마다 이 useEffect가 실행됩니다.



    const handleOpenLectureInfoPage = (video) => {
        setSelectedLecture(video);
        router.push(`/admin/lecture-management-video-manager?id=${router.query.id}&videoId=${video.id}&mode=edit`);  // 수정 모드로 LectureClassificationManager 페이지로 이동
    };

    const handleCreate = () => {
        router.push(`/admin/lecture-management-video-manager?id=${router.query.id}&videoId=${video.id}&mode=add`); // 생성 모드로 LectureClassificationManager 페이지로 이동
    };

    //page 업데이트
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // page 계산
    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const totalPages = Math.ceil(lectures.length / itemsPerPage);

    return (
        <>
            <Header />
            <section className={adminCommonStyle.backGroundSection}>
                <div className={adminCommonStyle.sideNavContainer}>
                    <AdminSideNavBar />
                </div>
                <div className={adminCommonStyle.mainContainer}>
                    <div className={adminLectureClassificaitonStyle.lectureCreateTitle}>
                        강의 비디오 관리
                    </div>
                    <div className={adminLectureClassificaitonStyle.lectureCreateContainer}>
                        <Button variant="outlined" className={adminLectureClassificaitonStyle.lectureCreateBtn} onClick={handleCreate}>
                            생성
                        </Button>
                        <div className={adminLectureClassificaitonStyle.lectureCreateEmptyAear}>
                        </div>
                    </div>
                    <div className={adminLectureClassificaitonStyle.lectureContainer}>
                        {lectures.slice(startIdx, endIdx).map(lecture => (
                            lecture.videos.map(video => (
                                <div key={video.id} className={adminLectureClassificaitonStyle.lectureItem}>
                                    <div className={adminLectureClassificaitonStyle.lectureInfo}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>{video.title}</Grid>
                                        </Grid>
                                    </div>
                                    <div className={adminLectureClassificaitonStyle.lectureEditBtn}>
                                        <Button variant="contained" onClick={() => handleOpenLectureInfoPage(video)}>
                                            수정
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ))}
                    </div>
                    <div className={adminLectureClassificaitonStyle.paginationContainer}>
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
