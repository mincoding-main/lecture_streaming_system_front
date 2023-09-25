import React, { useState, useEffect } from 'react';
import dashBoardStyle from '@/styles/main/dash-board.module.css';
import LectureListItem from '@/components/lecture-list-item';
import Button from '@mui/material/Button';
import { fetchLecturesByMemberId } from '@/utils/api'
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
            const id = localStorage.getItem('id');
            const memberData = await fetchLecturesByMemberId(id);

            setLectureData(memberData.memberLectureList);

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
