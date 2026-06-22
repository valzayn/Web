import Navbar from "../components/Navbar";
import Gallery from "./components/Gallery";
import Content from "./components/Content";
import Footer from "../components/Footer";
import Box from '@mui/material/Box';

function Main() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar active="1"/>
      <Gallery/>
      <Content/>
      <Footer />
    </Box>
  );
}

export default Main;