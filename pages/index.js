import React, { useEffect, useState } from 'react';
import mainStyles from '../styles/main.module.css';
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
      <section className={mainStyles.introSection}>
        <div className={mainStyles.introTextDiv}>
          <p className={mainStyles.introTextBig}><b>세 가지</b>를 꼭 지켜주세요.</p>
          <p className={mainStyles.introText}>하나, 모든 소스코드는 처음부터 작성하기</p>
          <p className={mainStyles.introText}>두울, Trace로 끝가지 버그 잡아내기</p>
          <p className={mainStyles.introText}>세엣, 질문은 적극적이고 구체적으로</p>
        </div>
      </section>
      <h2 className={mainStyles.sectionTitle}>대표 강의 목록</h2>
      <section className={mainStyles.cardSection}>
        <div className={mainStyles.cardList}>
          <LectureListCard lectureData={lectureData} />
        </div>
      </section>
      <Footer />
    </>
  );
}
