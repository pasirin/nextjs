import * as React from 'react';
import Head from 'next/head';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Unstable_Grid2';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/material/styles';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
})

export default function Test() {

  const handleSubmit = (event) => {
    event.preventDefault();
    handleWrongInfo();
    const data = new FormData(event.currentTarget);
    console.log({
      MSSV: data.get('MSSV'),
      password: data.get('password'),
    });

  };

  const [values, setValues] = React.useState({
    showPassword: false,
    error_login: false,
    helperText: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ 
      ...values,
      [prop]: event.target.value,
      helperText: "",
    });
  }
  
  const handleWrongInfo = () => {
    setValues({
      ...values,
      helperText: "Sai MSSV hoặc mật khẩu"
    })
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const theme = createTheme({ palette: { mode: 'dark' } });

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <link rel="icon" href="/fav.png" />
      </Head>
      <CssBaseline />
      <Grid2 container component="main" sx={{ height: '100vh' }}>
        <Grid2
          display={{ xs: "none", lg: "center" }}
          xs={6}
          sm={4}
          md={7}
          container
          sx={{
            animation: "fadeIn 3s",
            backgroundImage: 'linear-gradient(to bottom right, #007F48, #480080)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            position: "relative",
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Img component="img"
            sx={{
              animation: "fadeIn 5s",
            }}
            alt="Icon"
            src="/images/logo-removebg-preview.png" />
        </Grid2>
        <Grid2 noValidate xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              animation: "fadeIn 2s",
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Đăng Nhập
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                required
                id="MSSV"
                label="Mã số SV"
                name="MSSV"
                autoComplete="text"
                autoFocus
                onChange={handleChange('MSSV')}
                error={values.helperText === "" ? false : true }
              />
              <TextField
                error={values.helperText === "" ? false : true }
                margin="normal"
                fullWidth
                required
                name="password"
                label="Mật khẩu"
                type={values.showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                onChange={handleChange('password')}
                helperText={values.helperText}
                InputProps={{
                  endAdornment:
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Đăng Nhập
              </Button>
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </ThemeProvider>
  )
}