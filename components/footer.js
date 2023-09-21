import React from 'react';
import Link from 'next/link';
import Container from '@mui/material/Container';
import Image from 'next/image';
import footerStyles from '../styles/main/footer.module.css';

export default function Footer() {
    return (
        <footer>
            <div className={footerStyles.tContainer}>
                <Link href="/">
                    <Image src="/logo_w.svg" alt="LOGO" width={100} height={24} href="/" />
                </Link>
                <span className={footerStyles.linkText} >
                    <Link href="#" >
                        개인정보처리방침
                    </Link>
                    &nbsp;|&nbsp;
                    <Link href="#">
                        이용약관
                    </Link>
                    &nbsp;|&nbsp;
                    <Link href="#">
                        환불규정
                    </Link>
                </span>
            </div>
            <div className={footerStyles.bContainer}>
                <div className={footerStyles.bInnerContainer} >
                    <ul>
                        <li>
                            <span>주식회사 민코딩</span>&nbsp;&nbsp;&nbsp;
                            <span>대표자: 장지효</span>&nbsp;&nbsp;&nbsp;
                            <span>경기도 용인시 기흥구 진산로 222 B동 1901호</span>
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
                <div className={footerStyles.mailAndCallText}>
                    <div>
                        <p>
                            <b>CALL</b>
                            <a href="#"> 010.9547.2485</a>
                        </p>
                        <p>
                            <b>MAIL</b>
                            <a href="#"> admin@mincoding.co.kr</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer >
    );
}

