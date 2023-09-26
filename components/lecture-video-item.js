import React from 'react';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import lectureDetailStyle from '@/styles/main/lecture-detail.module.css';
import { useRouter } from 'next/router';

export default function LectureListCard({ Videos, LectureId }) {
    const router = useRouter();

    return (
        <List className={lectureDetailStyle.videoContainer}>
            {Videos && Videos.length > 0 ? (
                Videos.map((video) => (
                    <ListItem
                        key={video.id}
                        className={lectureDetailStyle.videoListItem}
                    >
                        <ListItemButton
                            onClick={() => router.push(`/lecture/lecture-streaming/${LectureId}/${video.id}`)}
                            className={lectureDetailStyle.videoListBtn}
                        >
                            <ListItemText primary={video.title} secondary={video.content} />
                        </ListItemButton>
                    </ListItem>
                ))
            ) : (
                <div className={lectureDetailStyle.noneVideoListItem}>
                    <Typography>
                        해당 강의에 비디오 영상이 존재하지 않습니다. 관리자에게 문의해주세요.
                    </Typography>
                </div>
            )}
        </List>
    );
}
