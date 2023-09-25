import React, { useState, useEffect } from 'react';
import dashBoardStyle from '@/styles/main/dash-board.module.css';
import LectureListItem from '@/components/lecture-list-item';
import Button from '@mui/material/Button';
import { fetchAllLectures } from '@/utils/api'
import { useRouter } from 'next/router';
import { useAuthCheck } from '@/utils/auth-check'

export default function LectureList() {
    const router = useRouter();
    const [lectureData, setLectureData] = useState([]);


    useAuthCheck(true, false, false);


    const handleTabClick = (tabName) => {
        if (tabName === 'updateProfile') {
            router.push('/dash-board/profile-update');
        } else if (tabName === 'lectureList') {
            router.push('/dash-board/lecture-list');
        }
    };

    const fetchMemberAndLectureData = async () => {
        try {
            // 현재 멤버 정보를 가져옴
            const member = JSON.parse(sessionStorage.getItem('member'));

            // 모든 강의를 불러옴
            const allLectureData = await fetchAllLectures();

            // 멤버가 가지고 있는 강의 아이디와 일치하는 강의만 필터링
            const filteredLectureData = allLectureData.filter(lecture =>
                member.lectureId && member.lectureId.includes(lecture.id)
            );

            // 필터링된 강의 데이터를 state에 설정
            setLectureData(filteredLectureData);

        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    useEffect(() => {
        fetchMemberAndLectureData();
    }, []);

    return (
        <>
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
        </>
    );
}
