import React, { useState, useEffect } from 'react';
import { fetchAllLectures, deleteLecture } from '@/utils/api'
import { useRouter } from 'next/router';
import { useAuthCheck } from '@/utils/auth-check'
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
        router.push(`/admin/lecture-management?id=${lecture.id}&mode=edit`);
    };

    const handleCreate = () => {
        router.push('/admin/lecture-management?mode=add');
    };

    const handleDeleteLecture = async (lecture) => {
        try {
            const response = await deleteLecture(lecture.id);
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
        </>
    );
}
