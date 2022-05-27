import Home from "@mui/icons-material/Home";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { ReactElement } from "react";
import { Link } from "react-router-dom";


function ToolBar(): ReactElement {

    return <>
        <Grid container
            direction="row"
            justifyContent="center"
            alignItems="flex-end">
            <IconButton component={Link} to="/sam-media" size="large" style={{ background: "#FFF" }} >
                <Home color="secondary" />
            </IconButton>
        </Grid>
    </>;

}

export { ToolBar };