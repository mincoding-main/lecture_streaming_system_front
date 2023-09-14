// admin-side-navbar.js
import React from 'react';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import adminCommonStyle from '@/styles/admin-common.module.css'

export default function AdminSideNavBar() {
    const router = useRouter();

    const handleUserListClick = () => {
        router.push('/admin/user-list');
    };

    const handleLectureManagementClick = () => {
        router.push('/admin/lecture-classification');
    };

    const handleCategoryManagementClick = () => {
        router.push('/admin/lecture-management');
    };

    return (
        <div className={adminCommonStyle.sideContainer}>
            <div className={adminCommonStyle.sideUserContainer}>
                <div className={adminCommonStyle.sideUserTitle}>
                    회원관리
                </div>
                <div className={adminCommonStyle.sideUserBtn}>
                    <Button variant="outlined" onClick={handleUserListClick}>
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

        </div >
    );
}
