import React, { ReactElement, useEffect } from "react";
import { Three60Video as Three60VideoComponent } from "../components/360Video";
import { registerComponents } from "./Utils";

export function Three60Video(): ReactElement {

    const [open, setOpen] = React.useState(false);
    const handleOpen = (): void => setOpen(true);
    const handleClose = (): void => setOpen(false);

    useEffect(() => {
        registerComponents();

        if (!AFRAME.components["cursor-listener"])
            AFRAME.registerComponent("cursor-listener", {
                init: function () {
                    this.el.addEventListener("click", function (evt) {
                        handleOpen();
                    });
                }
            });
    }, []);


    return <>
        <Three60VideoComponent open={open} handleClose={handleClose} ></Three60VideoComponent>
    </>;


}