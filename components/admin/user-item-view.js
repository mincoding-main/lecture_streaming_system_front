import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import adminMemberDetailStyle from '@/styles/admin/member-detail.module.css';



export default function UserItemView({ user, handleOpen }) {
    const commonStyle = user.isDeleted === 1 ? adminMemberDetailStyle.deleted : '';
    return (
        <div key={user.id} className={adminMemberDetailStyle.userItem}>
            <div className={adminMemberDetailStyle.userInfo}>
                <Grid container spacing={2}>
                    <Grid item xs={1} className={commonStyle}>{user.id}</Grid>
                    <Grid item xs={3} className={commonStyle}>{user.email}</Grid>
                    <Grid item xs={2} className={commonStyle}>{user.employeeId}</Grid>
                    <Grid item xs={3} className={commonStyle}>{user.isAdmin ? '관리자' : '사용자'}</Grid>
                    <Grid item xs={3} className={commonStyle}>{user.lectureId.join(', ')}</Grid>
                </Grid>
            </div>
            <div className={adminMemberDetailStyle.userEditBtn}>
                <Button variant="contained" onClick={() => handleOpen(user)}>
                    수정
                </Button>
            </div>
        </div>
    );
};