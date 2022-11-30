import * as React from 'react';
import Head from 'next/head';
import Avatar from '@mui/material/Avatar';
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
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Fab from '@mui/material/Fab'
import LoadingButton from '@mui/lab/LoadingButton';
import { TableRow, Table, TableBody, TableCell, TableHead } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import Image from 'next/image';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
})

export default function Test() {
  const handleSubmit = (event) => {
    event.preventDefault()
    //handleWrongInfo()
    handleLoading()
    const data = new FormData(event.currentTarget);
    const postData = async () => {
      const payload = {
        mssv: data.get('MSSV'),
        password: data.get('password'),
        type: "dataOnly",
      }
      const response = await fetch('/api/DoItAllAPI', {
        method: "POST",
        body: JSON.stringify(payload),
      })
      return response
    }
    postData().then(async (data) => {
      if (data.status == 200) {
        //TODO
        console.log(data)
        handleLoading()
        setTable(await handleRecivedData(await data.json()))
        handleTransist()
      } else {
        if (data.status == 400) {
          handleWrongInfo()
          handleLoading()
        } else {
          const respo = await data.json()
          alert(respo.text)
          handleLoading()
        }
      }
    })
  };

  const [values, setValues] = React.useState({
    showPassword: false,
    error_login: false,
    helperText: "",
  });
  const [checked, setChecked] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  let [table, setTable] = React.useState(null)

  const handleLoading = () => {
    setLoading((prev) => !prev)
  }

  const handleTransist = () => {
    setChecked((prev) => !prev)
    if (loading) {
      handleLoading()
    }
  }

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

  const handleRecivedData = async function (SubjectList) {
    const rows = 14
    const columns = 9
    const array = Array.from(Array(rows), () => new Array(columns).fill(''))
    for (let i = 0; i < 14; i++) {
      array[i][0] = i + 1
      array[i][1] = (i + 7) + "h00' - " + (i + 7) + "h50'"
    }
    SubjectList.forEach(element => {
      for (let i = 0; i < element.Date.length; i++) {
        let row = element.time[i].split(' - ')[0] - 1
        let col
        if (element.Date[i] == "CN") {
          col = 8
        }
        if (col == undefined) {
          col = element.Date[i].substring(1)
        }
        var temp = JSON.parse(JSON.stringify(element))
        temp.Date = JSON.parse(JSON.stringify(element.Date[i]))
        temp.time = JSON.parse(JSON.stringify(element.time[i]))
        array[row][col] = temp
      }
    });

    const emptyCell = new Array(14).fill(7)
    for (let i = 0; i < rows; i++) {
      for (let j = 2; j < columns; j++) {
        if (array[i][j] != '') {
          const span = array[i][j].time.split(' - ')[1] - array[i][j].time.split(' - ')[0] + 1
          for (let k = i; k < i + span; k++) {
            emptyCell[k]--
          }
        }
      }
    }

    const table = array.map((row, i) => {
      let count = 0
      const rows = row.map((cell, j) => {
        if (j <= 1) {
          return <TableCell key={j} align="center">{cell}</TableCell>
        } else if (cell != '') {
          const span = cell.time.split(' - ')[1] - cell.time.split(' - ')[0] + 1
          const bgcolor = "#" + cell.bgcolor
          const color = "#" + cell.font_color
          const text = cell.Name + "/" + cell.ID + "/" + cell.where
          return <TableCell key={j} align="center" rowSpan={span} sx={{ bgcolor: bgcolor, color: color }}>{text.split("/").map((text, index) => (
            <p key={index}>{text}</p>
          ))}</TableCell>
        } else {
          if (count < emptyCell[i]) {
            count++
            return <TableCell key={j}></TableCell>
          }
        }
      })
      return <TableRow key={i}>{rows}</TableRow>
    })
    return table
  }

  const theme = createTheme({ palette: { mode: 'dark' } });

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <link rel="icon" href="/fav.png" />
      </Head>
      <Slide direction="down" in={checked} mountOnEnter unmountOnExit>
        <div>
          <CssBaseline />
          <Grid2 container component="main" sx={{ height: '100vh' }}>
            <Grid2
              xs={0}
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
                    error={values.helperText === "" ? false : true}
                  />
                  <TextField
                    error={values.helperText === "" ? false : true}
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
                  <LoadingButton
                    type="submit"
                    fullWidth
                    loading={loading}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Đăng Nhập
                  </LoadingButton>
                </Box>
              </Box>
            </Grid2>
          </Grid2>
        </div>
      </Slide>
      <Slide direction="up" in={!checked} mountOnEnter unmountOnExit>
        <div style={{ overflow: 'auto' }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Fab color="default" aria-label="Go Back" onClick={handleTransist}>
              <CloseIcon />
            </Fab>
          </div>
          <Box
            sx={{
              bgcolor: 'black',
              borderColor: 'text.primary',
              border: 20, borderRadius: '16px'
            }}>
            <TableContainer sx={{ maxHeight: 'auto' }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Tiết</TableCell>
                    <TableCell align="center">Thời gian học</TableCell>
                    <TableCell align="center">Thứ 2</TableCell>
                    <TableCell align="center">Thứ 3</TableCell>
                    <TableCell align="center">Thứ 4</TableCell>
                    <TableCell align="center">Thứ 5</TableCell>
                    <TableCell align="center">Thứ 6</TableCell>
                    <TableCell align="center">Thứ 7</TableCell>
                    <TableCell align="center">CN</TableCell>
                  </TableRow>
                </TableHead>
                <colgroup>
                  <col style={{ width: '1%' }} />
                  <col style={{ width: '8%' }} />
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '10%' }} />
                </colgroup>
                <TableBody>
                  {table}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </div>
      </Slide>
    </ThemeProvider>
  )
}