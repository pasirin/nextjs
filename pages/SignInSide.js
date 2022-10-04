import * as React from 'react';
import Head from 'next/head';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
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
});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({ palette: { mode: 'dark' } });

export default function SignInSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    handleWrongPassword();
    handleWrongMssv();
    const data = new FormData(event.currentTarget);
    console.log({
      MSSV: data.get('MSSV'),
      password: data.get('password'),
    });
    
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleWrongMssv = () => {
    setValues({
      ...values,
      error_mssv: !values.error_mssv,
    })
  }

  const handleWrongPassword = () => {
    setValues({
      ...values,
      error_pass: !values.error_pass,
    })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [values, setValues] = React.useState({
    showPassword: false,
    error_pass: false,
    error_mssv: false,
  });

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <link rel="icon" href="/fav.png" />
      </Head>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          container
          maxWidth={{
            md: 870
          }}
          sx={{
            animation: "fadeIn 3s",
            backgroundImage: 'linear-gradient(to bottom right, #007F48, #480080)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            position: "relative",
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid item>
          <Img component="img"
            sx={{
              animation: "fadeIn 5s",
            }}
            alt="Icon"
            src="/images/logo-removebg-preview.png"/>
          </Grid>
        </Grid>
        <Grid item noValidate xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              animation: "fadeIn 2s",
              my: 18,
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
                required
                fullWidth
                id="MSSV"
                label="Mã số SV"
                name="MSSV"
                autoComplete="text"
                autoFocus
                onChange={handleChange('MSSV')}
                error={values.error_mssv}
              />
              <TextField
                error={values.error_pass}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type={values.showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                onChange={handleChange('password')}
                InputProps={{endAdornment:
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>}}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Đăng Nhập
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}