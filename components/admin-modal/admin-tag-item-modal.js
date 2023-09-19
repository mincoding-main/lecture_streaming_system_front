import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import adminTagDetailModalStyle from '@/styles/admin-tag-detail-modal.module.css';



export default function AdminTagItemModal({ tag, handleOpen }) {
    return (
        <div key={tag.id} className={adminTagDetailModalStyle.tagItem}>
            <div className={adminTagDetailModalStyle.tagInfo}>
                <Grid container spacing={2}>
                    <Grid item xs={2}>{tag.id}</Grid>
                    <Grid item xs={10}>{tag.name}</Grid>
                </Grid>
            </div>
            <div className={adminTagDetailModalStyle.tagEditBtn}>
                <Button variant="contained" onClick={() => handleOpen(tag)}>
                    +
                </Button>
            </div>
        </div>
    );
};