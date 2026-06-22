import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button, Container, Drawer, IconButton, MenuList, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    position: 'static',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    borderTop: `4px double ${theme.palette.grey[400]}`,
    borderBottom: `4px double ${theme.palette.grey[400]}`,
    marginTop: theme.spacing(2),
}));

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 12px',
    minHeight: '64px',
});

const Logo = styled(Typography)({
    color: 'green',
    fontWeight: 'bold',
    marginLeft: '60px',
    fontSize: '18px',
    '@media (max-width: 600px)': {
        marginLeft: '16px',
        fontSize: '16px',
    },
});

const MenuButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ active }) => ({
    padding: '20px 10px',
    borderRadius: 0,
    color: active ? 'green' : 'black',
    fontWeight: active ? 'bold' : 'normal',
    borderRight: active ? `4px double grey` : 'none',
    borderLeft: active ? `4px double grey` : 'none',
    textTransform: 'none',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    '&:hover': {
        backgroundColor: 'transparent',
        color: 'green',
    },
}));

interface NavbarProps {
    active: string;
}

function Navbar({ active }: NavbarProps) {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const menuItems = [
        { text: 'Главная', id: 'main', path: '/' },
        { text: 'Список фильмов', id: 'list', path: '/list' },
        { text: 'Диаграммы', id: 'chart', path: '/chart' },
        { text: 'Проверь себя', id: 'testing', path: '/testing' }
    ];

    const isActive = (itemId: string) => active === itemId;

    return (
        <StyledAppBar>
            <Container maxWidth="xl">
                <StyledToolbar disableGutters>
                    <Logo variant="h6">
                        Фильмы
                    </Logo>
                    
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                        {menuItems.map((item) => (
                            <Link key={item.id} to={item.path} style={{ textDecoration: 'none' }}>
                                <MenuButton 
                                    active={isActive(item.id)}
                                >
                                    {item.text}
                                </MenuButton>
                            </Link>
                        ))}
                    </Box>
                    
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>    
                        <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>              
                        
                        <Drawer
                            anchor="top"
                            open={open}
                            onClose={toggleDrawer(false)}
                        >
                            <Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        p: 1,
                                    }}
                                >
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseRoundedIcon />
                                    </IconButton>
                                </Box>
                                <MenuList>
                                    {menuItems.map((item) => (
                                        <MenuItem 
                                            key={item.id}
                                            onClick={toggleDrawer(false)}
                                            component={Link}
                                            to={item.path}
                                            sx={{
                                                backgroundColor: isActive(item.id) 
                                                    ? 'rgba(25, 118, 210, 0.08)' 
                                                    : 'transparent',
                                                color: isActive(item.id) 
                                                    ? '#1976d2' 
                                                    : 'inherit',
                                                fontWeight: isActive(item.id) 
                                                    ? 'bold' 
                                                    : 'normal',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(25, 118, 210, 0.12)',
                                                    color: '#1976d2'
                                                }
                                            }}
                                        >
                                            {item.text}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </Box>
                        </Drawer>  
                    </Box>
                </StyledToolbar>
            </Container>  
        </StyledAppBar>
    );
}

export default Navbar;