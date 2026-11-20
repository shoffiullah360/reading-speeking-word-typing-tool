/**
 * Lightweight practice games and milestone definitions for /bangla-typing-practice/.
 *
 * Challenges reuse the existing drill pools and practice engine instead of shipping a
 * separate mini-game runtime. Milestones are derived from saved progress at render time,
 * so nothing extra is stored and new users simply see unearned badges.
 */

import { BANGLA_LESSONS, type BanglaDrillPoolKey } from './banglaTypingCurriculum';

export type BanglaChallengeId = 'sixty-second' | 'accuracy' | 'hard-words';

export interface BanglaChallenge {
	id: BanglaChallengeId;
	label: string;
	/** One-line explanation shown on the challenge card and above the exercise. */
	summary: string;
	/** Short instruction inside the live challenge banner. */
	hint: string;
	/** Category chip shown beside the countdown. */
	badge: string;
	tone: 'mint' | 'sand' | 'orange';
	/** 0 keeps the drill open until the whole text is finished. */
	timeLimitSec: number;
	minAccuracy: number;
	criteria: string;
	/** Existing drill pools the challenge text is sampled from. */
	poolKeys: BanglaDrillPoolKey[];
	/** Items sampled from each pool before shuffling them together. */
	sampleSize: number;
	/** Timed text is padded with sentences until it reaches this many clusters. */
	minClusters?: number;
}

export const BANGLA_CHALLENGES: BanglaChallenge[] = [
	{
		id: 'sixty-second',
		label: '৬০-সেকেন্ড চ্যালেঞ্জ',
		summary: 'এক মিনিটে যতটা সম্ভব নির্ভুল বাংলা টাইপ করুন।',
		hint: 'টাইপ শুরু করলেই এক মিনিটের ঘড়ি চলবে। সময় শেষে ফলাফল দেখাবে।',
		badge: 'সময়বদ্ধ',
		tone: 'orange',
		timeLimitSec: 60,
		minAccuracy: 85,
		criteria: '৬০ সেকেন্ডে যতটা লেখা পারেন টাইপ করুন, ন্যূনতম ৮৫% নির্ভুলতা ধরে রাখুন।',
		poolKeys: ['paragraphs', 'sentences'],
		sampleSize: 2,
		minClusters: 200,
	},
	{
		id: 'accuracy',
		label: 'নির্ভুলতা চ্যালেঞ্জ',
		summary: 'ভুল কমাতে মিশ্র বাক্য ও কঠিন শব্দের ড্রিল।',
		hint: 'গতি নয়, নির্ভুলতাই এখানে আসল—থেমে হলেও সঠিক অক্ষর টাইপ করুন।',
		badge: 'নির্ভুলতা',
		tone: 'mint',
		timeLimitSec: 0,
		minAccuracy: 97,
		criteria: 'পুরো ড্রিল শেষ করুন, ন্যূনতম ৯৭% নির্ভুলতায়।',
		poolKeys: ['sentences', 'hardWords'],
		sampleSize: 4,
	},
	{
		id: 'hard-words',
		label: 'কঠিন শব্দ চ্যালেঞ্জ',
		summary: 'যুক্তাক্ষর ও নুকতাযুক্ত শব্দের দ্রুত ড্রিল।',
		hint: 'শব্দগুলো এলোমেলোভাবে আসবে—প্রতিটির শেষে একবার শ্বাস নিন।',
		badge: 'শব্দ ড্রিল',
		tone: 'sand',
		timeLimitSec: 0,
		minAccuracy: 90,
		criteria: 'কঠিন ও সহজ শব্দ মিলিয়ে পুরো ড্রিল শেষ করুন, ন্যূনতম ৯০% নির্ভুলতায়।',
		poolKeys: ['hardWords', 'words'],
		sampleSize: 8,
	},
];

export type BanglaMilestoneMetric = 'lessons' | 'streak' | 'accuracy' | 'sessions';

export interface BanglaMilestone {
	id: string;
	label: string;
	/** One-line explanation used as the accessible name. */
	description: string;
	metric: BanglaMilestoneMetric;
	target: number;
	tone: 'mint' | 'sand' | 'orange';
}

export const BANGLA_MILESTONES: BanglaMilestone[] = [
	{
		id: 'first-lesson',
		label: 'প্রথম পাঠ',
		description: 'একটি পাঠ সম্পূর্ণ করুন',
		metric: 'lessons',
		target: 1,
		tone: 'mint',
	},
	{
		id: 'five-lessons',
		label: 'পাঁচটি পাঠ',
		description: 'পাঁচটি পাঠ সম্পূর্ণ করুন',
		metric: 'lessons',
		target: 5,
		tone: 'sand',
	},
	{
		id: 'all-lessons',
		label: 'সব পাঠ',
		description: `সব ${BANGLA_LESSONS.length}টি পাঠ সম্পূর্ণ করুন`,
		metric: 'lessons',
		target: BANGLA_LESSONS.length,
		tone: 'orange',
	},
	{
		id: 'streak-3',
		label: '৩ দিনের ধারা',
		description: 'টানা তিন দিন অনুশীলন করুন',
		metric: 'streak',
		target: 3,
		tone: 'mint',
	},
	{
		id: 'streak-7',
		label: '৭ দিনের ধারা',
		description: 'টানা সাত দিন অনুশীলন করুন',
		metric: 'streak',
		target: 7,
		tone: 'sand',
	},
	{
		id: 'accuracy-95',
		label: '৯৫% নির্ভুলতা',
		description: 'একটি সেশনে ৯৫% বা তার বেশি নির্ভুলতা',
		metric: 'accuracy',
		target: 95,
		tone: 'mint',
	},
	{
		id: 'accuracy-100',
		label: 'নিখুঁত নির্ভুলতা',
		description: 'একটি সেশনে ১০০% নির্ভুলতা',
		metric: 'accuracy',
		target: 100,
		tone: 'orange',
	},
	{
		id: 'sessions-10',
		label: '১০ সেশন',
		description: 'মোট দশটি অনুশীলন সেশন শেষ করুন',
		metric: 'sessions',
		target: 10,
		tone: 'sand',
	},
];
