import React, { useState } from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import Modal from '@mui/material/Modal';
import LoginModal from './modal/login-modal';
import JoinModal from './modal/join-modal'; // Import the JoinModal component
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const settings = [
    { label: 'Dashboard', path: '/dash-board/lecture-list' },
];

export default function Header() {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openLoginModal, setOpenModal] = useState(false);
    const [openJoinModal, setOpenJoinModal] = useState(false); // State for the JoinModal
    const [error, setError] = useState('');
    const [showLoginMessage, setShowLoginMessage] = useState(false);
    const [showJoinMessage, setShowJoinMessage] = useState(false);
    const [showLogoutMessage, setShowLogoutMessage] = useState(false);


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogin = (modalEmail, modalPassword) => {

        if (modalEmail === '' || modalPassword === '') {
            setError('이메일과 비밀번호를 입력해주세요.');
            return;
        }
        // Handle login logic here
        // 로그인 처리 및 admin 확인 처리 필요
        if (modalEmail === 'aaa' && modalPassword === 'aaa') {
            // Replace 'your_valid_email' and 'your_valid_password' with the actual valid email and password
            setLoggedIn(true);
            setIsAdmin(true);
            handleCloseModal();
            handleCloseUserMenu();
            setOpenModal(false); // Add this line to close the modal after successful login
            setShowLoginMessage(true);
            setTimeout(() => {
                setShowLoginMessage(false);
            }, 2000);
        } else {
            setError('이메일과 비밀번호가 일치하지 않습니다');
        }

    };

    const handleLogout = () => {
        // Handle logout logic here
        setLoggedIn(false);
        setIsAdmin(false);
        handleCloseUserMenu();
        setShowLogoutMessage(true); // Show logout message when logged out
        setTimeout(() => {
            setShowLogoutMessage(false);
        }, 2000);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setError('');
        setOpenModal(false);
    };

    // Function to handle opening the JoinModal
    const handleOpenJoinModal = () => {
        setOpenModal(false); // Close the login modal
        setError('');
        setOpenJoinModal(true); // Open the join modal
    };


    // New function to handle join logic
    const handleJoin = (joinEmail, joinPassword) => {
        // Handle join logic here
        // Implement your logic for new user registration
        setLoggedIn(false);
        setIsAdmin(false);
        handleCloseUserMenu();
        setShowJoinMessage(true);
        setTimeout(() => {
            setShowJoinMessage(false);
        }, 2000);
        setOpenJoinModal(false); // Close the join modal after successful join
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar disableGutters>
                    <Link href="/">
                        <Image src="/logo_w.svg" alt="LOGO" width={100} height={32} href="/" />
                    </Link>

                    <Box sx={{ flexGrow: 1 }}>
                        {/* Place your navigation buttons here */}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
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
                autoHideDuration={1000}
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
                autoHideDuration={1000}
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
                autoHideDuration={1000}
                onClose={() => setShowJoinMessage(false)}
                style={{ position: 'fixed', top: 50, left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}
            >
                <Alert severity="success" variant="filled" onClose={() => setShowJoinMessage(false)}>
                    회원가입에 성공하였습니다. 로그인이 가능합니다.
                </Alert>
            </Snackbar>

            {/* Modal */}
            <LoginModal
                open={openLoginModal}
                onClose={handleCloseModal}
                onLogin={handleLogin}
                error={error}
                onJoinClick={handleOpenJoinModal} // Pass the function to handle opening the JoinModal
            />

            <JoinModal
                open={openJoinModal}
                onClose={() => setOpenJoinModal(false)} // Close the JoinModal
                onJoin={handleJoin} // Pass the function to handle join logic
            />
        </>
    );
}
