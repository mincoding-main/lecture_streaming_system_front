import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import { useRouter } from 'next/router';

const settings = [
    { label: 'Dashboard', path: '/dash-board/lecture-list' },
];

export default function Header() {
    const [anchorElUser, setAnchorElUser] = useState(null);
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

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogin = async (modalEmail, modalPassword) => {
        try {
            const response = await axios.get('/api/users'); // GET 요청을 보내서 유저 데이터를 받아옵니다.
            const userData = response.data;

            // 서버에서 받아온 유저 데이터를 기반으로 로그인 처리
            const foundUser = userData.find((user) => user.email === modalEmail && user.password === modalPassword);

            if (foundUser) {
                sessionStorage.setItem('user', JSON.stringify(foundUser));
                setLoggedIn(true);
                console.log(foundUser.isAdmin)
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
        } catch (error) {
            console.error('유저 데이터를 가져오는데 실패했습니다:', error.message);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('user');
        setLoggedIn(false);
        setIsAdmin(false);
        handleCloseUserMenu();
        setShowLogoutMessage(true);
        setTimeout(() => {
            setShowLogoutMessage(false);
        }, 2000);
        // 메인 이외의 page에서는 알람이 보이지 않음
        router.push('/');
    };


    // 로그인 여부를 체크하는 함수
    const checkLoggedIn = () => {
        // 로그인 상태를 확인하는 로직
        // 예를 들어, 로컬 스토리지나 쿠키에서 로그인 상태를 가져올 수 있습니다.
        const user = JSON.parse(sessionStorage.getItem('user'));
        setLoggedIn(!!user); // 유저 정보가 있으면 로그인 상태로 설정
        if (user && user.isAdmin) {
            setIsAdmin(true); // 만약 사용자가 admin인 경우에 isAdmin 상태를 true로 설정
        }
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



    const handleJoin = async (joinEmail, joinPassword, employeeId) => {
        try {
            // 새로운 사용자 정보
            const newUser = {
                email: joinEmail,
                password: joinPassword,
                employeeId,
                isAdmin: true,
            };

            // 서버로 POST 요청을 보냄
            const response = await axios.post('/api/users', newUser);

            // 응답으로 받은 데이터 확인
            const addedUser = response.data;
            console.log('새로운 사용자 추가됨:', addedUser);

            // 성공적으로 사용자가 추가된 경우에 처리
            setLoggedIn(false);
            handleCloseUserMenu();
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

        const response = await axios.get('/api/users'); // GET 요청을 보내서 유저 데이터를 받아옵니다.
        const userData = response.data;

        const foundUser = userData.find((user) => user.email === email);

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
                    <Box sx={{ marginLeft: '20px' }}>
                        <Link href="/">
                            <Image src="/logo_w.svg" alt="LOGO" width={100} height={32} href="/" />
                        </Link>
                    </Box>

                    <Box sx={{ marginRight: '20px', marginLeft: 'auto' }}>
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
