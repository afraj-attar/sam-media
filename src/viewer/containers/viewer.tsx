import React, { ReactElement, useEffect, useRef } from "react";
import { PopUp } from "../components/PopUp";
import { Viewer as ViewerComponent } from "../components/viewer";
import { fetchPartData } from "./DataManager";

declare var THREE: any;     // To avoid multiple imports

export function Viewer(): ReactElement {

    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState<any | undefined>(undefined);
    const handleOpen = (): void => setOpen(true);
    const handleClose = (): void => setOpen(false);

    const vrMode = useRef<boolean>(false);

    const reduceTextureSize = (three3D: THREE.Object3D): void => {

        three3D.traverse((node) => {

            // @ts-ignore
            const material = node.material;

            if (material && material.map) {

                const texture = (material.map as THREE.Texture);

                const canvas = document.createElement('canvas') as any as HTMLCanvasElement;
                canvas.width = texture.image.width;
                canvas.height = texture.image.height;
                const context = canvas.getContext('2d')!;

                context.drawImage(texture.image, 0, 0);
                context.scale(0.5, 0.5);
                const canvasTexture = new THREE.CanvasTexture(context.canvas);
                canvasTexture.flipY = false;

                material.map = canvasTexture;
                canvasTexture.needsUpdate = true;

            }

        });

    };

    const registerCursorListener = (): void => {

        if (!AFRAME.components["cursor-listener"]) {
            AFRAME.registerComponent("cursor-listener", {

                init: function () {

                    this.el.addEventListener("mousedown", function (evt) {
                        const { id } = evt.target as any;
                        console.log("clicked", id);

                        const partData = fetchPartData(id);
                        setData(partData);
                        handleOpen();
                    });

                    this.el.addEventListener("mouseenter", function (evt) {
                        if (!vrMode.current) {
                            return;
                        }
                        const { id } = evt.target as any;

                        if (["One", "Two", "Three", "Four"].includes(id)) {

                            document.querySelector("#vrImage").setAttribute('src', `url(ar-images/${id}.png)`);
                            document.querySelector("#vrImage").setAttribute("opacity", 1);
                            document.querySelector("#closeImg").setAttribute("opacity", 1);
                        }
                        else if (id.includes("closeImg")) {
                            document.querySelector("#vrImage").setAttribute('src', "");
                            document.querySelector("#vrImage").setAttribute("opacity", 0);
                            document.querySelector("#closeImg").setAttribute("opacity", 0);
                        }
                    });

                }

            });

        };

        if (!AFRAME.components['treeman'])
            AFRAME.registerComponent('treeman', {
                init: function () {
                    const el = this.el;
                    el.addEventListener("model-loaded", e => {
                        const tree3D = el.getObject3D('mesh');
                        if (!tree3D) { return; }
                        reduceTextureSize(tree3D);
                    });
                }
            });
    };

    const onSceneLoad = (): void => {
        document.querySelector("a-scene").addEventListener("exit-vr", function () {
            vrMode.current = false;
            document
                .querySelector("a-camera")
                .removeChild(document.querySelector("a-camera").childNodes[0]);
        });
        document.querySelector("a-scene").addEventListener("enter-vr", function () {
            vrMode.current = true;
            // Add cursor to pick entity at runtime
            var el = document.createElement("a-cursor");
            document.querySelector("a-camera").appendChild(el);
        });

        if (window.location.href.includes('vrmode')) {
            document.querySelector('.a-enter-vr-button').click();
        }

    };

    useEffect(() => {

        document
            .querySelector("a-scene")
            .addEventListener("loaded", onSceneLoad);
        registerCursorListener();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <>
        <ViewerComponent />
        <PopUp open={open} handleClose={handleClose} data={data}></PopUp>
    </>;

}