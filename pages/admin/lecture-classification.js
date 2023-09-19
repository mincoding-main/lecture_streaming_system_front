import React, { useState, useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import axios from 'axios';
import { useRouter } from 'next/router';
import adminLectureClassificaitonStyle from '@/styles/admin/lecture-classification.module.css';
import adminCommonStyle from '@/styles/admin/common.module.css';
import AdminSideNavBar from '@/components/admin-side-navbar';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';


export default function LectureClassification() {
    const router = useRouter();
    const [lectures, setLectures] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchLectures = async () => {
            try {
                const response = await axios.get('/api/lectures');
                setLectures(response.data);
            } catch (error) {
                console.error('Error fetching lectures:', error);
            }
        };

        fetchLectures();
    }, []);


    const handleOpenLectureInfoPage = (lecture) => {
        router.push(`/admin/lecture-classification-manager?id=${lecture.id}&mode=edit`);  // 수정 모드로 LectureClassificationManager 페이지로 이동
    };

    const handleCreate = () => {
        router.push('/admin/lecture-classification-manager?mode=add'); // 생성 모드로 LectureClassificationManager 페이지로 이동
    };

    const handleDeleteLecture = async (lecture) => {
        try {
            const response = await axios.delete(`/api/admin/lectures/${lecture.id}`);
            if (response.status === 200) {
                // 성공적으로 삭제되면, 해당 강의를 상태에서도 제거
                const updatedLectures = lectures.filter(l => l.id !== lecture.id);
                setLectures(updatedLectures);
            } else {
                console.error('Failed to delete the lecture');
            }
        } catch (error) {
            console.error('Error deleting lecture:', error);
        }
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
                        강의 관리
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
                            <div key={lecture.id} className={adminLectureClassificaitonStyle.lectureItem}>
                                <div className={adminLectureClassificaitonStyle.lectureInfo}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>{lecture.title}</Grid>
                                    </Grid>
                                </div>
                                <div className={adminLectureClassificaitonStyle.lectureEditBtn}>
                                    <Button variant="contained" onClick={() => handleOpenLectureInfoPage(lecture)}>
                                        수정
                                    </Button>
                                    <Button variant="contained" color='error' onClick={() => handleDeleteLecture(lecture)}>
                                        삭제
                                    </Button>
                                </div>
                            </div>
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
