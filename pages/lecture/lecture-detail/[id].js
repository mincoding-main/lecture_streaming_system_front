import React, { useState, useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function LectureDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [lecture, setLecture] = useState(null);

    useEffect(() => {
        if (id) {
            // 동적 라우팅 파라미터인 id를 이용해 해당 강의 정보를 가져옴
            axios.get(`/api/lectures/${id}`).then((response) => {
                setLecture(response.data);
            });
        }
    }, [id]);

    if (!lecture) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            {/* 강의 상세 정보 렌더링 */}
            <h2>{lecture.title}</h2>
            <p>{lecture.description}</p>
            <Footer />
        </>
    );
}