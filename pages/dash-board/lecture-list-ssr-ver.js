import React, { useState } from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import dashBoardStyle from '@/styles/dash-board.module.css';
import LectureListCard from "@/components/lecture-list-card";
import Button from '@mui/material/Button';
import axios from "axios";
import config from '@/config';

export default function LectureList({ lectureData, user }) {
    const [selectedTab, setSelectedTab] = useState('lectureList');

    const handleTabClick = (tabName) => {
        setSelectedTab(tabName);
    };

    return (
        <>
            <Header />
            <section className={dashBoardStyle.dashBoardTop}>
                <div className={dashBoardStyle.dashBoardBtnBar}>
                    {/* 클릭 이벤트 추가 */}
                    <Button variant="contained" className={dashBoardStyle.dashBoardBtn} onClick={() => handleTabClick('lectureList')}>
                        강의 목록
                    </Button>
                    <Button variant="contained" className={dashBoardStyle.dashBoardBtn} onClick={() => handleTabClick('updateProfile')}>
                        내 정보 수정
                    </Button>
                </div>
            </section>

            <section className={dashBoardStyle.dashBoardView}>
                {/* 상태에 따라 다른 내용 출력 */}
                {selectedTab === 'lectureList' ? (
                    <>
                        <div className={dashBoardStyle.sectionTitle}>내 강의 목록</div>
                        <div className={dashBoardStyle.cardList}>
                            <LectureListCard lectureData={lectureData} />
                        </div>
                    </>
                ) : (
                    <>
                        <div className={dashBoardStyle.sectionTitle}>내 정보 수정</div>
                        <div>{user.email}</div>
                        <div>{user.employeeId}</div>
                        <div>{String(user.isAdmin)}</div>
                        <div>{user.lectureId.join(',')}</div>
                    </>

                )}

            </section>
            <Footer />
        </>
    );
}

export async function getServerSideProps() {
    try {
        const userId = JSON.parse(sessionStorage.getItem('user'));
        console.log('===========')
        console.log(userId);
        const apiUrl = config.apiFrontpoint;

        // user API 호출
        const userResponse = await axios.get(`${apiUrl}/api/users/1`); // 1은 특정 사용자의 id라고 가정
        const user = userResponse.data;
        // lecture API 호출
        const lectureResponse = await axios.get(`${apiUrl}/api/lectures`);
        const lectureData = lectureResponse.data;

        return {
            props: {
                user,
                lectureData,
            },
        };
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return {
            props: {
                user: null,
                lectureData: [], // Return an empty array in case of error
            },
        };
    }
}
