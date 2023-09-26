import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SideNavBar from '@/components/admin/side-navbar';
import TagSearchModal from '@/components/admin/admin-modal/tag-search-modal';
import { createLecture, fetchLecture, updateLecture } from '@/utils/api'
import { useAuthCheck } from '@/utils/auth-check'

import adminCommonStyle from '@/styles/admin/common.module.css';
import adminLectureManagementStyle from '@/styles/admin/lecture-management.module.css';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import CloseIcon from '@mui/icons-material/Close';


export default function LectureClassificationManager() {
    const router = useRouter();
    const { mode } = router.query;
    const [lectureTitle, setLectureTitle] = useState(mode === 'edit' ? '기존 강의명' : '');
    const [lectureContent, setLectureContent] = useState(mode === 'edit' ? '기존 강의 소개' : '');
    const [tags, setTags] = useState([]);
    const [tagSearchModalOpen, setTagSearchModalOpen] = useState(false);
    const [image, setImage] = useState(null); // 업로드할 이미지 파일
    const [imagePreviewUrl, setImagePreviewUrl] = useState(''); // 이미지 미리보기 URL

    useAuthCheck(true, true, false);

    useEffect(() => {
        const fetchLectureAndVideo = async () => {
            try {
                const id = router.query.id;

                if (mode === 'edit' && id) {
                    const data = await fetchLecture(id);
                    console.log(data.tagLectureList);
                    setLectureTitle(data.title);
                    setLectureContent(data.content);
                    setTags(data.tagLectureList);;
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
                content: lectureContent,
                tags: tags,
            };
            let response;
            if (mode === 'edit') {
                const id = router.query.id;
                response = await updateLecture(id, payload);
            } else {
                response = await createLecture(payload);
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


    const handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            setImage(file);
            setImagePreviewUrl(reader.result);
        }

        reader.readAsDataURL(file);
    }

    return (
        <>
            <section className={adminCommonStyle.backGroundSection}>
                <div className={adminCommonStyle.sideNavContainer}>
                    <SideNavBar />
                </div>
                <div className={adminCommonStyle.mainContainer}>
                    <div className={adminLectureManagementStyle.lectureCreateTitle}>
                        강의 관리
                    </div>
                    <div className={adminLectureManagementStyle.lectureInsideContainer}>

                        <div className={adminLectureManagementStyle.lectureItemContainer}>
                            <div className={adminLectureManagementStyle.lectureInsideTitle}>{mode === 'edit' ? '강의 수정' : '강의 생성'} </div>
                            <TextField className={adminLectureManagementStyle.lectureTextField} label="강의명" value={lectureTitle} onChange={e => setLectureTitle(e.target.value)} />
                            <TextField className={adminLectureManagementStyle.lectureTextField} label="강의 소개" value={lectureContent} onChange={e => setLectureContent(e.target.value)} />

                            <div className={adminLectureManagementStyle.imageUploadContainer}>
                                <input
                                    accept="image/*"
                                    className={adminLectureManagementStyle.input}
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    onChange={handleImageChange}
                                />
                                <label htmlFor="contained-button-file">
                                    <Button variant="outlined" component="span" color="primary">
                                        이미지 업로드
                                    </Button>
                                </label>
                                {imagePreviewUrl ? (
                                    <img src={imagePreviewUrl} className={adminLectureManagementStyle.imagePreview} alt="Image Preview" />
                                ) : (
                                    <div className={adminLectureManagementStyle.noImageText}>
                                        선택된 이미지가 없습니다
                                    </div>
                                )}
                            </div>
                            <div className={adminLectureManagementStyle.tagContainer}>
                                <Button variant="outlined" color="primary" onClick={showAddTagModal}>
                                    태그 추가
                                </Button>
                                <div className={adminLectureManagementStyle.selectedTagItems}>
                                    {tags.length > 0 ? (
                                        tags.map((tag, index) => (
                                            <Chip className={adminLectureManagementStyle.selectedTagItem}
                                                key={tag.tag.id}
                                                label={tag.tag.name}
                                                onDelete={() => removeTag(index)}
                                                deleteIcon={<CloseIcon />}
                                                variant="outlined"
                                                onMouseEnter={(e) => e.target.style.color = 'darkerColorHere'}
                                                onMouseLeave={(e) => e.target.style.color = 'normalColorHere'}
                                            />
                                        ))
                                    ) : (
                                        <div className={adminLectureManagementStyle.noTagText}>
                                            선택된 태그가 없습니다
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={adminLectureManagementStyle.lectureBtnContainer}>
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
            <TagSearchModal
                open={tagSearchModalOpen}
                onClose={handleModalClose}
                onTagSelected={addTag}
                existingTags={tags}
            />
        </>
    );
}
