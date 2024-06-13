import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  TextField,
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  MenuItem,
  Button,
  Checkbox,
  Box,
  Snackbar,
  Avatar,
  Alert,
  Typography,
  CircularProgress,
} from "@mui/material";
import { getCities, getCountries } from "../api/Countries_Cities";
import { supabase } from "../Supabase";
import { sideIMG } from "../Assests/FormBG.jpg";
import { hover } from "@testing-library/user-event/dist/hover";

const Form = () => {
  const fileInputRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [loading, setloading] = useState(false);

  const [datas, setDatas] = useState({
    FullName: "",
    LastName: "",
    Email: "",
    Phone: "",
    gender: "",
    married: false,
    country: "",
    city: "",
    Address: "",
    profileUrl: "",
    dob: "",
  });
console.log(datas);
  const [file, setFile] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePhotoUpload();
    setloading(true)

    setTimeout(async () => {
      if (uploaded) {
        const { data, error } = await supabase
          .from("registration_data")
          .insert([
            {
              firstName: datas.FullName,
              lastName: datas.LastName,
              email: datas.Email,
              phone: datas.Phone,
              dob: datas.dob,
              country: datas.country,
              city: datas.city,
              address: datas.Address,
              profileUrl: datas.profileUrl,
              gender: datas.gender,
              married: datas.married,
            },
          ])
          .select();
        if (error) {
          alert("data not added");
          console.log(error);
          return;
        }
        console.log("data added");
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          setloading(false)
        }, 4000);

        setDatas((prevData) =>
          Object.keys(prevData).reduce((acc, key) => {
            // Check if the key is a boolean type
            if (typeof prevData[key] === "boolean") {
              // If it's a boolean, retain its value
              acc[key] = false;
            } else {
              // If it's not a boolean, set it to an empty string
              acc[key] = "";
            }
            return acc;
          }, {})
        );
        
       
        setFile(null);
      }
    }, 3000);
  };

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    getCountries().then((countries) => {
      setCountries(countries);
    });
  }, []);

  useEffect(() => {
    if (datas.country !== "") {
      getCities(datas.country).then((cities) => {
        setCities(cities);
      });
    }
  }, [datas.country]);

  const handlePhotoUpload = async () => {
    const { data, error } = await supabase.storage
      .from("photo")
      .upload(`${datas.FullName}_${Date.now()}.jpeg`, file);
    if (error) {
      console.log(error);
      return;
    }
    setUploaded(true);
    setDatas({
      ...datas,
      profileUrl: `https://dmjpprlaeezazvpmotvw.supabase.co/storage/v1/object/public/${data.fullPath}`,
    });
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        mt: 4,
        paddingRight: { md: 15 },
      }}
    >
      <Stack component="form" onSubmit={handleSubmit} spacing={4}>
        <Stack
          direction="row"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            paddingRight: { md: 15 },
          }}
        >
          <Stack sx={{ textAlign: "left", height: "100%", display: "flex" }}>
            <Typography variant="h4" gutterBottom>
              {" "}
              Register
            </Typography>
            <Typography sx={{ fontSize: "12px" }} variant="p">
              {" "}
              Lorem ipsum dolor sit amet consectetur{" "}
              <span style={{ color: "#2eb893", textDecoration: "underline" }}>
                {" "}
                lorem ?
              </span>
            </Typography>
          </Stack>
          <Box>
            <Box>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  boxShadow: "1px 2px 10px #000f",
                  cursor: "pointer",
                }}
                onClick={handleAvatarClick}
                src={file ? URL.createObjectURL(file) : ""}
                alt="photo"
              />
            </Box>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => {
                setFile(e.target.files[0]);
                setSelected(!selected);
              }}
            />
          </Box>
        </Stack>

        <Stack direction="row" spacing={4}>
          <TextField
            size="small"
            required
            value={datas.FullName}
            onChange={(e) => {
              setDatas({ ...datas, FullName: e.target.value });
            }}
            fullWidth
            label="First name"
          />
          <TextField
            size="small"
            required
            value={datas.LastName}
            onChange={(e) => {
              setDatas({ ...datas, LastName: e.target.value });
            }}
            fullWidth
            label="Last name"
          />
        </Stack>

        <Stack direction="row" spacing={4}>
          <TextField
            size="small"
            required
            value={datas.Email}
            onChange={(e) => {
              setDatas({ ...datas, Email: e.target.value });
            }}
            fullWidth
            label="Email"
            type="email"
          />
          <TextField
            size="small"
            required
            value={datas.Phone}
            onChange={(e) => {
              let value = e.target.value;
              if (value.length <= 10 && value.match(/^\d+$/)) {
                setDatas({ ...datas, Phone: value });
              } else if (value.length > 10) {
                value = value.slice(0, 10);
                setDatas({ ...datas, Phone: value });
              } else {
                setDatas({ ...datas, Phone: "" });
              }
            }}
            fullWidth
            label="Phone"
            type="tel"
          />
        </Stack>

        <Stack direction="row" spacing={4}>
          <Stack direction="row">
            <FormControl required>
              <RadioGroup
                aria-labelledby="gender-label"
                name="gender-group"
                value={datas.gender}
                onChange={(e) => setDatas({ ...datas, gender: e.target.value })}
                row
              >
                <FormControlLabel
                  value="male"
                  control={<Radio size="small" />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio size="small" />}
                  label="Female"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio size="small" />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={datas.married}
                  onChange={(e) =>
                    setDatas({ ...datas, married: e.target.checked })
                  }
                />
              }
              label="Married"
            />
          </Stack>

          <TextField
            size="small"
            required
            value={datas.dob}
            onChange={(e) => setDatas({ ...datas, dob: e.target.value })}
            label="Date of Birth"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              max: new Date().toISOString().split("T")[0],
            }}
          />
        </Stack>

        <Stack direction="row" spacing={4}>
          <TextField
            size="small"
            required
            value={datas.country}
            fullWidth
            label="Country"
            select
            onChange={(e) => setDatas({ ...datas, country: e.target.value })}
          >
            {countries?.map((country) => (
              <MenuItem key={country.id} value={country.iso2}>
                {country.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            size="small"
            required
            value={datas.city}
            fullWidth
            label="City"
            select
            onChange={(e) => setDatas({ ...datas, city: e.target.value })}
          >
            {cities?.map((city) => (
              <MenuItem key={city.id} value={city.name}>
                {city.name}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        <TextField
          size="small"
          value={datas.Address}
          onChange={(e) => setDatas({ ...datas, Address: e.target.value })}
          fullWidth
          label="Address"
        />

        <Button
          gutterBottom
          sx={{
            backgroundColor: "#2eb893",
            color: "#fff",
            width: "140px",
            marginTop: "40px",
            boxShadow: "1px 30px 50px #1c7059",
            "&:hover": {
              backgroundColor: "#2eb893", // Keep the same background color on hover
              boxShadow: "1px 5px 10px #1c7059", // Remove the box shadow on hover
            },
          }}
          variant="contained"
          size="large"
          type="submit"
        >
          {loading ? (
            <CircularProgress color="inherit" size={25} />
          ) : !loading  ? (
            "Register"
          ) : (
            "Register"
          )}
        </Button>
      </Stack>

      <Stack>
        <FormControlLabel
          sx={{ marginTop: "40px" }}
          control={<Checkbox size="small" />}
          label={
            <Typography sx={{ fontSize: "12px", color: "#fff9" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perferendis, atque. Placeat odio obcaecati, pariatur corrupti
              nulla amet distinctio explicabo possimus est ab deserunt?
              Delectus, quas.
            </Typography>
          }
        />
      </Stack>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%", backgroundColor: "#2eb893", color: "#fff" }}
        >
          Registered
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Form;
