import Navbar from "../components/Navbar";
import FilmsGrid from "./components/FilmsGrid";
import Footer from "../components/Footer";
import Box from '@mui/material/Box';

function List() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar active="list" />
            <FilmsGrid />
            <Footer />
        </Box>
    );
}

export default List;