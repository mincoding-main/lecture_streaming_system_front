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
    const [selectedTab, setSelectedTab] = useState('lectureList');
    const [user, setUser] = useState(null);
    const [lectureData, setLectureData] = useState([]);

    const handleTabClick = (tabName) => {
        setSelectedTab(tabName);
        if (tabName === 'updateProfile') {
            // "내 정보 수정" 탭 클릭 시 profile-update 페이지로 이동
            router.push('/dash-board/profile-update');
        } else if (tabName === 'lectureList') {
            // "강의 목록" 탭 클릭 시 lecture-list 페이지로 이동
            router.push('/dash-board/lecture-list');
        }
    };

    const fetchUserAndLectureData = async () => {
        try {
            const user = JSON.parse(sessionStorage.getItem('user'));
            const userId = user && user.id;
            const userResponse = await axios.get(`/api/users/${userId}`); // 1은 특정 사용자의 id라고 가정
            const userData = userResponse.data;
            setUser(userData);

            const lectureResponse = await axios.get('/api/lectures', {
                params: {
                    lectureIds: user.lectureId ? user.lectureId : [], // 파라미터로 user의 lectureId를 넘겨줌
                },
            });
            const lectureData = lectureResponse.data;
            setLectureData(lectureData);

        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    useEffect(() => {
        // CSR 방식으로 user 데이터를 가져오는 코드
        fetchUserAndLectureData();
    }, []);

    return (
        <>
            <Header />
            <section className={dashBoardStyle.dashBoardTop}>
                <div className={dashBoardStyle.dashBoardBtnBar}>
                    {/* 클릭 이벤트 추가 */}
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
                {/* 상태에 따라 다른 내용 출력 */}
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
