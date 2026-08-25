import {
  Box,
  Divider,
  FormControl,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined'
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import MailOutlineIcon from '@mui/icons-material/MailOutlined'
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

interface NavSection {
  title: string
  icon: React.ReactNode
  items: { label: string; active?: boolean }[]
}

const navSections: NavSection[] = [
  {
    title: 'Agir',
    icon: <MeetingRoomOutlinedIcon fontSize="small" />,
    items: [{ label: 'Carte', active: true }],
  },
  {
    title: 'Superviser',
    icon: <SupervisorAccountOutlinedIcon fontSize="small" />,
    items: [
      { label: 'Tableau de bord' },
      { label: 'Ciblage' },
      { label: 'Accès militants' },
      { label: 'Configurer' },
    ],
  },
  {
    title: 'Administrer',
    icon: <DescriptionOutlinedIcon fontSize="small" />,
    items: [
      { label: 'Campagnes' },
      { label: 'Utilisateur.ices' },
      { label: 'Données' },
      { label: 'Paramètres' },
    ],
  },
]

const footerLinks: { label: string; icon: React.ReactNode }[] = [
  { label: 'Contact', icon: <MailOutlineIcon fontSize="small" /> },
  { label: 'Qui sommes-nous ?', icon: <SentimentSatisfiedAltOutlinedIcon fontSize="small" /> },
  { label: 'Mentions légales', icon: <InfoOutlinedIcon fontSize="small" /> },
]

export const SIDEBAR_WIDTH = 300

export function Sidebar() {
  return (
    <Box
      component="nav"
      sx={{
        position: 'fixed',
        zIndex: 1000,
        top: '1rem',
        left: '1rem',
        borderRadius: 0.5,
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        height: 'calc(100vh - 2rem)',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        boxShadow: 6,
        overflow: 'hidden',
      }}
    >
      <Box sx={{ px: 3, pt: 3, pb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          TokTok
        </Typography>
      </Box>

      <Box sx={{ mx: 3, p: 2, bgcolor: 'primary.main', color: 'primary.contrastText', borderRadius: 0.5 }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Nouveau Front Populaire
          </Typography>
          <Link component="button" type="button" underline="always" color="inherit" variant="body2">
            Changer
          </Link>
        </Stack>
        <FormControl fullWidth size="small" sx={{ mt: 1.5 }}>
          <Select
            value="campagne-1"
            sx={{
              color: 'primary.contrastText',
              borderRadius: 1,
              '&& .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.contrastText' },
              '& .MuiSvgIcon-root': { color: 'primary.contrastText' },
            }}
          >
            <MenuItem value="campagne-1">Campagne 1</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <List sx={{ px: 1, mt: 1, flex: 1, overflowY: 'auto' }}>
        {navSections.map((section) => (
          <Box key={section.title} sx={{ mb: 1 }}>
            <ListItemButton sx={{ borderRadius: 1 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>{section.icon}</ListItemIcon>
              <ListItemText
                primary={section.title}
                slotProps={{ primary: { sx: { fontWeight: 600 } } }}
              />
              <ExpandLessIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            </ListItemButton>
            <List disablePadding>
              {section.items.map((item) => (
                <ListItemButton
                  key={item.label}
                  selected={item.active}
                  sx={{ pl: 7, borderRadius: 1, py: 0.5 }}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        ))}
      </List>

      <Divider />
      <List sx={{ px: 1, pt: 1, pb: 1 }}>
        {footerLinks.map((link) => (
          <ListItemButton key={link.label} sx={{ borderRadius: 1 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>{link.icon}</ListItemIcon>
            <ListItemText primary={link.label} slotProps={{ primary: { variant: 'body2', color: 'text.secondary' } }} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )
}
