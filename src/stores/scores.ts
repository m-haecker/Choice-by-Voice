import { writable } from 'svelte/store';
import type { Scores } from '../shared/types';

export const scores = writable<Scores>({ right: 0, wrong: 0 });
