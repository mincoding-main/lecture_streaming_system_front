import React from 'react';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import adminCommonStyle from '@/styles/admin/common.module.css'

export default function SideNavBar() {
    const router = useRouter();

    const handleMemberListClick = () => {
        router.push('/admin/member-list');
    };

    const handleLectureManagementClick = () => {
        router.push('/admin/lecture-view');
    };

    const handleCategoryManagementClick = () => {
        router.push('/admin/lecture-select');
    };


    const handleTagListClick = () => {
        router.push('/admin/tag-list');
    };

    return (
        <div className={adminCommonStyle.sideContainer}>
            <div className={adminCommonStyle.sideMemberContainer}>
                <div className={adminCommonStyle.sidMemberTitle}>
                    회원관리
                </div>
                <div className={adminCommonStyle.sideMemberBtn}>
                    <Button variant="outlined" onClick={handleMemberListClick}>
                        회원정보
                    </Button>
                </div>
            </div>
            <div className={adminCommonStyle.sideVideoContainer}>
                <div className={adminCommonStyle.sideVideoTitle}>
                    동영상 강의
                </div>
                <div className={adminCommonStyle.sideVideoBtn}>
                    <Button variant="outlined" onClick={handleLectureManagementClick}>
                        강의 관리
                    </Button>
                    <Button variant="outlined" onClick={handleCategoryManagementClick}>
                        강의 비디오 관리
                    </Button>
                </div>
            </div>
            <div className={adminCommonStyle.sideTagContainer}>
                <div className={adminCommonStyle.sideTagTitle}>
                    태그관리
                </div>
                <div className={adminCommonStyle.sideTagBtn}>
                    <Button variant="outlined" onClick={handleTagListClick}>
                        태그 생성
                    </Button>
                </div>
            </div>

        </div >
    );
}
