import React, { useState, useEffect } from 'react';
import { fetchAllLectures } from '@/utils/api'
import { useRouter } from 'next/router';
import { useAuthCheck } from '@/utils/auth-check'
import adminLectureSelectStyle from '@/styles/admin/lecture-select.module.css';
import adminCommonStyle from '@/styles/admin/common.module.css';
import SideNavBar from '@/components/admin/side-navbar';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';


export default function LectureSelect() {
    const router = useRouter();
    const [lectures, setLectures] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 8;

    useAuthCheck(true, true, false);

    useEffect(() => {
        const fetchLectures = async () => {
            try {
                const data = await fetchAllLectures();
                const sortedLectures = Array.from(data).sort((a, b) => a.id - b.id);
                setLectures(sortedLectures);
            } catch (error) {
                console.error('Error fetching lectures:', error);
            }
        };

        fetchLectures();
    }, []);


    const handleOpenLectureInfoPage = (lecture) => {
        router.push(`/admin/lecture-video-view?id=${lecture.id}`);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const totalPages = Math.ceil(lectures.length / itemsPerPage);


    return (
        <>
            <section className={adminCommonStyle.backGroundSection}>
                <div className={adminCommonStyle.sideNavContainer}>
                    <SideNavBar />
                </div>
                <div className={adminCommonStyle.mainContainer}>
                    <div className={adminLectureSelectStyle.lectureVideoTitle}>
                        강의 비디오 관리
                    </div>
                    <div className={adminLectureSelectStyle.lectureVideoSubTitle}>
                        강의 선택
                    </div>
                    <Grid container spacing={2} className={adminLectureSelectStyle.lectureContainer}>
                        {lectures.slice(startIdx, endIdx).map(lecture => (
                            <Grid item xs={6} key={lecture.id} onClick={() => handleOpenLectureInfoPage(lecture)}>
                                <div className={adminLectureSelectStyle.lectureItem}>
                                    <div className={adminLectureSelectStyle.lectureInfo}>
                                        {lecture.title}
                                    </div>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                    <div className={adminLectureSelectStyle.paginationContainer}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handleChangePage}
                        />
                    </div>
                </div>
            </section >
        </>
    );
}





