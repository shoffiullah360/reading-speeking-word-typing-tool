/**
 * Learning-guide content for /bangla-typing-practice/.
 *
 * Every key → glyph pair below is copied from the verified Avro and Bijoy rows
 * rendered beside the visual keyboards on the page, so the guide and the charts
 * can never drift apart.
 */

export interface GuideStep {
	title: string;
	body: string;
}

export interface GuideExample {
	input: string;
	output: string;
}

export interface GuideMistake {
	/** Input method the mistake applies to ("অভ্র", "বিজয়" or "সব"). */
	tag: string;
	title: string;
	body: string;
	pairs: GuideExample[];
}

export interface BijoySignRow {
	keys: string;
	sign: string;
	example: string;
}

/** Practical steps for getting system/browser Bangla input working first. */
export const INPUT_SETUP_STEPS: GuideStep[] = [
	{
		title: 'বাংলা ইনপুট পদ্ধতি ইনস্টল করুন',
		body: 'অভ্র ফোনেটিক, বিজয় (ইউনিকোড), উইন্ডোজের বাংলা কীবোর্ড বা গুগল বাংলা ইনপুট—যেকোনো একটি ব্যবহার করতে পারেন।',
	},
	{
		title: 'বাংলা কীবোর্ড বা IME চালু করুন',
		body: 'ভাষা বারে বা সিস্টেম ট্রেতে বাংলা বেছে নিন। প্রয়োজনে Win+Space বা Alt+Shift দিয়ে ইংরেজি ও বাংলার মধ্যে বদলান।',
	},
	{
		title: 'সক্রিয় IME দিয়ে এখানে টাইপ করুন',
		body: 'ব্রাউজার বা এই পাতা নিজে থেকে ইংরেজি কী-কে অভ্র বা বিজয় বাংলায় বদলায় না। ইনপুট পদ্ধতি থেকে যে ইউনিকোড বাংলা আসে, Wordora শুধু সেটিই হুবহু মিলিয়ে দেখে।',
	},
	{
		title: 'বিজয় ব্যবহার করলে ইউনিকোড রাখুন',
		body: 'SutonnyMJ/ANSI লেখা এখানে মিলবে না। বিজয়ের ইউনিকোড মোড, অভ্র, রিদ্মিক বা উইন্ডোজ বাংলা ইনপুট ব্যবহার করুন।',
	},
];

/** Key → sign pairs taken from the Bijoy chart rows shown above. */
export const BIJOY_SIGN_EXAMPLES: BijoySignRow[] = [
	{ keys: 'G', sign: '◌্', example: 'J G K → ক্ত' },
	{ keys: 'Z', sign: '◌্র', example: 'J Z → ক্র' },
	{ keys: 'Shift+Z', sign: '◌্য', example: 'J Shift+Z → ক্য' },
	{ keys: 'Shift+A', sign: 'র্', example: 'Shift+A J → র্ক' },
	{ keys: 'A', sign: '◌ৃ', example: 'J A → কৃ' },
];

/** The mistakes that account for most failed attempts. */
export const TYPING_MISTAKES: GuideMistake[] = [
	{
		tag: 'অভ্র',
		title: 'ছোট ও বড় হাতের অক্ষর আলাদা বর্ণ দেয়',
		body: 'একই কী-এর দুই রূপ দুইটি ভিন্ন বর্ণ। বানান মিলিয়ে নিন, বিশেষ করে ত/ট, দ/ড ও ন/ণ।',
		pairs: [
			{ input: 't', output: 'ত' },
			{ input: 'T', output: 'ট' },
			{ input: 'd', output: 'দ' },
			{ input: 'D', output: 'ড' },
			{ input: 'n', output: 'ন' },
			{ input: 'N', output: 'ণ' },
		],
	},
	{
		tag: 'অভ্র',
		title: 'শ, ষ ও স গুলিয়ে যাওয়া',
		body: 'উচ্চারণ কাছাকাছি হলেও বর্ণ আলাদা, তাই শব্দের বানান দেখে নিন।',
		pairs: [
			{ input: 'sh', output: 'শ' },
			{ input: 'Sh', output: 'ষ' },
			{ input: 's', output: 'স' },
		],
	},
	{
		tag: 'অভ্র',
		title: 'হসন্ত বাদ পড়লে যুক্তবর্ণ ভেঙে যায়',
		body: 'দুটি ব্যঞ্জন জোড়া দিতে মাঝে হসন্ত (্) লাগে। অভ্রতে ব্যঞ্জনগুলো পরপর লিখলে হসন্ত নিজে থেকেই বসে।',
		pairs: [
			{ input: 'kk', output: 'ক্ক' },
			{ input: 'kkh', output: 'ক্ষ' },
			{ input: 'nt', output: 'ন্ত' },
		],
	},
	{
		tag: 'বিজয়',
		title: 'Shift ভুলে যাওয়া',
		body: 'চার্টের ডান দিকের রূপ Shift চেপে আসে। Shift ছাড়া চাপলে অন্য বর্ণ বসে যাবে।',
		pairs: [
			{ input: 'J', output: 'ক' },
			{ input: 'Shift+J', output: 'খ' },
			{ input: 'N', output: 'স' },
			{ input: 'Shift+N', output: 'ষ' },
		],
	},
	{
		tag: 'বিজয়',
		title: 'কার-এর ক্রম উল্টে যাওয়া',
		body: 'বিজয়ে ি ও ে কার ব্যঞ্জনের আগে লিখতে হয়; া কার বসে ব্যঞ্জনের পরে।',
		pairs: [
			{ input: 'D + J', output: 'কি' },
			{ input: 'C + J', output: 'কে' },
			{ input: 'J + F', output: 'কা' },
		],
	},
	{
		tag: 'সব',
		title: 'বাড়তি স্পেস ও ভুল দাঁড়ি',
		body: 'শব্দের মাঝে একটাই স্পেস দিন এবং বাক্য শেষে বাংলা দাঁড়ি (।) দিন। বাড়তি স্পেস বা ইংরেজি ডট ভুল হিসেবে গণনা হয়।',
		pairs: [
			{ input: 'space', output: 'একটাই' },
			{ input: '.', output: '।' },
		],
	},
];
