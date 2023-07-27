import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import LectureListCard from '@/components/lecture-list-card';


// test데이터
const lectureData = [
  {
    id: 1,
    title: '강의 제목 1',
    description: '강의 설명 1',
    imageUrl: '/img_main_sec1.jpg',
    link: '#',
  },
  {
    id: 2,
    title: '강의 제목 2',
    description: '강의 설명 2',
    imageUrl: '/img_main_sec2.png',
    link: '#',
  },
  {
    id: 3,
    title: '강의 제목 3',
    description: '강의 설명 3',
    imageUrl: '/img_main_sec3.png',
    link: '#',
  },
  {
    id: 4,
    title: '강의 제목 4',
    description: '강의 설명 4',
    imageUrl: '/img_main_sec4.png',
    link: '#',
  },
  {
    id: 5,
    title: '강의 제목 5',
    description: '강의 설명 5',
    imageUrl: '/img_main_sec5.png',
    link: '#',
  },
  // ...
];


export default function Home() {
  return (
    <>
      <Header />
      {/* <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
          <p>[Your Self Introduction]</p>
          <p>
            (This is a sample website - you’ll be building a site like this on{' '}
            <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
          </p>
        </section>
      </Layout> */}
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
