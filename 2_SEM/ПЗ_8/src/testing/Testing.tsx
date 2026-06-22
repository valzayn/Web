import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Quiz from './components/Quiz';

function Testing() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar active="testing" />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
                    Проверь себя
                </Typography>
                <Quiz />
            </Container>
            <Footer />
        </Box>
    );
}

export default Testing;