import { ReactElement, useEffect, useRef } from "react";
import { ToolBar } from "../../ToolBar";
import { Viewer as ViewerComponent } from "../components/viewer";


export function Viewer(props: any): ReactElement {

    useEffect(() => {

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <>
        <ViewerComponent />
        <ToolBar handleClick={() => { }} />
    </>;

}