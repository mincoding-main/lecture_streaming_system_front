import React, { useState, useEffect } from 'react';
import { useAuthCheck } from '@/utils/auth-check'
import { useRouter } from 'next/router';
import { fetchLecture } from '@/utils/api'
import config from '@/config';
import lectureDetailStyle from '@/styles/main/lecture-detail.module.css';
import VideoListItem from '@/components/lecture-video-item';


export default function LectureDetail() {
    const router = useRouter();
    const { lectureId } = router.query;
    const [lecture, setLecture] = useState(null);

    const baseURL = config.imageBaseURL

    useAuthCheck(false, false, false);

    useEffect(() => {
        if (lectureId) {
            fetchLectureData(lectureId);
        }
    }, [lectureId]);

    const fetchLectureData = async (lectureId) => {
        try {
            const lectureData = await fetchLecture(lectureId);
            setLecture(lectureData);

        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    if (!lecture) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <section className={lectureDetailStyle.lectureIntroSection}>
                <div className={lectureDetailStyle.lectureIntroContent}>
                    <div className={lectureDetailStyle.lectureIntroImage}>

                        <img src={`${baseURL}/${lecture.img.image_name}`} alt={lecture.title} />
                    </div>
                    <div className={lectureDetailStyle.lectureIntroText}>
                        <h1>{lecture.title}</h1>
                        <p>{lecture.content}</p>
                    </div>
                </div>
                <div className={lectureDetailStyle.lectureCourseSection}>
                    <div className={lectureDetailStyle.lectureCourseTitleText}>교육과정안내</div>
                    <div className={lectureDetailStyle.lectureCourseText} dangerouslySetInnerHTML={{ __html: lecture.notice }} />
                </div>
                <div className={lectureDetailStyle.lectureVideoSection}>
                    <VideoListItem Videos={lecture.lectureItemList} LectureId={lecture.id} />
                </div>
            </section>
        </>
    );
}
