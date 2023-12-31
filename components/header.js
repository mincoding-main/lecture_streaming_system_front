import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { duplicateEmailCheck, createMember, loginMember } from '@/utils/api';
import headerStyles from '../styles/main/header.module.css';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import LoginModal from './modal/login-modal';
import JoinModal from './modal/join-modal';
import FindPasswordModal from './modal/find-password-modal';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const settings = [
    { label: 'Dashboard', path: '/dash-board/lecture-list' },
];

export default function Header() {
    const [anchorElMember, setAnchorElMember] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [openJoinModal, setOpenJoinModal] = useState(false);
    const [openFindPasswordModal, setOpenFindPasswordModal] = useState(false);
    const [loginError, setLoginError] = useState(null);
    const [findPasswordError, setFindPasswordError] = useState(null);
    const [showLoginMessage, setShowLoginMessage] = useState(false);
    const [showJoinMessage, setShowJoinMessage] = useState(false);
    const [showLogoutMessage, setShowLogoutMessage] = useState(false);
    const [showPasswordRecoverySuccess, setShowPasswordRecoverySuccess] = useState(false);
    const router = useRouter();


    useEffect(() => {
        checkLoggedIn();
    }, []);

    const handleOpenMemberMenu = (event) => {
        setAnchorElMember(event.currentTarget);
    };

    const handleCloseMemberMenu = () => {
        setAnchorElMember(null);
    };

    const handleLogin = async (modalEmail, modalPassword) => {
        try {
            const credentials = { email: modalEmail, password: modalPassword };
            const response = await loginMember(credentials);
            if (response.success) {
                localStorage.setItem('loggedIn', true); // 임시 사용 
                localStorage.setItem('role', response.payload.role);  // 임시 사용
                localStorage.setItem('id', response.payload.id); // 임시 사용
                setLoggedIn(true);

                if (response.payload.role === 'ADMIN') setIsAdmin(true);

                handleCloseModal();
                handleCloseMemberMenu();
                setOpenLoginModal(false);
                setShowLoginMessage(true);
                setTimeout(() => {
                    setShowLoginMessage(false);
                }, 1000);
            } else {
                setLoginError('이메일과 비밀번호가 일치하지 않습니다');
            }
        } catch (error) {
            console.error('유저 데이터를 가져오는데 실패했습니다:', error.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedIn'); // 임시 사용
        localStorage.removeItem('role'); // 임시 사용
        localStorage.removeItem('id');
        setLoggedIn(false);
        setIsAdmin(false);
        handleCloseMemberMenu();
        setShowLogoutMessage(true);
        setTimeout(() => {
            setShowLogoutMessage(false);
        }, 2000);
        // 메인 이외의 page에서는 알람이 보이지 않음
        router.push('/');
    };


    // 로그인 여부를 체크하는 함수
    const checkLoggedIn = () => {
        const loggedIn = JSON.parse(localStorage.getItem('loggedIn') || 'false');
        const role = localStorage.getItem('role');

        setLoggedIn(loggedIn);
        if (role === 'ADMIN') setIsAdmin(true);
    };

    const handleOpenModal = () => {
        setOpenLoginModal(true);
    };

    const handleCloseModal = () => {
        setLoginError('');
        setOpenLoginModal(false);
        setOpenJoinModal(false);
        setOpenFindPasswordModal(false);

    };


    const handleOpenJoinModal = () => {
        setOpenLoginModal(false);
        setFindPasswordError('');
        setOpenJoinModal(true);
    };



    const handleJoin = async (joinEmail, joinPassword) => {
        try {
            const newMember = {
                email: joinEmail,
                password: joinPassword,
            };

            await createMember(newMember);

            // 성공적으로 사용자가 추가된 경우에 처리
            setLoggedIn(false);
            handleCloseMemberMenu();
            setShowJoinMessage(true);
            setTimeout(() => {
                setShowJoinMessage(false);
            }, 2000);
            setOpenJoinModal(false);
        } catch (error) {
            // 오류가 발생한 경우 에러 메시지를 처리 (예: 서버 오류, 네트워크 오류 등)
            console.error('사용자 추가 실패:', error.message);
            // 에러를 상태로 설정하여 화면에 표시하거나 다른 처리를 할 수 있음
        }
    };

    const handleOpenFindPasswordModal = () => {
        setOpenLoginModal(false);
        setFindPasswordError('');
        setOpenFindPasswordModal(true);
    };



    const handleFindPassword = async (email) => {
        const postData = { email: email }
        const isDuplicate = await duplicateEmailCheck(postData);

        if (isDuplicate) {
            setOpenFindPasswordModal(false);
            setShowPasswordRecoverySuccess(true);
            setTimeout(() => {
                setShowPasswordRecoverySuccess(false);
            }, 1000);
        } else {
            setFindPasswordError('해당 이메일이 존재하지 않습니다.');
        }
    };


    return (
        <>
            <AppBar position="static" className={headerStyles.headerStyles}>
                <Toolbar disableGutters >
                    <Box className={headerStyles.rightToolbarBox}>
                        <Link href="/">
                            <Image src="/logo_w.svg" alt="LOGO" width={100} height={32} href="/" />
                        </Link>
                    </Box>
                    <Box className={headerStyles.leftToolbarBox} >
                        {loggedIn ? (
                            <MenuItem onClick={handleOpenMemberMenu}>
                                <Typography textAlign="center">My Info</Typography>
                            </MenuItem>
                        ) : (
                            <MenuItem onClick={handleOpenModal}>
                                <Typography textAlign="center">Login</Typography>
                            </MenuItem>
                        )}
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElMember}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            open={Boolean(anchorElMember)}
                            onClose={handleCloseMemberMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.label} onClick={handleCloseMemberMenu}>
                                    <Link href={setting.path} passHref>
                                        <Typography textAlign="center">{setting.label}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                            {isAdmin ? (
                                <MenuItem onClick={handleCloseMemberMenu}>
                                    <Link href="/admin/member-list" passHref>
                                        <Typography textAlign="center">Admin Page</Typography>
                                    </Link>
                                </MenuItem>
                            ) : null}
                            {loggedIn && (
                                <MenuItem onClick={handleLogout}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            )}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar >

            {/* alert */}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }
                }
                open={showLoginMessage}
                autoHideDuration={5000}
                onClose={() => setShowLoginMessage(false)}
                className={headerStyles.snackBar}
            >
                <Alert severity="success" variant="filled" onClose={() => setShowLoginMessage(false)}>
                    로그인에 성공하였습니다.
                </Alert>
            </Snackbar >
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={showLogoutMessage}
                autoHideDuration={5000}
                onClose={() => setShowLogoutMessage(false)}
                className={headerStyles.snackBar}
            >
                <Alert severity="info" variant="filled" onClose={() => setShowLogoutMessage(false)}>
                    정상적으로 로그아웃 되었습니다.
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={showJoinMessage}
                autoHideDuration={5000}
                onClose={() => setShowJoinMessage(false)}
                className={headerStyles.snackBar}
            >
                <Alert severity="success" variant="filled" onClose={() => setShowJoinMessage(false)}>
                    회원가입에 성공하였습니다. 로그인이 가능합니다.
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={showPasswordRecoverySuccess}
                autoHideDuration={5000}
                onClose={() => setShowPasswordRecoverySuccess(false)}
                className={headerStyles.snackBar}
            >
                <Alert severity="info" variant="filled" onClose={() => setShowPasswordRecoverySuccess(false)}>
                    작성하신 이메일로 임시 비밀번호를 전송하였습니다. 메일을 확인 부탁드립니다.
                </Alert>
            </Snackbar>

            {/* Modal */}
            <LoginModal
                open={openLoginModal}
                onClose={handleCloseModal}
                onLogin={handleLogin}
                onJoinClick={handleOpenJoinModal}
                onPasswordRecoveryClick={handleOpenFindPasswordModal}
                error={loginError}
            />

            <JoinModal
                open={openJoinModal}
                onClose={() => setOpenJoinModal(false)}
                onJoin={handleJoin}
            />
            <FindPasswordModal
                open={openFindPasswordModal}
                onClose={() => setOpenFindPasswordModal(false)}
                onPasswordRecovery={handleFindPassword}
                error={findPasswordError}
            />
        </>
    );
}
