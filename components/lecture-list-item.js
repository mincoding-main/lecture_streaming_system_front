import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CardMedia from '@mui/material/CardMedia';
import { useRouter } from 'next/router';

export default function LectureListCard({ lectureData }) {
    const router = useRouter();

    return (
        <List sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {lectureData.map((lecture) => (
                <ListItem
                    key={lecture.id}
                    component="div"
                    disablePadding
                    sx={{
                        width: '100%',
                        maxWidth: 800,
                        marginBottom: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#1e90ff0f',
                        borderRadius: '0.5rem',
                    }}
                >
                    <ListItemButton
                        onClick={() => router.push(`/lecture/lecture-detail/${lecture.id}`)}
                        sx={{ width: '100%', borderRadius: '0.5rem' }}
                    >
                        <CardMedia
                            component="img"
                            height="140"
                            image={lecture.imageUrl}
                            alt={lecture.title}
                            sx={{ width: '25%', marginBottom: '1rem', marginRight: '1rem' }}
                        />
                        <ListItemText primary={lecture.title} secondary={lecture.content} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
}
