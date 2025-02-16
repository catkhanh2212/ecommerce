
import { Box } from "@mui/material";
import Intro from "./components/Home/Intro";
import Deals from "./components/Home/Deals";
import OurChoice from "./components/Home/OurChoice";
import BestSelling from "./components/Home/BestSelling";
import Blogs from "./components/Home/Blogs";


export default function Home() {
  return (
    <div>
      <Box
        sx={{
          backgroundImage: 'url(/background.png)',
          backgroundSize: 'cover', 
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#FFFFFF',
          minHeight: '500px',
        }}
      >
        <Intro />
      </Box>
      <Deals />
      <OurChoice />
      <BestSelling />
      <Blogs />
    </div>
  );

}
