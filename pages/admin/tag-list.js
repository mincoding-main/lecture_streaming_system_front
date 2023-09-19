import React, { useState, useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import AdminTagItem from '@/components/admin-tag-item'
import AdminTagInfoModal from '@/components/admin-modal/tag-info-modal'
import axios from 'axios';
import adminTagDetailStyle from '@/styles/admin-tag-detail.module.css';
import adminCommonStyle from '@/styles/admin-common.module.css';
import AdminSideNavBar from '@/components/admin-side-navbar';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function TagList() {
    const [tags, setTags] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 7;
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filteredTags, setFilteredTags] = useState([]);
    const [openTagInfoModal, setOpenTagInfoModal] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await axios.get('/api/tags');
                setTags(response.data);
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };

        fetchTags();
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
            updateFilteredTags(keyword);
        } else {
            // 검색어가 없을 때는 전체 사용자 목록을 보여줌
            setFilteredTags(tags);
        }
    };

    // 검색 구현
    const updateFilteredTags = (keyword) => {
        const keywordLower = keyword.toLowerCase();

        const updatedFilteredTags = tags.filter(tag => {
            const fields = ['name'];
            return fields.some(field => {
                const fieldValue = tag[field]?.toString().toLowerCase();
                return fieldValue?.includes(keywordLower);
            });
        });

        setFilteredTags(updatedFilteredTags);
    };

    // page 계산
    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const totalPages = searchKeyword !== '' ? Math.ceil(filteredTags.length / itemsPerPage) : Math.ceil(tags.length / itemsPerPage);



    // 모달 관련
    const handleOpenTagInfoModal = (tag) => {
        setSelectedTag(tag);
        setOpenTagInfoModal(true);
    };

    const handleCreateTag = (newTag) => {
        setTags(prevTags => [...prevTags, newTag]);
    };

    const handleUpdateTag = (updatedTag) => {
        // 기존 태그만 업데이트
        setTags(prevTags => {
            return prevTags.map(tag => (tag.id === updatedTag.id ? updatedTag : tag));
        });

        setFilteredTags(prevFilteredTags => {
            return prevFilteredTags.map(tag => (tag.id === updatedTag.id ? updatedTag : tag));
        });
    };



    // 태그 삭제
    const handleDeleteTag = (deletedTagId) => {
        setTags(prevTags => prevTags.filter(tag => tag.id !== deletedTagId));
        setFilteredTags(prevFilteredTags => prevFilteredTags.filter(tag => tag.id !== deletedTagId));

        // 총 페이지 수 다시 계산
        const newTotalPages = searchKeyword !== '' ?
            Math.ceil((filteredTags.length - 1) / itemsPerPage) :
            Math.ceil((tags.length - 1) / itemsPerPage);

        // 현재 페이지가 총 페이지 수보다 크다면 페이지 수 감소
        if (page > newTotalPages) {
            setPage(newTotalPages); // 현재 페이지를 총 페이지 수로 설정
        }
    };

    // 모드 선택
    const handleOpenCreateTagModal = () => {
        setSelectedTag(null);  // 선택된 태그를 null로 설정합니다.
        setOpenTagInfoModal(true);
    };

    return (
        <>
            <Header />
            <section className={adminCommonStyle.backGroundSection}>
                <div className={adminCommonStyle.sideNavContainer}>
                    <AdminSideNavBar />
                </div>
                <div className={adminCommonStyle.mainContainer}>
                    <div className={adminTagDetailStyle.tagTagTitle}>
                        태그 관리
                    </div>
                    <div className={adminTagDetailStyle.tagSearchContainer}>
                        <TextField
                            className={adminTagDetailStyle.tagSearchInput}
                            label="태그 이름을 검색 해주세요"
                            variant="outlined"
                            value={searchKeyword}
                            onChange={handleSearchChange}
                            InputProps={{ sx: { height: '2.3rem' } }}
                        />
                    </div>
                    <div className={adminTagDetailStyle.tagContainer}>
                        <div className={adminTagDetailStyle.tagItem}>
                            <div className={adminTagDetailStyle.tagInfo}>
                                <Grid container spacing={2} >
                                    <Grid item xs={2} className={adminTagDetailStyle.tagInfoTitle}>태그 ID</Grid>
                                    <Grid item xs={10} className={adminTagDetailStyle.tagInfoTitle}>제목</Grid>
                                </Grid>
                            </div>
                            <div className={adminTagDetailStyle.tagEditBtnTitle} >정보 조회 / 수정</div>
                        </div>
                        {(searchKeyword !== '' ? filteredTags : tags)
                            .slice(startIdx, endIdx)
                            .map(tag => (
                                <AdminTagItem key={tag.id} tag={tag} handleOpen={handleOpenTagInfoModal} />
                            ))}
                    </div>

                    <div className={adminTagDetailStyle.buttomContainer} >
                        <div className={adminTagDetailStyle.tagCreateBtn}>
                            <Button variant="outlined" onClick={handleOpenCreateTagModal}>
                                태그 추가
                            </Button>
                        </div>
                        <div className={adminTagDetailStyle.paginationContainer}>
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={handleChangePage}
                            />
                        </div>
                    </div>

                </div>
            </section >

            <Footer />

            {/* Modal */}
            <AdminTagInfoModal
                open={openTagInfoModal}
                onClose={() => setOpenTagInfoModal(false)}
                tag={selectedTag}
                onUpdateTag={handleUpdateTag}
                onDeleteTag={handleDeleteTag}
                mode={selectedTag ? 'edit' : 'create'} // 선택된 태그가 있으면 'edit', 없으면 'create'
                onAddTag={handleCreateTag}
            />
        </>
    );
}
