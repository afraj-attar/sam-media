import { ReactElement, useEffect, useRef } from "react";
import "aframe";
import { Box, IconButton, ImageListItem, Modal, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

export interface PartData {

    title: string;
    content: string;
    image: string;
}

interface ViewerProps {
    open: boolean;
    handleClose: () => void;
    data: PartData | undefined;
    vrMode: boolean;
}

function Viewer({ open, handleClose, data, vrMode }: ViewerProps): ReactElement {

    const style = {
        position: 'absolute' as 'absolute',
        top: '40%',
        left: '70%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const renderModal = (): ReactElement => {

        return (data ?
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {data.title}
                        </Typography>
                        <IconButton onClick={handleClose}>
                            <Close />
                        </IconButton>
                    </div>
                    <ImageListItem key={data.image}>
                        <img
                            src={`${data.image}?w=12&h=12&fit=crop&auto=format`}
                            srcSet={`${data.image}?w=12&h=12&fit=crop&auto=format&dpr=1 1x`}
                            loading="lazy"
                            alt=""
                        />
                    </ImageListItem>
                    <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                        {data.content}
                    </Typography>
                </Box>
            </Modal>
            : <></>);
    };

    return (
        <>
            {renderModal()}
            <a-scene>
                <a-assets>
                    <img id="hsIcon" src="./XR-Hotspot.png" alt=""></img>
                </a-assets>

                <a-sky src="url(scene1.jpg)"></a-sky>
                <a-entity
                    cursor="fuse: true; rayOrigin: mouse"
                    raycaster="objects: .cursor-listener"
                ></a-entity>
                <a-camera></a-camera>
                <a-image id="vrImage" opacity="0" src="" position="0.8 2.5 -1.8"
                    cursor="fuse: true; fuseTimeout: 500" ></a-image>
                <a-entity gltf-model="url(./skeleton/scene.gltf)" scale="0.06 0.06 0.06" position="0 0.5 -2" ></a-entity>
                <a-entity id="One" class="cursor-listener" cursor-listener gltf-model="url(./1.gltf)"
                    scale="0.06 0.06 0.06" position="0 0.5 -1.95" ></a-entity>
                <a-entity id="Two" class="cursor-listener" cursor-listener gltf-model="url(./2.gltf)"
                    scale="0.06 0.06 0.06" position="0 2 -1.8" ></a-entity>
                <a-entity id="Three" class="cursor-listener" cursor-listener gltf-model="url(./3.gltf)"
                    scale="0.06 0.06 0.06" position="0 2.5 -1.8" ></a-entity>
                <a-entity id="Four" class="cursor-listener" cursor-listener gltf-model="url(./4.gltf)"
                    scale="0.06 0.06 0.06" position="0.5 1.3 -1.95" ></a-entity>

            </a-scene>
        </>
    );

}

export { Viewer };