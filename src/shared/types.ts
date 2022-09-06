export interface Scores {
	right: number;
	wrong: number;
}

export interface Exercise {
	/** The math exercise to be solved, e.g. '12 + 9 * 7' */
	expression: string;

	/** Multiple choice options for the solution of the math `expression` */
	answerChoices: AnswerChoice[];
}

export interface AnswerChoice {
	value: number; // e.g. 75
	alias: string; // e.g. 'A' => enables us to say "Answer A is correct"
}

export enum YouTubePlayerState {
	UNSTARTED = -1,
	ENDED,
	PLAYING,
	PAUSED,
	BUFFERING,
	CUED = 5,
}

/** Follows the format of voice commands recognized by Rhino */
export interface VoiceCommand {
	isUnderstood: boolean;
	isFinalized: boolean;
	intent: string; // e.g. 'solveExercise'
	slots: {
		[key: string]: string; // e.g. { 'int': '22' }
	};
}
