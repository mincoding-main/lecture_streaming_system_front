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
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';



export default function UserList() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 8;
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchCategory, setSearchCategory] = useState('email'); // 기본 카테고리: Email
    const [filteredUsers, setFilteredUsers] = useState([]);


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

    const handleSearchChange = (event) => {
        const keyword = event.target.value;
        setSearchKeyword(keyword);
    };

    const handleSearchCategoryChange = (event) => {
        const category = event.target.value;
        setSearchCategory(category);
    };

    const handleSearch = () => {
        // 검색 버튼을 클릭했을 때의 로직을 구현하세요.
        // 필터링된 결과를 사용하거나, 추가적인 API 호출 등을 수행할 수 있습니다.

        // 카테고리에 따라 검색 필드를 선택합니다.
        let searchField = '';
        if (searchCategory === 'email') {
            searchField = 'email';
        } else if (searchCategory === 'employeeId') {
            searchField = 'employeeId';
        } else if (searchCategory === 'isAdmin') {
            searchField = 'isAdmin';
        } else if (searchCategory === 'id') {
            searchField = 'id';
        } else if (searchCategory === 'lectureId') {
            searchField = 'lectureId';
        } else {
            // 유효한 카테고리가 아닌 경우, 기본 검색 필드를 선택합니다.
            searchField = 'email';
        }

        // 검색 키워드와 선택된 카테고리에 따라 필터링된 사용자들을 구합니다.
        const filteredUsers = users.filter(user => {
            if (searchField === 'isAdmin') {
                return user[searchField] === (searchKeyword.toLowerCase() === '관리자');
            } else if (searchField === 'id') {
                return user[searchField] === parseInt(searchKeyword);
            } else {
                return user[searchField].includes(searchKeyword);
            }
        });

        // 필터링된 사용자 목록을 설정합니다.
        setFilteredUsers(filteredUsers);

        console.log('Filtered Users:', filteredUsers);
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
                    <div className={adminUserDetailStyle.userSearchContainer}>
                        <Button variant="contained" onClick={handleSearch}>
                            검색
                        </Button>
                        <TextField
                            className={adminUserDetailStyle.userSearchInput}
                            label="검색어를 입력하세요"
                            variant="outlined"
                            value={searchKeyword}
                            onChange={handleSearchChange}
                            InputProps={{ sx: { height: '2.3rem' } }}
                        />
                        <FormControl className={adminUserDetailStyle.searchCategory}>
                            <InputLabel>검색 카테고리</InputLabel>
                            <Select value={searchCategory} onChange={handleSearchCategoryChange} style={{ height: '2.3rem' }}>
                                <MenuItem value="id">회원 ID</MenuItem>
                                <MenuItem value="email">Email</MenuItem>
                                <MenuItem value="employeeId">사번</MenuItem>
                                <MenuItem value="isAdmin">유저 권한</MenuItem>
                                <MenuItem value="lectureId">강의 종류</MenuItem>
                            </Select>
                        </FormControl>
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
                        {(searchKeyword !== '' || searchCategory !== 'email') ? (
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
                                        <Button variant="contained">
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
                                        <Button variant="contained">
                                            수정
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
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
