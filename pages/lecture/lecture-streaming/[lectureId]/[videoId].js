import React, { useState, useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import axios from 'axios';
import { useRouter } from 'next/router';
import lectureStreamingStyle from '@/styles/lecture-streaming.module.css';
import VideoListItem from '@/components/lecture-video-item';


export default function LectureStreaming() {
    const router = useRouter();
    const { lectureId } = router.query;
    const { videoId } = router.query;
    const [lecture, setLecture] = useState(null);
    const [videos, setVideos] = useState(null);

    useEffect(() => {
        if (lectureId) {
            // 동적 라우팅 파라미터인 id를 이용해 해당 강의 정보를 가져옴
            axios.get(`/api/lectures/${lectureId}`).then((response) => {
                setLecture(response.data);
            });
            setVideos(videoId);
        }
    }, [lectureId]);

    if (!lecture) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <section className={lectureStreamingStyle.streamingIntroSection}>
                <div className={lectureStreamingStyle.streamingIntroContent}>
                    <div className={lectureStreamingStyle.streamingIntroImage}>
                        {/* <img src={lecture.imageUrl} alt={lecture.title} /> */}
                    </div>
                    <div className={lectureStreamingStyle.streamingIntroText}>
                        <h1>{lecture.videos[videoId].title}</h1>
                        {/* <p>{lecture[videoId].description}</p> */}
                    </div>
                </div>
                {/* <div className={lectureStreamingStyle.streamingCourseSection}>
                    <div className={lectureStreamingStyle.streamingCourseTitleText}>교육과정안내</div>
                    <div className={lectureStreamingStyle.streamingCourseText} dangerouslySetInnerHTML={{ __html: lecture.courseDescription }} />
                </div>
                <div className={lectureStreamingStyle.streamingVideoSection}>
                    <VideoListItem Videos={lecture.videos} LectureId={lecture.id} />
                </div> */}
            </section>
            {/* 강의 상세 정보 렌더링 */}

            <Footer />
        </>
    );
}
