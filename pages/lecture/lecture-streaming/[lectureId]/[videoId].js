
import React, { useState, useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import axios from 'axios';
import { useRouter } from 'next/router';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { Button, List, ListItem, ListItemText, Paper } from '@mui/material';
import lectureStreamingStyle from '@/styles/main/lecture-streaming.module.css';


export default function LectureStreaming() {
    const router = useRouter();
    const { lectureId } = router.query;
    const { videoId } = router.query;
    const [lecture, setLecture] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedContent, setEditedContent] = useState(""); // 초기값 설정
    const [isAdmin, setIsAdmin] = useState(false); // 사용자의 권한 여부를 나타내는 상태 변수

    useEffect(() => {
        if (lectureId) {
            axios.get(`/api/lectures/${lectureId}`).then((response) => {
                setLecture(response.data);
                setEditedContent(response.data.videos[videoId - 1].url);
            });
        }
    }, [lectureId, videoId]);

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleSave = () => {
        // 수정된 내용을 저장하는 로직을 여기에 추가
        setEditMode(false); // 편집 모드 종료
    };

    if (!lecture) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <section className={lectureStreamingStyle.streamingIntroSection}>
                <div className={lectureStreamingStyle.streamingContainer}>
                    <div className={lectureStreamingStyle.streamingVideoContainer}>
                        <div className={lectureStreamingStyle.videoTitleText}>
                            {lecture.videos[videoId - 1].title}
                        </div>
                        {editMode ? (
                            <div className={lectureStreamingStyle.streamingVideo}>
                                <CKEditor
                                    style={{ height: '300px' }}
                                    editor={ClassicEditorBuild}
                                    data={editedContent + "&autoplay=1"}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setEditedContent(data);
                                    }}
                                />
                            </div>
                        ) : (
                            <div className={lectureStreamingStyle.streamingVideo}>
                                <iframe
                                    src={editedContent + "&autoplay=1"}
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    allowFullScreen
                                    allow="autoplay"
                                />
                            </div>
                        )}
                        {isAdmin && (
                            <div>
                                {editMode ? (
                                    <Button variant="contained" onClick={handleSave} className={lectureStreamingStyle.editModeBtn}>
                                        저장
                                    </Button>
                                ) : (
                                    <Button variant="contained" onClick={toggleEditMode} className={lectureStreamingStyle.editModeBtn}>
                                        수정
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                    <div className={lectureStreamingStyle.listContainer}>
                        <Paper elevation={3} className={lectureStreamingStyle.listPaper}>
                            <List>
                                {lecture.videos.map((video, index) => (
                                    <ListItem
                                        key={video.id}
                                        button
                                        onClick={() => {
                                            // 해당 강의로 이동하는 경로 생성
                                            const videoPath = `/lecture/lecture-streaming/${lectureId}/${index + 1}`;
                                            router.push(videoPath); // 해당 경로로 이동
                                        }}
                                    >
                                        <ListItemText primary={`강의 ${index + 1}`} secondary={video.title} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
