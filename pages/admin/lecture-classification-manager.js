import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/header';
import Footer from '@/components/footer';
import AdminSideNavBar from '@/components/admin-side-navbar';
import AdminTagSearchModal from '@/components/admin-modal/tag-search-modal';
import axios from 'axios';

import adminCommonStyle from '@/styles/admin-common.module.css';
import adminLectureClassificaitonManagerStyle from '@/styles/admin-lecture-classification-manager.module.css';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Chip from '@mui/material/Chip';
import CloseIcon from '@mui/icons-material/Close';


export default function LectureClassificationManager() {
    const router = useRouter();
    const { mode } = router.query;
    const [lectureTitle, setLectureTitle] = useState(mode === 'edit' ? '기존 강의명' : '');
    const [lectureDescription, setLectureDescription] = useState(mode === 'edit' ? '기존 강의 소개' : '');
    const [permissions, setPermissions] = useState('user');
    const [tags, setTags] = useState([]);
    // 모달을 위한 상태 변수를 추가합니다.
    const [tagSearchModalOpen, setTagSearchModalOpen] = useState(false);



    // 가정: 수정 모드일 때 기존 데이터를 불러옵니다.
    useEffect(() => {
        const fetchLectureAndVideo = async () => {
            try {
                // router.query에서 쿼리 파라미터로 들어오는 id와 videoId를 가져옵니다.
                const id = router.query.id;

                if (mode === 'edit' && id) {
                    // mode가 'edit'이고 두 id가 모두 있을 때만 API 요청을 수행합니다.
                    const response = await axios.get(`/api/admin/lectures/${id}`);
                    // 상태를 업데이트합니다.
                    setLectureTitle(response.data.title);
                    setLectureDescription(response.data.description);
                    setTags(response.data.tags);
                    setPermissions(response.data.permissions);
                    // 또는 다른 상태 변수를 사용할 수 있습니다.
                }
            } catch (error) {
                console.error('Error fetching the lecture:', error);
            }
        };

        // mode가 'edit'인 경우에만 API 요청을 수행합니다.
        if (mode === 'edit') {
            fetchLectureAndVideo();
        }
    }, [router.query.id, mode]);

    const handleSave = async () => {
        try {
            const payload = {
                title: lectureTitle,
                description: lectureDescription,
                tags: tags,
                permissions: permissions
            };

            let response;

            if (mode === 'edit') {
                // 수정 모드일 경우 PUT 요청을 사용
                const id = router.query.id;
                response = await axios.put(`/api/admin/lectures/${id}`, payload);
            } else {
                // 생성 모드일 경우 POST 요청을 사용
                response = await axios.post('/api/admin/lectures', payload);
            }

            if (response.status === 200 || response.status === 201) {
                // 성공적으로 처리되었을 경우 다른 페이지로 리다이렉트 또는 알림 표시
                router.back();
            } else {
                console.error('Failed to save the lecture');
            }
        } catch (error) {
            console.error('Error saving the lecture:', error);
        }
    };

    const handleCancel = () => {
        router.back();  // 이전 페이지로 이동
    };

    const addTag = (newTag) => {
        if (Array.isArray(newTag)) {
            setTags([...tags, ...newTag]);
        } else {
            setTags([...tags, newTag]);
        }
    };

    const removeTag = (index) => {
        const newTags = tags.filter((_, i) => i !== index);
        setTags(newTags);
    };


    const showAddTagModal = () => {
        // 모달을 열기 위해 상태를 변경합니다.
        setTagSearchModalOpen(true);
    };

    const handleModalClose = () => {
        // 모달을 닫기 위해 상태를 변경합니다.
        setTagSearchModalOpen(false);
    };

    console.log(tags);
    return (
        <>
            <Header />
            <section className={adminCommonStyle.backGroundSection}>
                <div className={adminCommonStyle.sideNavContainer}>
                    <AdminSideNavBar />
                </div>
                <div className={adminCommonStyle.mainContainer}>
                    <div className={adminLectureClassificaitonManagerStyle.lectureCreateTitle}>
                        강의 관리
                    </div>
                    <div className={adminLectureClassificaitonManagerStyle.lectureInsideContainer}>

                        <div className={adminLectureClassificaitonManagerStyle.lectureItemContainer}>
                            <div className={adminLectureClassificaitonManagerStyle.lectureInsideTitle}>{mode === 'edit' ? '강의 수정' : '강의 생성'} </div>
                            <TextField className={adminLectureClassificaitonManagerStyle.lectureTextField} label="강의명" value={lectureTitle} onChange={e => setLectureTitle(e.target.value)} />
                            <TextField className={adminLectureClassificaitonManagerStyle.lectureTextField} label="강의 소개" value={lectureDescription} onChange={e => setLectureDescription(e.target.value)} />
                            <div className={adminLectureClassificaitonManagerStyle.tagContainer}>
                                <Button variant="outlined" color="primary" onClick={showAddTagModal}>
                                    태그 추가
                                </Button>
                                <div className={adminLectureClassificaitonManagerStyle.selectedTagItems}>
                                    {tags.map((tag, index) => (
                                        <Chip className={adminLectureClassificaitonManagerStyle.selectedTagItem}
                                            key={tag.id}
                                            label={tag.name}
                                            onDelete={() => removeTag(index)}
                                            deleteIcon={<CloseIcon />}
                                            variant="outlined"
                                            onMouseEnter={(e) => e.target.style.color = 'darkerColorHere'}
                                            onMouseLeave={(e) => e.target.style.color = 'normalColorHere'}
                                        />
                                    ))}
                                </div>
                            </div>
                            <FormControl className={adminLectureClassificaitonManagerStyle.lectureFormControlContainer} component="fieldset" margin="normal">
                                <FormLabel component="legend">유저 권한</FormLabel>
                                <RadioGroup
                                    name="permissions"
                                    value={permissions}
                                    onChange={(e) => setPermissions(e.target.value)}

                                >
                                    <FormControlLabel value="user" control={<Radio />} label="User" />
                                    <FormControlLabel value="manager" control={<Radio />} label="Manager" />
                                    <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                                </RadioGroup>
                            </FormControl>
                            <div className={adminLectureClassificaitonManagerStyle.lectureBtnContainer}>
                                <Button variant="outlined" color="error" onClick={handleCancel}>
                                    취소
                                </Button>

                                <Button variant="outlined" color="primary" onClick={handleSave}>
                                    {mode === 'edit' ? '수정' : '생성'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <Footer />
            <AdminTagSearchModal
                open={tagSearchModalOpen}
                onClose={handleModalClose}
                // 모달에서 태그를 선택하면 addTag 함수를 호출합니다.
                onTagSelected={addTag}
                existingTags={tags}
            />
        </>
    );
}
