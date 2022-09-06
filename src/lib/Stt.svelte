<script lang="ts">
	import type { RhinoWorker } from '@picovoice/rhino-web-core';
	import type { VoiceCommand } from '../shared/types';
	import { RhinoWorkerFactory } from '@picovoice/rhino-web-de-worker';
	import { WebVoiceProcessor } from '@picovoice/web-voice-processor';
	import rhinoModel from '../assets/rhino-models/Choice-by-Voice_de_wasm_v2_1_0';
	import { onDestroy } from 'svelte';
	import { voiceCommands } from '../stores';
	import { fade } from 'svelte/transition';
	import { appSettings } from '../appSettings';

	export let enableCommandLog = true;

	let isVoiceProcessing = false;
	let rhinoWorker: RhinoWorker;
	let webVoiceProcessor: WebVoiceProcessor;

	let lastCommand: VoiceCommand;
	let hideCommandLog = true;
	let timeoutID: NodeJS.Timeout;

	startRhino();

	onDestroy(() => {
		webVoiceProcessor.release();
		rhinoWorker.postMessage({ command: 'release' });
	});

	async function startRhino() {
		// Create a Rhino Worker to listen for commands in the specified context
		// Note: We receive a Worker object, _not_ an individual Rhino instance; Workers
		// communicate via message passing/receiving functions postMessage/onmessage.
		// See https://developer.mozilla.org/en-US/docs/Web/API/Worker
		rhinoWorker = await RhinoWorkerFactory.create({
			accessKey: appSettings.picovoiceAccessKey,
			context: {
				base64: rhinoModel,
				sensitivity: appSettings.sttSensitivity,
			},
			start: false,
		});

		rhinoWorker.onmessage = (msg) => {
			if (msg.data.command === 'rhn-inference') {
				lastCommand = msg.data.inference;
				if (lastCommand.isUnderstood) {
					$voiceCommands.push(lastCommand);
					$voiceCommands = $voiceCommands;
				} else {
					// TODO handle unsupported commands?
				}
				showCommandLog();
			}
		};

		// Start up the web voice processor. It will request microphone permission.
		// It downsamples the audio to voice recognition standard format (16-bit 16kHz linear PCM,
		// single-channel).
		// TODO Promise will reject if the user refuses mic permission => handle that possibility
		webVoiceProcessor = await WebVoiceProcessor.init({
			engines: [rhinoWorker], // forward incoming microphone audio frames to the Rhino Worker
			start: false,
		});
		webVoiceProcessor.stop();
	}

	function toggleVoiceProcessing() {
		if (!rhinoWorker || !webVoiceProcessor) return;

		isVoiceProcessing = !isVoiceProcessing;
		rhinoWorker.postMessage({ command: isVoiceProcessing ? 'resume' : 'pause' });
		isVoiceProcessing ? webVoiceProcessor.start() : webVoiceProcessor.stop();
	}

	function showCommandLog() {
		const timeout = appSettings.voiceCommandLogTimeout;
		if (!timeout) return;

		hideCommandLog = false;
		clearTimeout(timeoutID);
		timeoutID = setTimeout(() => (hideCommandLog = true), timeout);
	}
</script>

<button
	type="button"
	class="btn btn-ghost btn-circle"
	class:btn-micro-active={isVoiceProcessing}
	on:click={toggleVoiceProcessing}
>
	<svg
		class="h-6 w-6"
		viewBox="0 0 24 24"
		stroke-width="2"
		stroke="currentColor"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		{#if isVoiceProcessing}
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<rect x="9" y="2" width="6" height="11" rx="3" />
			<path d="M5 10a7 7 0 0 0 14 0" />
			<line x1="8" y1="21" x2="16" y2="21" />
			<line x1="12" y1="17" x2="12" y2="21" />
		{:else}
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<line x1="3" y1="3" x2="21" y2="21" />
			<path d="M9 5a3 3 0 0 1 6 0v5a3 3 0 0 1 -.13 .874m-2 2a3 3 0 0 1 -3.87 -2.872v-1" />
			<path d="M5 10a7 7 0 0 0 10.846 5.85m2.002 -2a6.967 6.967 0 0 0 1.152 -3.85" />
			<line x1="8" y1="21" x2="16" y2="21" />
			<line x1="12" y1="17" x2="12" y2="21" />
		{/if}
	</svg>
</button>

{#if enableCommandLog && hideCommandLog === false}
	<div out:fade={{ duration: 300 }} class="absolute left-0 bottom-0 w-full p-4">
		<div
			class="alert shadow-lg font-mono text-4xl {lastCommand.intent
				? 'alert-success'
				: 'alert-error'}"
		>
			{#if lastCommand.intent}
				<div>
					Intent: <span class="font-bold">{lastCommand.intent}</span> – Slots:
					<span class="font-bold">{JSON.stringify(lastCommand.slots)}</span>
				</div>
			{:else}
				Command was not understood
			{/if}
		</div>
	</div>
{/if}
