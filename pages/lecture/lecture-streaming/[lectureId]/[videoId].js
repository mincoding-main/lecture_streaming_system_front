import React, { useState, useEffect } from 'react';
import { fetchLectureVideo, fetchLecture } from '@/utils/api'
import { useRouter } from 'next/router';
import { useAuthCheck } from '@/utils/auth-check'
import { List, ListItem, ListItemText, Paper, ListItemButton } from '@mui/material';
import lectureStreamingStyle from '@/styles/main/lecture-streaming.module.css';

export default function LectureStreaming() {
    const router = useRouter();
    const { lectureId } = router.query;
    const { videoId } = router.query;
    const [tagetVideoItem, setTagetVideoItem] = useState(null);
    const [tagetVideoAllItems, setTagetVideoAllItems] = useState([]);

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
            const videoAllItems = lecture.lectureItemList;
            const sortedLectures = Array.from(videoAllItems).sort((a, b) => a.id - b.id);
            setTagetVideoAllItems(sortedLectures);

        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    if (!tagetVideoItem) {
        return <div>Loading...</div>;
    }

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
                                allowFullScreen
                                allow="autoplay"
                            />
                        </div>
                    </div>
                    <div className={lectureStreamingStyle.listContainer}>
                        <Paper elevation={3} className={lectureStreamingStyle.listPaper}>
                            <List>
                                {tagetVideoAllItems.map(video => (
                                    <ListItemButton
                                        key={video.id}
                                        onClick={() => {
                                            const videoPath = `/lecture/lecture-streaming/${lectureId}/${video.id}`;
                                            router.push(videoPath);
                                        }}
                                    >
                                        <ListItemText primary={video.title} secondary={video.content} />
                                    </ListItemButton>
                                ))}
                            </List>
                        </Paper>
                    </div>
                </div>
            </section>
        </>
    );
}
