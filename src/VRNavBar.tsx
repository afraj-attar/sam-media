import { ReactElement, useCallback, useEffect, useRef } from "react";
import "aframe";
import { useNavigate } from 'react-router-dom';

export function VRNavBar(): ReactElement {

    const navigate = useNavigate();
    const handleClick = useCallback((id: string) => navigate(`/${id}`, { replace: true }), [navigate]);
    const vrMode = useRef(false);

    const onSceneLoad = (): void => {
        document.querySelector("a-scene").addEventListener("exit-vr", function () {

            vrMode.current = false;

            document.querySelector('#video-icon').setAttribute('opacity', 0);
            document.querySelector('#skeleton-icon').setAttribute('opacity', 0);
            document.querySelector('#home-icon').setAttribute('opacity', 0);

        });
        document.querySelector("a-scene").addEventListener("enter-vr", function () {

            vrMode.current = true;
            document.querySelector('#video-icon').setAttribute('opacity', 1);
            document.querySelector('#skeleton-icon').setAttribute('opacity', 1);
            document.querySelector('#home-icon').setAttribute('opacity', 1);

        });
    };

    const register = (): void => {
        if (!AFRAME.components["nav-bar"]) {

            AFRAME.registerComponent("nav-bar", {
                init: function () {

                    this.el.addEventListener("mouseenter", function (evt) {

                        if (!vrMode) {
                            return;
                        }
                        const { id } = evt.target as any;
                        let url = "/";
                        switch (id) {
                            case "video-icon":
                                url = '360video?vrmode=true';
                                break;
                            case "skeleton-icon":
                                url = 'skeleton?vrmode=true';
                                break;
                            case "home-icon":
                                url = "?vrmode=true";
                        }
                        handleClick(url);

                    });
                }
            });
        }
    };

    useEffect(() => {

        document
            .querySelector("a-scene")
            .addEventListener("loaded", onSceneLoad);

        register();

    }, []);

    return <>
        {/* Nav Icons */}
        <a-image
            class="nav-bar"
            nav-bar
            src="url(./ar-images/video-icon.png)"
            id="video-icon"
            height="0.4"
            width="0.4"
            position="-0.5 -1 -3.5"
            opacity="0"
        ></a-image>

        <a-image
            class="nav-bar"
            nav-bar
            src="url(./ar-images/home-icon.png)"
            id="home-icon"
            height="0.4"
            width="0.4"
            position="0 -1 -3.5"
            opacity="0"
        ></a-image>
        <a-image
            class="nav-bar"
            nav-bar
            src="url(./ar-images/skeleton-icon.png)"
            id="skeleton-icon"
            height="0.4"
            width="0.4"
            position="0.5 -1 -3.5"
            opacity="0"
        ></a-image>
    </>;

}