import React, { ReactElement, useEffect, useRef } from "react";
import { Three60Video as Three60VideoComponent } from "../components/360Video";
import { registerComponents } from "./Utils";

export function Three60Video(): ReactElement {

    const [open, setOpen] = React.useState(false);
    const handleOpen = (): void => setOpen(true);
    const handleClose = (): void => setOpen(false);
    const vrMode = useRef<boolean>(false);

    useEffect(() => {
        registerComponents();

        if (!AFRAME.components["cursor-listener"])
            AFRAME.registerComponent("cursor-listener", {
                init: function () {
                    this.el.addEventListener("click", function (evt) {
                        handleOpen();
                    });

                    this.el.addEventListener("mouseenter", function (evt) {
                        if (!vrMode.current) {
                            return;
                        }
                        const { id } = evt.target as any;

                        if (id === "info") {

                            document.querySelector("#vrImage").setAttribute('src', `url(ar-images/${id}.png)`);
                            document.querySelector("#vrImage").setAttribute("opacity", 1);
                        }
                        else {
                            document.querySelector("#vrImage").setAttribute('src', "");
                            document.querySelector("#vrImage").setAttribute("opacity", 0);
                        }
                    });

                }
            });

        document
            .querySelector("a-scene")
            .addEventListener("loaded", onSceneLoad);

    }, []);


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
    };


    return <>
        <Three60VideoComponent open={open} handleClose={handleClose} ></Three60VideoComponent>
    </>;


}