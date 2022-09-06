<script lang="ts">
	import { themeChange } from 'theme-change';
	import { onMount } from 'svelte';

	onMount(() => {
		themeChange(false);
		// 👆 false parameter is required for svelte
	});
</script>

<div class="dropdown dropdown-end">
	<div tabindex="0" class="btn gap-1 normal-case btn-ghost">
		<svg
			fill="none"
			viewBox="0 0 24 24"
			class="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
			/></svg
		> <span class="hidden md:inline">Theme</span>
		<svg
			class="ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block"
			viewBox="0 0 2048 2048"
			><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" /></svg
		>
	</div>

	<ul
		tabindex="0"
		class="p-2 shadow menu dropdown-content bg-base-100 text-base-content rounded-box w-52 max-h-96 overflow-x-hidden overflow-y-scroll"
	>
		<li><a data-set-theme="acid" data-act-class="active">Acid</a></li>
		<li><a data-set-theme="aqua" data-act-class="active">Aqua</a></li>
		<li><a data-set-theme="autumn" data-act-class="active">Autumn</a></li>
		<li><a data-set-theme="black" data-act-class="active">Black</a></li>
		<li><a data-set-theme="bumblebee" data-act-class="active">Bumblebee</a></li>
		<li><a data-set-theme="business" data-act-class="active">Business</a></li>
		<li><a data-set-theme="cmyk" data-act-class="active">Cmyk</a></li>
		<li><a data-set-theme="coffee" data-act-class="active">Coffee</a></li>
		<li><a data-set-theme="corporate" data-act-class="active">Corporate</a></li>
		<li><a data-set-theme="cupcake" data-act-class="active">Cupcake</a></li>
		<li><a data-set-theme="cyberpunk" data-act-class="active">Cyberpunk</a></li>
		<li><a data-set-theme="dark" data-act-class="active">Dark</a></li>
		<li><a data-set-theme="dracula" data-act-class="active">Dracula</a></li>
		<li><a data-set-theme="emerald" data-act-class="active">Emerald</a></li>
		<li><a data-set-theme="fantasy" data-act-class="active">Fantasy</a></li>
		<li><a data-set-theme="forest" data-act-class="active">Forest</a></li>
		<li><a data-set-theme="garden" data-act-class="active">Garden</a></li>
		<li><a data-set-theme="halloween" data-act-class="active">Halloween</a></li>
		<li><a data-set-theme="lemonade" data-act-class="active">Lemonade</a></li>
		<li><a data-set-theme="light" data-act-class="active">Light</a></li>
		<li><a data-set-theme="lofi" data-act-class="active">Lofi</a></li>
		<li><a data-set-theme="luxury" data-act-class="active">Luxury</a></li>
		<li><a data-set-theme="night" data-act-class="active">Night</a></li>
		<li><a data-set-theme="pastel" data-act-class="active">Pastel</a></li>
		<li><a data-set-theme="retro" data-act-class="active">Retro</a></li>
		<li><a data-set-theme="synthwave" data-act-class="active">Synthwave</a></li>
		<li><a data-set-theme="valentine" data-act-class="active">Valentine</a></li>
		<li><a data-set-theme="winter" data-act-class="active">Winter</a></li>
		<li><a data-set-theme="wireframe" data-act-class="active">Wireframe</a></li>
	</ul>
</div>
