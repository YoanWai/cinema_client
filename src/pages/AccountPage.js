import * as React from "react";

import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  TextField,
  CardHeader,
} from "@mui/material";

import fetcher from "../utils/fetchWithTokenUtil";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function AccountPage() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const [image, setImage] = React.useState(null);

  const checkUser = () => {
    if (!user) {
      alert("You are not authorized to access this page. Please login."); // TODO: Replace with a modal
      window.location.href = "/login";
    }
  };

  React.useEffect(() => {
    checkUser();
  }, []);

  React.useEffect(() => {
    handleImageUpload();
  }, [image]);

  const [inputUser, setInputUser] = React.useState(() => ({
    id: user.id,
    firstname: user.fullname.split(" ")[0],
    lastname: user.fullname.split(" ")[1],
    email: user.email,
    phone: user.phone,
    country: user.country,
    city: user.city,
  }));

  async function handleSubmit() {
    const userToSend = {
      id: inputUser.id,
      fullname: `${inputUser.firstname} ${inputUser.lastname}`,
      email: inputUser.email,
      phone: inputUser.phone,
      country: inputUser.country,
      city: inputUser.city,
    };

    const response = await fetcher(`/users/${user.id}`, "PUT", userToSend);
    if (response.status === 200) {
      alert("User updated successfully");
      dispatch({ type: "UPDATE_USER", payload: userToSend });
    } else {
      console.log(`Error updating user: ${response.status}`);
      alert("Error updating user");
    }
  }

  const handleImageUpload = async () => {
    if (!image) return;

    const newImage = new File([image], `${user.id}`, { type: image.type });
    const response = await fetcher(`/images`, "POST", newImage);
    if (response.status === 200) {
      alert("Image uploaded successfully");
    } else {
      console.log(`Error uploading image: ${response.status}`);
      alert("Error uploading image");
    }
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div style={{ textAlign: "center" }}>
              <Typography variant="h3">Account</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={4}>
                  <Card>
                    <CardContent>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Avatar
                          alt={user.fullname}
                          src={`http://localhost:5000/images/${user.id}`}
                          sx={{
                            height: 130,
                            mb: 2,
                            width: 130,
                          }}
                        />
                        <Typography gutterBottom variant="h5">
                          {user.fullname}
                        </Typography>
                        <Typography color="text.secondary" variant="body2">
                          {user.city}, {user.country}
                        </Typography>
                      </Box>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <Button fullWidth variant="text" component="label">
                        Upload picture
                        <input
                          hidden
                          accept="image/*"
                          multiple
                          type="file"
                          onChange={(event) => {
                            setImage(event.target.files[0]);
                          }}
                        />
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid xs={12} md={6} lg={8}>
                  <Card style={{ backgroundColor: "white" }}>
                    <CardHeader
                      subheader="The information can be edited"
                      title="Profile"
                    />
                    <CardContent sx={{ pt: 0 }}>
                      <Box sx={{ m: -1.5 }}>
                        <Grid container spacing={3}>
                          <Grid xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="First name"
                              name="firstName"
                              onChange={(e) =>
                                setInputUser({
                                  ...inputUser,
                                  firstname: e.target.value,
                                })
                              }
                              value={inputUser.firstname}
                            />
                          </Grid>
                          <Grid xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="Last name"
                              name="lastName"
                              onChange={(e) =>
                                setInputUser({
                                  ...inputUser,
                                  lastname: e.target.value,
                                })
                              }
                              value={inputUser.lastname}
                            />
                          </Grid>
                          <Grid xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="Email Address"
                              name="email"
                              onChange={(e) =>
                                setInputUser({
                                  ...inputUser,
                                  email: e.target.value,
                                })
                              }
                              value={inputUser.email}
                            />
                          </Grid>
                          <Grid xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="Phone Number"
                              name="phone"
                              onChange={(e) => {
                                setInputUser({
                                  ...inputUser,
                                  phone: e.target.value,
                                });
                              }}
                              value={inputUser.phone}
                            />
                          </Grid>
                          <Grid xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="Country"
                              name="country"
                              onChange={(e) =>
                                setInputUser({
                                  ...inputUser,
                                  country: e.target.value,
                                })
                              }
                              value={inputUser.country}
                            />
                          </Grid>
                          <Grid xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="City"
                              name="city"
                              onChange={(e) =>
                                setInputUser({
                                  ...inputUser,
                                  city: e.target.value,
                                })
                              }
                              value={inputUser.city}
                            ></TextField>
                          </Grid>
                        </Grid>
                      </Box>
                    </CardContent>
                    <Divider />
                    <CardActions sx={{ justifyContent: "flex-end" }}>
                      <Button variant="contained" onClick={handleSubmit}>
                        Save details
                      </Button>
                    </CardActions>
                  </Card>{" "}
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
