
import { Box } from "@mui/material";
import Header from "./components/Header";
import Intro from "./components/Home/Intro";

export default function Home() {
  return (
    <div>
      <Header />
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
    </div>
  );

}
