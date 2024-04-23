// scripts.js

document.addEventListener("DOMContentLoaded", function() {
    const audioPlayer = document.createElement("audio");
    const playPauseBtn = document.getElementById("play-pause-btn");
    const songTitle = document.getElementById("song-title");
    const artist = document.getElementById("artist");
    const playlistSongs = document.getElementById("playlist-songs");
    let currentIndex = 0;
    
    const playlist = [
        { title: "Şarkı 1", artist: "Sanatçı 1", src: "song1.mp3" },
        { title: "Şarkı 2", artist: "Sanatçı 2", src: "song2.mp3" },
        { title: "Şarkı 3", artist: "Sanatçı 3", src: "song3.mp3" }
    ];

    function playSong(index) {
        const song = playlist[index];
        audioPlayer.src = song.src;
        songTitle.textContent = song.title;
        artist.textContent = song.artist;
        audioPlayer.play();
    }

    function updatePlayPauseBtn() {
        if (audioPlayer.paused) {
            playPauseBtn.textContent = "▶";
        } else {
            playPauseBtn.textContent = "❚❚";
        }
    }

    function nextSong() {
        currentIndex = (currentIndex + 1) % playlist.length;
        playSong(currentIndex);
    }

    function prevSong() {
        currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        playSong(currentIndex);
    }


    function createPlaylist() {
        playlist.forEach((song, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${song.title} - ${song.artist}`;
            listItem.dataset.index = index;
            playlistSongs.appendChild(listItem);
        });
    }


    playlistSongs.addEventListener("click", function(event) {
        const index = event.target.dataset.index;
        if (index !== undefined) {
            currentIndex = parseInt(index);
            playSong(currentIndex);
        }
    });


    playPauseBtn.addEventListener("click", function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
        updatePlayPauseBtn();
    });


    document.getElementById("prev-btn").addEventListener("click", prevSong);
    document.getElementById("next-btn").addEventListener("click", nextSong);


    audioPlayer.addEventListener("play", updatePlayPauseBtn);
    audioPlayer.addEventListener("pause", updatePlayPauseBtn);


    createPlaylist();
    playSong(currentIndex);
});
