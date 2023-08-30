import React, { useState, useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import axios from 'axios';
import { useRouter } from 'next/router';
import adminUserDetailStyle from '@/styles/admin-user-detail.module.css';
import adminCommonStyle from '@/styles/admin-common.module.css';
import AdminSideNavBar from '@/components/admin-side-navbar';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';


export default function UserList() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    return (
        <>
            <Header />
            <section className={adminCommonStyle.backGroundSection}>
                <div className={adminCommonStyle.sideNavContainer}>
                    <AdminSideNavBar />
                </div>
                <div className={adminCommonStyle.mainContainer}>
                    <div className={adminUserDetailStyle.userSearchContainer}>검색창</div>
                    <div className={adminUserDetailStyle.userContainer}>
                        <div className={adminUserDetailStyle.userItem}>
                            <div className={adminUserDetailStyle.userInfo}>
                                <Grid container spacing={2} >
                                    <Grid item xs={1} className={adminUserDetailStyle.userInfoTitle}>회원 ID</Grid>
                                    <Grid item xs={3} className={adminUserDetailStyle.userInfoTitle}>Email</Grid>
                                    <Grid item xs={2} className={adminUserDetailStyle.userInfoTitle}>사번</Grid>
                                    <Grid item xs={3} className={adminUserDetailStyle.userInfoTitle}>유저 권한</Grid>
                                    <Grid item xs={3} className={adminUserDetailStyle.userInfoTitle}>강의 종류</Grid>
                                </Grid>
                            </div>
                            <div className={adminUserDetailStyle.userEditBtnTitle} >정보 조회 / 수정</div>
                        </div>
                        {users.slice(startIdx, endIdx).map(user => (
                            <div key={user.id} className={adminUserDetailStyle.userItem}>
                                <div className={adminUserDetailStyle.userInfo}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={1}>{user.id}</Grid>
                                        <Grid item xs={3}>{user.email}</Grid>
                                        <Grid item xs={2}>{user.employeeId}</Grid>
                                        <Grid item xs={3}>{user.isAdmin ? '관리자' : '사용자'}</Grid>
                                        <Grid item xs={3}>{user.lectureId.join(', ')}</Grid>
                                    </Grid>
                                </div>
                                <div className={adminUserDetailStyle.userEditBtn}>
                                    <Button variant="contained">
                                        수정
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={adminUserDetailStyle.paginationContainer}>
                        <Pagination
                            count={Math.ceil(users.length / itemsPerPage)}
                            page={page}
                            onChange={handleChangePage}
                        />
                    </div>
                </div>
            </section >

            <Footer />
        </>
    );
}
