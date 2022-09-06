// This `colors` array MUST have the same elements as the 'color' slot in your Rhino context!
// https://console.picovoice.ai/rhn
export const colors = ['blau', 'grün', 'orange', 'pink', 'lila', 'rot', 'weiß', 'gelb'] as const;
export const colorCode: { [key in typeof colors[number]]: string } = {
	blau: 'blue',
	grün: 'green',
	orange: 'orange',
	pink: 'hotPink',
	lila: 'purple',
	rot: 'red',
	weiß: 'white',
	gelb: 'yellow',
};
