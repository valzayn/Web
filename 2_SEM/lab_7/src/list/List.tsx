import Navbar from "../components/Navbar";
import BuildingsGrid from "./components/BuildingsGrid";
import Footer from "../components/Footer";
import Box from '@mui/material/Box';

function List() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar active="2"/>
            <BuildingsGrid/>
            <Footer />
        </Box>
    );
}

export default List;