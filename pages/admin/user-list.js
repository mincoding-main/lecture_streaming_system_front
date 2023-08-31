import React, { useState, useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import AdminUserInfoModal from '@/components/admin-modal/user-info-modal'
import axios from 'axios';
import { useRouter } from 'next/router';
import adminUserDetailStyle from '@/styles/admin-user-detail.module.css';
import adminCommonStyle from '@/styles/admin-common.module.css';
import AdminSideNavBar from '@/components/admin-side-navbar';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';




export default function UserList() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 7;
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

    // 검색입력창 업데이트
    const handleSearchChange = (event) => {
        const keyword = event.target.value;
        setSearchKeyword(keyword);
        if (keyword) {
            setPage(1); // 검색 시 페이지를 1페이지로 초기화
            updateFilteredUsers(keyword);
        } else {
            // 검색어가 없을 때는 전체 사용자 목록을 보여줌
            setFilteredUsers(users);
        }
    };

    // 검색 구현
    const updateFilteredUsers = (keyword) => {
        const keywordLower = keyword.toLowerCase();

        const updatedFilteredUsers = users.filter(user => {
            const fields = ['email', 'employeeId', 'isAdmin', 'id', 'lectureId'];
            return fields.some(field => {
                if (field === 'isAdmin') {
                    const adminText = user.isAdmin ? '관리자' : '사용자';
                    return adminText.toLowerCase().includes(keywordLower);
                } else {
                    const fieldValue = user[field]?.toString().toLowerCase();
                    return fieldValue?.includes(keywordLower);
                }
            });
        });

        setFilteredUsers(updatedFilteredUsers);
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
                    <div className={adminUserDetailStyle.userUserTitle}>
                        회원정보
                    </div>
                    <div className={adminUserDetailStyle.userSearchContainer}>
                        <TextField
                            className={adminUserDetailStyle.userSearchInput}
                            label="회원 ID / 이름 / Email / 사번 검색"
                            variant="outlined"
                            value={searchKeyword}
                            onChange={handleSearchChange}
                            InputProps={{ sx: { height: '2.3rem' } }}
                        />
                    </div>
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
                        {(searchKeyword !== '') ? (
                            filteredUsers.slice(startIdx, endIdx).map(user => (
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
                                        <Button variant="contained" onClick={() => handleOpenUserInfoModal(user)}>
                                            수정
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            users.slice(startIdx, endIdx).map(user => (
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
                                        <Button variant="contained" onClick={() => handleOpenUserInfoModal(user)}>
                                            수정
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className={adminUserDetailStyle.paginationContainer}>
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
