import { useParams, Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import structures from '../data';

function Building() {
    const { id } = useParams<{ id: string }>();
    const index = Number(id);
    const building = structures[index];

    if (!building) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Navbar active="1" />
                <Container maxWidth="lg" sx={{ mt: 4, flex: 1 }}>
                    <Typography variant="h4" color="error" align="center">
                        Здание не найдено
                    </Typography>
                </Container>
                <Footer />
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar active="1" />
            
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
                <Breadcrumbs 
                    separator={<NavigateNextIcon fontSize="small" />} 
                    aria-label="breadcrumb"
                    sx={{ mb: 3 }}
                >
                    <Link to="/" style={{ textDecoration: 'none', color: '#1976d2' }}>
                        Главная
                    </Link>
                    <Typography color="text.primary">{building.title}</Typography>
                </Breadcrumbs>

                <Box sx={{ textAlign: 'center' }}>
                    <Typography 
                        variant="h4" 
                        component="h1" 
                        gutterBottom
                        sx={{ 
                            color: 'grey',
                            mb: 3
                        }}
                    >
                        {building.title}
                    </Typography>
                    
                    <Box sx={{ 
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 4
                    }}>
                        <img 
                            src={building.img} 
                            alt={building.title}
                            style={{
                                width: '100%',
                                maxWidth: '600px',
                                height: 'auto',
                                borderRadius: '8px',
                                objectFit: 'cover'
                            }}
                        />
                    </Box>
                    
                    <Box sx={{ 
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                        gap: 4,
                        textAlign: 'justify'
                    }}>
                        {building.description.map((paragraph, idx) => (
                            <Typography 
                                key={idx} 
                                variant="body1"
                                sx={{ 
                                    lineHeight: 1.8,
                                    fontSize: '1.05rem'
                                }}
                            >
                                {paragraph}
                            </Typography>
                        ))}
                    </Box>
                </Box>
            </Container>

            <Footer />
        </Box>
    );
}

export default Building;