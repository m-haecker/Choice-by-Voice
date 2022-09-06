<script lang="ts">
	import ThemeChange from './ThemeChange.svelte';
	import Stt from '../lib/Stt.svelte';
	import YouTubePlayer from './YouTubePlayer.svelte';
	import { appSettings } from '../appSettings';

	const { youTubeVideoID } = appSettings;
</script>

<header class="navbar bg-neutral text-neutral-content">
	<div class="font-['Press_Start_2P'] flex-1 text-4xl">Choice by Voice</div>

	<div class="flex-none">
		<YouTubePlayer hidden={true} videoID={youTubeVideoID} autoplay={false} />

		<Stt />

		<ThemeChange />
	</div>
</header>
