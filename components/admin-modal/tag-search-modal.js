import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import AdminTagItemModal from '@/components/admin-modal/admin-tag-item-modal'
import TextField from '@mui/material/TextField';
import axios from 'axios';
import AdminTagSearchStyle from '@/styles/admin-tag-search-modal.module.css'
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import CloseIcon from '@mui/icons-material/Close';

export default function AdminTagSearchModal({ open, onClose, onTagSelected }) {
    const [tags, setTags] = useState([]);
    const [filteredTags, setFilteredTags] = useState([]); // 필터링된 태그를 보관
    const [searchKeyword, setSearchKeyword] = useState(''); // 검색 키워드를 보관
    const [selectedTags, setSelectedTags] = useState([]);
    const itemsPerPage = 7;
    const [page, setPage] = useState(1);

    // 1. 모든 태그를 가져옴
    useEffect(() => {
        const fetchTags = async () => {
            const response = await axios.get('/api/tags');
            setTags(response.data);
            setTags(response.data);
            setFilteredTags(response.data);
        };
        fetchTags();
    }, []);


    // 2. 검색 기능
    const updateFilteredTags = (keyword) => {
        const keywordLower = keyword.toLowerCase();
        const updatedFilteredTags = tags.filter(tag => {
            const fields = ['name']; // 이 부분은 필터링할 필드에 따라 달라질 수 있습니다.
            return fields.some(field => {
                const fieldValue = tag[field]?.toString().toLowerCase();
                return fieldValue?.includes(keywordLower);
            });
        });
        setFilteredTags(updatedFilteredTags);
    };

    const handleAddSelectedTagsToLecture = () => {
        // 선택된 태그를 상위 컴포넌트로 전달합니다.
        onTagSelected(selectedTags); // 배열을 전달
        handleClose();
    };


    const handleClose = () => {
        // 선택된 태그와 검색 키워드를 초기화
        setSelectedTags([]);
        setSearchKeyword('');
        setPage(1);
        // 부모 컴포넌트의 onClose 호출 (모달 닫기)
        onClose();
    };

    const handleOpen = (tag) => {
        if (!selectedTags.some(selectedTag => selectedTag.id === tag.id)) {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleDeleteTag = (tagToDelete) => {
        const updatedTags = selectedTags.filter(tag => tag.id !== tagToDelete.id);
        setSelectedTags(updatedTags);
    };

    //page 업데이트
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // page 계산
    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const totalPages = Math.ceil(filteredTags.length / itemsPerPage);



    return (
        <Modal open={open} onClose={handleClose}>
            <div className={AdminTagSearchStyle.modalContainer}>
                <div className={AdminTagSearchStyle.topContainer}>
                    <div className={AdminTagSearchStyle.topBtnContainer}>
                        <Button onClick={handleAddSelectedTagsToLecture}>
                            강의에 태그 추가하기
                        </Button>
                    </div>
                    <div className={AdminTagSearchStyle.tagSearchContainer}>
                        <TextField
                            className={AdminTagSearchStyle.tagSearchInput}
                            label="태그 검색"
                            variant="outlined"
                            value={searchKeyword}
                            onChange={(e) => {
                                setSearchKeyword(e.target.value);
                                updateFilteredTags(e.target.value);
                            }}
                        />
                    </div>
                    <div className={AdminTagSearchStyle.selectedTagContainer}>
                        {selectedTags.map((tag) => (
                            <Chip className={AdminTagSearchStyle.selectedTagItem}
                                key={tag.id}
                                label={tag.name}
                                onDelete={() => handleDeleteTag(tag)}
                                deleteIcon={<CloseIcon />}
                                variant="outlined"
                                onMouseEnter={(e) => e.target.style.color = 'darkerColorHere'}
                                onMouseLeave={(e) => e.target.style.color = 'normalColorHere'}
                            />
                        ))}
                    </div>
                </div>

                <div className={AdminTagSearchStyle.tagContainer}>
                    <div className={AdminTagSearchStyle.tagItem}>
                        <div className={AdminTagSearchStyle.tagInfo}>
                            <Grid container spacing={2} >
                                <Grid item xs={2} className={AdminTagSearchStyle.tagInfoTitle}>태그 ID</Grid>
                                <Grid item xs={10} className={AdminTagSearchStyle.tagInfoTitle}>제목</Grid>
                            </Grid>
                        </div>
                        <div className={AdminTagSearchStyle.tagEditBtnTitle} >추가</div>
                    </div>
                    {(searchKeyword !== '' ? filteredTags : tags)
                        .slice(startIdx, endIdx).map(tag => (
                            <AdminTagItemModal key={tag.id} tag={tag} handleOpen={handleOpen} />
                        ))}
                </div>

                <div className={AdminTagSearchStyle.paginationContainer}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handleChangePage}
                    />
                </div>
            </div>

        </Modal>
    );
}
