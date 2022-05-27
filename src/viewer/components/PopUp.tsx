import { Close } from "@mui/icons-material";
import { Box, IconButton, ImageListItem, Modal, Typography } from "@mui/material";
import isMobile from "is-mobile";
import { ReactElement } from "react";
import { PartData } from "./viewer";

interface PopUpProps {
    open: boolean;
    handleClose: () => void;
    data: PartData | undefined;
}

export function PopUp({ open, handleClose, data }: PopUpProps): ReactElement {

    const style = isMobile() ? {
        position: 'absolute' as 'absolute',
        top: '0',
        left: '0',
        width: "90%",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    } : {
        position: 'absolute' as 'absolute',
        top: '40%',
        left: '70%',
        transform: 'translate(-50%, -50%)',
        width: "15%",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (data ? <>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {data?.title}
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <Close />
                    </IconButton>
                </div>
                <ImageListItem key={data?.image}>
                    <img
                        src={`${data?.image}?w=12&h=12&fit=crop&auto=format`}
                        srcSet={`${data?.image}?w=12&h=12&fit=crop&auto=format&dpr=1 1x`}
                        loading="lazy"
                        alt=""
                    />
                </ImageListItem>
                <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                    {data?.content}
                </Typography>
            </Box>
        </Modal>
    </> : <></>);
}