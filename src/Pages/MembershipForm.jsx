import { Box, Grid } from "@mui/material";
import React from "react";
import Form from "../Components/Form";
// import formIMG from "../Assests/Images/FormBG.jpg";
import sideIMG from "../Assests/FormBG.jpg"


const MembershipForm = () => {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid 
  item
  md={4}
  lg={4}
  sx={{
    display: { xs: 'none', sm: 'none', md: 'block' },
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
    filter: 'brightness(65%)'
  }}
>
  <img 
    style={{ width: '100%', height: '100%', objectFit: 'cover'   }} 
    src={sideIMG} 
    alt="Side image" 
  />
</Grid>
 
      <Grid
        xs={12}
        sm={12}
        md={9}
        lg={8}
        //   sx={{display:"flex"}}
      >
        <Form />
      </Grid>
    </Grid>
  );
};

export default MembershipForm;
