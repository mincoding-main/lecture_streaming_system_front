import utilStyles from '../styles/utils.module.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import LectureListCard from '@/components/lecture-list-card';
import axios from 'axios';
import config from '../config';

export default function Home({ lectureData }) {
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

export async function getServerSideProps() {
  try {
    // API 엔드포인트 호출
    const apiUrl = config.apiFrontpoint;
    const response = await axios.get(`${apiUrl}/api/lectures`);
    const lectureData = response.data;
    return {
      props: {
        lectureData,
      },
    };
  } catch (error) {
    console.error('Failed to fetch lecture data:', error);
    return {
      props: {
        lectureData: [], // Return an empty array in case of error
      },
    };
  }
}
