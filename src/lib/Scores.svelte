<script lang="ts">
	import { scores, voiceCommands } from '../stores';

	voiceCommands.subscribe((commands) => {
		const lastCommand = commands.at(-1);
		if (lastCommand?.intent === 'resetScores') {
			onReset();
		}
	});

	function onReset() {
		scores.set({ right: 0, wrong: 0 });
	}
</script>

<div class="flex items-center justify-center">
	<div class="stats bg-neutral text-neutral-content">
		<div class="stat text-success">
			<div class="stat-title">Right</div>
			<div class="stat-value">{$scores.right}</div>
		</div>

		<div class="stat text-error">
			<div class="stat-title">Wrong</div>
			<div class="stat-value">{$scores.wrong}</div>
		</div>
	</div>

	<div class="pl-4">
		<button class="btn btn-lg btn-secondary" on:click={onReset}>Reset</button>
	</div>
</div>
