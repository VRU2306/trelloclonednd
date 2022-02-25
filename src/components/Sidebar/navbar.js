import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Apps from '../side/App'
import Kanaban from "../activity/Kanban";
import CssBaseline from '@mui/material/CssBaseline'
import "./navbar.css";
import { Tooltip } from '@mui/material';
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp(mode) {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
    console.log(mode)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="fixed" >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <b style={{alignContent:"center"}}> Daily Trello </b>
          </Typography>
<Tooltip title="Change mode"> 
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {/* {theme.palette.mode === 'dark' ? <Brightness6Icon /> : <Brightness7Icon />} */}
      </IconButton>
      </Tooltip>
         
       

        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
          {/* <Apps mode={mode}/> */}
          <Kanaban mode={mode}/>
      </Box>
    </Box>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState('light');
 
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <MyApp  mode={mode}/>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
