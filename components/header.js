import React, { useState } from 'react';
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
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [users, setUsers] = useState([]);
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


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogin = (modalEmail, modalPassword) => {
        console.log(users);
        const foundUser = users.find((user) => user.email === modalEmail && user.password === modalPassword);

        if (foundUser) {
            setLoggedIn(true);
            if (foundUser.isAdmin) setIsAdmin(true);
            handleCloseModal();
            handleCloseUserMenu();
            setOpenLoginModal(false);
            setShowLoginMessage(true);
            setTimeout(() => {
                setShowLoginMessage(false);
            }, 1000);
        } else {
            setLoginError('이메일과 비밀번호가 일치하지 않습니다');
        }

    };

    const handleLogout = () => {
        setLoggedIn(false);
        setIsAdmin(false);
        handleCloseUserMenu();
        setShowLogoutMessage(true);
        setTimeout(() => {
            setShowLogoutMessage(false);
        }, 2000);
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



    const handleJoin = (joinEmail, joinPassword, employeeId) => {
        // admin 수정 필요
        const newUser = { id: users.length + 1, email: joinEmail, password: joinPassword, employeeId, isAdmin: true };
        setUsers([...users, newUser]);
        setLoggedIn(false);
        handleCloseUserMenu();
        setShowJoinMessage(true);
        setTimeout(() => {
            setShowJoinMessage(false);
        }, 2000);
        setOpenJoinModal(false);
    };

    const handleOpenFindPasswordModal = () => {
        setOpenLoginModal(false);
        setFindPasswordError('');
        setOpenFindPasswordModal(true);
    };



    const handleFindPassword = (email) => {
        const foundUser = users.find((user) => user.email === email);

        if (foundUser) {
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
            <AppBar position="static">
                <Toolbar disableGutters>
                    <Link href="/" >
                        <Image src="/logo_w.svg" alt="LOGO" width={100} height={32} href="/" />
                    </Link>

                    <Box sx={{ marginLeft: 'auto' }}>
                        {loggedIn ? (
                            <MenuItem onClick={handleOpenUserMenu}>
                                <Typography textAlign="center">My Info</Typography>
                            </MenuItem>
                        ) : (
                            <MenuItem onClick={handleOpenModal}>
                                <Typography textAlign="center">Login</Typography>
                            </MenuItem>
                        )}
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.label} onClick={handleCloseUserMenu}>
                                    <Link href={setting.path} passHref>
                                        <Typography textAlign="center">{setting.label}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                            {isAdmin ? (
                                <MenuItem>
                                    <Link href="/admin-page" passHref>
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
            </AppBar>

            {/* alert */}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={showLoginMessage}
                autoHideDuration={5000}
                onClose={() => setShowLoginMessage(false)}
                style={{ position: 'fixed', top: 50, left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}
            >
                <Alert severity="success" variant="filled" onClose={() => setShowLoginMessage(false)}>
                    로그인에 성공하였습니다.
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={showLogoutMessage}
                autoHideDuration={5000}
                onClose={() => setShowLogoutMessage(false)}
                style={{ position: 'fixed', top: 50, left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}
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
                style={{ position: 'fixed', top: 50, left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}
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
                style={{ position: 'fixed', top: 50, left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}
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
                users={users}
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
