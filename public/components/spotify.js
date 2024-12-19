import React, { useEffect, useState } from "react";
function Spotify() {
    var _a = useState(null), player = _a[0], setPlayer = _a[1];
    var _b = useState(false), isPlaying = _b[0], setIsPlaying = _b[1];
    var _c = useState(null), currentTrack = _c[0], setCurrentTrack = _c[1];
    useEffect(function () {
        var script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);
        window.onSpotifyWebPlaybackSDKReady = function () {
            var token = "YOUR_SPOTIFY_ACCESS_TOKEN"; // Replace with your access token
            var player = new Spotify.Player({
                name: "Web Playback SDK",
                getOAuthToken: function (cb) {
                    cb(token);
                },
                volume: 0.5,
            });
            setPlayer(player);
            player.addListener("ready", function (_a) {
                var device_id = _a.device_id;
                console.log("Ready with Device ID", device_id);
            });
            player.addListener("player_state_changed", function (state) {
                if (!state) {
                    return;
                }
                setCurrentTrack(state.track_window.current_track);
                setIsPlaying(!state.paused);
            });
            player.connect();
        };
    }, []);
    var togglePlay = function () {
        if (player) {
            player.togglePlay();
        }
    };
    var nextTrack = function () {
        if (player) {
            player.nextTrack();
        }
    };
    var previousTrack = function () {
        if (player) {
            player.previousTrack();
        }
    };
    return (React.createElement("div", { className: "spotify-card" },
        React.createElement("h2", null, "Spotify"),
        currentTrack ? (React.createElement("div", null,
            React.createElement("img", { src: currentTrack.album.images[0].url, alt: currentTrack.name }),
            React.createElement("h3", null, currentTrack.name),
            React.createElement("p", null, currentTrack.artists.map(function (artist) { return artist.name; }).join(", ")),
            React.createElement("button", { onClick: togglePlay }, isPlaying ? "Pause" : "Play"),
            React.createElement("button", { onClick: nextTrack }, "Next"),
            React.createElement("button", { onClick: previousTrack }, "Previous"))) : (React.createElement("p", null, "Nothing is playing"))));
}
export default Spotify;
