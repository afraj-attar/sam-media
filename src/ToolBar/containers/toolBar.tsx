import { ReactElement } from "react";
import { ToolBar as ToolBarComponent } from "../components/toolBar";


function ToolBar(): ReactElement {

    return <div style={{ bottom: "20px", left: 0, right: 0, position: 'absolute' }} >
        <ToolBarComponent></ToolBarComponent>
    </div>;
}

export { ToolBar };