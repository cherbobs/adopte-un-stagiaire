import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  styled
} from "@mui/material";
import { useNavigate } from "react-router";
import { Profile } from "./auth/Profile";
import { useThemeToggle } from "./Theme";
import { Brightness4, Brightness7 } from '@mui/icons-material';

const logoWhite = "Navbar/logo/AUSLogoWhite.png"
const logoDark = "Navbar/logo/AUSLogoDark.png"
const dashboardIconUrlOrange = "Navbar/icons/orange/DashboardIcon.png";
const offersIconUrlOrange = "Navbar/icons/orange/OffreIcon.png";
const favoritesIconUrlOrange = "Navbar/icons/orange/FavorisIcon.png";
const settingsIconUrlOrange = "Navbar/icons/orange/ParamIcon.png";
const dashboardIconUrl = "Navbar/icons/white/DashboardIcon.png";
const offersIconUrl = "Navbar/icons/white/OffreIcon.png";
const favoritesIconUrl = "Navbar/icons/white/FavorisIcon.png";
const settingsIconUrl = "Navbar/icons/white/ParamIcon.png";

interface MenuItemProps {
  id: string;
  title: string;
  iconUrlWhite: string;
  iconUrlOrange: string;
}

const StyledListItem = styled(ListItem)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  cursor: "pointer",
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  }
}));

const MenuIcon = styled('img')(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

export function LeftMenu() {
  const { toggleTheme, isDarkMode } = useThemeToggle();
  const menuItems: MenuItemProps[] = [
    {
      id: "",
      title: "DASHBOARD",
      iconUrlOrange: dashboardIconUrlOrange,
      iconUrlWhite: dashboardIconUrl,
    },
    {
      id: "offres",
      title: "OFFRES",
      iconUrlOrange: offersIconUrlOrange,
      iconUrlWhite: offersIconUrl,
    },
    {
      id: "favoris",
      title: "FAVORIS",
      iconUrlOrange: favoritesIconUrlOrange,
      iconUrlWhite: favoritesIconUrl,
    },
    {
      id: "parametres",
      title: "PARAMÈTRES",
      iconUrlOrange: settingsIconUrlOrange,
      iconUrlWhite: settingsIconUrl,
    },
  ];
  const navigate = useNavigate();
  function onMenuItemClick(id: string) {
    navigate("/" + id);
  }

  return (
    <Box sx={{ width: '100%', height: '100%', bgcolor: 'background.paper', color: 'primary.main', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: '2px solid #fd941f' }}>
      <Box sx={{ textAlign: 'center', padding: 2 }}>
        <img src={isDarkMode ? logoDark : logoWhite} alt="Logo" style={{ width: '100%', marginBottom: '16px' }} />
      </Box>
      <List sx={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
        {menuItems.map((item) => (
          <StyledListItem onClick={() => onMenuItemClick(item.id)} key={item.id} style={{display: 'flex', flexDirection: 'row', margin: '0', alignItems: 'baseline'}}>
            <ListItemIcon style={{height: '25px', width: '25px', marginBottom: '0'}}>
              <MenuIcon src={ isDarkMode ? item.iconUrlWhite : item.iconUrlOrange } alt={`${item.title} icon`} />
            </ListItemIcon>
            <ListItemText primary={item.title} sx={{ textAlign: 'left', fontFamily: 'Space Grotesk'}} />
          </StyledListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', flexDirection: 'raw', justifyContent: 'space-between' }}>
        <Profile />
        <IconButton onClick={toggleTheme} color="inherit">
          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Box>
    </Box>
  );
}