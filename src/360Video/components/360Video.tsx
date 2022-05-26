import { ReactElement } from "react";
import "aframe";
import { Box, Modal, Typography } from "@mui/material";

export interface Three60VideoProps {
    open: boolean;
    handleClose: () => void;
}

export function Three60Video({ open, handleClose }: Three60VideoProps): ReactElement {

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'black',
        border: '2px solid #000',
        boxShadow: 24,
        color: 'white',
        opacity: 0.6,
        p: 4,
    };

    return <>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        London Tower Bridge
                    </Typography>
                </div>
            </Box>
        </Modal>
        : <></>);

        <a-scene>
            <a-entity
                cursor="fuse: true; rayOrigin: mouse"
                raycaster="objects: .cursor-listener"
            ></a-entity>
            <a-assets>
                <video id="videoEntity" src="tower_bridge.mp4" autoPlay preload="auto" />
            </a-assets>
            <a-camera reverse-mouse-drag="true" />
            <a-videosphere src="#videoEntity" rotation="0 -90 0" play-on-click />
            <a-entity id="Four" class="cursor-listener" cursor-listener gltf-model="url(./info.gltf)"
                scale="0.06 0.06 0.06" position="0.1 1.3 -1" ></a-entity>
        </a-scene>
    </>;

}