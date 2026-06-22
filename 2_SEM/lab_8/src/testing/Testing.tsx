import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Quiz from './features/Quiz';

function Testing() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar active="4" />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
                <Quiz />
            </Container>
            <Footer />
        </Box>
    );
}

export default Testing;