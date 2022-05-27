import React, { ReactElement, useEffect, useRef } from "react";
import { Viewer as ViewerComponent } from "../components/viewer";
import { fetchPartData } from "./DataManager";


export function Viewer(): ReactElement {

    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState<any | undefined>(undefined);
    const handleOpen = (): void => setOpen(true);
    const handleClose = (): void => setOpen(false);

    const vrMode = useRef<boolean>(false);

    const registerCursorListener = (): void => {

        if (!AFRAME.components["cursor-listener"]) {
            AFRAME.registerComponent("cursor-listener", {

                init: function () {

                    this.el.addEventListener("mousedown", function (evt) {
                        const { id } = evt.target as any;
                        console.log("clicked", id);
                        handleOpen();
                        const partData = fetchPartData(id);
                        setData(partData);
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
    };

    useEffect(() => {

        document
            .querySelector("a-scene")
            .addEventListener("loaded", onSceneLoad);
        registerCursorListener();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <>
        <ViewerComponent open={open} handleClose={handleClose} data={data} vrMode={vrMode.current} />
    </>;

}