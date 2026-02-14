export const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const analyzeProfile = (data, sassLevel = 3) => {
    const { education, careerMode, careerName, interests } = data;

    // 1. Identify Category
    const lowerCareer = (careerName || '').toLowerCase();

    const techKeywords = ['engineer', 'developer', 'coder', 'programmer', 'data', 'cyber', 'software', 'tech', 'it', 'web', 'app'];
    const creativeKeywords = ['artist', 'designer', 'writer', 'music', 'creative', 'actor', 'painter', 'illustrator', 'director', 'film', 'photo'];
    const helpingKeywords = ['doctor', 'teacher', 'nurse', 'psychologist', 'therapist', 'social worker', 'counselor', 'helping', 'care', 'medicine'];
    const unrealisticKeywords = ['ninja', 'wizard', 'superhero', 'time traveler', 'jedi', 'god', 'billionaire', 'king', 'queen', 'influencer', 'celebrity', 'astronaut', 'princess', 'vampire'];
    const businessKeywords = ['manager', 'business', 'ceo', 'entrepreneur', 'sales', 'marketing', 'finance', 'consultant', 'accountant', 'hr', 'recruiter'];

    let category = 'vague';
    if (techKeywords.some(k => lowerCareer.includes(k))) category = 'tech';
    else if (creativeKeywords.some(k => lowerCareer.includes(k))) category = 'creative';
    else if (helpingKeywords.some(k => lowerCareer.includes(k))) category = 'helping';
    else if (businessKeywords.some(k => lowerCareer.includes(k))) category = 'business';
    else if (unrealisticKeywords.some(k => lowerCareer.includes(k))) category = 'unrealistic';

    // 2. Response Pools (Categorized by Tone Level)
    const responses = {
        tech: {
            gentle: [
                "tech is rewarding, but remember to pace yourself. it's a marathon.",
                "keep learning, stay curious, and you'll do great things here.",
                "it's a challenging field, but your problem-solving skills will shine."
            ],
            brutal: [
                "money is good. burnout is guaranteed. welcome to the grind.",
                "if you can't google your own problems, don't bother.",
                "high demand, high stress. you’re trading sleep for equity.",
                "nobody cares about your clean code if it doesn't ship."
            ]
        },
        creative: {
            gentle: [
                "your creativity is a gift. nurture it, even when it's hard.",
                "the world needs your art. keep creating, one step at a time.",
                "trust your vision. consistency will get you there."
            ],
            brutal: [
                "hope you like exposure, because that's your new currency.",
                "talent is cheap. discipline is expensive. most quit.",
                "be honest — would you still do this if nobody clapped?",
                "start loving rejection. it’s your new best friend."
            ]
        },
        helping: {
            gentle: [
                "you have a big heart. remember to take care of yourself too.",
                "making a difference is noble work. we're proud of you.",
                "empathy is your superpower. use it wisely."
            ],
            brutal: [
                "you can't save everyone. try not to destroy yourself trying.",
                "emotionally expensive work. hope your boundaries are made of steel.",
                "compassion fatigue is real. google it now, thank me later."
            ]
        },
        business: {
            gentle: [
                "leadership is about service. build something that matters.",
                "stay focused on value, and success will follow.",
                "relationships are key. treat people well."
            ],
            brutal: [
                "success here is 90% tolerance for annoying people.",
                "networking isn't optional. start smiling at strangers.",
                "if you're not solving a problem, you're just noise."
            ]
        },
        unrealistic: {
            gentle: [
                "it's a beautiful dream. maybe keep it as a creative outlet?",
                "aim for the stars! just have a plan b on earth.",
                "imagination is powerful. how can we apply this to a job?"
            ],
            brutal: [
                "stats say 'no'. logic says 'no'. you say 'watch me'. cute.",
                "rent is due on the 1st. this job pays on the Never.",
                "we love the delusion. it's very main character energy.",
                "unless your dad owns the studio, good luck."
            ]
        },
        vague: {
            gentle: [
                "it's okay not to know yet. exploration is part of the process.",
                "take your time. your path will unfold as you walk it.",
                "you're not lost, you're just looking. that's good."
            ],
            brutal: [
                "indecision is a decision. and it's a bad one.",
                "you don't need a passion, you need a paycheck. pick something.",
                "wandering is fun until you're 30 and broke. focus.",
                "nobody is coming to save you. figure it out."
            ]
        }
    };

    // Select Based on Sass Level
    let pool = [];
    if (sassLevel <= 2) {
        pool = responses[category]?.gentle || responses.vague.gentle;
    } else if (sassLevel >= 4) {
        pool = responses[category]?.brutal || responses.vague.brutal;
    } else {
        // Mix of both for level 3
        const gentle = responses[category]?.gentle || responses.vague.gentle;
        const brutal = responses[category]?.brutal || responses.vague.brutal;
        pool = [...gentle, ...brutal];
    }

    // 3. Generate Content
    const mainResponse = getRandom(pool);

    const titles = {
        1: ["hey there.", "soft landing.", "safe space."],
        5: ["listen up.", "reality check.", "brutal truth.", "wake up."]
    };

    const defaultTitles = [`so, ${careerName || 'undecided'}.`, "let's talk.", "here's the deal."];

    let titlePool = defaultTitles;
    if (sassLevel <= 2) titlePool = titles[1];
    if (sassLevel >= 4) titlePool = titles[5];

    if (careerMode === 'known') {
        return {
            title: getRandom(titlePool),
            content: [
                mainResponse,
                "",
                `<strong>effort:</strong> ${getRandom(['high', 'consistent', 'unrelenting'])}.`,
                sassLevel > 3 ? "don't say we didn't warn you." : "you've got this."
            ]
        };
    } else {
        // Unsure / Interest Mode Logic (EXPANDED)
        const interestLower = (interests || '').toLowerCase();
        let suggestions = [];

        const keywordMap = [
            { keys: ['draw', 'art', 'design', 'paint', 'sketch', 'creative', 'color'], jobs: ['Graphic Designer', 'UX/UI Designer', 'Illustrator', 'Art Director', 'Animator'] },
            { keys: ['code', 'tech', 'computer', 'game', 'software', 'web', 'data'], jobs: ['Software Engineer', 'Data Analyst', 'Game Developer', 'Cybersecurity Specialist', 'Product Manager'] },
            { keys: ['write', 'story', 'read', 'book', 'blog', 'edit'], jobs: ['Copywriter', 'Content Strategist', 'Technical Writer', 'Editor', 'Journalist'] },
            { keys: ['people', 'talk', 'help', 'teach', 'listen', 'social'], jobs: ['HR Specialist', 'Recruiter', 'Psychologist', 'Customer Success Manager', 'Teacher'] },
            { keys: ['money', 'finance', 'business', 'sell', 'market', 'lead'], jobs: ['Financial Analyst', 'Accountant', 'Sales Representative', 'Business Consultant', 'Project Manager'] },
            { keys: ['build', 'make', 'fix', 'hands', 'craft', 'tool'], jobs: ['Architect', 'Civil Engineer', 'Carpenter', 'Industrial Designer', 'Robotics Engineer'] },
            { keys: ['science', 'nature', 'animal', 'research', 'lab', 'biology'], jobs: ['Environmental Scientist', 'Biologist', 'Lab Technician', 'Veterinarian', 'Researcher'] },
            { keys: ['food', 'cook', 'bake', 'eat', 'kitchen'], jobs: ['Chef', 'Food Critic', 'Restaurant Manager', 'Nutritionist', 'Food Scientist'] },
            { keys: ['organize', 'plan', 'list', 'clean', 'detail'], jobs: ['Event Planner', 'Operations Manager', 'Project Manager', 'Executive Assistant', 'Logistics Coordinator'] }
        ];

        // Collect all matches
        keywordMap.forEach(group => {
            if (group.keys.some(k => interestLower.includes(k))) {
                suggestions.push(...group.jobs);
            }
        });

        // If no matches, use broader defaults
        if (suggestions.length === 0) {
            suggestions = ['Digital Marketer', 'Content Strategist', 'Project Manager', 'Customer Success', 'Sales Development Rep', 'Research Assistant'];
        }

        // Shuffle and pick 3 unique suggestions
        const shuffled = [...new Set(suggestions)].sort(() => 0.5 - Math.random());
        const topSuggestions = shuffled.slice(0, 3);

        return {
            title: getRandom(titlePool),
            content: [
                mainResponse,
                "",
                "based on what you said, look into:",
                ...topSuggestions.map(s => `• <strong>${s}</strong>`),
            ]
        };
    }
};
