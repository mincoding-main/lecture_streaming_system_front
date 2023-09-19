import React, { useState, useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import axios from 'axios';
import { useRouter } from 'next/router';
import adminLectureViewStyle from '@/styles/admin/lecture-view.module.css';
import adminCommonStyle from '@/styles/admin/common.module.css';
import SideNavBar from '@/components/admin/side-navbar';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';


export default function LectureView() {
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
        router.push(`/admin/lecture-management?id=${lecture.id}&mode=edit`);
    };

    const handleCreate = () => {
        router.push('/admin/lecture-management?mode=add');
    };

    const handleDeleteLecture = async (lecture) => {
        try {
            const response = await axios.delete(`/api/admin/lectures/${lecture.id}`);
            if (response.status === 200) {
                const updatedLectures = lectures.filter(l => l.id !== lecture.id);
                setLectures(updatedLectures);
            } else {
                console.error('Failed to delete the lecture');
            }
        } catch (error) {
            console.error('Error deleting lecture:', error);
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
                    <div className={adminLectureViewStyle.lectureCreateTitle}>
                        강의 관리
                    </div>
                    <div className={adminLectureViewStyle.lectureCreateContainer}>
                        <Button variant="outlined" className={adminLectureViewStyle.lectureCreateBtn} onClick={handleCreate}>
                            생성
                        </Button>
                        <div className={adminLectureViewStyle.lectureCreateEmptyAear}>
                        </div>
                    </div>
                    <div className={adminLectureViewStyle.lectureContainer}>
                        {lectures.slice(startIdx, endIdx).map(lecture => (
                            <div key={lecture.id} className={adminLectureViewStyle.lectureItem}>
                                <div className={adminLectureViewStyle.lectureInfo}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>{lecture.title}</Grid>
                                    </Grid>
                                </div>
                                <div className={adminLectureViewStyle.lectureEditBtn}>
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
                    <div className={adminLectureViewStyle.paginationContainer}>
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
