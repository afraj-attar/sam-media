import { ReactElement } from "react";
import "aframe";
import { VRNavBar } from "../../VRNavBar";


export interface PartData {

    title: string;
    content: string;
    image: string;
}

function Viewer(): ReactElement {

    return (
        <>
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
                <a-image id="closeImg" opacity="0" src="url(ar-images/close.png)" width="0.1" height="0.1" position="1.18 2.9 -1.79"
                    cursor-listener ></a-image>
                <a-entity treeman gltf-model="url(./skeleton/scene.gltf)" scale="0.06 0.06 0.06" position="0 0.5 -2" ></a-entity>
                <a-entity id="One" class="cursor-listener" cursor-listener gltf-model="url(./1.gltf)"
                    scale="0.06 0.06 0.06" position="0 0.5 -1.95" ></a-entity>
                <a-entity id="Two" class="cursor-listener" cursor-listener gltf-model="url(./2.gltf)"
                    scale="0.06 0.06 0.06" position="0 2 -1.8" ></a-entity>
                <a-entity id="Three" class="cursor-listener" cursor-listener gltf-model="url(./3.gltf)"
                    scale="0.06 0.06 0.06" position="0 2.5 -1.8" ></a-entity>
                <a-entity id="Four" class="cursor-listener" cursor-listener gltf-model="url(./4.gltf)"
                    scale="0.06 0.06 0.06" position="0.5 1.3 -1.95" ></a-entity>

                <VRNavBar></VRNavBar>
            </a-scene>
        </>
    );

}

export { Viewer };