import React, { useEffect, useState } from 'react';
import mainStyles from '../styles/main/main.module.css';
import LectureListCard from '@/components/lecture-card-item';
import { fetchAllLectures } from '@/utils/api'
import { useAuthCheck } from '@/utils/auth-check'


export default function Home() {
  const [lectureData, setLectureData] = useState([]);

  useAuthCheck(false, false, false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllLectures();
        const sortedLectures = Array.from(data).sort((a, b) => a.id - b.id);
        setLectureData(sortedLectures);
      } catch (error) {
        console.error('Failed to fetch lecture data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={mainStyles.viewContainer}>
      <section className={mainStyles.introSection}>
        <div className={mainStyles.introTextDiv}>
          <p className={mainStyles.introTextBig}><b>세 가지</b>를 꼭 지켜주세요.</p>
          <p className={mainStyles.introText}>하나, 모든 소스코드는 처음부터 작성하기</p>
          <p className={mainStyles.introText}>두울, Trace로 끝가지 버그 잡아내기</p>
          <p className={mainStyles.introText}>세엣, 질문은 적극적이고 구체적으로</p>
        </div>
      </section>
      <div className={mainStyles.sectionTitle}>강의 목록</div>
      <section className={mainStyles.cardSection}>
        <div className={mainStyles.cardList}>
          <LectureListCard lectureData={lectureData} />
        </div>
      </section>
    </div>
  );
}
