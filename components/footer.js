import React from 'react';
import Link from 'next/link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer>
            <Container
                maxWidth={null}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 2,
                    backgroundColor: '#1976d2',
                }}
            >
                <Link href="/">
                    <Image src="/logo_w.svg" alt="LOGO" width={100} height={24} href="/" />
                </Link>
                <span style={{ color: '#fff', fontSize: '18px', marginLeft: '10px' }}>
                    <Link href="#" style={{ color: '#fff' }}>
                        개인정보처리방침
                    </Link>
                    &nbsp;|&nbsp;
                    <Link href="#" style={{ color: '#fff' }}>
                        이용약관
                    </Link>
                    &nbsp;|&nbsp;
                    <Link href="#" style={{ color: '#fff' }}>
                        환불규정
                    </Link>
                </span>

            </Container>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', backgroundColor: '#1976d2' }}>
                <div style={{ padding: '16px', paddingTop: '0' }}>
                    <ul style={{ listStyle: 'none', padding: 0, color: '#fff', fontSize: '14px' }}>
                        <li>
                            <span>주식회사 민코딩</span>&nbsp;&nbsp;&nbsp;
                            <span>대표자: 장지효</span>&nbsp;&nbsp;&nbsp;
                            <span>경기도 성남시 분당구 미금일로 75, 501호</span>
                        </li>
                        <li>
                            <span>사업자등록번호: 485-88-02212</span>&nbsp;&nbsp;&nbsp;
                            <span>Hosting by 주식회사 민코딩</span>
                        </li>
                        <li>
                            <span>통신판매신고번호: 제 2023-성남분당B-0203 호</span>&nbsp;&nbsp;&nbsp;
                            <span>개인정보보호책임자: 장지효</span>
                        </li>
                        <li>
                            <span>COPYRIGHT ⒞2023 주식회사 민코딩 ALL RIGHTS RESERVED</span>
                        </li>
                    </ul>
                </div>
                <div style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', fontSize: '14px' }}>
                        <p style={{ margin: '0 8px' }}>
                            <b>CALL</b>
                            <a style={{ color: '#fff' }} href="#"> 010.9547.2485</a>
                        </p>
                        <p style={{ margin: '0 8px' }}>
                            <b>MAIL</b>
                            <a style={{ color: '#fff' }} href="#"> admin@mincoding.co.kr</a>
                        </p>
                    </div>
                </div>

            </div>

        </footer >
    );
}

