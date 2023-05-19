import { styled, alpha } from "@mui/material/styles"


const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: 20,
    border: `2px solid ${theme.palette.background.paper}`,
    backgroundColor: alpha(theme.palette.background.default, 1),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    padding: theme.spacing(1,0),
    display: "flex",
    alignItems: "center"
}))

export default Search