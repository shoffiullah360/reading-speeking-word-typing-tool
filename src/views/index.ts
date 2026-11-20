/** Page views by registry `dictKey`. Register new tool pages here (one line per tool). */

import HomePage from './HomePage.astro';
import AboutPage from './AboutPage.astro';
import AudiobookCalculatorPage from './AudiobookCalculatorPage.astro';
import BanglaTypingPracticePage from './BanglaTypingPracticePage.astro';
import CaseConverterPage from './CaseConverterPage.astro';
import ContactPage from './ContactPage.astro';
import PrivacyPolicyPage from './PrivacyPolicyPage.astro';
import RandomTopicGeneratorPage from './RandomTopicGeneratorPage.astro';
import ReadingSpeedTestPage from './ReadingSpeedTestPage.astro';
import ReadingTimeCalculatorPage from './ReadingTimeCalculatorPage.astro';
import SpeechTimeCalculatorPage from './SpeechTimeCalculatorPage.astro';
import TermsOfServicePage from './TermsOfServicePage.astro';
import TextRepeaterPage from './TextRepeaterPage.astro';
import TextReverserPage from './TextReverserPage.astro';
import TypingSpeedTestPage from './TypingSpeedTestPage.astro';
import WordCounterPage from './WordCounterPage.astro';
import WordsToPagesPage from './WordsToPagesPage.astro';

export const views = {
	home: HomePage,
	about: AboutPage,
	audiobookCalculator: AudiobookCalculatorPage,
	banglaTypingPractice: BanglaTypingPracticePage,
	caseConverter: CaseConverterPage,
	contact: ContactPage,
	privacy: PrivacyPolicyPage,
	randomTopicGenerator: RandomTopicGeneratorPage,
	readingSpeedTest: ReadingSpeedTestPage,
	readingTimeCalculator: ReadingTimeCalculatorPage,
	speechCalculator: SpeechTimeCalculatorPage,
	terms: TermsOfServicePage,
	textRepeater: TextRepeaterPage,
	textReverser: TextReverserPage,
	typingSpeedTest: TypingSpeedTestPage,
	wordCounter: WordCounterPage,
	wordsToPages: WordsToPagesPage,
} satisfies Record<string, unknown>;

export type ViewKey = keyof typeof views;
