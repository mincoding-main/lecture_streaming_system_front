import React, { useEffect, useState } from 'react';
import utilStyles from '../styles/utils.module.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import LectureListCard from '@/components/lecture-card-item';
import { fetchAllLectures } from '@/utils/api'



export default function Home() {
  const [lectureData, setLectureData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllLectures();
        setLectureData(data);
      } catch (error) {
        console.error('Failed to fetch lecture data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <section className={utilStyles.introSection}>
        <div className={utilStyles.introTextDiv}>
          <p className={utilStyles.introTextBig}><b>세 가지</b>를 꼭 지켜주세요.</p>
          <p className={utilStyles.introText}>하나, 모든 소스코드는 처음부터 작성하기</p>
          <p className={utilStyles.introText}>두울, Trace로 끝가지 버그 잡아내기</p>
          <p className={utilStyles.introText}>세엣, 질문은 적극적이고 구체적으로</p>
        </div>
      </section>
      <h2 className={utilStyles.sectionTitle}>대표 강의 목록</h2>
      <section className={utilStyles.cardSection}>
        <div className={utilStyles.cardList}>
          <LectureListCard lectureData={lectureData} />
        </div>
      </section>
      <Footer />
    </>
  );
}
