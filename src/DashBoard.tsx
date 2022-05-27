import { ReactElement, useCallback, useEffect, useRef } from "react";
import "aframe";
import { useNavigate } from 'react-router-dom';

export function DashBoard({ history }: any): ReactElement {

    const vrMode = useRef(false);
    const navigate = useNavigate();
    const handleClick = useCallback((id: string) => navigate(`/${id}`, { replace: true }), [navigate]);

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

    const resgister = (): void => {
        if (!AFRAME.components["cursor-home"]) {

            AFRAME.registerComponent("cursor-home", {
                init: function () {

                    this.el.addEventListener("click", function (evt) {
                        const { id } = evt.target as any;
                        handleClick(id);

                    });

                    this.el.addEventListener("mouseenter", function (evt) {

                        if (!vrMode) {
                            return;
                        }
                        const { id } = evt.target as any;
                    });
                }
            });
        }
    };


    useEffect(() => {

        document
            .querySelector("a-scene")
            .addEventListener("loaded", onSceneLoad);

        resgister();

    }, []);


    return <>
        <a-scene>
            <a-assets>
                <img id="hsIcon" src="./XR-Hotspot.png" alt=""></img>
            </a-assets>
            <a-entity
                cursor="rayOrigin: mouse"
                raycaster="objects: .cursor-home"
            ></a-entity>
            <a-camera></a-camera>

            <a-image
                class="cursor-home"
                cursor-home
                src="url(./skeleton.png)"
                id="skeleton"
                height="2"
                width="2"
                position="2 1.5 -3.5"
            ></a-image>
            <a-image
                class="cursor-home"
                cursor-home
                src="url(./video.png)"
                id="360video"
                height="2"
                width="2"
                position="-2 1.5 -3.5"
            ></a-image>

        </a-scene>
    </>;




}