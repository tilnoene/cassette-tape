function meow(){
  let meow = new Audio("sound_effects/meow.mp3");
  meow.play();
}

let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let cat = document.querySelector(".cat");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
 	// LADO A
  {
		name: "Hope",
    	artist: "xxxtentacion",
    	image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    	path: "musics/A1_Hope.mp3" // ENDEREÇO DA MÚSICA
  	},
  	{
    	name: "Nervous",
    	artist: "The Neighbourhood",
    	image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    	path: "musics/A2_Nervous.mp3"
  	},
  	{
    	name: "Reflections",
    	artist: "The Neighbourhood",
    	image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    	path: "musics/A3_Reflections.mp3",
  	},
  	{
    	name: "Falling Down",
    	artist: "Lil Peep and xxxtentacion",
    	image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    	path: "musics/A4_Falling Down.mp3",
  	},
  	{
    	name: "Cidade Lunar",
    	artist: "Konai x Kadu Brown",
    	image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    	path: "musics/A5_Cidade Lunar.mp3",
  	},
  	{
    	name: "É a União Flasco",
    	artist: "LUCKHAOS feat. Lucas Hype",
    	image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    	path: "musics/A6_União Flasco.mp3",
  	},
  	// LADO B
  	{
    	name: "Are You Bored Yet",
    	artist: "Wallows feat. Clairo",
    	image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    	path: "musics/B1_Are You Bored Yet.mp3"
  	},
  	{
    	name: "Sweater Weather",
    	artist: "The Neighbourhood",
    	image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    	path: "musics/B2_Sweater Weather.mp3"
  	},
  	{
    	name: "death bed",
    	artist: "powfu feat. beabadoobee",
    	image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    	path: "musics/B3_death bed.mp3",
  	},
  	{
    	name: "Teeth",
    	artist: "5 Seconds of Summer",
    	image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    	path: "musics/B4_Teeth.mp3",
  	},
  	{
    	name: "Youngblood",
    	artist: "5 Seconds of Summer",
    	image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    	path: "musics/B5_Youngblood.mp3",
  	},
  	{
    	name: "Valentine",
    	artist: "5 Seconds of Summer",
    	image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    	path: "musics/B6_Valentine.mp3",
  	},
];

function loadTrack(track_index) {
	clearInterval(updateTimer);
	resetValues();

	// Load a new track
	curr_track.src = track_list[track_index].path;
	curr_track.load();

	// Update details of the track
	track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;

    // Set an interval of 1000 milliseconds for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);

    // Move to the next track if the current one finishes playing
    curr_track.addEventListener("ended", nextTrack);
}

// Reset Values
function resetValues() {
	curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;

    // Replace icon with the pause icon
    playpause_btn.innerHTML = '<img src="images/pause_button.png">';
    document.getElementById("cat-id").src="images/cat.gif";
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;

    // Replace icon with the play icon
    playpause_btn.innerHTML = '<img src="images/play_button.png">';
    document.getElementById("cat-id").src="images/cat2.jpg";
}

function nextTrack() {
    if (track_index < track_list.length - 1)
    	track_index += 1;
    else track_index = 0;
    	loadTrack(track_index);
    	playTrack();
}

function prevTrack() {
    if (track_index > 0)
    	track_index -= 1;
    else track_index = track_list.length;
    	loadTrack(track_index);
    	playTrack();
}

function seekTo() {
    seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
	let seekPosition = 0;

	// Check if the current track duration is a legible number
	if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        // Adding a zero to the single digit time values
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
		total_duration.textContent = durationMinutes + ":" + durationSeconds;
	}
}

// Load the first track in the tracklist
loadTrack(track_index);