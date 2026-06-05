import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const FooterContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.grey[600],
    color: 'white',
    padding: theme.spacing(2),
    textAlign: 'center',
    marginTop: 'auto',
}));

function Footer() {
    return (
        <FooterContainer>
            <Container maxWidth="xl">
                <Typography variant="body1">
                    Зайнулин В.С 4 подгруппа
                </Typography>
            </Container>
        </FooterContainer>
    );
}

export default Footer;