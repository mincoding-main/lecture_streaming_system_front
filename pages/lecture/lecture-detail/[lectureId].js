import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthCheck } from '@/utils/auth-check'
import { useRouter } from 'next/router';
import lectureDetailStyle from '@/styles/main/lecture-detail.module.css';
import VideoListItem from '@/components/lecture-video-item';


export default function LectureDetail() {
    const router = useRouter();
    const { lectureId } = router.query;
    const [lecture, setLecture] = useState(null);

    useAuthCheck(false, false, false);

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
            <section className={lectureDetailStyle.lectureIntroSection}>
                <div className={lectureDetailStyle.lectureIntroContent}>
                    <div className={lectureDetailStyle.lectureIntroImage}>
                        <img src={lecture.img} alt={lecture.title} />
                    </div>
                    <div className={lectureDetailStyle.lectureIntroText}>
                        <h1>{lecture.title}</h1>
                        <p>{lecture.content}</p>
                    </div>
                </div>
                <div className={lectureDetailStyle.lectureCourseSection}>
                    <div className={lectureDetailStyle.lectureCourseTitleText}>교육과정안내</div>
                    <div className={lectureDetailStyle.lectureCourseText} dangerouslySetInnerHTML={{ __html: lecture.courseContent }} />
                </div>
                <div className={lectureDetailStyle.lectureVideoSection}>
                    <VideoListItem Videos={lecture.videos} LectureId={lecture.id} />
                </div>
            </section>
        </>
    );
}
