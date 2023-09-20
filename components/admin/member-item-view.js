import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import adminMemberDetailStyle from '@/styles/admin/member-detail.module.css';



export default function MemberItemView({ member, handleOpen }) {
    const commonStyle = member.isDeleted === 1 ? adminMemberDetailStyle.deleted : '';
    return (
        <div key={member.id} className={adminMemberDetailStyle.memberItem}>
            <div className={adminMemberDetailStyle.memberInfo}>
                <Grid container spacing={2}>
                    <Grid item xs={1} className={commonStyle}>{member.id}</Grid>
                    <Grid item xs={4} className={commonStyle}>{member.email}</Grid>
                    <Grid item xs={3} className={commonStyle}>{member.employeeNumber}</Grid>
                    <Grid item xs={4} className={commonStyle}>{member.role ? '관리자' : '사용자'}</Grid>
                </Grid>
            </div>
            <div className={adminMemberDetailStyle.memberEditBtn}>
                <Button variant="contained" onClick={() => handleOpen(member)}>
                    수정
                </Button>
            </div>
        </div>
    );
};