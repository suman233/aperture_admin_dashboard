import ContentCopy from '@mui/icons-material/ContentCopy';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function MessageMenu() {

  const handleCopyAction=(text:string)=>{
     
  }


  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <MenuList>

        <MenuItem>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘C
          </Typography>
        </MenuItem>

        {/* <Divider /> */}
        {/* <MenuItem>
          <ListItemIcon>
            <Cloud fontSize="small" />
          </ListItemIcon>
          <ListItemText>Web Clipboard</ListItemText>
        </MenuItem> */}
      </MenuList>
    </Paper>
  );
}
