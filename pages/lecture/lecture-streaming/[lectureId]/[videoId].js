import React, { useState, useEffect } from 'react';
import { fetchLectureVideo, fetchLecture } from '@/utils/api'
import { useRouter } from 'next/router';
import { useAuthCheck } from '@/utils/auth-check'
import { Button, List, ListItem, ListItemText, Paper } from '@mui/material';
import lectureStreamingStyle from '@/styles/main/lecture-streaming.module.css';
// ckEditor 부분
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';


export default function LectureStreaming() {
    const router = useRouter();
    const { lectureId } = router.query;
    const { videoId } = router.query;
    const [tagetVideoItem, setTagetVideoItem] = useState(null);
    const [tagetVideoAllItems, setTagetVideoAllItems] = useState([]);

    // ckEditor 부분
    // const [editMode, setEditMode] = useState(false);
    // const [isAdmin, setIsAdmin] = useState(false); // 사용자의 권한 여부를 나타내는 상태 변수

    useAuthCheck(true, true, true);

    useEffect(() => {
        if (lectureId) {
            fetchLectureAllVideoData(lectureId)
            fetchLectureVideoData(lectureId, videoId);
        }
    }, [lectureId, videoId]);

    const fetchLectureVideoData = async (lectureId, videoId) => {
        try {
            const videoItem = await fetchLectureVideo(lectureId, videoId);
            setTagetVideoItem(videoItem);

        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    const fetchLectureAllVideoData = async (lectureId) => {
        try {
            const lecture = await fetchLecture(lectureId);
            setTagetVideoAllItems(lecture.lectureItemList);

        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    if (!tagetVideoItem) {
        return <div>Loading...</div>;
    }

    // ckEditor 부분
    // const toggleEditMode = () => {
    //     setEditMode(!editMode);
    // };

    // const handleSave = () => {
    //     setEditMode(false);
    // };

    return (
        <>
            <section className={lectureStreamingStyle.streamingIntroSection}>
                <div className={lectureStreamingStyle.streamingContainer}>
                    <div className={lectureStreamingStyle.streamingVideoContainer}>
                        <div className={lectureStreamingStyle.videoTitleText}>
                            {tagetVideoItem.title}
                        </div>
                        <div className={lectureStreamingStyle.streamingVideo}>
                            <iframe
                                src={tagetVideoItem.video.src + "&autoplay=1"}
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                allowFullScreen
                                allow="autoplay"
                            />
                        </div>
                        {/*ckEditor 부분 나중에 필요하면 추가*/}
                        {/* {editMode ? (
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
                        )} */}
                    </div>
                    <div className={lectureStreamingStyle.listContainer}>
                        <Paper elevation={3} className={lectureStreamingStyle.listPaper}>
                            <List>
                                {tagetVideoAllItems.map(video => (
                                    <ListItem
                                        key={video.id}
                                        button
                                        onClick={() => {
                                            const videoPath = `/lecture/lecture-streaming/${lectureId}/${video.id}`;
                                            router.push(videoPath);
                                        }}
                                    >
                                        <ListItemText primary={video.title} secondary={video.content} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </div>
                </div>
            </section>
        </>
    );
}
