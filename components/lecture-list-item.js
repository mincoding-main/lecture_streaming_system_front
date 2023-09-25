import React from 'react';
import config from '@/config';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CardMedia from '@mui/material/CardMedia';
import { useRouter } from 'next/router';
import lectureListDetailStyle from '@/styles/main/lecture-list-detail.module.css'

export default function LectureListCard({ lectureData }) {
    const router = useRouter();
    const baseURL = config.imageBaseURL
    console.log(lectureData)
    return (
        <List className={lectureListDetailStyle.listContainer}>
            {lectureData.map((lecture) => (
                <ListItem
                    key={lecture.lecture.id}
                    component="div"
                    disablePadding
                    className={lectureListDetailStyle.listItem}
                >
                    <ListItemButton
                        onClick={() => router.push(`/lecture/lecture-detail/${lecture.lecture.id}`)}
                        className={lectureListDetailStyle.listItemBtn}
                    >
                        <CardMedia
                            component="img"
                            image={`${baseURL}/${lecture.lecture.img.image_name}`}
                            alt={lecture.lecture.title}
                            className={lectureListDetailStyle.cardMedia}
                        />
                        <ListItemText primary={lecture.lecture.title} secondary={lecture.lecture.content} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
}
