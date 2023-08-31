import React, { useState, useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import AdminUserInfoModal from '@/components/admin-modal/user-info-modal'
import axios from 'axios';
import { useRouter } from 'next/router';
import adminLectureClassificaitonStyle from '@/styles/admin-lecture-classification.module.css';
import adminCommonStyle from '@/styles/admin-common.module.css';
import AdminSideNavBar from '@/components/admin-side-navbar';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


export default function LectureClassification() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 8;
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [openUserInfoModal, setOpenUserInfoModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

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

    //page 업데이트
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // page 계산
    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const totalPages = searchKeyword !== '' ? Math.ceil(filteredUsers.length / itemsPerPage) : Math.ceil(users.length / itemsPerPage);

    // 모달 관련
    const handleOpenUserInfoModal = (user) => {
        setSelectedUser(user);
        setOpenUserInfoModal(true);
    };

    // 모달 수정 후 모달 바깥 화면에 바로 적용
    const handleUpdateUser = (updatedUser) => {
        setUsers(prevUsers => prevUsers.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    };
    // 검색 한 상태에서 모달 수정 후 모달 바깥 화면에 바로 적용
    const handleUpdateFilteredUsers = (updatedUser) => {
        setFilteredUsers(prevFilteredUsers =>
            prevFilteredUsers.map(user => (user.id === updatedUser.id ? updatedUser : user))
        );
    };

    return (
        <>
            <Header />
            <section className={adminCommonStyle.backGroundSection}>
                <div className={adminCommonStyle.sideNavContainer}>
                    <AdminSideNavBar />
                </div>
                <div className={adminCommonStyle.mainContainer}>
                    <div className={adminLectureClassificaitonStyle.lectureCreateTitle}>
                        강의 분류 관리
                    </div>
                    <div className={adminLectureClassificaitonStyle.lectureCreateContainer}>
                        <Button variant="outlined" className={adminLectureClassificaitonStyle.lectureCreateBtn}>
                            생성
                        </Button>
                        <div className={adminLectureClassificaitonStyle.lectureCreateEmptyAear}>
                        </div>
                    </div>
                    <div className={adminLectureClassificaitonStyle.lectureContainer}>
                        {users.slice(startIdx, endIdx).map(user => (
                            <div key={user.id} className={adminLectureClassificaitonStyle.lectureItem}>
                                <div className={adminLectureClassificaitonStyle.lectureInfo}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={1}>{user.id}</Grid>
                                        <Grid item xs={3}>{user.email}</Grid>
                                        <Grid item xs={2}>{user.employeeId}</Grid>
                                        <Grid item xs={3}>{user.isAdmin ? '관리자' : '사용자'}</Grid>
                                        <Grid item xs={3}>{user.lectureId.join(', ')}</Grid>
                                    </Grid>
                                </div>
                                <div className={adminLectureClassificaitonStyle.lectureEditBtn}>
                                    <Button variant="contained" onClick={() => handleOpenUserInfoModal(user)}>
                                        수정
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={adminLectureClassificaitonStyle.paginationContainer}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handleChangePage}
                        />
                    </div>
                </div>
            </section >

            <Footer />

            {/* Modal */}
            <AdminUserInfoModal
                open={openUserInfoModal}
                onClose={() => setOpenUserInfoModal(false)}
                user={selectedUser}
                onUpdateUser={handleUpdateUser}
                onUpdateFilteredUsers={handleUpdateFilteredUsers} // 수정된 정보 업데이트 함수 전달
            />
        </>
    );
}
