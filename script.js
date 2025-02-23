let audio_play_button = document.getElementById("audio-play")
let audio_prev_button = document.getElementById("audio-prev")
let audio_skip_button = document.getElementById("audio-skip")

let song_name_p = document.getElementById("song_name")

let initial_volume = 30

let player
function onYouTubeIframeAPIReady() {
    console.log("player init")
    player = new YT.Player('player', {
        height: 1,
        width: 1,
        playerVars: {
            playersInline: 1,
            controls: 0,
            loop: 1,
            listType: "playlist",
            list: "PL9N0sSHZNHhdPW1cAO7vVQCwN5yi9PBrV"
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    })
    document.getElementById('player').style.visibility = 'hidden'
}

function onPlayerReady(event) {
    event.target.setVolume(initial_volume)
    event.target.playVideo()
    console.log("player ready!")
}

let yt_play_button = () => {
    let status = player.getPlayerState()
    if (status === 1) {
        player.pauseVideo()

        let icon = document.getElementById("audio_button_id")
        icon.textContent = "play_arrow"
    } else if (status === -1 || status === 2) {
        player.setVolume(initial_volume)
        player.playVideo()

        let icon = document.getElementById("audio_button_id")
        icon.textContent = "pause"
    }
}

audio_play_button.addEventListener('click', yt_play_button)
audio_prev_button.addEventListener('click', () => player.previousVideo())
audio_skip_button.addEventListener('click', () => player.nextVideo())

function onPlayerStateChange(event) {
    console.log("player state change")

    let status = player.getPlayerState()
    if (status === 1) {
        let icon = document.getElementById("audio_button_id")
        icon.textContent = "pause"
    }
}

function stopVideo () {
    player.stopVideo()
}
