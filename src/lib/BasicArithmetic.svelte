<script lang="ts">
	import type { AnswerChoice, Exercise } from '../shared/types';
	import { getRandomInt, shuffleArray } from '../shared/utils';
	import { scores, voiceCommands } from '../stores';
	import { appSettings } from '../appSettings';
	import { colorCode } from '../shared/entities';

	const operators = [
		{ sign: '+', limit: 100 }, // limits for an expression a+b the values of a and b to max. 100
		{ sign: '-', limit: 90 },
		{ sign: '*', limit: 20 },
		{ sign: '/', limit: 20 },
	];

	let exercise: Exercise; // a randomly generated math exercise with multiple choice answers
	let solution: string; // the displayed solution of the exercise; '?' until the user makes a decision
	let selectedAnswer: AnswerChoice; // the user selected answer to the math exercise
	let expressionCSS: string; // to style the expression based on the given answer (wrong or false)
	let progress: number; // progress bar value – values are within [0, `delayBetweenExercises`]

	bootstrap();

	function bootstrap() {
		reset();

		voiceCommands.subscribe((commands) => {
			const lastCommand = commands.at(-1);
			if (progress || lastCommand?.intent !== 'solveExercise') return;

			// the intent 'solveExercise' uses 2 slots: $color:color xor $pv.TwoDigitInteger:int
			const spokenAnswer = lastCommand.slots.color || lastCommand.slots.int;

			for (const ac of exercise.answerChoices) {
				if (ac.alias.toLowerCase() === spokenAnswer?.toLowerCase()) {
					onAnswerSelected(ac);
					break;
				}
			}
		});
	}

	function reset() {
		exercise = generateExercise();
		solution = '?';
		selectedAnswer = null;
		expressionCSS = 'text-primary-focus';
		progress = 0;
	}

	function generateExercise(ops = appSettings.opsPerExpression): Exercise {
		let expression: string;
		for (let i = 0; i < ops; i++) {
			const { sign, limit } = operators[getRandomInt(0, operators.length - 1)];
			const expressionCopy = expression;
			if (!expression) {
				expression = ` ${getRandomInt(1, limit)} ${sign} ${getRandomInt(1, limit)}`;
			} else {
				expression += ` ${sign} ${getRandomInt(1, limit)}`;
			}
			const result = parseExpression(expression);
			if (result < 0 || !Number.isInteger(result) || isOutOfSttRange(result)) {
				expression = expressionCopy;
				i--;
				continue;
			}
		}

		const { aliases, selectedAlias } = appSettings;
		const shuffledEntity = shuffleArray([...aliases[selectedAlias]]);
		const answerChoices = getMultipleChoice(expression).map<AnswerChoice>((value, i) => ({
			value,
			alias: shuffledEntity[i] || value.toString(), // shuffledEntity[i] is undefined, if `selectedAlias` is 'none'
		}));

		return {
			expression,
			answerChoices,
		};
	}

	/**
	 * @returns a multiple choice of `count` solutions for a mathematical expression `expr` as array.
	 * If `shuffle` is false, the correct solution is the array's 1st item, otherwise its position
	 * is random.
	 */
	function getMultipleChoice(
		expr: string,
		count = appSettings.choicesPerExpression,
		shuffle = true,
	) {
		// a simple algorithm that came to my mind spontaneously to generate alternative
		// solutions; surely there are smarter ones...
		const a = Number.parseInt(parseExpression(expr));
		const b = Math.floor(a / 2);
		const res = [a];
		while (res.length < count) {
			const rndm = getRandomInt(b, a + b + count);
			if (!isOutOfSttRange(rndm) && !res.includes(rndm)) res.push(rndm);
		}
		if (shuffle) {
			return shuffleArray(res);
		}
		return res;
	}

	/**
	 * This function checks that `n` is not >= 100 if we want to speak the solution directly as a
	 * number (e.g. 'The answer is 13') without alias (e.g. 'The answer A is correct').
	 * Reason: Our STT Enginge Rhino currently only understands one or two digit numbers.
	 */
	function isOutOfSttRange(n: number) {
		return appSettings.selectedAlias === 'none' && n > 99;
	}

	/**
	 * @param expression e.g. '5 + 7'
	 * @returns e.g. 12
	 */
	function parseExpression(expression: string) {
		return Function(`return ${expression};`)();
	}

	async function onAnswerSelected(answer: AnswerChoice) {
		selectedAnswer = answer;
		solution = parseExpression(exercise.expression);
		const isCorrect = Number(solution) === answer.value;
		if (isCorrect) {
			expressionCSS = 'bg-success text-success-content';
			$scores.right++;
		} else {
			expressionCSS = 'bg-error text-error-content';
			$scores.wrong++;
		}

		const delayMs = 10;
		progress = -delayMs;
		while ((progress += delayMs) < appSettings.delayBetweenExercises) {
			await new Promise((resolve) => setTimeout(resolve, delayMs));
		}
		reset();
	}

	function replaceAsterisks(s: string) {
		return s.replaceAll('*', '×');
	}
</script>

<div class:pointer-events-none={progress !== 0}>
	<div class="font-numbers text-center text-9xl {expressionCSS}" on:dblclick={reset}>
		{replaceAsterisks(exercise.expression)} = {solution}
	</div>

	<progress
		class="progress"
		class:invisible={progress === 0}
		value={progress}
		max={appSettings.delayBetweenExercises}
	/>

	<div class="flex-col font-numbers">
		{#each exercise.answerChoices as answer}
			{@const useColors = appSettings.selectedAlias === 'colors'}
			{@const color = useColors ? colorCode[answer.alias] : undefined}
			{@const border = color ? `border: 1.2rem solid ${color};` : ''}
			<div
				class="btn btn-primary normal-case w-full h-auto block mb-4 text-8xl"
				class:opacity-25={selectedAnswer && selectedAnswer.value !== answer.value}
				style={border}
				on:click={() => onAnswerSelected(answer)}
			>
				{#if answer.alias !== answer.value.toString()}
					<span class="font-thin">{answer.alias}:</span>
				{/if}
				{answer.value}
			</div>
		{/each}
	</div>
</div>
