import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/header';
import Footer from '@/components/footer';
import SideNavBar from '@/components/admin/side-navbar';
import TagSearchModal from '@/components/admin/admin-modal/tag-search-modal';
import axios from 'axios';

import adminCommonStyle from '@/styles/admin/common.module.css';
import adminLectureClassificaitonManagerStyle from '@/styles/admin/lecture-classification-manager.module.css';

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
    const [tagSearchModalOpen, setTagSearchModalOpen] = useState(false);



    useEffect(() => {
        const fetchLectureAndVideo = async () => {
            try {
                const id = router.query.id;

                if (mode === 'edit' && id) {
                    const response = await axios.get(`/api/admin/lectures/${id}`);
                    setLectureTitle(response.data.title);
                    setLectureDescription(response.data.description);
                    setTags(response.data.tags);
                    setPermissions(response.data.permissions);
                }
            } catch (error) {
                console.error('Error fetching the lecture:', error);
            }
        };

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
                const id = router.query.id;
                response = await axios.put(`/api/admin/lectures/${id}`, payload);
            } else {
                response = await axios.post('/api/admin/lectures', payload);
            }

            if (response.status === 200 || response.status === 201) {
                router.back();
            } else {
                console.error('Failed to save the lecture');
            }
        } catch (error) {
            console.error('Error saving the lecture:', error);
        }
    };

    const handleCancel = () => {
        router.back();
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
        setTagSearchModalOpen(true);
    };

    const handleModalClose = () => {
        setTagSearchModalOpen(false);
    };

    console.log(tags);
    return (
        <>
            <Header />
            <section className={adminCommonStyle.backGroundSection}>
                <div className={adminCommonStyle.sideNavContainer}>
                    <SideNavBar />
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
            <TagSearchModal
                open={tagSearchModalOpen}
                onClose={handleModalClose}
                onTagSelected={addTag}
                existingTags={tags}
            />
        </>
    );
}
