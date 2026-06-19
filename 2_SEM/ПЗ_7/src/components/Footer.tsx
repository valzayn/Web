import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const FooterContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
    padding: theme.spacing(3, 0),
    marginTop: 'auto',
    textAlign: 'center',
}));

function Footer() {
    return (
        <FooterContainer>
            <Container maxWidth="xl">
                <Typography variant="body1">
                    Зайнулин Валентин 4 Подгруппа
                </Typography>
            </Container>
        </FooterContainer>
    );
}

export default Footer;