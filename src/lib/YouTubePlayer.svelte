<script lang="ts">
	import YouTubePlayer from 'youtube-player';
	import { YouTubePlayerState as YtState } from '../shared/types';
	import { onMount } from 'svelte';
	import { voiceCommands } from '../stores';

	export let videoID: string;
	export let hidden = false;
	export let autoplay = false;

	let player;
	let playerState: YtState;

	$: {
		hidden ? pause() : play();
	}

	onMount(() => {
		player = YouTubePlayer('yt-player', {
			width: '100%',
			height: window.innerHeight / 1.5,
			playerVars: { autoplay: autoplay ? 1 : 0 },
		});

		if (autoplay) {
			player.loadVideoById(videoID);
		} else {
			player.cueVideoById(videoID);
		}

		player.on('stateChange', (event) => (playerState = event.data));
	});

	voiceCommands.subscribe((commands) => {
		const lastCommand = commands.at(-1);
		switch (lastCommand?.intent) {
			case 'playMusic':
				hidden = false;
				play();
				break;
			case 'pauseMusic':
				pause();
				break;
			case 'stopMusic':
				hidden = true;
				break;
			default:
				break;
		}
	});

	function play() {
		player && player.playVideo();
	}

	function pause() {
		player && player.pauseVideo();
	}
</script>

<button type="button" class="btn btn-ghost btn-circle" on:click={() => (hidden = !hidden)}>
	<svg
		class="h-6 w-6"
		width="40"
		height="40"
		viewBox="0 0 24 24"
		stroke-width="2"
		stroke="currentColor"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<rect x="3" y="5" width="18" height="14" rx="4" />
		<path d="M10 9l5 3l-5 3z" />
	</svg>
</button>

<input checked={!hidden} type="checkbox" id="my-modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box w-11/12 max-w-5xl">
		<div id="yt-player" />
		<div class="modal-action">
			<button on:click={() => (playerState === YtState.PLAYING ? pause() : play())}
				>{playerState === YtState.PLAYING ? 'Pause' : 'Play'}</button
			>
			<button on:click={() => (hidden = true)}>Close</button>
		</div>
	</div>
</div>
