import { colors } from './shared/entities';

export const appSettings: AppSettings = {
	picovoiceAccessKey: import.meta.env.VITE_PICOVOICE_ACCESS_KEY,

	delayBetweenExercises: 2000,
	opsPerExpression: 2,
	choicesPerExpression: 4,

	voiceCommandLogTimeout: 2000,

	aliases: {
		none: [],
		colors,
	},
	selectedAlias: 'none', // don't miss to try 'colors' as well

	sttSensitivity: 0.25,

	youTubeVideoID: 'gwVIpO9EfUQ',
};

type AliasType = 'colors' | 'none';

interface AppSettings {
	/** access key required for Picovoice SDK, see README.md */
	picovoiceAccessKey: string;

	/** delay after solving a math exercise until a new one is displayed */
	delayBetweenExercises: number;

	/** 1 could result in the math expression a+b, 2 in a+b+c and so on */
	opsPerExpression: number;

	/** how many multiple choice options to generate per math exercise */
	choicesPerExpression: number;

	/**
	 * How long (in ms) the info about a (not) recognized voice command is displayed.
	 * Set it to 0 to deactivate.
	 */
	voiceCommandLogTimeout: number;

	/**
	 * Aliases allow us to speak out the solution not directly as a number (e.g. 'The answer is _13_'),
	 * but with any other word defined by that alias (e.g. 'The _blue_ answer is correct' if we had
	 * defined color aliases).
	 * This is especially helpful when speaking numbers >= 100, as our STT engine Rhino currently
	 * only understands single or double digit numbers.
	 */
	aliases: {
		[key in AliasType]: readonly string[];
	};
	selectedAlias: AliasType;

	/**
	 * Speech-to-text sensitivity is a floating point number within [0, 1].
	 * A higher sensitivity reduces miss rate at cost of increased false alarm rate.
	 */
	sttSensitivity: number;

	youTubeVideoID: string;
}
