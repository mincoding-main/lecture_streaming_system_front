import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import adminTagDetailStyle from '@/styles/admin-tag-detail.module.css';



export default function AdminTagItem({ tag, handleOpen }) {
    return (
        <div key={tag.id} className={adminTagDetailStyle.tagItem}>
            <div className={adminTagDetailStyle.tagInfo}>
                <Grid container spacing={2}>
                    <Grid item xs={2}>{tag.id}</Grid>
                    <Grid item xs={10}>{tag.name}</Grid>
                </Grid>
            </div>
            <div className={adminTagDetailStyle.tagEditBtn}>
                <Button variant="contained" onClick={() => handleOpen(tag)}>
                    수정
                </Button>
            </div>
        </div>
    );
};