/**
 * Bangla typing curriculum for /bangla-typing-practice/.
 *
 * 3 levels, 12 lessons, 5 generated drill pools. Every lesson ships real Bengali
 * target text, a short explanation and an explicit completion threshold so the
 * practice engine can judge a finished attempt honestly.
 */

export type BanglaTypingLevelId = 'beginner' | 'intermediate' | 'advanced';

export interface BanglaTypingLevel {
	id: BanglaTypingLevelId;
	label: string;
	description: string;
}

export type BanglaKeyboardId = 'avro' | 'bijoy' | 'general';

export interface BanglaKeyboardContext {
	id: BanglaKeyboardId;
	label: string;
	summary: string;
}

/** One "what you press → what appears" pair, shown as a chip beside a lesson. */
export interface BanglaLayoutExample {
	input: string;
	output: string;
}

export interface BanglaLayoutGuide {
	note: string;
	examples: BanglaLayoutExample[];
}

export type LessonLayoutGuidance = Record<BanglaKeyboardId, BanglaLayoutGuide>;

export interface BanglaTypingLesson {
	id: string;
	/** Bengali numeral shown in the lesson list, e.g. "০১". */
	number: string;
	title: string;
	level: BanglaTypingLevelId;
	difficulty: string;
	/** Minimum accuracy (percent) required to complete the lesson. */
	minAccuracy: number;
	summary: string;
	criteria: string;
	/** Two or three sentences the learner reads before typing. */
	explanation: string;
	/** Layout-specific typing guidance for the same lesson. */
	guidance: LessonLayoutGuidance;
	/** Exact Unicode text the learner has to reproduce. */
	target: string;
}

export type BanglaDrillPoolKey = 'letters' | 'words' | 'sentences' | 'paragraphs' | 'hardWords';

export type BanglaPracticeModeId =
	| 'letters'
	| 'words'
	| 'sentences'
	| 'paragraphs'
	| 'hard-words'
	| 'custom'
	| 'revision';

export interface BanglaPracticeMode {
	id: BanglaPracticeModeId;
	label: string;
	summary: string;
	/** `drill` builds a random exercise from a pool, `custom` uses learner text, `revision` uses tracked mistakes. */
	kind: 'drill' | 'custom' | 'revision';
	difficulty: string;
	minAccuracy: number;
	poolKey?: BanglaDrillPoolKey;
	sampleSize?: number;
}

export const LESSON_LEVELS: BanglaTypingLevel[] = [
	{
		id: 'beginner',
		label: 'শিক্ষানবিস',
		description: 'বর্ণ, কারচিহ্ন, যুক্তাক্ষর ও বাংলা সংখ্যা দিয়ে শুরু করুন।',
	},
	{
		id: 'intermediate',
		label: 'মধ্যবর্তী',
		description: 'সহজ ও কঠিন শব্দ, ছোট ও দীর্ঘ বাক্যে হাত পাকান।',
	},
	{
		id: 'advanced',
		label: 'উন্নত',
		description: 'অনুচ্ছেদ, যতিচিহ্ন ও মিশ্র লেখায় গতি ধরে রাখুন।',
	},
];

export const KEYBOARD_CONTEXTS: BanglaKeyboardContext[] = [
	{
		id: 'avro',
		label: 'অভ্র ফোনেটিক',
		summary: 'ইংরেজি হরফে লিখলে বাংলা আসে। নিচের অভ্র কীবোর্ড ও ম্যাপিং টেবিল মিলিয়ে নিন।',
	},
	{
		id: 'bijoy',
		label: 'বিজয়',
		summary: 'বিজয় চার্টে প্রতিটি সারিতে Shift চেপে দ্বিতীয় রূপ পাওয়া যায়। নিচের বিজয় কীবোর্ড দেখুন।',
	},
	{
		id: 'general',
		label: 'সাধারণ বাংলা ইনপুট',
		summary: 'রিদ্মিক, উইন্ডোজ বাংলা বা গুগল বাংলার মতো যেকোনো ইউনিকোড ইনপুট ব্যবহার করুন।',
	},
];

/** Guidance used by drills, custom text and revision, where there is no single lesson. */
export const GENERAL_LAYOUT_GUIDES: Record<BanglaKeyboardId, BanglaLayoutGuide> = {
	avro: {
		note: 'অভ্র ফোনেটিকে ইংরেজি হরফে লিখেই বাংলা অক্ষর আসে। বড় হাতের অক্ষর আলাদা বর্ণ দেয়।',
		examples: [
			{ input: 'o', output: 'অ' },
			{ input: 'k', output: 'ক' },
			{ input: 'ka', output: 'কা' },
			{ input: 'kkh', output: 'ক্ষ' },
		],
	},
	bijoy: {
		note: 'বিজয়ে ব্যঞ্জন আগে, কার পরে। Shift চেপে সেই কী-এর দ্বিতীয় রূপ পাওয়া যায়।',
		examples: [
			{ input: 'J', output: 'ক' },
			{ input: 'F', output: '◌া' },
			{ input: 'G', output: '◌্' },
			{ input: 'Shift+G', output: '।' },
		],
	},
	general: {
		note: 'যেকোনো ইউনিকোড বাংলা ইনপুটই কাজ করে। লেখা শুধু হুবহু মিলিয়ে দেখা হয়, কোথাও পাঠানো হয় না।',
		examples: [
			{ input: 'বর্ণ', output: 'সরাসরি টাইপ করুন' },
			{ input: 'কার', output: 'ব্যঞ্জনের পরে দিন' },
		],
	},
};

export const BANGLA_LESSONS: BanglaTypingLesson[] = [
	{
		id: 'lesson-01',
		number: '০১',
		title: 'বাংলা স্বরবর্ণ',
		level: 'beginner',
		difficulty: 'সহজ',
		minAccuracy: 95,
		summary:
			'স্বরবর্ণগুলো আলাদা অক্ষর হিসেবে আসে। প্রতিটি বর্ণের পরে একটি স্পেস আছে, তাই ছন্দ ধরে টাইপ করুন।',
		criteria: '১১টি স্বরবর্ণ স্পেসসহ সম্পূর্ণ টাইপ করুন, ন্যূনতম ৯৫% নির্ভুলতায়।',
		explanation:
			'স্বরবর্ণ নিজে দাঁড়িয়ে একটি শব্দাংশ তৈরি করে, যেমন "অ" বা "আ"। এগুলো কোনো ব্যঞ্জনের সঙ্গে না জুড়েই আলাদা অক্ষর হিসেবে আসে, তাই প্রথম পাঠে আঙুল সেট করার জন্য এগুলোই সহজ।',
		guidance: {
			avro: {
				note: 'অভ্র ফোনেটিকে প্রতিটি স্বরবর্ণের জন্য একটি ইংরেজি কী আছে। বড় হাতের অক্ষর আলাদা স্বর দেয়।',
				examples: [
					{ input: 'o', output: 'অ' },
					{ input: 'a', output: 'আ' },
					{ input: 'i', output: 'ই' },
					{ input: 'I', output: 'ঈ' },
					{ input: 'U', output: 'ঊ' },
				],
			},
			bijoy: {
				note: 'বিজয় চার্টে পূর্ণ স্বর ও চিহ্ন বেশিরভাগই Shift-এর সঙ্গে আসে—অ = Shift+F, ও = X। বাকি স্বরগুলোর জন্য নিজের চার্ট মিলিয়ে নিন।',
				examples: [
					{ input: 'Shift+F', output: 'অ' },
					{ input: 'X', output: 'ও' },
					{ input: 'Shift+Q', output: 'ং' },
					{ input: 'Shift+7', output: 'ঁ' },
				],
			},
			general: {
				note: 'রিদ্মিক, উইন্ডোজ বাংলা বা গুগল বাংলা—যেটিই ব্যবহার করুন, অক্ষরগুলো সরাসরি ইউনিকোডে আসে।',
				examples: [
					{ input: 'স্বরবর্ণ', output: 'অ আ ই ঈ উ ঊ' },
					{ input: 'পূর্ণ স্বর', output: 'ঋ এ ঐ ও ঔ' },
				],
			},
		},
		target: 'অ আ ই ঈ উ ঊ ঋ এ ঐ ও ঔ',
	},
	{
		id: 'lesson-02',
		number: '০২',
		title: 'বাংলা ব্যঞ্জনবর্ণ',
		level: 'beginner',
		difficulty: 'সহজ',
		minAccuracy: 95,
		summary:
			'ব্যঞ্জনবর্ণ ৩২টি। প্রথমে ধীরে ধীরে প্রতিটি বর্ণ চিনে নিন, তারপর একটানা টাইপ করুন।',
		criteria: '৩২টি ব্যঞ্জনবর্ণ স্পেসসহ সম্পূর্ণ টাইপ করুন, ন্যূনতম ৯৫% নির্ভুলতায়।',
		explanation:
			'ব্যঞ্জনবর্ণ শব্দের কাঠামো তৈরি করে। এগুলো প্রায়ই কার বা হসন্তের সঙ্গে জুড়ে যায়, তাই আগে আলাদা রূপে চেনা জরুরি।',
		guidance: {
			avro: {
				note: 'একাধিক কী মিলেও একটি বর্ণ তৈরি হয়, যেমন kh → খ। বড় হাতের T, D, N আলাদা বর্ণ দেয়।',
				examples: [
					{ input: 'k', output: 'ক' },
					{ input: 'kh', output: 'খ' },
					{ input: 'T', output: 'ট' },
					{ input: 'N', output: 'ণ' },
					{ input: 'Sh', output: 'ষ' },
				],
			},
			bijoy: {
				note: 'বিজয় চার্টে ডান দিকের বর্ণটি Shift চেপে পাবেন—J = ক, Shift+J = খ।',
				examples: [
					{ input: 'J', output: 'ক' },
					{ input: 'Shift+J', output: 'খ' },
					{ input: 'O', output: 'গ' },
					{ input: 'T', output: 'ট' },
					{ input: 'M', output: 'শ' },
				],
			},
			general: {
				note: 'সরাসরি বর্ণ টাইপ করুন। ব্যঞ্জনগুলো দেখতে আলাদা হলেও একই সারিতে বসালে উচ্চারণ বদলায়।',
				examples: [
					{ input: 'প্রথম অংশ', output: 'ক খ গ ঘ ঙ চ ছ জ' },
					{ input: 'বাকি অংশ', output: 'ট ঠ ড ঢ ণ ত থ দ ধ ন' },
				],
			},
		},
		target: 'ক খ গ ঘ ঙ চ ছ জ ঝ ঞ ট ঠ ড ঢ ণ ত থ দ ধ ন প ফ ব ভ ম য র ল শ ষ স হ',
	},
	{
		id: 'lesson-03',
		number: '০৩',
		title: 'কার ও স্বরচিহ্ন',
		level: 'beginner',
		difficulty: 'মাঝারি',
		minAccuracy: 90,
		summary:
			'কারচিহ্ন ব্যঞ্জনের সঙ্গে জুড়ে যায় এবং একসঙ্গে একটি রূপ তৈরি করে, তাই প্রতিটি অক্ষরকে এক একক ধরে টাইপ করুন।',
		criteria: '১০টি কারচিহ্নযুক্ত অক্ষর সম্পূর্ণ টাইপ করুন, ন্যূনতম ৯০% নির্ভুলতায়।',
		explanation:
			'কার ব্যঞ্জনের পরে বসে অক্ষরের উচ্চারণ বদলায়। কার একা দাঁড়ায় না—সবসময় একটি ব্যঞ্জনের সঙ্গে জোড়া লাগে, তাই ক + া = কা একই অক্ষর হিসেবে গণনা হয়।',
		guidance: {
			avro: {
				note: 'ব্যঞ্জন লেখার পরে স্বর-কী চাপলেই কার বসে। একই কী বড় হাতের হলে দীর্ঘ কার হয়।',
				examples: [
					{ input: 'ka', output: 'কা' },
					{ input: 'ki', output: 'কি' },
					{ input: 'kI', output: 'কী' },
					{ input: 'ke', output: 'কে' },
					{ input: 'kO', output: 'কো' },
				],
			},
			bijoy: {
				note: 'বিজয়ে আগে ব্যঞ্জন, তারপর কার-কী: ক + F = কা। Shift চেপে দীর্ঘ রূপ পাওয়া যায়।',
				examples: [
					{ input: 'F', output: '◌া' },
					{ input: 'D', output: '◌ি' },
					{ input: 'Shift+D', output: '◌ী' },
					{ input: 'C', output: '◌ে' },
					{ input: 'Shift+C', output: '◌ৈ' },
				],
			},
			general: {
				note: 'ব্যঞ্জনের পরে সরাসরি কার বসান। পুরো জোড়াটি একটি অক্ষর হিসেবেই গণনা হয়।',
				examples: [
					{ input: 'কার বসান', output: 'ব্যঞ্জন + া = কা' },
					{ input: 'উদাহরণ', output: 'কি কী কু কূ' },
				],
			},
		},
		target: 'কা কি কী কু কূ কৃ কে কৈ কো কৌ',
	},
	{
		id: 'lesson-04',
		number: '০৪',
		title: 'ফলা ও যুক্তবর্ণ',
		level: 'beginner',
		difficulty: 'মাঝারি',
		minAccuracy: 90,
		summary:
			'দুই বা ততোধিক বর্ণ জুড়ে যুক্তাক্ষর তৈরি হয়। মাঝের হসন্ত (্) বাদ পড়লে বানান ভুল হবে।',
		criteria: '১৬টি যুক্তাক্ষর সম্পূর্ণ টাইপ করুন, ন্যূনতম ৯০% নির্ভুলতায়।',
		explanation:
			'ফলা ও যুক্তবর্ণে দুটি ব্যঞ্জন একসঙ্গে একটি রূপ নেয়। মাঝের হসন্ত (্) বাদ পড়লে অক্ষরটি ভেঙে যায় এবং বানান বদলে যায়।',
		guidance: {
			avro: {
				note: 'দুটি ব্যঞ্জন পরপর লিখলে যুক্তাক্ষর তৈরি হয়। y দিলে য-ফলা, r দিলে র-ফলা।',
				examples: [
					{ input: 'kkh', output: 'ক্ষ' },
					{ input: 'nt', output: 'ন্ত' },
					{ input: 'ndh', output: 'ন্ধ' },
					{ input: 'ky', output: 'ক্য' },
					{ input: 'kri', output: 'ক্রি' },
				],
			},
			bijoy: {
				note: 'হসন্ত (G) দিয়ে দুটি ব্যঞ্জন জুড়ুন। Z দিলে র-ফলা, Shift+Z দিলে য-ফলা।',
				examples: [
					{ input: 'G', output: '◌্ (হসন্ত)' },
					{ input: 'Z', output: '◌্র' },
					{ input: 'Shift+Z', output: '◌্য' },
					{ input: 'N G K', output: 'স্ত' },
				],
			},
			general: {
				note: 'হসন্ত দিয়ে ব্যঞ্জন জুড়লে একটি অক্ষর হয়। পুরো যুক্তাক্ষরটি একবারে টাইপ করুন।',
				examples: [
					{ input: 'যুক্তাক্ষর', output: 'ক্ষ ন্ত ন্ধ স্ত' },
					{ input: 'ফলা', output: 'ক্য ক্র' },
				],
			},
		},
		target: 'ক্ক ক্র গ্র ঘ্র ট্র ত্র দ্র ধ্র ন্ত ন্ধ স্থ ক্ষ জ্ঞ শ্ন স্ন হ্ম',
	},
	{
		id: 'lesson-05',
		number: '০৫',
		title: 'বাংলা সংখ্যা',
		level: 'beginner',
		difficulty: 'মাঝারি',
		minAccuracy: 90,
		summary:
			'বাংলা সংখ্যার জন্য আলাদা অক্ষর আছে। আপনার ইনপুট পদ্ধতি অনুযায়ী ইংরেজি সংখ্যার কী চেপেই এগুলো আসবে।',
		criteria: '১৪টি বাংলা সংখ্যা ও সংখ্যা-শব্দ সম্পূর্ণ টাইপ করুন, ন্যূনতম ৯০% নির্ভুলতায়।',
		explanation:
			'বাংলা অঙ্কের নিজস্ব রূপ আছে (০–৯)। ইনপুট পদ্ধতি বাংলায় থাকলে সংখ্যা সারির একই কী চেপেই বাংলা অঙ্ক আসে, তাই আলাদা কিছু মুখস্থ করতে হয় না।',
		guidance: {
			avro: {
				note: 'সংখ্যা সারির ১–০ কী চাপলেই বাংলা অঙ্ক আসে। একাধিক অঙ্ক পরপর চাপলে সংখ্যা তৈরি হয়।',
				examples: [
					{ input: '1', output: '১' },
					{ input: '5', output: '৫' },
					{ input: '0', output: '০' },
					{ input: '25', output: '২৫' },
					{ input: '100', output: '১০০' },
				],
			},
			bijoy: {
				note: 'বিজয়েও সংখ্যা সারি একই থাকে—ইংরেজি অঙ্কের জায়গায় বাংলা অঙ্ক বসে।',
				examples: [
					{ input: '1', output: '১' },
					{ input: '9', output: '৯' },
					{ input: '0', output: '০' },
					{ input: '2026', output: '২০২৬' },
				],
			},
			general: {
				note: 'যেকোনো ইউনিকোড ইনপুটে বাংলা অঙ্ক সরাসরি পাওয়া যায়।',
				examples: [
					{ input: 'বাংলা অঙ্ক', output: '০ ১ ২ ৩ ৪ ৫ ৬ ৭ ৮ ৯' },
					{ input: 'সংখ্যা', output: '১০ ২৫ ১০০' },
				],
			},
		},
		target: '০ ১ ২ ৩ ৪ ৫ ৬ ৭ ৮ ৯ ১০ ২৫ ১০০ ২০২৬',
	},
	{
		id: 'lesson-06',
		number: '০৬',
		title: 'সাধারণ শব্দ',
		level: 'intermediate',
		difficulty: 'মাঝারি',
		minAccuracy: 90,
		summary:
			'প্রতিদিনের সহজ শব্দ দিয়ে শুরু করুন। শব্দের মাঝে একটিই স্পেস রাখুন, বাড়তি স্পেস দেবেন না।',
		criteria: '১২টি শব্দ সম্পূর্ণ টাইপ করুন, ন্যূনতম ৯০% নির্ভুলতায়।',
		explanation:
			'শব্দে বর্ণ আর কার একসঙ্গে আসে। শব্দের মাঝে একটাই স্পেস রাখুন—বাড়তি স্পেস দিলে সেটিও ভুল হিসেবে গণনা হবে।',
		guidance: {
			avro: {
				note: 'শব্দ লিখুন যেমন উচ্চারণ করছেন। জায়গায় জায়গায় শুধু একটি স্পেস দিন।',
				examples: [
					{ input: 'boi', output: 'বই' },
					{ input: 'pani', output: 'পানি' },
					{ input: 'gach', output: 'গাছ' },
					{ input: 'skul', output: 'স্কুল' },
				],
			},
			bijoy: {
				note: 'বিজয়ে ব্যঞ্জন আগে, কার পরে। যেমন R + F = পা, B + D = নি।',
				examples: [
					{ input: 'H D', output: 'বি' },
					{ input: 'R F', output: 'পা' },
					{ input: 'B D', output: 'নি' },
				],
			},
			general: {
				note: 'শব্দ লিখে একটিমাত্র স্পেস দিন। যুক্তাক্ষর একসঙ্গে থাকলে ভাঙবেন না।',
				examples: [
					{ input: 'শব্দ', output: 'বই পানি গাছ' },
					{ input: 'স্পেস', output: 'শব্দের মাঝে একটাই' },
				],
			},
		},
		target: 'বাড়ি বই কলম পানি মাটি আকাশ নদী ফুল গাছ পাখি স্কুল বাজার',
	},
	{
		id: 'lesson-07',
		number: '০৭',
		title: 'কঠিন শব্দ',
		level: 'intermediate',
		difficulty: 'কঠিন',
		minAccuracy: 88,
		summary:
			'যুক্তাক্ষর ও নুকতা বেশি থাকা শব্দে ভুল বেশি হয়। গতি না বাড়িয়ে প্রথমে নির্ভুলতায় মন দিন।',
		criteria: '৯টি কঠিন শব্দ সম্পূর্ণ টাইপ করুন, ন্যূনতম ৮৮% নির্ভুলতায়।',
		explanation:
			'কঠিন শব্দে একই সঙ্গে একাধিক যুক্তাক্ষর ও কার থাকে। মাঝের হসন্ত বাদ পড়লে শব্দটি ভেঙে যায়, তাই ধীরে হলেও পূর্ণ যুক্তাক্ষর লিখুন।',
		guidance: {
			avro: {
				note: 'যুক্তাক্ষর তৈরি করতে ব্যঞ্জনগুলো পরপর লিখুন; মাঝে স্পেস দিলে যুক্ত হয় না।',
				examples: [
					{ input: 'kkh', output: 'ক্ষ' },
					{ input: 'gg', output: 'জ্ঞ' },
					{ input: 'ndh', output: 'ন্ধ' },
					{ input: 'st', output: 'স্ত' },
				],
			},
			bijoy: {
				note: 'হসন্ত (G) ছাড়া যুক্তাক্ষর তৈরি হয় না। Z ও Shift+Z দিয়ে ফলা বসান।',
				examples: [
					{ input: 'G', output: '◌্' },
					{ input: 'N G K', output: 'স্ত' },
					{ input: 'Z', output: '◌্র' },
					{ input: 'Shift+Z', output: '◌্য' },
				],
			},
			general: {
				note: 'কঠিন শব্দে গতি না বাড়িয়ে অক্ষর ধরে ধরে এগোন।',
				examples: [
					{ input: 'যুক্তাক্ষর', output: 'ক্ষ ন্ধ স্ত' },
					{ input: 'শব্দ', output: 'বিশ্ববিদ্যালয়' },
				],
			},
		},
		target: 'বিশ্ববিদ্যালয় স্বাস্থ্য সন্ধ্যা শ্রদ্ধা উজ্জ্বল পূর্ণিমা বৈজ্ঞানিক সঞ্চয়',
	},
	{
		id: 'lesson-08',
		number: '০৮',
		title: 'ছোট বাক্য',
		level: 'intermediate',
		difficulty: 'মাঝারি',
		minAccuracy: 88,
		summary:
			'ছোট বাক্যে যতিচিহ্নও টাইপ করতে হয়। বাক্য শেষে দাঁড়ি (।) দিতে ভুলবেন না।',
		criteria: '৩টি ছোট বাক্য যতিচিহ্নসহ সম্পূর্ণ টাইপ করুন, ন্যূনতম ৮৮% নির্ভুলতায়।',
		explanation:
			'বাক্যে শব্দের মাঝে স্পেস আর শেষে দাঁড়ি (।) থাকে। দাঁড়ি বাদ পড়লে বাক্যটি অসম্পূর্ণ হিসেবে গণনা হবে।',
		guidance: {
			avro: {
				note: 'দাঁড়ি দিতে ডট (.) চাপুন—অভ্র ফোনেটিকে এটি স্বয়ংক্রিয়ভাবে । হয়ে যায়।',
				examples: [
					{ input: 'ami', output: 'আমি' },
					{ input: 'boi', output: 'বই' },
					{ input: '.', output: '।' },
				],
			},
			bijoy: {
				note: 'বিজয়ে দাঁড়ি Shift+G। প্রতিটি শব্দের পরে একটাই স্পেস দিন।',
				examples: [
					{ input: 'Shift+G', output: '।' },
					{ input: 'J F', output: 'কা' },
				],
			},
			general: {
				note: 'বাক্য শেষে দাঁড়ি দিতে ভুলবেন না; বাংলা দাঁড়ি (।) ব্যবহার করুন, ইংরেজি ডট নয়।',
				examples: [{ input: 'বাক্য', output: 'আমি বই পড়ি।' }],
			},
		},
		target: 'আমি প্রতিদিন সকালে বই পড়ি। আমাদের স্কুল নদীর ধারে। শিশুরা মাঠে খেলছে।',
	},
	{
		id: 'lesson-09',
		number: '০৯',
		title: 'বড় বাক্য',
		level: 'intermediate',
		difficulty: 'কঠিন',
		minAccuracy: 85,
		summary:
			'দীর্ঘ বাক্যে থামার সুযোগ কম। শুরুতে ধীরে, পরে স্বাভাবিক ছন্দে টাইপ করুন।',
		criteria: '২টি দীর্ঘ বাক্য সম্পূর্ণ টাইপ করুন, ন্যূনতম ৮৫% নির্ভুলতায়।',
		explanation:
			'বড় বাক্যে অনেক শব্দ একসঙ্গে আসে, তাই একটানা ছন্দ ধরে রাখতে হয়। শুরুতে ধীরে গিয়ে পরে স্বাভাবিক গতিতে এগোন।',
		guidance: {
			avro: {
				note: 'একটানা লিখতে থাকুন—শুধু শব্দের মাঝে এবং বাক্য শেষে দাঁড়ির জায়গায় থামুন।',
				examples: [
					{ input: 'ami', output: 'আমি' },
					{ input: ' ', output: 'শব্দ আলাদা' },
					{ input: '.', output: '।' },
				],
			},
			bijoy: {
				note: 'বাক্যের মাঝে থামা যাবে না; দাঁড়ি Shift+G দিয়ে দিন এবং চলতে থাকুন।',
				examples: [
					{ input: 'Shift+G', output: '।' },
					{ input: 'F', output: '◌া' },
				],
			},
			general: {
				note: 'শব্দ ধরে ধরে এগোন। থেমে গেলে টাইমার চলতে থাকে, তাই ছন্দ ধরে রাখুন।',
				examples: [{ input: 'বাক্য', output: 'থামা ছাড়া একটানা' }],
			},
		},
		target:
			'নিয়মিত অনুশীলন করলে আঙুল কীবোর্ডের অবস্থান মনে রাখে, ফলে চোখ না নামিয়েও লেখা সম্ভব হয়। দীর্ঘ বাক্যে থামা যায় না, তাই ছন্দ ধরে টাইপ করতে হয়।',
	},
	{
		id: 'lesson-10',
		number: '১০',
		title: 'Paragraph Typing',
		level: 'advanced',
		difficulty: 'কঠিন',
		minAccuracy: 85,
		summary:
			'অনুচ্ছেদে শব্দ, যতিচিহ্ন ও বিরাম একসঙ্গে আসে। পুরোটা একবারে না পারলে ধীরে ধীরে এগিয়ে যান।',
		criteria: 'পুরো অনুচ্ছেদ সম্পূর্ণ টাইপ করুন, ন্যূনতম ৮৫% নির্ভুলতায়।',
		explanation:
			'অনুচ্ছেদে একের পর এক বাক্য আসে, তাই মাঝপথে থামলে সময় বেড়ে যায়। একবারে পুরোটা না পারলে বাক্য ধরে ধরে এগোন—থেমে গেলেও টাইমার চলতে থাকে।',
		guidance: {
			avro: {
				note: 'প্রতিটি বাক্যের শেষে দাঁড়ি (.) দিন এবং পরের বাক্যের আগে একটাই স্পেস রাখুন।',
				examples: [
					{ input: '.', output: '।' },
					{ input: ' ', output: 'শব্দ বা বাক্য আলাদা' },
				],
			},
			bijoy: {
				note: 'বাক্য শেষ হলে Shift+G চেপে দাঁড়ি দিন, তারপর একটাই স্পেস দিয়ে পরের বাক্য শুরু করুন।',
				examples: [
					{ input: 'Shift+G', output: '।' },
					{ input: 'J F', output: 'কা' },
				],
			},
			general: {
				note: 'বাক্য ধরে ধরে এগোন, মাঝপথে থামবেন না।',
				examples: [{ input: 'অনুচ্ছেদ', output: 'বাক্য ধরে এগোন' }],
			},
		},
		target:
			'বাংলা টাইপিং শেখার সবচেয়ে সহজ উপায় হলো প্রতিদিন অল্প সময় অনুশীলন করা। প্রথমে বর্ণ চিনে নিন, তারপর শব্দ, শেষে বাক্য লিখুন। প্রতিটি ভুল আপনাকে দেখায় কোথায় থামছে আপনার আঙুল।',
	},
	{
		id: 'lesson-11',
		number: '১১',
		title: 'Punctuation',
		level: 'advanced',
		difficulty: 'কঠিন',
		minAccuracy: 85,
		summary:
			'যতিচিহ্ন, সংখ্যা ও উদ্ধৃতি একসঙ্গে এলে ভুল বাড়ে। প্রতিটি চিহ্ন আলাদা করে চিনে নিন।',
		criteria:
			'যতিচিহ্ন, সংখ্যা ও উদ্ধৃতি মিশ্রিত লেখাটি সম্পূর্ণ টাইপ করুন, ন্যূনতম ৮৫% নির্ভুলতায়।',
		explanation:
			'যতিচিহ্ন ছোট হলেও ভুল হলে পুরো বাক্য অসম্পূর্ণ হয়ে যায়। দাঁড়ি, প্রশ্নচিহ্ন, কোলন আর উদ্ধৃতি—প্রতিটির জায়গা আলাদা করে চিনে নিন।',
		guidance: {
			avro: {
				note: 'অভ্র ফোনেটিকে ডট দিলেই বাংলা দাঁড়ি আসে; কোলন ও ক্যারেট আলাদা বাংলা চিহ্ন দেয়।',
				examples: [
					{ input: '.', output: '।' },
					{ input: '..', output: '।।' },
					{ input: ':', output: 'ঃ' },
					{ input: '^', output: 'ঁ' },
					{ input: '$', output: '৳' },
				],
			},
			bijoy: {
				note: 'বিজয়ে যতিচিহ্ন মূলত Shift সারিতে থাকে—দাঁড়ি Shift+G, বন্ধনী Shift+9 ও Shift+0।',
				examples: [
					{ input: 'Shift+G', output: '।' },
					{ input: 'Shift+9', output: '(' },
					{ input: 'Shift+0', output: ')' },
					{ input: 'Shift+4', output: '৳' },
				],
			},
			general: {
				note: 'যতিচিহ্ন আলাদা করে টাইপ করুন; বাংলা দাঁড়ি (।) ইংরেজি ডটের বদলে ব্যবহার করুন।',
				examples: [
					{ input: 'যতিচিহ্ন', output: '। ? ! :' },
					{ input: 'উদ্ধৃতি', output: '" "' },
				],
			},
		},
		target:
			'আজ ২০২৬ সালের ২০ নভেম্বর, সকাল ৯:৩০ মিনিট। প্রশ্ন: তুমি কি প্রস্তুত? উত্তর: "হ্যাঁ, আমি প্রস্তুত!" আজকের ছাড় ১০%।',
	},
	{
		id: 'lesson-12',
		number: '১২',
		title: 'Mixed Practice',
		level: 'advanced',
		difficulty: 'অত্যন্ত কঠিন',
		minAccuracy: 85,
		summary: 'সব ধাপের মিশ্রণ। নির্ভুলতা ধরে রেখে গতি বাড়ানোর শেষ অনুশীলন এটি।',
		criteria: 'উন্নত অনুচ্ছেদটি সম্পূর্ণ টাইপ করুন, ন্যূনতম ৮৫% নির্ভুলতায়।',
		explanation:
			'শেষ পাঠে বর্ণ, শব্দ, যতিচিহ্ন ও সংখ্যা সব একসঙ্গে আসে। এখানে লক্ষ্য শুধু গতি নয়—নির্ভুলতা ধরে রেখে গতি বাড়ানো।',
		guidance: {
			avro: {
				note: 'মিশ্র লেখায় ভুল হলে থেমে সংশোধন করুন—ভুল নিয়ে এগিয়ে গেলে নির্ভুলতা দ্রুত কমে যায়।',
				examples: [
					{ input: 'o k', output: 'অক' },
					{ input: 'kkh', output: 'ক্ষ' },
					{ input: '.', output: '।' },
				],
			},
			bijoy: {
				note: 'একই ছন্দে ব্যঞ্জন, কার ও দাঁড়ি দিন; মাঝপথে হাত বদলাবেন না।',
				examples: [
					{ input: 'J', output: 'ক' },
					{ input: 'F', output: '◌া' },
					{ input: 'Shift+G', output: '।' },
				],
			},
			general: {
				note: 'সব ধাপ একসঙ্গে এলেও প্রতিটি অক্ষর আলাদা করেই মেলানো হয়।',
				examples: [{ input: 'মিশ্র', output: 'বর্ণ + শব্দ + বাক্য' }],
			},
		},
		target:
			'দ্রুত ও নির্ভুল টাইপিংয়ের জন্য দরকার স্থির মনোযোগ, সঠিক আঙুলের ব্যবহার এবং নিয়মিত বিরতি। প্রতিদিন দশ মিনিট অনুশীলনই যথেষ্ট, যদি প্রতিটি ভুল লিখে রাখা হয়। ধীরে শুরু করুন, গতি নিজে থেকেই আসবে।',
	},
];

export const PRACTICE_POOLS: Record<BanglaDrillPoolKey, readonly string[]> = {
	letters: [
		'অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'ঋ', 'এ', 'ঐ', 'ও', 'ঔ',
		'ক', 'খ', 'গ', 'ঘ', 'চ', 'ছ', 'জ', 'ঝ', 'ট', 'ঠ', 'ড', 'ঢ', 'ত', 'থ',
		'দ', 'ধ', 'ন', 'প', 'ফ', 'ব', 'ভ', 'ম', 'য', 'র', 'ল', 'শ', 'ষ', 'স', 'হ',
		'কা', 'কি', 'কী', 'কু', 'কূ', 'কে', 'কৈ', 'কো', 'কৌ',
	],
	words: [
		'আকাশ', 'বাতাস', 'নদী', 'পাহাড়', 'সকাল', 'বিকেল', 'স্কুল', 'বন্ধু', 'খাতা', 'কলম',
		'রোদ', 'ছায়া', 'ফুল', 'পাখি', 'মাঠ', 'বাড়ি', 'গল্প', 'স্বপ্ন', 'আশা', 'দিন',
	],
	sentences: [
		'আজ আকাশ পরিষ্কার।',
		'সে প্রতিদিন সকালে হাঁটে।',
		'বন্ধুরা মিলে খেলছে।',
		'বই পড়া ভালো অভ্যাস।',
		'তোমার নাম কী?',
		'আমরা একসঙ্গে কাজ করি।',
		'মা চা বানাচ্ছেন।',
		'বৃষ্টি থামার পর রোদ উঠল।',
	],
	paragraphs: [
		'সকালের আলো পড়তেই গ্রামের পথে মানুষ বের হয়। কেউ মাঠে যায়, কেউ বাজারে। শিশুরা স্কুলের দিকে ছুটে চলে।',
		'কম্পিউটারে বাংলা লেখার সময় ইনপুট পদ্ধতি বেছে নেওয়া জরুরি। অভ্র, রিদ্মিক বা উইন্ডোজের বাংলা কিবোর্ড—যেটিই ব্যবহার করুন, লেখা আসে ইউনিকোডে।',
	],
	hardWords: ['ধৃষ্টতা', 'ঐতিহ্য', 'স্মৃতি', 'বিশ্বাস', 'কৃষ্ণচূড়া', 'আশ্চর্য', 'উৎসাহ', 'সংস্কৃতি'],
};

export const PRACTICE_MODES: BanglaPracticeMode[] = [
	{
		id: 'letters',
		label: 'বর্ণ অনুশীলন',
		summary: 'স্বরবর্ণ, ব্যঞ্জনবর্ণ ও কারচিহ্ন মিলিয়ে এলোমেলো ড্রিল তৈরি হয়।',
		kind: 'drill',
		difficulty: 'মাঝারি',
		minAccuracy: 90,
		poolKey: 'letters',
		sampleSize: 24,
	},
	{
		id: 'words',
		label: 'শব্দ অনুশীলন',
		summary: 'দৈনন্দিন ব্যবহারের সহজ শব্দ নিয়ে এলোমেলো ড্রিল।',
		kind: 'drill',
		difficulty: 'মাঝারি',
		minAccuracy: 90,
		poolKey: 'words',
		sampleSize: 10,
	},
	{
		id: 'sentences',
		label: 'বাক্য অনুশীলন',
		summary: 'যতিচিহ্নসহ ছোট বাক্য বেছে নিয়ে অনুশীলন।',
		kind: 'drill',
		difficulty: 'মাঝারি',
		minAccuracy: 88,
		poolKey: 'sentences',
		sampleSize: 3,
	},
	{
		id: 'paragraphs',
		label: 'অনুচ্ছেদ অনুশীলন',
		summary: 'একটি পূর্ণ অনুচ্ছেদ একটানা টাইপ করুন।',
		kind: 'drill',
		difficulty: 'কঠিন',
		minAccuracy: 85,
		poolKey: 'paragraphs',
		sampleSize: 1,
	},
	{
		id: 'hard-words',
		label: 'কঠিন শব্দ অনুশীলন',
		summary: 'যুক্তাক্ষর ও নুকতাযুক্ত কঠিন শব্দের ড্রিল।',
		kind: 'drill',
		difficulty: 'কঠিন',
		minAccuracy: 85,
		poolKey: 'hardWords',
		sampleSize: 8,
	},
	{
		id: 'custom',
		label: 'নিজের লেখা দিয়ে অনুশীলন',
		summary:
			'যেকোনো বাংলা লেখা পেস্ট বা লিখে অনুশীলন করুন। লেখাটি শুধু আপনার ব্রাউজারে থাকে, কোথাও পাঠানো হয় না।',
		kind: 'custom',
		difficulty: 'নিজের পছন্দ',
		minAccuracy: 85,
	},
	{
		id: 'revision',
		label: 'ভুল হওয়া বর্ণের পুনরায় অনুশীলন',
		summary: 'আপনি আগে যে অক্ষরগুলো ভুল টাইপ করেছেন, শুধু সেগুলো দিয়েই ড্রিল তৈরি হয়।',
		kind: 'revision',
		difficulty: 'লক্ষ্যভিত্তিক',
		minAccuracy: 90,
	},
];
