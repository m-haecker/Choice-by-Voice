import { writable } from 'svelte/store';
import type { VoiceCommand } from '../shared/types';

export const voiceCommands = writable<VoiceCommand[]>([]);
