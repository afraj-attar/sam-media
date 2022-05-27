import Home from "@mui/icons-material/Home";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

function ToolBar(): ReactElement {

    return <>
        <Grid container
            direction="row"
            justifyContent="center"
            alignItems="flex-end"
            spacing={1}>
            <Grid item>
                <IconButton component={Link} to="/360video" size="large" style={{ background: "#FFF" }} >
                    <VideoCameraFrontIcon color="secondary" />
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton component={Link} to="/" size="large" style={{ background: "#FFF" }} >
                    <Home color="secondary" />
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton component={Link} to="/" size="large" style={{ background: "#FFF" }} >
                    <AccessibilityNewIcon color="secondary" />
                </IconButton>
            </Grid>
        </Grid>
    </>;

}

export { ToolBar };