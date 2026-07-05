import { AppBar, Box, IconButton, Toolbar } from '@mui/material'
import Logo from './shared/Logo'
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { useAuth } from '../contexts/AuthContext'
import NavigationLink from './shared/NavigationLink'
import Profile from './shared/profile'
import { Link } from 'react-router-dom'
// import { useTheme } from '../context/ThemeContext'


const Header = () => {
  const auth = useAuth();
  // Will use this in future versions for theme.
  // const { theme, toggleTheme } = useTheme();
  return (
    <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Logo />
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* <IconButton onClick={toggleTheme} color="inherit" aria-label="toggle theme">
            {theme === 'light' ? <IoMoonOutline /> : <IoSunnyOutline />}
          </IconButton> */}
          <div>
            {auth?.isLoggedIn ? (

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ width: 40, height: 40 }}>
                  <IconButton
                    component={Link}
                    to="/chat"
                    color="inherit"
                    aria-label="chat"
                    sx={{ width: "100%", height: "100%", padding: '0' }}
                  >
                    <IoChatbubbleEllipsesOutline style={{ width: "100%", height: "100%" }} />
                  </IconButton>
                </Box>
                <Profile />
              </Box>

            ) : (
              <>
                <NavigationLink to="/login" text="Login" />
              </>
            )}
          </div>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header