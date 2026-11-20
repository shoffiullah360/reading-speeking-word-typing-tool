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

export const BANGLA_LESSONS: BanglaTypingLesson[] = [
	{
		id: 'lesson-01',
		number: '০১',
		title: 'স্বরবর্ণ',
		level: 'beginner',
		difficulty: 'সহজ',
		minAccuracy: 95,
		summary:
			'স্বরবর্ণগুলো আলাদা অক্ষর হিসেবে আসে। প্রতিটি বর্ণের পরে একটি স্পেস আছে, তাই ছন্দ ধরে টাইপ করুন।',
		criteria: '১১টি স্বরবর্ণ স্পেসসহ সম্পূর্ণ টাইপ করুন, ন্যূনতম ৯৫% নির্ভুলতায়।',
		target: 'অ আ ই ঈ উ ঊ ঋ এ ঐ ও ঔ',
	},
	{
		id: 'lesson-02',
		number: '০২',
		title: 'ব্যঞ্জনবর্ণ',
		level: 'beginner',
		difficulty: 'সহজ',
		minAccuracy: 95,
		summary:
			'ব্যঞ্জনবর্ণ ৩২টি। প্রথমে ধীরে ধীরে প্রতিটি বর্ণ চিনে নিন, তারপর একটানা টাইপ করুন।',
		criteria: '৩২টি ব্যঞ্জনবর্ণ স্পেসসহ সম্পূর্ণ টাইপ করুন, ন্যূনতম ৯৫% নির্ভুলতায়।',
		target: 'ক খ গ ঘ ঙ চ ছ জ ঝ ঞ ট ঠ ড ঢ ণ ত থ দ ধ ন প ফ ব ভ ম য র ল শ ষ স হ',
	},
	{
		id: 'lesson-03',
		number: '০৩',
		title: 'কারচিহ্ন',
		level: 'beginner',
		difficulty: 'মাঝারি',
		minAccuracy: 90,
		summary:
			'কারচিহ্ন ব্যঞ্জনের সঙ্গে জুড়ে যায় এবং একসঙ্গে একটি রূপ তৈরি করে, তাই প্রতিটি অক্ষরকে এক একক ধরে টাইপ করুন।',
		criteria: '১০টি কারচিহ্নযুক্ত অক্ষর সম্পূর্ণ টাইপ করুন, ন্যূনতম ৯০% নির্ভুলতায়।',
		target: 'কা কি কী কু কূ কৃ কে কৈ কো কৌ',
	},
	{
		id: 'lesson-04',
		number: '০৪',
		title: 'সাধারণ বর্ণের সংযোগ',
		level: 'beginner',
		difficulty: 'মাঝারি',
		minAccuracy: 90,
		summary:
			'দুই বা ততোধিক বর্ণ জুড়ে যুক্তাক্ষর তৈরি হয়। মাঝের হসন্ত (্) বাদ পড়লে বানান ভুল হবে।',
		criteria: '১৬টি যুক্তাক্ষর সম্পূর্ণ টাইপ করুন, ন্যূনতম ৯০% নির্ভুলতায়।',
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
		target: '০ ১ ২ ৩ ৪ ৫ ৬ ৭ ৮ ৯ ১০ ২৫ ১০০ ২০২৬',
	},
	{
		id: 'lesson-06',
		number: '০৬',
		title: 'সাধারণ বাংলা শব্দ',
		level: 'intermediate',
		difficulty: 'মাঝারি',
		minAccuracy: 90,
		summary:
			'প্রতিদিনের সহজ শব্দ দিয়ে শুরু করুন। শব্দের মাঝে একটিই স্পেস রাখুন, বাড়তি স্পেস দেবেন না।',
		criteria: '১২টি শব্দ সম্পূর্ণ টাইপ করুন, ন্যূনতম ৯০% নির্ভুলতায়।',
		target: 'বাড়ি বই কলম পানি মাটি আকাশ নদী ফুল গাছ পাখি স্কুল বাজার',
	},
	{
		id: 'lesson-07',
		number: '০৭',
		title: 'কঠিন বাংলা শব্দ',
		level: 'intermediate',
		difficulty: 'কঠিন',
		minAccuracy: 88,
		summary:
			'যুক্তাক্ষর ও নুকতা বেশি থাকা শব্দে ভুল বেশি হয়। গতি না বাড়িয়ে প্রথমে নির্ভুলতায় মন দিন।',
		criteria: '৯টি কঠিন শব্দ সম্পূর্ণ টাইপ করুন, ন্যূনতম ৮৮% নির্ভুলতায়।',
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
		target: 'আমি প্রতিদিন সকালে বই পড়ি। আমাদের স্কুল নদীর ধারে। শিশুরা মাঠে খেলছে।',
	},
	{
		id: 'lesson-09',
		number: '০৯',
		title: 'দীর্ঘ বাক্য',
		level: 'intermediate',
		difficulty: 'কঠিন',
		minAccuracy: 85,
		summary:
			'দীর্ঘ বাক্যে থামার সুযোগ কম। শুরুতে ধীরে, পরে স্বাভাবিক ছন্দে টাইপ করুন।',
		criteria: '২টি দীর্ঘ বাক্য সম্পূর্ণ টাইপ করুন, ন্যূনতম ৮৫% নির্ভুলতায়।',
		target:
			'নিয়মিত অনুশীলন করলে আঙুল কীবোর্ডের অবস্থান মনে রাখে, ফলে চোখ না নামিয়েও লেখা সম্ভব হয়। দীর্ঘ বাক্যে থামা যায় না, তাই ছন্দ ধরে টাইপ করতে হয়।',
	},
	{
		id: 'lesson-10',
		number: '১০',
		title: 'বাংলা অনুচ্ছেদ',
		level: 'advanced',
		difficulty: 'কঠিন',
		minAccuracy: 85,
		summary:
			'অনুচ্ছেদে শব্দ, যতিচিহ্ন ও বিরাম একসঙ্গে আসে। পুরোটা একবারে না পারলে ধীরে ধীরে এগিয়ে যান।',
		criteria: 'পুরো অনুচ্ছেদ সম্পূর্ণ টাইপ করুন, ন্যূনতম ৮৫% নির্ভুলতায়।',
		target:
			'বাংলা টাইপিং শেখার সবচেয়ে সহজ উপায় হলো প্রতিদিন অল্প সময় অনুশীলন করা। প্রথমে বর্ণ চিনে নিন, তারপর শব্দ, শেষে বাক্য লিখুন। প্রতিটি ভুল আপনাকে দেখায় কোথায় থামছে আপনার আঙুল।',
	},
	{
		id: 'lesson-11',
		number: '১১',
		title: 'যতিচিহ্ন ও মিশ্র লেখা',
		level: 'advanced',
		difficulty: 'কঠিন',
		minAccuracy: 85,
		summary:
			'যতিচিহ্ন, সংখ্যা ও উদ্ধৃতি একসঙ্গে এলে ভুল বাড়ে। প্রতিটি চিহ্ন আলাদা করে চিনে নিন।',
		criteria:
			'যতিচিহ্ন, সংখ্যা ও উদ্ধৃতি মিশ্রিত লেখাটি সম্পূর্ণ টাইপ করুন, ন্যূনতম ৮৫% নির্ভুলতায়।',
		target:
			'আজ ২০২৬ সালের ২০ নভেম্বর, সকাল ৯:৩০ মিনিট। প্রশ্ন: তুমি কি প্রস্তুত? উত্তর: "হ্যাঁ, আমি প্রস্তুত!" আজকের ছাড় ১০%।',
	},
	{
		id: 'lesson-12',
		number: '১২',
		title: 'উন্নত টাইপিং অনুশীলন',
		level: 'advanced',
		difficulty: 'অত্যন্ত কঠিন',
		minAccuracy: 85,
		summary: 'সব ধাপের মিশ্রণ। নির্ভুলতা ধরে রেখে গতি বাড়ানোর শেষ অনুশীলন এটি।',
		criteria: 'উন্নত অনুচ্ছেদটি সম্পূর্ণ টাইপ করুন, ন্যূনতম ৮৫% নির্ভুলতায়।',
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
