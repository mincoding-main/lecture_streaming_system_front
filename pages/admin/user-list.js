import React, { useState, useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import axios from 'axios';
import { useRouter } from 'next/router';
import adminUserDetailStyle from '@/styles/admin-user-detail.module.css';
import VideoListItem from '@/components/lecture-video-item';


export default function UserList() {
    const router = useRouter();
    const { lectureId } = router.query;
    const [lecture, setLecture] = useState(null);

    useEffect(() => {
        if (lectureId) {
            // 동적 라우팅 파라미터인 id를 이용해 해당 강의 정보를 가져옴
            axios.get(`/api/lectures/${lectureId}`).then((response) => {
                setLecture(response.data);
            });
        }
    }, [lectureId]);

    if (!lecture) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <section className={adminUserDetailStyle.lectureIntroSection}>
                <div className={adminUserDetailStyle.lectureIntroContent}>
                    <div className={adminUserDetailStyle.lectureIntroImage}>
                        <img src={lecture.imageUrl} alt={lecture.title} />
                    </div>
                    <div className={adminUserDetailStyle.lectureIntroText}>
                        <h1>{lecture.title}</h1>
                        <p>{lecture.description}</p>
                    </div>
                </div>
                <div className={adminUserDetailStyle.lectureCourseSection}>
                    <div className={adminUserDetailStyle.lectureCourseTitleText}>교육과정안내</div>
                    <div className={adminUserDetailStyle.lectureCourseText} dangerouslySetInnerHTML={{ __html: lecture.courseDescription }} />
                </div>
                <div className={adminUserDetailStyle.lectureVideoSection}>
                    <VideoListItem Videos={lecture.videos} LectureId={lecture.id} />
                </div>
            </section>
            {/* 강의 상세 정보 렌더링 */}

            <Footer />
        </>
    );
}
