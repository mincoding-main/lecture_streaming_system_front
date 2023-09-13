import React, { useState, useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import axios from 'axios';
import { useRouter } from 'next/router';
import adminLectureClassificaitonStyle from '@/styles/admin-lecture-management.module.css';
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
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filteredLectures, setFilteredLectures] = useState([]);
    const [selectedLecture, setSelectedLecture] = useState(null);

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
        setSelectedLecture(lecture);
        router.push('/admin/lecture-classification-manager?mode=edit');  // 수정 모드로 LectureClassificationManager 페이지로 이동
    };

    const handleCreate = () => {
        router.push('/admin/lecture-classification-manager?mode=add'); // 생성 모드로 LectureClassificationManager 페이지로 이동
    };

    //page 업데이트
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // page 계산
    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const totalPages = searchKeyword !== '' ? Math.ceil(filteredLectures.length / itemsPerPage) : Math.ceil(lectures.length / itemsPerPage);


    return (
        <>
            <Header />
            <section className={adminCommonStyle.backGroundSection}>
                <div className={adminCommonStyle.sideNavContainer}>
                    <AdminSideNavBar />
                </div>
                <div className={adminCommonStyle.mainContainer}>
                    <div className={adminLectureClassificaitonStyle.lectureVideoTitle}>
                        강의 비디오 관리
                    </div>
                    <div className={adminLectureClassificaitonStyle.lectureVideoSubTitle}>
                        카테고리 선택
                    </div>
                    <Grid container spacing={2} className={adminLectureClassificaitonStyle.lectureContainer}>
                        {lectures.slice(startIdx, endIdx).map(lecture => (
                            <Grid item xs={6} key={lecture.id} onClick={() => handleOpenLectureInfoPage(lecture)}>
                                <div className={adminLectureClassificaitonStyle.lectureItem}>
                                    <div className={adminLectureClassificaitonStyle.lectureInfo}>
                                        {lecture.title}
                                    </div>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
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





