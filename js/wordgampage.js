// Game Variables
let score = 0;
let currentMode = '';
let currentDifficulty = '';
let currentWord = '';
let correctAnswer = '';
let timerInterval;
let timeLeft = 60;
let questionCount = 0;
const scoreElement = document.getElementById('score');
const feedbackElement = document.getElementById('feedback');
const timerElement = document.getElementById('time-left');
const gameAreaElement = document.getElementById('game-area');
const modeSelectionElement = document.getElementById('mode-selection');
const difficultySelectionElement = document.getElementById('difficulty-selection');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const gameOverElement = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');
const gameStatusElement = document.getElementById('game-status');

// Synonyms and Antonyms List (100 words)
const wordList = [
  { word: 'brave', synonyms: ['courageous', 'fearless', 'valiant'], antonyms: ['cowardly', 'timid', 'fearful'] },

{ word: 'bright', synonyms: ['radiant', 'luminous', 'shiny'], antonyms: ['dim', 'dark', 'gloomy'] },

{ word: 'calm', synonyms: ['serene', 'peaceful', 'tranquil'], antonyms: ['agitated', 'anxious', 'restless'] },

{ word: 'clean', synonyms: ['spotless', 'immaculate', 'pure'], antonyms: ['dirty', 'filthy', 'stained'] },

{ word: 'clever', synonyms: ['intelligent', 'smart', 'wise'], antonyms: ['foolish', 'stupid', 'dull'] },

{ word: 'cold', synonyms: ['chilly', 'frigid', 'icy'], antonyms: ['hot', 'warm', 'heated'] },

{ word: 'confident', synonyms: ['assured', 'self-reliant', 'bold'], antonyms: ['insecure', 'doubtful', 'timid'] },

{ word: 'creative', synonyms: ['imaginative', 'innovative', 'artistic'], antonyms: ['unoriginal', 'dull', 'ordinary'] },

{ word: 'cruel', synonyms: ['brutal', 'harsh', 'merciless'], antonyms: ['kind', 'compassionate', 'gentle'] },

{ word: 'curious', synonyms: ['inquisitive', 'interested', 'nosy'], antonyms: ['indifferent', 'uninterested', 'apathetic'] },

{ word: 'dangerous', synonyms: ['risky', 'hazardous', 'perilous'], antonyms: ['safe', 'secure', 'harmless'] },

{ word: 'dark', synonyms: ['gloomy', 'shadowy', 'dim'], antonyms: ['bright', 'light', 'radiant'] },

{ word: 'delicate', synonyms: ['fragile', 'dainty', 'sensitive'], antonyms: ['strong', 'sturdy', 'robust'] },

{ word: 'eager', synonyms: ['enthusiastic', 'keen', 'excited'], antonyms: ['reluctant', 'unwilling', 'indifferent'] },

{ word: 'easy', synonyms: ['simple', 'effortless', 'straightforward'], antonyms: ['difficult', 'challenging', 'hard'] },

{ word: 'empty', synonyms: ['hollow', 'vacant', 'bare'], antonyms: ['full', 'occupied', 'crowded'] },

{ word: 'fair', synonyms: ['just', 'impartial', 'equitable'], antonyms: ['unfair', 'biased', 'unjust'] },

{ word: 'famous', synonyms: ['renowned', 'celebrated', 'well-known'], antonyms: ['unknown', 'obscure', 'anonymous'] },

{ word: 'fast', synonyms: ['quick', 'swift', 'speedy'], antonyms: ['slow', 'sluggish', 'leisurely'] },

{ word: 'fat', synonyms: ['plump', 'chubby', 'overweight'], antonyms: ['thin', 'slim', 'skinny'] },

{ word: 'friendly', synonyms: ['amiable', 'sociable', 'affable'], antonyms: ['hostile', 'unfriendly', 'antagonistic'] },

{ word: 'funny', synonyms: ['humorous', 'amusing', 'comical'], antonyms: ['serious', 'solemn', 'grave'] },

{ word: 'generous', synonyms: ['charitable', 'benevolent', 'giving'], antonyms: ['stingy', 'selfish', 'greedy'] },

{ word: 'gentle', synonyms: ['kind', 'tender', 'mild'], antonyms: ['harsh', 'rough', 'cruel'] },

{ word: 'great', synonyms: ['excellent', 'outstanding', 'superb'], antonyms: ['poor', 'mediocre', 'inferior'] },

{ word: 'happy', synonyms: ['joyful', 'content', 'pleased'], antonyms: ['sad', 'unhappy', 'sorrowful'] },

{ word: 'hard', synonyms: ['difficult', 'challenging', 'tough'], antonyms: ['easy', 'simple', 'effortless'] },

{ word: 'healthy', synonyms: ['fit', 'well', 'robust'], antonyms: ['sick', 'unhealthy', 'ill'] },

{ word: 'heavy', synonyms: ['weighty', 'bulky', 'dense'], antonyms: ['light', 'weightless', 'airy'] },

{ word: 'honest', synonyms: ['truthful', 'sincere', 'genuine'], antonyms: ['dishonest', 'deceitful', 'fraudulent'] },

{ word: 'hot', synonyms: ['scorching', 'boiling', 'fiery'], antonyms: ['cold', 'chilly', 'freezing'] },

{ word: 'hungry', synonyms: ['starving', 'famished', 'ravenous'], antonyms: ['full', 'satiated', 'satisfied'] },

{ word: 'intelligent', synonyms: ['smart', 'clever', 'bright'], antonyms: ['stupid', 'dull', 'ignorant'] },

{ word: 'interesting', synonyms: ['fascinating', 'engaging', 'captivating'], antonyms: ['boring', 'dull', 'uninteresting'] },

{ word: 'kind', synonyms: ['compassionate', 'benevolent', 'caring'], antonyms: ['cruel', 'mean', 'unkind'] },

{ word: 'large', synonyms: ['big', 'huge', 'enormous'], antonyms: ['small', 'tiny', 'little'] },

{ word: 'lazy', synonyms: ['idle', 'sluggish', 'indolent'], antonyms: ['active', 'energetic', 'industrious'] },

{ word: 'light', synonyms: ['bright', 'luminous', 'radiant'], antonyms: ['dark', 'dim', 'shadowy'] },

{ word: 'loud', synonyms: ['noisy', 'boisterous', 'deafening'], antonyms: ['quiet', 'silent', 'soft'] },

{ word: 'lucky', synonyms: ['fortunate', 'blessed', 'favored'], antonyms: ['unlucky', 'unfortunate', 'cursed'] },

{ word: 'mature', synonyms: ['grown-up', 'developed', 'responsible'], antonyms: ['immature', 'childish', 'juvenile'] },

{ word: 'narrow', synonyms: ['thin', 'slim', 'tight'], antonyms: ['wide', 'broad', 'expansive'] },

{ word: 'new', synonyms: ['fresh', 'modern', 'recent'], antonyms: ['old', 'ancient', 'outdated'] },

{ word: 'noisy', synonyms: ['loud', 'rowdy', 'boisterous'], antonyms: ['quiet', 'silent', 'peaceful'] },

{ word: 'old', synonyms: ['ancient', 'aged', 'vintage'], antonyms: ['new', 'young', 'modern'] },

{ word: 'patient', synonyms: ['tolerant', 'calm', 'enduring'], antonyms: ['impatient', 'restless', 'agitated'] },

{ word: 'poor', synonyms: ['needy', 'impoverished', 'destitute'], antonyms: ['rich', 'wealthy', 'affluent'] },

{ word: 'powerful', synonyms: ['strong', 'mighty', 'dominant'], antonyms: ['weak', 'feeble', 'powerless'] },

{ word: 'quiet', synonyms: ['silent', 'peaceful', 'calm'], antonyms: ['loud', 'noisy', 'boisterous'] },

{ word: 'rich', synonyms: ['wealthy', 'affluent', 'prosperous'], antonyms: ['poor', 'needy', 'impoverished'] },

{ word: 'sad', synonyms: ['unhappy', 'sorrowful', 'melancholy'], antonyms: ['happy', 'joyful', 'cheerful'] },

{ word: 'safe', synonyms: ['secure', 'protected', 'harmless'], antonyms: ['dangerous', 'risky', 'hazardous'] },

{ word: 'shallow', synonyms: ['superficial', 'surface', 'empty'], antonyms: ['deep', 'profound', 'thoughtful'] },

{ word: 'sharp', synonyms: ['keen', 'acute', 'pointed'], antonyms: ['dull', 'blunt', 'rounded'] },

{ word: 'short', synonyms: ['brief', 'small', 'little'], antonyms: ['long', 'tall', 'lengthy'] },

{ word: 'shy', synonyms: ['timid', 'reserved', 'bashful'], antonyms: ['bold', 'confident', 'outgoing'] },

{ word: 'simple', synonyms: ['easy', 'basic', 'uncomplicated'], antonyms: ['complex', 'complicated', 'difficult'] },

{ word: 'slow', synonyms: ['sluggish', 'leisurely', 'gradual'], antonyms: ['fast', 'quick', 'speedy'] },

{ word: 'small', synonyms: ['tiny', 'little', 'miniature'], antonyms: ['large', 'big', 'huge'] },

{ word: 'soft', synonyms: ['gentle', 'tender', 'mild'], antonyms: ['hard', 'rough', 'firm'] },

{ word: 'strong', synonyms: ['powerful', 'mighty', 'robust'], antonyms: ['weak', 'feeble', 'fragile'] },

{ word: 'stupid', synonyms: ['foolish', 'dull', 'ignorant'], antonyms: ['smart', 'intelligent', 'clever'] },

{ word: 'tall', synonyms: ['high', 'lofty', 'elevated'], antonyms: ['short', 'low', 'small'] },

{ word: 'tough', synonyms: ['strong', 'durable', 'resilient'], antonyms: ['weak', 'fragile', 'delicate'] },

{ word: 'weak', synonyms: ['feeble', 'fragile', 'delicate'], antonyms: ['strong', 'powerful', 'robust'] },

{ word: 'young', synonyms: ['youthful', 'juvenile', 'adolescent'], antonyms: ['old', 'aged', 'elderly'] },

{ word: 'bitter', synonyms: ['sour', 'sharp', 'acerbic'], antonyms: ['sweet', 'mild', 'pleasant'] },

{ word: 'bold', synonyms: ['daring', 'brave', 'fearless'], antonyms: ['timid', 'shy', 'cowardly'] },

{ word: 'busy', synonyms: ['occupied', 'engaged', 'active'], antonyms: ['idle', 'free', 'inactive'] },

{ word: 'careful', synonyms: ['cautious', 'prudent', 'attentive'], antonyms: ['careless', 'reckless', 'negligent'] },

{ word: 'cheap', synonyms: ['inexpensive', 'affordable', 'economical'], antonyms: ['expensive', 'costly', 'pricey'] },

{ word: 'clean', synonyms: ['spotless', 'pure', 'immaculate'], antonyms: ['dirty', 'filthy', 'stained'] },

{ word: 'clear', synonyms: ['transparent', 'obvious', 'evident'], antonyms: ['unclear', 'vague', 'cloudy'] },

{ word: 'close', synonyms: ['near', 'adjacent', 'proximate'], antonyms: ['far', 'distant', 'remote'] },

{ word: 'cloudy', synonyms: ['overcast', 'gloomy', 'hazy'], antonyms: ['clear', 'sunny', 'bright'] },

{ word: 'deep', synonyms: ['profound', 'bottomless', 'intense'], antonyms: ['shallow', 'superficial', 'surface'] },

{ word: 'dry', synonyms: ['arid', 'parched', 'dehydrated'], antonyms: ['wet', 'moist', 'damp'] },

{ word: 'early', synonyms: ['premature', 'initial', 'advance'], antonyms: ['late', 'delayed', 'tardy'] },

{ word: 'fancy', synonyms: ['ornate', 'decorative', 'elaborate'], antonyms: ['plain', 'simple', 'basic'] },

{ word: 'fierce', synonyms: ['ferocious', 'intense', 'aggressive'], antonyms: ['gentle', 'mild', 'calm'] },

{ word: 'foolish', synonyms: ['silly', 'stupid', 'unwise'], antonyms: ['wise', 'smart', 'intelligent'] },

{ word: 'fresh', synonyms: ['new', 'recent', 'crisp'], antonyms: ['stale', 'old', 'rotten'] },

{ word: 'full', synonyms: ['complete', 'filled', 'satiated'], antonyms: ['empty', 'hungry', 'partial'] },

{ word: 'glad', synonyms: ['happy', 'pleased', 'delighted'], antonyms: ['sad', 'unhappy', 'sorrowful'] },

{ word: 'good', synonyms: ['excellent', 'fine', 'superior'], antonyms: ['bad', 'poor', 'inferior'] },

{ word: 'guilty', synonyms: ['culpable', 'responsible', 'ashamed'], antonyms: ['innocent', 'blameless', 'guiltless'] },

{ word: 'high', synonyms: ['tall', 'elevated', 'lofty'], antonyms: ['low', 'short', 'grounded'] },

{ word: 'humble', synonyms: ['modest', 'meek', 'unassuming'], antonyms: ['arrogant', 'proud', 'boastful'] },

{ word: 'innocent', synonyms: ['pure', 'guiltless', 'naive'], antonyms: ['guilty', 'culpable', 'responsible'] },

{ word: 'jealous', synonyms: ['envious', 'covetous', 'resentful'], antonyms: ['content', 'satisfied', 'generous'] },

{ word: 'late', synonyms: ['delayed', 'tardy', 'overdue'], antonyms: ['early', 'punctual', 'timely'] },

{ word: 'loose', synonyms: ['free', 'unrestricted', 'slack'], antonyms: ['tight', 'restricted', 'firm'] },

{ word: 'lost', synonyms: ['missing', 'gone', 'disoriented'], antonyms: ['found', 'located', 'discovered'] },

{ word: 'loving', synonyms: ['affectionate', 'caring', 'devoted'], antonyms: ['hateful', 'indifferent', 'cold'] },

{ word: 'modern', synonyms: ['contemporary', 'current', 'up-to-date'], antonyms: ['ancient', 'old-fashioned', 'outdated'] },

{ word: 'neat', synonyms: ['tidy', 'orderly', 'clean'], antonyms: ['messy', 'disorganized', 'untidy'] },

{ word: 'open', synonyms: ['accessible', 'unlocked', 'available'], antonyms: ['closed', 'shut', 'blocked'] },

{ word: 'polite', synonyms: ['courteous', 'respectful', 'well-mannered'], antonyms: ['rude', 'impolite', 'disrespectful'] },

{ word: 'proud', synonyms: ['arrogant', 'boastful', 'confident'], antonyms: ['humble', 'modest', 'ashamed'] },

{ word: 'quick', synonyms: ['fast', 'swift', 'speedy'], antonyms: ['slow', 'sluggish', 'leisurely'] },

{ word: 'quiet', synonyms: ['silent', 'peaceful', 'calm'], antonyms: ['loud', 'noisy', 'boisterous'] },

{ word: 'rare', synonyms: ['uncommon', 'scarce', 'unique'], antonyms: ['common', 'frequent', 'ordinary'] },

{ word: 'real', synonyms: ['genuine', 'authentic', 'true'], antonyms: ['fake', 'false', 'unreal'] },

{ word: 'rich', synonyms: ['wealthy', 'affluent', 'prosperous'], antonyms: ['poor', 'needy', 'impoverished'] },

{ word: 'rough', synonyms: ['coarse', 'uneven', 'rugged'], antonyms: ['smooth', 'soft', 'gentle'] },

{ word: 'rude', synonyms: ['impolite', 'disrespectful', 'crude'], antonyms: ['polite', 'courteous', 'respectful'] },

{ word: 'sad', synonyms: ['unhappy', 'sorrowful', 'melancholy'], antonyms: ['happy', 'joyful', 'cheerful'] },

{ word: 'safe', synonyms: ['secure', 'protected', 'harmless'], antonyms: ['dangerous', 'risky', 'hazardous'] },

{ word: 'shallow', synonyms: ['superficial', 'surface', 'empty'], antonyms: ['deep', 'profound', 'thoughtful'] },

{ word: 'sharp', synonyms: ['keen', 'acute', 'pointed'], antonyms: ['dull', 'blunt', 'rounded'] },

{ word: 'short', synonyms: ['brief', 'small', 'little'], antonyms: ['long', 'tall', 'lengthy'] },

{ word: 'shy', synonyms: ['timid', 'reserved', 'bashful'], antonyms: ['bold', 'confident', 'outgoing'] },

{ word: 'simple', synonyms: ['easy', 'basic', 'uncomplicated'], antonyms: ['complex', 'complicated', 'difficult'] },

{ word: 'slow', synonyms: ['sluggish', 'leisurely', 'gradual'], antonyms: ['fast', 'quick', 'speedy'] },

{ word: 'small', synonyms: ['tiny', 'little', 'miniature'], antonyms: ['large', 'big', 'huge'] },

{ word: 'soft', synonyms: ['gentle', 'tender', 'mild'], antonyms: ['hard', 'rough', 'firm'] },

{ word: 'strong', synonyms: ['powerful', 'mighty', 'robust'], antonyms: ['weak', 'feeble', 'fragile'] },

{ word: 'stupid', synonyms: ['foolish', 'dull', 'ignorant'], antonyms: ['smart', 'intelligent', 'clever'] },

{ word: 'tall', synonyms: ['high', 'lofty', 'elevated'], antonyms: ['short', 'low', 'small'] },

{ word: 'tough', synonyms: ['strong', 'durable', 'resilient'], antonyms: ['weak', 'fragile', 'delicate'] },

{ word: 'weak', synonyms: ['feeble', 'fragile', 'delicate'], antonyms: ['strong', 'powerful', 'robust'] },

{ word: 'young', synonyms: ['youthful', 'juvenile', 'adolescent'], antonyms: ['old', 'aged', 'elderly'] },

{ word: 'bitter', synonyms: ['sour', 'sharp', 'acerbic'], antonyms: ['sweet', 'mild', 'pleasant'] },

{ word: 'bold', synonyms: ['daring', 'brave', 'fearless'], antonyms: ['timid', 'shy', 'cowardly'] },

{ word: 'busy', synonyms: ['occupied', 'engaged', 'active'], antonyms: ['idle', 'free', 'inactive'] },

{ word: 'careful', synonyms: ['cautious', 'prudent', 'attentive'], antonyms: ['careless', 'reckless', 'negligent'] },

{ word: 'cheap', synonyms: ['inexpensive', 'affordable', 'economical'], antonyms: ['expensive', 'costly', 'pricey'] },

{ word: 'clean', synonyms: ['spotless', 'pure', 'immaculate'], antonyms: ['dirty', 'filthy', 'stained'] },

{ word: 'clear', synonyms: ['transparent', 'obvious', 'evident'], antonyms: ['unclear', 'vague', 'cloudy'] },

{ word: 'close', synonyms: ['near', 'adjacent', 'proximate'], antonyms: ['far', 'distant', 'remote'] },

{ word: 'cloudy', synonyms: ['overcast', 'gloomy', 'hazy'], antonyms: ['clear', 'sunny', 'bright'] },

{ word: 'deep', synonyms: ['profound', 'bottomless', 'intense'], antonyms: ['shallow', 'superficial', 'surface'] },

{ word: 'dry', synonyms: ['arid', 'parched', 'dehydrated'], antonyms: ['wet', 'moist', 'damp'] },

{ word: 'early', synonyms: ['premature', 'initial', 'advance'], antonyms: ['late', 'delayed', 'tardy'] },

{ word: 'fancy', synonyms: ['ornate', 'decorative', 'elaborate'], antonyms: ['plain', 'simple', 'basic'] },

{ word: 'fierce', synonyms: ['ferocious', 'intense', 'aggressive'], antonyms: ['gentle', 'mild', 'calm'] },

{ word: 'foolish', synonyms: ['silly', 'stupid', 'unwise'], antonyms: ['wise', 'smart', 'intelligent'] },

{ word: 'fresh', synonyms: ['new', 'recent', 'crisp'], antonyms: ['stale', 'old', 'rotten'] },

{ word: 'full', synonyms: ['complete', 'filled', 'satiated'], antonyms: ['empty', 'hungry', 'partial'] },

{ word: 'glad', synonyms: ['happy', 'pleased', 'delighted'], antonyms: ['sad', 'unhappy', 'sorrowful'] },

{ word: 'good', synonyms: ['excellent', 'fine', 'superior'], antonyms: ['bad', 'poor', 'inferior'] },

{ word: 'guilty', synonyms: ['culpable', 'responsible', 'ashamed'], antonyms: ['innocent', 'blameless', 'guiltless'] },

{ word: 'high', synonyms: ['tall', 'elevated', 'lofty'], antonyms: ['low', 'short', 'grounded'] },

{ word: 'humble', synonyms: ['modest', 'meek', 'unassuming'], antonyms: ['arrogant', 'proud', 'boastful'] },

{ word: 'innocent', synonyms: ['pure', 'guiltless', 'naive'], antonyms: ['guilty', 'culpable', 'responsible'] },

{ word: 'jealous', synonyms: ['envious', 'covetous', 'resentful'], antonyms: ['content', 'satisfied', 'generous'] },

{ word: 'late', synonyms: ['delayed', 'tardy', 'overdue'], antonyms: ['early', 'punctual', 'timely'] },

{ word: 'loose', synonyms: ['free', 'unrestricted', 'slack'], antonyms: ['tight', 'restricted', 'firm'] },

{ word: 'lost', synonyms: ['missing', 'gone', 'disoriented'], antonyms: ['found', 'located', 'discovered'] },

{ word: 'loving', synonyms: ['affectionate', 'caring', 'devoted'], antonyms: ['hateful', 'indifferent', 'cold'] },

{ word: 'modern', synonyms: ['contemporary', 'current', 'up-to-date'], antonyms: ['ancient', 'old-fashioned', 'outdated'] },

{ word: 'neat', synonyms: ['tidy', 'orderly', 'clean'], antonyms: ['messy', 'disorganized', 'untidy'] },

{ word: 'open', synonyms: ['accessible', 'unlocked', 'available'], antonyms: ['closed', 'shut', 'blocked'] },

{ word: 'polite', synonyms: ['courteous', 'respectful', 'well-mannered'], antonyms: ['rude', 'impolite', 'disrespectful'] },

{ word: 'proud', synonyms: ['arrogant', 'boastful', 'confident'], antonyms: ['humble', 'modest', 'ashamed'] },

{ word: 'quick', synonyms: ['fast', 'swift', 'speedy'], antonyms: ['slow', 'sluggish', 'leisurely'] },

{ word: 'rare', synonyms: ['uncommon', 'scarce', 'unique'], antonyms: ['common', 'frequent', 'ordinary'] },

{ word: 'real', synonyms: ['genuine', 'authentic', 'true'], antonyms: ['fake', 'false', 'unreal'] },

{ word: 'rich', synonyms: ['wealthy', 'affluent', 'prosperous'], antonyms: ['poor', 'needy', 'impoverished'] },

{ word: 'rough', synonyms: ['coarse', 'uneven', 'rugged'], antonyms: ['smooth', 'soft', 'gentle'] },

{ word: 'rude', synonyms: ['impolite', 'disrespectful', 'crude'], antonyms: ['polite', 'courteous', 'respectful'] },

{ word: 'sad', synonyms: ['unhappy', 'sorrowful', 'melancholy'], antonyms: ['happy', 'joyful', 'cheerful'] },

{ word: 'safe', synonyms: ['secure', 'protected', 'harmless'], antonyms: ['dangerous', 'risky', 'hazardous'] },

{ word: 'shallow', synonyms: ['superficial', 'surface', 'empty'], antonyms: ['deep', 'profound', 'thoughtful'] },

{ word: 'sharp', synonyms: ['keen', 'acute', 'pointed'], antonyms: ['dull', 'blunt', 'rounded'] },

{ word: 'short', synonyms: ['brief', 'small', 'little'], antonyms: ['long', 'tall', 'lengthy'] },

{ word: 'shy', synonyms: ['timid', 'reserved', 'bashful'], antonyms: ['bold', 'confident', 'outgoing'] },

{ word: 'simple', synonyms: ['easy', 'basic', 'uncomplicated'], antonyms: ['complex', 'complicated', 'difficult'] },

{ word: 'slow', synonyms: ['sluggish', 'leisurely', 'gradual'], antonyms: ['fast', 'quick', 'speedy'] },

{ word: 'small', synonyms: ['tiny', 'little', 'miniature'], antonyms: ['large', 'big', 'huge'] },

{ word: 'soft', synonyms: ['gentle', 'tender', 'mild'], antonyms: ['hard', 'rough', 'firm'] },

{ word: 'strong', synonyms: ['powerful', 'mighty', 'robust'], antonyms: ['weak', 'feeble', 'fragile'] },

{ word: 'stupid', synonyms: ['foolish', 'dull', 'ignorant'], antonyms: ['smart', 'intelligent', 'clever'] },

{ word: 'tall', synonyms: ['high', 'lofty', 'elevated'], antonyms: ['short', 'low', 'small'] },

{ word: 'tough', synonyms: ['strong', 'durable', 'resilient'], antonyms: ['weak', 'fragile', 'delicate'] },

{ word: 'weak', synonyms: ['feeble', 'fragile', 'delicate'], antonyms: ['strong', 'powerful', 'robust'] },

{ word: 'young', synonyms: ['youthful', 'juvenile', 'adolescent'], antonyms: ['old', 'aged', 'elderly'] },

{ word: 'bitter', synonyms: ['sour', 'sharp', 'acerbic'], antonyms: ['sweet', 'mild', 'pleasant'] },

{ word: 'bold', synonyms: ['daring', 'brave', 'fearless'], antonyms: ['timid', 'shy', 'cowardly'] },

{ word: 'busy', synonyms: ['occupied', 'engaged', 'active'], antonyms: ['idle', 'free', 'inactive'] },

{ word: 'careful', synonyms: ['cautious', 'prudent', 'attentive'], antonyms: ['careless', 'reckless', 'negligent'] },

{ word: 'cheap', synonyms: ['inexpensive', 'affordable', 'economical'], antonyms: ['expensive', 'costly', 'pricey'] },

{ word: 'clean', synonyms: ['spotless', 'pure', 'immaculate'], antonyms: ['dirty', 'filthy', 'stained'] },

{ word: 'clear', synonyms: ['transparent', 'obvious', 'evident'], antonyms: ['unclear', 'vague', 'cloudy'] },

{ word: 'close', synonyms: ['near', 'adjacent', 'proximate'], antonyms: ['far', 'distant', 'remote'] },

{ word: 'cloudy', synonyms: ['overcast', 'gloomy', 'hazy'], antonyms: ['clear', 'sunny', 'bright'] },

{ word: 'deep', synonyms: ['profound', 'bottomless', 'intense'], antonyms: ['shallow', 'superficial', 'surface'] },

{ word: 'dry', synonyms: ['arid', 'parched', 'dehydrated'], antonyms: ['wet', 'moist', 'damp'] },

{ word: 'early', synonyms: ['premature', 'initial', 'advance'], antonyms: ['late', 'delayed', 'tardy'] },

{ word: 'fancy', synonyms: ['ornate', 'decorative', 'elaborate'], antonyms: ['plain', 'simple', 'basic'] },

{ word: 'fierce', synonyms: ['ferocious', 'intense', 'aggressive'], antonyms: ['gentle', 'mild', 'calm'] },

{ word: 'foolish', synonyms: ['silly', 'stupid', 'unwise'], antonyms: ['wise', 'smart', 'intelligent'] },

{ word: 'fresh', synonyms: ['new', 'recent', 'crisp'], antonyms: ['stale', 'old', 'rotten'] },

{ word: 'full', synonyms: ['complete', 'filled', 'satiated'], antonyms: ['empty', 'hungry', 'partial'] },

{ word: 'glad', synonyms: ['happy', 'pleased', 'delighted'], antonyms: ['sad', 'unhappy', 'sorrowful'] },

{ word: 'good', synonyms: ['excellent', 'fine', 'superior'], antonyms: ['bad', 'poor', 'inferior'] },

{ word: 'guilty', synonyms: ['culpable', 'responsible', 'ashamed'], antonyms: ['innocent', 'blameless', 'guiltless'] },

{ word: 'high', synonyms: ['tall', 'elevated', 'lofty'], antonyms: ['low', 'short', 'grounded'] },

{ word: 'humble', synonyms: ['modest', 'meek', 'unassuming'], antonyms: ['arrogant', 'proud', 'boastful'] },

{ word: 'innocent', synonyms: ['pure', 'guiltless', 'naive'], antonyms: ['guilty', 'culpable', 'responsible'] },



];

// Start New Game
function startGame(mode) {
    currentMode = mode;
    modeSelectionElement.classList.add('hidden');
    difficultySelectionElement.classList.remove('hidden');
}

// Select Difficulty Level
function selectDifficulty(difficulty) {
    currentDifficulty = difficulty;
    difficultySelectionElement.classList.add('hidden');
    startNewGame();
}

// Start New Game
function startNewGame() {
    score = 0;
    questionCount = 0;
    timeLeft = currentDifficulty === 'easy' ? 60 : 30;
    scoreElement.textContent = `Score: ${score}`;
    timerElement.textContent = `Time Left: ${timeLeft}s`;
    gameAreaElement.classList.remove('hidden');
    gameOverElement.classList.add('hidden');
    startTimer();
    nextQuestion();
}

// Generate Next Question
function nextQuestion() {
    if (questionCount >= 10) {
        endGame();
        return;
    }

    const randomWordIndex = Math.floor(Math.random() * wordList.length);
    const wordData = wordList[randomWordIndex];
    currentWord = wordData.word;

    questionElement.textContent = `Find the ${currentMode} of: ${currentWord}`;

    if (currentMode === 'synonym') {
        correctAnswer = wordData.synonyms[Math.floor(Math.random() * wordData.synonyms.length)];
        const options = generateOptions(correctAnswer, wordData.antonyms);
        optionsElement.innerHTML = options;
    } else if (currentMode === 'antonym') {
        correctAnswer = wordData.antonyms[Math.floor(Math.random() * wordData.antonyms.length)];
        const options = generateOptions(correctAnswer, wordData.synonyms);
        optionsElement.innerHTML = options;
    }

    questionCount++;
}

// Generate Multiple Options
function generateOptions(correctAnswer, wrongOptions) {
    const options = [correctAnswer];
    while (options.length < 4) {
        const randomOption = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
        if (!options.includes(randomOption)) {
            options.push(randomOption);
        }
    }

    options.sort(() => Math.random() - 0.5);
    return options.map(option => `<div class="option" onclick="submitAnswer('${option}')">${option}</div>`).join('');
}

// Submit Answer
function submitAnswer(answer) {
    const isCorrect = answer === correctAnswer;
    if (isCorrect) {
        score++;
        feedbackElement.textContent = `Correct!`;
        feedbackElement.className = 'correct';
    } else {
        feedbackElement.textContent = `Incorrect. Correct Answer: ${correctAnswer}`;
        feedbackElement.className = 'incorrect';
    }

    scoreElement.textContent = `Score: ${score}`;
    setTimeout(nextQuestion, 1000);
}

// Start Timer
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

// End Game
function endGame() {
    clearInterval(timerInterval);
    gameAreaElement.classList.add('hidden');
    gameOverElement.classList.remove('hidden');
    finalScoreElement.textContent = `Your final score is: ${score}`;
    gameStatusElement.textContent = score >= 7 ? 'You win!' : 'Better luck next time!';
}