import React, { useState, useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import MemberItemView from '@/components/admin/member-item-view'
import MemberManagementModal from '@/components/admin/admin-modal/member-management-modal'
import { fetchAllMembers } from '@/utils/api'
import adminMemberDetailStyle from '@/styles/admin/member-detail.module.css';
import adminCommonStyle from '@/styles/admin/common.module.css';
import SideNavBar from '@/components/admin/side-navbar';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';


export default function MemberList() {
    const [members, setMembers] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 7;
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [openMemberInfoModal, setOpenMemberInfoModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const data = await fetchAllMembers();
                setMembers(data);
            } catch (error) {
                console.error('Error fetching Members:', error);
            }
        };

        fetchMembers();
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
            updateFilteredMembers(keyword);
        } else {
            // 검색어가 없을 때는 전체 사용자 목록을 보여줌
            setFilteredMembers(members);
        }
    };

    // 검색 구현
    const updateFilteredMembers = (keyword) => {
        const keywordLower = keyword.toLowerCase();

        const updatedFilteredMembers = members.filter(member => {
            const fields = ['email', 'employeeId', 'isAdmin', 'id', 'lectureId'];
            return fields.some(field => {
                if (field === 'isAdmin') {
                    const adminText = member.isAdmin ? '관리자' : '사용자';
                    return adminText.toLowerCase().includes(keywordLower);
                } else {
                    const fieldValue = member[field]?.toString().toLowerCase();
                    return fieldValue?.includes(keywordLower);
                }
            });
        });

        setFilteredMembers(updatedFilteredMembers);
    };

    // page 계산
    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const totalPages = searchKeyword !== '' ? Math.ceil(filteredMembers.length / itemsPerPage) : Math.ceil(members.length / itemsPerPage);



    // 모달 관련
    const handleOpenMemberInfoModal = (member) => {
        setSelectedMember(member);
        setOpenMemberInfoModal(true);
    };

    // 모달 수정 후 모달 바깥 화면에 바로 적용
    const handleUpdateMember = (updatedMember) => {
        setMembers(prevMembers => prevMembers.map(member => (member.id === updatedMember.id ? updatedMember : member)));
    };
    // 검색 한 상태에서 모달 수정 후 모달 바깥 화면에 바로 적용
    const handleUpdateFilteredMember = (updatedMember) => {
        setFilteredMembers(prevFilteredMembers =>
            prevFilteredMembers.map(member => (member.id === updatedMember.id ? updatedMember : member))
        );
    };

    // 유저 삭제
    const handleDeleteMember = (deletedMemberId) => {
        setMembers(prevMembers => prevMembers.filter(member => member.id !== deletedMemberId));
        setFilteredMembers(prevFilteredMembers => prevFilteredMembers.filter(member => member.id !== deletedMemberId));

        // 총 페이지 수 다시 계산
        const newTotalPages = searchKeyword !== '' ?
            Math.ceil((filteredMembers.length - 1) / itemsPerPage) :
            Math.ceil((members.length - 1) / itemsPerPage);

        // 현재 페이지가 총 페이지 수보다 크다면 페이지 수 감소
        if (page > newTotalPages) {
            setPage(newTotalPages); // 현재 페이지를 총 페이지 수로 설정
        }
    };

    return (
        <>
            <Header />
            <section className={adminCommonStyle.backGroundSection}>
                <div className={adminCommonStyle.sideNavContainer}>
                    <SideNavBar />
                </div>
                <div className={adminCommonStyle.mainContainer}>
                    <div className={adminMemberDetailStyle.memberTitle}>
                        회원정보
                    </div>
                    <div className={adminMemberDetailStyle.memberSearchContainer}>
                        <TextField
                            className={adminMemberDetailStyle.memberSearchInput}
                            label="회원 ID / 이름 / Email / 사번 검색"
                            variant="outlined"
                            value={searchKeyword}
                            onChange={handleSearchChange}
                            InputProps={{ sx: { height: '2.3rem' } }}
                        />
                    </div>
                    <div className={adminMemberDetailStyle.memberContainer}>
                        <div className={adminMemberDetailStyle.memberItem}>
                            <div className={adminMemberDetailStyle.memberInfo}>
                                <Grid container spacing={2} >
                                    <Grid item xs={1} className={adminMemberDetailStyle.memberInfoTitle}>회원 ID</Grid>
                                    <Grid item xs={4} className={adminMemberDetailStyle.memberInfoTitle}>Email</Grid>
                                    <Grid item xs={3} className={adminMemberDetailStyle.memberInfoTitle}>사번</Grid>
                                    <Grid item xs={4} className={adminMemberDetailStyle.memberInfoTitle}>유저 권한</Grid>
                                </Grid>
                            </div>
                            <div className={adminMemberDetailStyle.memberEditBtnTitle} >정보 조회 / 수정</div>
                        </div>
                        {(searchKeyword !== '' ? filteredMembers : members)
                            .slice(startIdx, endIdx)
                            .map(member => (
                                <MemberItemView key={member.id} member={member} handleOpen={handleOpenMemberInfoModal} />
                            ))}
                    </div>
                    <div className={adminMemberDetailStyle.paginationContainer}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handleChangePage}
                        />
                    </div>
                </div>
            </section >
            <Footer />
            <MemberManagementModal
                open={openMemberInfoModal}
                onClose={() => setOpenMemberInfoModal(false)}
                member={selectedMember}
                onUpdateMember={handleUpdateMember}
                onUpdateFilteredMember={handleUpdateFilteredMember}
                onDeleteMember={handleDeleteMember}
            />
        </>
    );
}
