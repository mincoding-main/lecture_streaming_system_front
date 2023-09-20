import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/router';

export default function LectureListCard({ Videos, LectureId }) {
    const router = useRouter();

    return (
        <List sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {Videos.map((video) => (
                <ListItem
                    key={video.id}
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
                        onClick={() => router.push(`/lecture/lecture-streaming/${LectureId}/${video.id}`)}
                        sx={{ width: '100%', borderRadius: '0.5rem' }}
                    >
                        <ListItemText primary={video.title} secondary={video.content} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
}
