import React, { useState, useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import dashBoardStyle from '@/styles/main/dash-board.module.css';
import LectureListItem from '@/components/lecture-list-item';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function LectureList() {
    const router = useRouter();
    const [lectureData, setLectureData] = useState([]);

    const handleTabClick = (tabName) => {
        if (tabName === 'updateProfile') {
            router.push('/dash-board/profile-update');
        } else if (tabName === 'lectureList') {
            router.push('/dash-board/lecture-list');
        }
    };

    const fetchMemberAndLectureData = async () => {
        try {
            const member = JSON.parse(sessionStorage.getItem('member'));
            const lectureResponse = await axios.get('/api/lectures', {
                params: {
                    lectureIds: member.lectureId ? member.lectureId : [],
                },
            });
            const lectureData = lectureResponse.data;
            setLectureData(lectureData);

        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    useEffect(() => {
        fetchMemberAndLectureData();
    }, []);

    return (
        <>
            <Header />
            <section className={dashBoardStyle.dashBoardTop}>
                <div className={dashBoardStyle.dashBoardBtnBar}>
                    <Button
                        variant="contained"
                        className={dashBoardStyle.dashBoardBtn}
                        onClick={() => handleTabClick('lectureList')}
                    >
                        강의 목록
                    </Button>
                    <Button
                        variant="contained"
                        className={dashBoardStyle.dashBoardBtn}
                        onClick={() => handleTabClick('updateProfile')}
                    >
                        내 정보 수정
                    </Button>
                </div>
            </section>

            <section className={dashBoardStyle.dashBoardView}>
                <>
                    <div className={dashBoardStyle.sectionTitle}>내 강의 목록</div>
                    <div className={dashBoardStyle.cardList}>
                        <LectureListItem lectureData={lectureData} />
                    </div>
                </>
            </section>
            <Footer />
        </>
    );
}
