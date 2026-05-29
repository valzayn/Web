import AppBar from '@mui/material/AppBar';
import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { styled } from '@mui/material/styles';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    border: '1px solid',
    borderColor: theme.palette.divider,
    padding: '8px 12px',
}));

interface ComponentProps {
    active: string;
}

function Navbar({ active }: ComponentProps) {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const menuItems = [
        { text: 'Главная', id: '1' },
        { text: 'Список зданий', id: '2' },
        { text: 'Контакты', id: '3' }
    ];

    const isActive = (itemId: string) => active === itemId;

    return (
        <AppBar      
            position="static"
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                mt: '28px',
            }}
        >
            <Container maxWidth="xl">
                <StyledToolbar>
                    <Typography variant="h6" sx={{ color: '#5d8aa8' }}>
                        Самые высокие здания и сооружения
                    </Typography>
                    
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                        {menuItems.map((item) => (
                            <Button 
                                key={item.id}
                                variant={isActive(item.id) ? "contained" : "text"}
                                color="info" 
                                size="medium"
                                sx={{
                                    '&:hover': {
                                        backgroundColor: isActive(item.id) 
                                            ? undefined 
                                            : 'rgba(25, 118, 210, 0.08)',
                                        color: '#1976d2'
                                    }
                                }}
                            >
                                {item.text}
                            </Button>
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
        </AppBar>
    );
}

export default Navbar;