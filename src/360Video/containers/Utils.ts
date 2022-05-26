export const registerComponents = (): void => {

    registerPlayOnClick();
    registerHideOnPlay();

};

const registerPlayOnClick = (): void => {

    if (!AFRAME.components['play-on-click']) {
        AFRAME.registerComponent('play-on-click', {
            init: function () {
                this.onClick = this.onClick.bind(this);
            },
            play: function () {
                window.addEventListener('click', this.onClick);
            },
            pause: function () {
                window.removeEventListener('click', this.onClick);
            },
            onClick: function () {
                var videoEl = this.el.getAttribute('material').src;
                if (!videoEl) { return; }
                this.el.object3D.visible = true;
                videoEl.play();
            }
        });
    }

};

const registerHideOnPlay = (): void => {
    if (!AFRAME.components['hide-on-play']) {
        /* global AFRAME */
        AFRAME.registerComponent('hide-on-play', {
            schema: { type: 'selector' },
            init: function () {
                this.onPlaying = this.onPlaying.bind(this);
                this.onPause = this.onPause.bind(this);
                this.el.object3D.visible = !this.data.playing;
            },
            play: function () {
                if (this.data) {
                    this.data.addEventListener('playing', this.onPlaying);
                    this.data.addEventListener('pause', this.onPause);
                }
            },
            pause: function () {
                if (this.data) {
                    this.data.removeEventListener('playing', this.onPlaying);
                    this.data.removeEventListener('pause', this.onPause);
                }
            },
            onPlaying: function () {
                this.el.object3D.visible = false;
            },
            onPause: function () {
                this.el.object3D.visible = true;
            }
        });
    }
};