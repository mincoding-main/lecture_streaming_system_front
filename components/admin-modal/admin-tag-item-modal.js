import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import adminTagDetailModalStyle from '@/styles/admin-tag-detail-modal.module.css';
import Tooltip from '@mui/material/Tooltip';



export default function AdminTagItemModal({ tag, handleOpen, existingTags }) {
    const isAlreadyAdded = existingTags.some(existingTag => existingTag.id === tag.id);
    const tooltipTitle = isAlreadyAdded ? "이미 추가되었습니다" : "태그 추가";
    return (
        <div key={tag.id} className={adminTagDetailModalStyle.tagItem}>
            <div className={adminTagDetailModalStyle.tagInfo}>
                <Grid container spacing={2}>
                    <Grid item xs={2}>{tag.id}</Grid>
                    <Grid item xs={10}>{tag.name}</Grid>
                </Grid>
            </div>
            <div className={adminTagDetailModalStyle.tagEditBtn}>
                <Tooltip title={tooltipTitle}>
                    <Button variant="contained" onClick={() => handleOpen(tag)}>
                        +
                    </Button>
                </Tooltip>
            </div>
        </div>
    );
};