import React, { ReactElement, useEffect } from "react";
import "aframe";
import { Box, ImageListItem, Modal, Typography } from "@mui/material";

interface ViewerProps {
    id?: string;
}

function Viewer(props: ViewerProps): ReactElement {

    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState<any | undefined>(undefined);
    const handleOpen = (): void => setOpen(true);
    const handleClose = (): void => setOpen(false);

    useEffect(() => {

        if (!AFRAME.components["cursor-listener"]) {
            AFRAME.registerComponent("cursor-listener", {

                init: function () {

                    this.el.addEventListener("mousedown", function (evt) {
                        console.log("clicked", evt.srcElement.id);
                        handleOpen();
                        setData(dataArray[0]);
                    });
                }
            });

        }


    }, []);



    const dataArray = [{
        title: "Bone",
        content: `Bones are rigid organs that form part of the endoskeleton of vertebrates. 
        They function to move, support, and protect the various organs of the body, produce red and white blood cells and store minerals. 
        Bone tissue is a type of dense connective tissue. 
        Bones have a variety of shapes with a complex internal and external structure they are also lightweight, yet strong and hard.`,
        image: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Left_femur_of_extinct_elephant%2C_Alaska%2C_Ice_Age_Wellcome_L0057714.jpg"
    }];

    const style = {
        position: 'absolute' as 'absolute',
        top: '40%',
        left: '70%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            {data ?
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {data.title}
                        </Typography>
                        <ImageListItem key={data.image}>
                            <img
                                src={`${data.image}?w=32&h=32&fit=crop&auto=format`}
                                srcSet={`${data.image}?w=32&h=32&fit=crop&auto=format&dpr=2 1x`}
                                loading="lazy"
                                alt=""
                            />
                        </ImageListItem>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {data.content}
                        </Typography>
                    </Box>
                </Modal>
                : <></>}
            <a-scene>
                <a-assets>
                    <img id="hsIcon" src="./XR-Hotspot.png" alt=""></img>
                </a-assets>

                <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
                <a-sky color="#ECECEC"></a-sky>
                <a-entity
                    cursor="fuse: true; rayOrigin: mouse"
                    raycaster="objects: .cursor-listener"
                ></a-entity>
                <a-entity cursor="fuse: true; fuseTimeout: 500"
                    position="0 1.65 -1"
                    geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
                    material="color: black; shader: flat">
                </a-entity>

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