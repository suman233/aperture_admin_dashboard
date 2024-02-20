import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loader() {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress size='20px' color='inherit' />
    </Box>
  );
}