/**
 * Topical interlinking map for every live tool page.
 *
 * Each tool gets two closely related cluster tools, then the two spotlight tools
 * (Random Topic Generator + Typing Speed Test) are appended so those pages are
 * discoverable from every tool page. When a spotlight tool is already part of the
 * cluster (or is the current page), a balanced contextual fallback fills the fourth slot.
 */

export const SPOTLIGHT_TOOL_IDS = ['random-topic-generator', 'typing-speed-test'] as const;

/** Two closest topical neighbours for each tool page. */
const TOPICAL_CLUSTERS: Record<string, readonly [string, string]> = {
	'reading-time-calculator': ['reading-speed-test', 'audiobook-speed-calculator'],
	'reading-speed-test': ['reading-time-calculator', 'audiobook-speed-calculator'],
	'audiobook-speed-calculator': ['reading-speed-test', 'reading-time-calculator'],
	'words-to-pages': ['word-counter', 'reading-time-calculator'],
	'word-counter': ['words-to-pages', 'case-converter'],
	'speech-time-calculator': ['reading-time-calculator', 'words-to-pages'],
	'random-topic-generator': ['speech-time-calculator', 'words-to-pages'],
	'case-converter': ['text-repeater', 'text-reverser'],
	'text-repeater': ['text-reverser', 'case-converter'],
	'text-reverser': ['case-converter', 'text-repeater'],
	'typing-speed-test': ['reading-speed-test', 'word-counter'],
	'bangla-typing-practice': ['typing-speed-test', 'word-counter'],
	'bangla-typing-test': ['bangla-typing-practice', 'typing-speed-test'],
};

/** Extra contextual tool used when a spotlight slot is already occupied. */
const BALANCE_FILLERS: Record<string, string> = {
	'random-topic-generator': 'word-counter',
	'typing-speed-test': 'speech-time-calculator',
	'bangla-typing-practice': 'reading-speed-test',
	'bangla-typing-test': 'word-counter',
};

/** Stable global fallback order, used only when a page still needs more cards. */
const FALLBACK_ORDER = [
	'reading-time-calculator',
	'reading-speed-test',
	'words-to-pages',
	'word-counter',
	'speech-time-calculator',
	'audiobook-speed-calculator',
	'case-converter',
	'text-repeater',
	'text-reverser',
	'random-topic-generator',
	'typing-speed-test',
];

/** Returns exactly four unique related tool IDs for a page (never the page itself). */
export function getRelatedToolIds(toolId: string): string[] {
	const ids: string[] = [];
	const push = (id: string | undefined) => {
		if (id && id !== toolId && !ids.includes(id)) ids.push(id);
	};

	for (const id of TOPICAL_CLUSTERS[toolId] ?? []) push(id);
	for (const id of SPOTLIGHT_TOOL_IDS) push(id);
	push(BALANCE_FILLERS[toolId]);
	for (const id of FALLBACK_ORDER) {
		if (ids.length >= 4) break;
		push(id);
	}

	return ids.slice(0, 4);
}

export function isSpotlightTool(toolId: string): boolean {
	return (SPOTLIGHT_TOOL_IDS as readonly string[]).includes(toolId);
}
