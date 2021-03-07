import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    marginRight: '10%',
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  tabMenu: {
      color: 'white',
      textTransform: 'capitalize'
  },
  toolBarStyle: {
      minHeight: '50px',
      backgroundColor: '#000'
  }
}));

export default function NavBar(props) {
  const activeStocksPage = sessionStorage.getItem('active_stocks_page_num') ? sessionStorage.getItem('active_stocks_page_num') : 1;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(null);

  const history = useHistory()


  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleRouterCall = (e, value) => {
    history.push(value)
    setValue(history.location.pathname+history.location.search)
  }

  const handleTitleClick = () => {
    history.push('/')
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleManageUsers = () => {
    handleMenuClose()
    Cookies.set('authentication', '')
    window.location.reload();
  };

  const handleLogout = () => {
    handleMenuClose()
    Cookies.set('authentication', '')
    localStorage.setItem('source_type', '')
    localStorage.setItem('sort_order', '')
    window.location.reload();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
          style: {
              marginTop: '25px'
          }
      }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogout}>Manage Users</MenuItem>
      <MenuItem onClick={handleManageUsers}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div style={{marginBottom: '30px'}}>
      <div className={classes.grow}>
          <AppBar position="static">
              <Toolbar className={classes.toolBarStyle}>
                  <Typography className={classes.title} onClick={handleTitleClick} variant="h6" noWrap>
                      Simplify Stocks
                  </Typography>
                  <Tabs
                      value={history.location.pathname+history.location.search}
                      indicatorColor="primary"
                      TabIndicatorProps={{
                          style: {
                              backgroundColor: '#0270e1',
                              height: '2px',
                              marginTop: '2px'
                          }
                      }}
                      className={classes.tabMenu}
                      onChange={handleRouterCall}
                      aria-label="disabled tabs example"
                      >
                      <Tab className={classes.tabMenu} label="Home" value='/' />
                      <Tab className={classes.tabMenu} label="Stocks" value={`/stocks?page=${activeStocksPage}`}/ >
                  </Tabs>
                  <div className={classes.grow} />
                  <div className={classes.sectionDesktop}>
                      <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                      >
                      <AccountCircle />
                      </IconButton>
                  </div>
                  <div className={classes.sectionMobile}>
                      <IconButton
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="inherit"
                      >
                      <MoreIcon />
                      </IconButton>
                  </div>
              </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
      </div>
    </div>
  );
}