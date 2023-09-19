import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import adminUserDetailStyle from '@/styles/admin/user-detail.module.css';



export default function AdminUserItem({ user, handleOpen }) {
    const commonStyle = user.isDeleted === 1 ? adminUserDetailStyle.deleted : '';
    return (
        <div key={user.id} className={adminUserDetailStyle.userItem}>
            <div className={adminUserDetailStyle.userInfo}>
                <Grid container spacing={2}>
                    <Grid item xs={1} className={commonStyle}>{user.id}</Grid>
                    <Grid item xs={3} className={commonStyle}>{user.email}</Grid>
                    <Grid item xs={2} className={commonStyle}>{user.employeeId}</Grid>
                    <Grid item xs={3} className={commonStyle}>{user.isAdmin ? '관리자' : '사용자'}</Grid>
                    <Grid item xs={3} className={commonStyle}>{user.lectureId.join(', ')}</Grid>
                </Grid>
            </div>
            <div className={adminUserDetailStyle.userEditBtn}>
                <Button variant="contained" onClick={() => handleOpen(user)}>
                    수정
                </Button>
            </div>
        </div>
    );
};