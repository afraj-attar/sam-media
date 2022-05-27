import React, { ReactElement, useEffect } from "react";
import { Viewer as ViewerComponent } from "../components/viewer";
import { fetchPartData } from "./DataManager";


export function Viewer(): ReactElement {

    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState<any | undefined>(undefined);
    const handleOpen = (): void => setOpen(true);
    const handleClose = (): void => setOpen(false);

    const registerCursorListener = (): void => {

        if (!AFRAME.components["cursor-listener"]) {
            AFRAME.registerComponent("cursor-listener", {

                init: function () {

                    this.el.addEventListener("mousedown", function (evt) {
                        console.log("clicked", evt.target?.id);
                        handleOpen();
                        setData(fetchPartData(evt.target?.id));
                    });
                }
            });

        }

    };

    useEffect(() => {

        registerCursorListener();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <>
        <ViewerComponent open={open} handleClose={handleClose} data={data} />
    </>;

}