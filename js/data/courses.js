/**
 * courses.js - 多语种分级课程数据
 * 英语(A1-C2)、日语(N5-N1)、韩语(TOPIK 1-6)
 */
const Courses = (() => {
  // 英语课程数据
  const english = [
    {
      id: 'en_a1', level: 'A1', name: '初级入门', desc: '掌握基础日常用语，学会简单自我介绍',
      units: [
        {
          id: 'en_a1_u1', name: 'Greetings & Introductions',
          vocab: [
            { word: 'hello', pos: 'int.', meaning: '你好', example: 'Hello, how are you?' },
            { word: 'goodbye', pos: 'int.', meaning: '再见', example: 'Goodbye, see you tomorrow.' },
            { word: 'name', pos: 'n.', meaning: '名字', example: 'My name is Tom.' },
            { word: 'friend', pos: 'n.', meaning: '朋友', example: 'He is my friend.' },
            { word: 'please', pos: 'adv.', meaning: '请', example: 'Please sit down.' },
            { word: 'thank', pos: 'v.', meaning: '感谢', example: 'Thank you very much.' }
          ],
          grammar: [
            { q: '___ your name?', type: 'choice', options: ['What', "What's", 'Where', 'Who'], answer: 1, explain: "询问名字用 What's your name?" },
            { q: 'I ___ a student.', type: 'choice', options: ['am', 'is', 'are', 'be'], answer: 0, explain: '第一人称 I 后用 am' },
            { q: 'Nice to ___ you.', type: 'fill', answer: 'meet', explain: 'Nice to meet you. 很高兴见到你。' }
          ],
          speaking: [
            { text: 'Hello, my name is Tom.', trans: '你好，我叫汤姆。' },
            { text: 'Nice to meet you.', trans: '很高兴见到你。' },
            { text: 'How are you today?', trans: '你今天好吗？' }
          ],
          listening: [
            { text: 'My name is Lisa. I am from China.', q: 'Where is Lisa from?', options: ['Japan', 'China', 'USA', 'Korea'], answer: 1 },
            { text: 'Good morning, class. Today we will learn English.', q: 'What will they learn?', options: ['Math', 'English', 'Music', 'Art'], answer: 1 }
          ]
        },
        {
          id: 'en_a1_u2', name: 'Numbers & Time',
          vocab: [
            { word: 'one', pos: 'num.', meaning: '一', example: 'I have one apple.' },
            { word: 'morning', pos: 'n.', meaning: '早晨', example: 'Good morning!' },
            { word: 'clock', pos: 'n.', meaning: '时钟', example: 'The clock is on the wall.' },
            { word: 'today', pos: 'n.', meaning: '今天', example: 'Today is Monday.' },
            { word: 'week', pos: 'n.', meaning: '星期', example: 'See you next week.' }
          ],
          grammar: [
            { q: 'It is ___ o\'clock.', type: 'fill', answer: 'nine', explain: '表示整点用基数词 + o\'clock' },
            { q: 'There ___ seven days in a week.', type: 'choice', options: ['is', 'are', 'be', 'am'], answer: 1, explain: '复数名词用 are' }
          ],
          speaking: [
            { text: 'What time is it?', trans: '现在几点了？' },
            { text: 'It is ten o\'clock.', trans: '现在十点。' }
          ],
          listening: [
            { text: 'It is three o\'clock in the afternoon.', q: 'What time is it?', options: ['3 AM', '3 PM', '13:00', '30:00'], answer: 1 }
          ]
        },
        {
          id: 'en_a1_u3', name: 'Family',
          vocab: [
            { word: 'father', pos: 'n.', meaning: '父亲', example: 'My father is a doctor.' },
            { word: 'mother', pos: 'n.', meaning: '母亲', example: 'My mother cooks well.' },
            { word: 'brother', pos: 'n.', meaning: '兄弟', example: 'I have one brother.' },
            { word: 'sister', pos: 'n.', meaning: '姐妹', example: 'My sister is older than me.' },
            { word: 'family', pos: 'n.', meaning: '家庭', example: 'I love my family.' }
          ],
          grammar: [
            { q: 'This is ___ sister.', type: 'choice', options: ['I', 'my', 'me', 'mine'], answer: 1, explain: '形容词性物主代词 my 修饰名词' },
            { q: 'He ___ my brother.', type: 'fill', answer: 'is', explain: '第三人称单数 he 后用 is' }
          ],
          speaking: [
            { text: 'This is my family.', trans: '这是我的家人。' },
            { text: 'I have a big family.', trans: '我有一个大家庭。' }
          ],
          listening: [
            { text: 'I have two brothers and one sister.', q: 'How many siblings does the speaker have?', options: ['Two', 'Three', 'Four', 'One'], answer: 1 }
          ]
        }
      ]
    },
    {
      id: 'en_a2', level: 'A2', name: '初级进阶', desc: '掌握日常生活场景对话',
      units: [
        {
          id: 'en_a2_u1', name: 'Food & Drink',
          vocab: [
            { word: 'breakfast', pos: 'n.', meaning: '早餐', example: 'I have breakfast at 7.' },
            { word: 'delicious', pos: 'adj.', meaning: '美味的', example: 'This cake is delicious.' },
            { word: 'water', pos: 'n.', meaning: '水', example: 'Can I have some water?' },
            { word: 'hungry', pos: 'adj.', meaning: '饥饿的', example: 'I am very hungry.' }
          ],
          grammar: [
            { q: 'Would you like ___ coffee?', type: 'choice', options: ['a', 'an', 'some', 'any'], answer: 2, explain: '表示请求建议用 some' },
            { q: 'I like ___ apples.', type: 'fill', answer: 'eating', explain: 'like doing sth. 喜欢做某事' }
          ],
          speaking: [
            { text: 'What would you like to eat?', trans: '你想吃什么？' },
            { text: 'I would like a sandwich, please.', trans: '请给我一个三明治。' }
          ],
          listening: [
            { text: 'I would like a cup of coffee and a piece of cake.', q: 'What does the speaker order?', options: ['Tea and cake', 'Coffee and cake', 'Coffee and bread', 'Tea and bread'], answer: 1 }
          ]
        },
        {
          id: 'en_a2_u2', name: 'Shopping',
          vocab: [
            { word: 'price', pos: 'n.', meaning: '价格', example: 'What is the price?' },
            { word: 'cheap', pos: 'adj.', meaning: '便宜的', example: 'This shirt is cheap.' },
            { word: 'expensive', pos: 'adj.', meaning: '昂贵的', example: 'The watch is expensive.' },
            { word: 'buy', pos: 'v.', meaning: '买', example: 'I want to buy a book.' }
          ],
          grammar: [
            { q: 'How much ___ this bag?', type: 'choice', options: ['is', 'are', 'do', 'does'], answer: 0, explain: '单数名词用 is' },
            { q: 'I want to buy ___ new shoes.', type: 'fill', answer: 'a pair of', explain: 'a pair of shoes 一双鞋' }
          ],
          speaking: [
            { text: 'How much is this?', trans: '这个多少钱？' },
            { text: 'I will take it.', trans: '我要这个了。' }
          ],
          listening: [
            { text: 'The blue shirt is fifty dollars. The red one is thirty dollars.', q: 'Which shirt is cheaper?', options: ['Blue', 'Red', 'Same', 'Unknown'], answer: 1 }
          ]
        },
        {
          id: 'en_a2_u3', name: 'Travel',
          vocab: [
            { word: 'airport', pos: 'n.', meaning: '机场', example: 'We arrived at the airport.' },
            { word: 'ticket', pos: 'n.', meaning: '票', example: 'I bought a train ticket.' },
            { word: 'hotel', pos: 'n.', meaning: '酒店', example: 'We stayed at a nice hotel.' },
            { word: 'map', pos: 'n.', meaning: '地图', example: 'Can I have a map?' }
          ],
          grammar: [
            { q: 'Where ___ you go last summer?', type: 'choice', options: ['do', 'did', 'does', 'are'], answer: 1, explain: '过去时用 did' },
            { q: 'I ___ to Japan last year.', type: 'fill', answer: 'went', explain: 'go 的过去式是 went' }
          ],
          speaking: [
            { text: 'Where is the nearest hotel?', trans: '最近的酒店在哪里？' },
            { text: 'I would like to book a room.', trans: '我想订一个房间。' }
          ],
          listening: [
            { text: 'My flight to Tokyo leaves at nine in the morning.', q: 'When does the flight leave?', options: ['9 AM', '9 PM', '8 AM', '8 PM'], answer: 0 }
          ]
        }
      ]
    },
    {
      id: 'en_b1', level: 'B1', name: '中级', desc: '能进行日常话题的流畅交流',
      units: [
        {
          id: 'en_b1_u1', name: 'Work & Career',
          vocab: [
            { word: 'interview', pos: 'n.', meaning: '面试', example: 'I have a job interview tomorrow.' },
            { word: 'experience', pos: 'n.', meaning: '经验', example: 'She has ten years of experience.' },
            { word: 'salary', pos: 'n.', meaning: '薪水', example: 'The salary is good.' },
            { word: 'promote', pos: 'v.', meaning: '晋升', example: 'He was promoted to manager.' }
          ],
          grammar: [
            { q: 'I have worked here ___ three years.', type: 'choice', options: ['since', 'for', 'in', 'at'], answer: 1, explain: 'for + 时间段' },
            { q: 'She ___ since 2020.', type: 'fill', answer: 'has worked', explain: '现在完成时 has/have + 过去分词' }
          ],
          speaking: [
            { text: 'I have been working here for five years.', trans: '我在这里工作五年了。' },
            { text: 'I am interested in this position.', trans: '我对这个职位很感兴趣。' }
          ],
          listening: [
            { text: 'I have been working as a software engineer for eight years.', q: 'What is the speaker\'s job?', options: ['Teacher', 'Engineer', 'Doctor', 'Lawyer'], answer: 1 }
          ]
        },
        {
          id: 'en_b1_u2', name: 'Health',
          vocab: [
            { word: 'exercise', pos: 'v.', meaning: '锻炼', example: 'I exercise every morning.' },
            { word: 'healthy', pos: 'adj.', meaning: '健康的', example: 'Eating vegetables is healthy.' },
            { word: 'headache', pos: 'n.', meaning: '头痛', example: 'I have a headache.' },
            { word: 'medicine', pos: 'n.', meaning: '药', example: 'Take this medicine twice a day.' }
          ],
          grammar: [
            { q: 'You should ___ more exercise.', type: 'choice', options: ['do', 'doing', 'does', 'done'], answer: 0, explain: 'should + 动词原形' },
            { q: 'If you ___ tired, rest.', type: 'fill', answer: 'feel', explain: '条件状语从句用一般现在时' }
          ],
          speaking: [
            { text: 'I have a terrible headache.', trans: '我头痛得厉害。' },
            { text: 'You should see a doctor.', trans: '你应该去看医生。' }
          ],
          listening: [
            { text: 'You should drink more water and get enough sleep.', q: 'What does the speaker suggest?', options: ['Take medicine', 'Drink water and sleep', 'Exercise more', 'Eat more'], answer: 1 }
          ]
        },
        {
          id: 'en_b1_u3', name: 'Hobbies',
          vocab: [
            { word: 'hobby', pos: 'n.', meaning: '爱好', example: 'Reading is my hobby.' },
            { word: 'collect', pos: 'v.', meaning: '收集', example: 'I collect stamps.' },
            { word: 'paint', pos: 'v.', meaning: '绘画', example: 'She likes to paint.' },
            { word: 'instrument', pos: 'n.', meaning: '乐器', example: 'He plays three instruments.' }
          ],
          grammar: [
            { q: 'I enjoy ___ books.', type: 'choice', options: ['read', 'reading', 'to read', 'reads'], answer: 1, explain: 'enjoy doing sth.' },
            { q: 'What do you do ___ your free time?', type: 'fill', answer: 'in', explain: 'in one\'s free time 在空闲时间' }
          ],
          speaking: [
            { text: 'In my free time, I like to read books.', trans: '空闲时我喜欢读书。' },
            { text: 'Playing the piano is my favorite hobby.', trans: '弹钢琴是我最喜欢的爱好。' }
          ],
          listening: [
            { text: 'My favorite hobby is hiking. I go hiking every weekend.', q: 'What does the speaker do every weekend?', options: ['Reading', 'Hiking', 'Painting', 'Swimming'], answer: 1 }
          ]
        }
      ]
    },
    {
      id: 'en_b2', level: 'B2', name: '中高级', desc: '能理解复杂文章并进行深入讨论',
      units: [
        {
          id: 'en_b2_u1', name: 'Technology',
          vocab: [
            { word: 'innovate', pos: 'v.', meaning: '创新', example: 'Companies must innovate to survive.' },
            { word: 'artificial', pos: 'adj.', meaning: '人工的', example: 'Artificial intelligence is changing the world.' },
            { word: 'implement', pos: 'v.', meaning: '实施', example: 'We will implement the new policy.' },
            { word: 'efficient', pos: 'adj.', meaning: '高效的', example: 'This method is more efficient.' }
          ],
          grammar: [
            { q: 'The new system ___ by the team next month.', type: 'choice', options: ['will implement', 'will be implemented', 'implements', 'implemented'], answer: 1, explain: '被动语态 will be + 过去分词' },
            { q: 'If I ___ you, I would accept the offer.', type: 'fill', answer: 'were', explain: '虚拟语气 if I were you' }
          ],
          speaking: [
            { text: 'Technology has transformed the way we live.', trans: '科技改变了我们的生活方式。' },
            { text: 'Artificial intelligence will shape our future.', trans: '人工智能将塑造我们的未来。' }
          ],
          listening: [
            { text: 'The new software will be implemented across all departments by the end of the year.', q: 'When will the software be fully implemented?', options: ['Next month', 'By year end', 'Next year', 'Already done'], answer: 1 }
          ]
        },
        {
          id: 'en_b2_u2', name: 'Environment',
          vocab: [
            { word: 'pollution', pos: 'n.', meaning: '污染', example: 'Air pollution is a serious problem.' },
            { word: 'sustainable', pos: 'adj.', meaning: '可持续的', example: 'We need sustainable development.' },
            { word: 'recycle', pos: 'v.', meaning: '回收', example: 'We should recycle paper and plastic.' },
            { word: 'emission', pos: 'n.', meaning: '排放', example: 'Carbon emissions must be reduced.' }
          ],
          grammar: [
            { q: 'The government has passed laws ___ reduce pollution.', type: 'choice', options: ['in order to', 'so that', 'because', 'although'], answer: 0, explain: 'in order to + 动词原形表目的' },
            { q: 'If everyone recycled, the environment ___ be cleaner.', type: 'fill', answer: 'would', explain: '虚拟语气主句用 would + 动词原形' }
          ],
          speaking: [
            { text: 'We must take action to protect the environment.', trans: '我们必须采取行动保护环境。' },
            { text: 'Reducing carbon emissions is everyone\'s responsibility.', trans: '减少碳排放是每个人的责任。' }
          ],
          listening: [
            { text: 'The company plans to reduce its carbon emissions by fifty percent within five years.', q: 'By how much will emissions be reduced?', options: ['30%', '40%', '50%', '60%'], answer: 2 }
          ]
        },
        {
          id: 'en_b2_u3', name: 'Culture & Society',
          vocab: [
            { word: 'diversity', pos: 'n.', meaning: '多样性', example: 'Cultural diversity enriches society.' },
            { word: 'tradition', pos: 'n.', meaning: '传统', example: 'They keep the old tradition alive.' },
            { word: 'perspective', pos: 'n.', meaning: '视角', example: 'We need a different perspective.' },
            { word: 'contribute', pos: 'v.', meaning: '贡献', example: 'Everyone can contribute to society.' }
          ],
          grammar: [
            { q: 'It is important ___ we respect different cultures.', type: 'choice', options: ['that', 'which', 'what', 'where'], answer: 0, explain: 'It is important that... 主语从句' },
            { q: 'Cultural diversity ___ the world more interesting.', type: 'fill', answer: 'makes', explain: 'make + 宾语 + 宾补' }
          ],
          speaking: [
            { text: 'Cultural diversity makes our world richer.', trans: '文化多样性让世界更丰富。' },
            { text: 'We should learn from different perspectives.', trans: '我们应该从不同的视角学习。' }
          ],
          listening: [
            { text: 'Learning about other cultures helps us understand different perspectives and promotes mutual respect.', q: 'What does learning about other cultures promote?', options: ['Competition', 'Mutual respect', 'Isolation', 'Conflicts'], answer: 1 }
          ]
        }
      ]
    },
    {
      id: 'en_c1', level: 'C1', name: '高级', desc: '能流利表达复杂观点',
      units: [
        {
          id: 'en_c1_u1', name: 'Economics',
          vocab: [
            { word: 'inflation', pos: 'n.', meaning: '通货膨胀', example: 'Inflation is rising globally.' },
            { word: 'recession', pos: 'n.', meaning: '经济衰退', example: 'The economy entered a recession.' },
            { word: 'allocate', pos: 'v.', meaning: '分配', example: 'Resources must be allocated efficiently.' },
            { word: 'substantial', pos: 'adj.', meaning: '大量的', example: 'There was a substantial increase.' }
          ],
          grammar: [
            { q: 'Not only ___ the economy, but it also affects society.', type: 'choice', options: ['inflation affects', 'does inflation affect', 'inflation affect', 'affects inflation'], answer: 1, explain: 'Not only 开头句子部分倒装' },
            { q: 'Had the government acted sooner, the crisis ___ avoided.', type: 'fill', answer: 'would have been', explain: '虚拟语气倒装 had done, would have been done' }
          ],
          speaking: [
            { text: 'Economic policies have far-reaching consequences.', trans: '经济政策有深远的影响。' },
            { text: 'Inflation erodes the purchasing power of consumers.', trans: '通货膨胀削弱消费者的购买力。' }
          ],
          listening: [
            { text: 'The central bank raised interest rates to combat rising inflation, which has reached a thirty-year high.', q: 'Why did the central bank raise rates?', options: ['To boost growth', 'To fight inflation', 'To lower unemployment', 'To strengthen currency'], answer: 1 }
          ]
        },
        {
          id: 'en_c1_u2', name: 'Philosophy',
          vocab: [
            { word: 'consciousness', pos: 'n.', meaning: '意识', example: 'The nature of consciousness is debated.' },
            { word: 'ethics', pos: 'n.', meaning: '伦理学', example: 'We must consider the ethics.' },
            { word: 'fundamental', pos: 'adj.', meaning: '根本的', example: 'This is a fundamental question.' },
            { word: 'perceive', pos: 'v.', meaning: '感知', example: 'We perceive the world through our senses.' }
          ],
          grammar: [
            { q: 'What we perceive ___ not always the truth.', type: 'choice', options: ['is', 'are', 'be', 'being'], answer: 0, explain: '主语从句作主语谓语用单数' },
            { q: 'It is through reflection ___ we understand ourselves.', type: 'fill', answer: 'that', explain: '强调句型 It is...that...' }
          ],
          speaking: [
            { text: 'Philosophy teaches us to question our assumptions.', trans: '哲学教会我们质疑自己的假设。' },
            { text: 'Understanding consciousness remains a profound mystery.', trans: '理解意识仍然是一个深刻的谜。' }
          ],
          listening: [
            { text: 'Ethical decisions require careful consideration of both consequences and principles.', q: 'What do ethical decisions require?', options: ['Quick action', 'Careful consideration', 'Following rules', 'Avoiding risk'], answer: 1 }
          ]
        },
        {
          id: 'en_c1_u3', name: 'Science',
          vocab: [
            { word: 'hypothesis', pos: 'n.', meaning: '假设', example: 'The hypothesis must be tested.' },
            { word: 'empirical', pos: 'adj.', meaning: '经验的', example: 'We need empirical evidence.' },
            { word: 'paradigm', pos: 'n.', meaning: '范式', example: 'This represents a paradigm shift.' },
            { word: 'phenomenon', pos: 'n.', meaning: '现象', example: 'It is a natural phenomenon.' }
          ],
          grammar: [
            { q: 'The results, ___ were surprising, led to new theories.', type: 'choice', options: ['that', 'which', 'what', 'who'], answer: 1, explain: '非限制性定语从句用 which' },
            { q: 'Scientists have been ___ this phenomenon for decades.', type: 'fill', answer: 'studying', explain: '现在完成进行时 have been doing' }
          ],
          speaking: [
            { text: 'Scientific discovery requires rigorous experimentation.', trans: '科学发现需要严谨的实验。' },
            { text: 'This breakthrough represents a paradigm shift in the field.', trans: '这一突破代表了该领域的范式转变。' }
          ],
          listening: [
            { text: 'The researchers conducted over two hundred experiments to verify their hypothesis before publishing their findings.', q: 'How many experiments did they conduct?', options: ['100', '150', '200', '250'], answer: 2 }
          ]
        }
      ]
    },
    {
      id: 'en_c2', level: 'C2', name: '精通', desc: '母语级别的语言运用能力',
      units: [
        {
          id: 'en_c2_u1', name: 'Academic Discourse',
          vocab: [
            { word: 'methodology', pos: 'n.', meaning: '方法论', example: 'The methodology is sound.' },
            { word: 'corroborate', pos: 'v.', meaning: '证实', example: 'The data corroborates the theory.' },
            { word: 'juxtapose', pos: 'v.', meaning: '并列', example: 'The author juxtaposes two viewpoints.' },
            { word: 'nuance', pos: 'n.', meaning: '细微差别', example: 'There are nuances in meaning.' }
          ],
          grammar: [
            { q: 'Scarcely ___ the results when new questions arose.', type: 'choice', options: ['they published', 'had they published', 'they had published', 'did they publish'], answer: 1, explain: 'Scarcely 开头部分倒装 + 过去完成时' },
            { q: 'It is imperative that every student ___ the guidelines.', type: 'fill', answer: 'follow', explain: 'It is imperative that + (should) do 虚拟' }
          ],
          speaking: [
            { text: 'The methodology employed in this study is rigorous and replicable.', trans: '本研究采用的方法论严谨且可复制。' },
            { text: 'These findings corroborate the prevailing theoretical framework.', trans: '这些发现证实了主流的理论框架。' }
          ],
          listening: [
            { text: 'The researchers juxtaposed the quantitative data with qualitative interviews to provide a more nuanced understanding of the phenomenon.', q: 'Why did they use both data types?', options: ['To save time', 'For nuanced understanding', 'To publish faster', 'To reduce cost'], answer: 1 }
          ]
        },
        {
          id: 'en_c2_u2', name: 'Literary Analysis',
          vocab: [
            { word: 'allegory', pos: 'n.', meaning: '寓言', example: 'The novel functions as an allegory.' },
            { word: 'metaphor', pos: 'n.', meaning: '隐喻', example: 'Life is a journey is a metaphor.' },
            { word: 'protagonist', pos: 'n.', meaning: '主角', example: 'The protagonist faces a moral dilemma.' },
            { word: 'ambiguous', pos: 'adj.', meaning: '模糊的', example: 'The ending is deliberately ambiguous.' }
          ],
          grammar: [
            { q: 'Were it not for the symbolism, the text ___ lose its depth.', type: 'choice', options: ['will', 'would', 'does', 'did'], answer: 1, explain: '虚拟语气倒装 Were it not for' },
            { q: 'The author, ___ works span decades, won the Nobel Prize.', type: 'fill', answer: 'whose', explain: '定语从句 whose 表示所属' }
          ],
          speaking: [
            { text: 'The novel operates on multiple levels of meaning.', trans: '这部小说在多个意义层面上运作。' },
            { text: 'The protagonist\'s journey serves as an allegory for human existence.', trans: '主角的旅程是人类存在的寓言。' }
          ],
          listening: [
            { text: 'The author employs extended metaphors and deliberate ambiguity to challenge readers to construct their own interpretations.', q: 'What does the author use to challenge readers?', options: ['Simple language', 'Metaphors and ambiguity', 'Direct statements', 'Historical facts'], answer: 1 }
          ]
        },
        {
          id: 'en_c2_u3', name: 'Global Affairs',
          vocab: [
            { word: 'geopolitics', pos: 'n.', meaning: '地缘政治', example: 'Geopolitics shapes international relations.' },
            { word: 'sovereignty', pos: 'n.', meaning: '主权', example: 'National sovereignty must be respected.' },
            { word: 'diplomacy', pos: 'n.', meaning: '外交', example: 'Diplomacy is the art of negotiation.' },
            { word: 'sanction', pos: 'n.', meaning: '制裁', example: 'Economic sanctions were imposed.' }
          ],
          grammar: [
            { q: 'Rarely ___ such a complex diplomatic situation.', type: 'choice', options: ['we have seen', 'have we seen', 'we saw', 'did we saw'], answer: 1, explain: 'Rarely 开头部分倒装' },
            { q: 'The treaty, ___ signed last year, has not been ratified.', type: 'fill', answer: 'although', explain: 'although 引导让步状语从句' }
          ],
          speaking: [
            { text: 'Geopolitical tensions require careful diplomatic navigation.', trans: '地缘政治紧张局势需要谨慎的外交应对。' },
            { text: 'Multilateral cooperation remains essential for global stability.', trans: '多边合作对全球稳定仍然至关重要。' }
          ],
          listening: [
            { text: 'Diplomatic negotiations are underway to resolve the dispute, with both sides expressing cautious optimism about reaching a compromise.', q: 'What is the status of negotiations?', options: ['Failed', 'Ongoing', 'Completed', 'Cancelled'], answer: 1 }
          ]
        }
      ]
    }
  ];

  // 日语课程数据
  const japanese = [
    {
      id: 'ja_n5', level: 'N5', name: '入门', desc: '掌握平假名、片假名和基础句型',
      units: [
        {
          id: 'ja_n5_u1', name: '自己紹介 (自我介绍)',
          vocab: [
            { word: 'はじめまして', pos: '寒暄', meaning: '初次见面', example: 'はじめまして、田中です。' },
            { word: 'わたし', pos: '代.', meaning: '我', example: 'わたしは学生です。' },
            { word: 'です', pos: '助动.', meaning: '是', example: 'これは本です。' },
            { word: 'ありがとう', pos: '感.', meaning: '谢谢', example: 'ありがとうございます。' },
            { word: 'さようなら', pos: '感.', meaning: '再见', example: 'さようなら、また明日。' }
          ],
          grammar: [
            { q: 'わたし___学生です。', type: 'choice', options: ['は', 'が', 'を', 'に'], answer: 0, explain: 'は 提示主题' },
            { q: 'これは___ですか。(这是什么)', type: 'fill', answer: '何', explain: '何 (なに) 什么' },
            { q: '田中さん___会社員です。', type: 'choice', options: ['は', 'の', 'が', 'と'], answer: 0, explain: 'は 提示主题' }
          ],
          speaking: [
            { text: 'はじめまして、田中です。', trans: '初次见面，我是田中。' },
            { text: 'よろしくお願いします。', trans: '请多多关照。' },
            { text: 'わたしは学生です。', trans: '我是学生。' }
          ],
          listening: [
            { text: 'はじめまして、わたしは田中です。学生です。', q: '田中さんは何ですか。', options: ['先生', '学生', '会社員', '医者'], answer: 1 },
            { text: 'これは本です。それはノートです。', q: 'それは何ですか。', options: ['本', 'ノート', 'ペン', '傘'], answer: 1 }
          ]
        },
        {
          id: 'ja_n5_u2', name: '数字と時間 (数字与时间)',
          vocab: [
            { word: 'いち', pos: '数.', meaning: '一', example: 'りんごが一つあります。' },
            { word: 'じかん', pos: 'n.', meaning: '时间', example: '今何時ですか。' },
            { word: 'げつようび', pos: 'n.', meaning: '星期一', example: '月曜日に学校があります。' },
            { word: 'いま', pos: 'n.', meaning: '现在', example: '今、何時ですか。' }
          ],
          grammar: [
            { q: '今、___時です。(现在三点)', type: 'fill', answer: '三', explain: '基数词 + 時' },
            { q: '学校___行きます。', type: 'choice', options: ['を', 'に', 'で', 'と'], answer: 1, explain: 'に 表示方向目的地' }
          ],
          speaking: [
            { text: '今、何時ですか。', trans: '现在几点？' },
            { text: '三時です。', trans: '三点。' }
          ],
          listening: [
            { text: '今、九時です。学校は九時半から始まります。', q: '学校は何時から始まりますか。', options: ['九時', '九時半', '十時', '八時半'], answer: 1 }
          ]
        },
        {
          id: 'ja_n5_u3', name: '家族 (家庭)',
          vocab: [
            { word: 'ちち', pos: 'n.', meaning: '父亲', example: 'ちちは会社員です。' },
            { word: 'はは', pos: 'n.', meaning: '母亲', example: 'ははは主婦です。' },
            { word: 'あに', pos: 'n.', meaning: '哥哥', example: 'あにが二人います。' },
            { word: 'かぞく', pos: 'n.', meaning: '家人', example: 'かぞくは四人です。' }
          ],
          grammar: [
            { q: 'わたし___かぞくは四人です。', type: 'choice', options: ['の', 'は', 'が', 'を'], answer: 0, explain: 'の 表示所属' },
            { q: 'あにが二人___。', type: 'fill', answer: 'います', explain: 'います 用于有生命的存在' }
          ],
          speaking: [
            { text: 'かぞくは四人です。', trans: '我家有四口人。' },
            { text: 'ちちは会社員です。', trans: '我父亲是公司职员。' }
          ],
          listening: [
            { text: 'わたしのかぞくは四人です。ちちとははとあねとわたしです。', q: 'かぞくは何人ですか。', options: ['三人', '四人', '五人', '六人'], answer: 1 }
          ]
        }
      ]
    },
    {
      id: 'ja_n4', level: 'N4', name: '初级', desc: '基础语法与日常会话',
      units: [
        {
          id: 'ja_n4_u1', name: '食べ物 (食物)',
          vocab: [
            { word: 'たべる', pos: 'v.', meaning: '吃', example: '朝ごはんを食べます。' },
            { word: 'おいしい', pos: 'adj.', meaning: '好吃的', example: 'このケーキはおいしいです。' },
            { word: 'のむ', pos: 'v.', meaning: '喝', example: 'コーヒーを飲みます。' },
            { word: 'いただきます', pos: '寒暄', meaning: '我开动了', example: 'いただきます。' }
          ],
          grammar: [
            { q: '朝ごはんを___。(吃早饭)', type: 'fill', answer: '食べます', explain: '食べる ます形' },
            { q: 'コーヒー___飲みます。', type: 'choice', options: ['を', 'が', 'に', 'で'], answer: 0, explain: 'を 提示宾语' }
          ],
          speaking: [
            { text: 'いただきます。', trans: '我开动了。' },
            { text: 'このラーメンはおいしいです。', trans: '这个拉面很好吃。' }
          ],
          listening: [
            { text: 'きょうの朝ごはんはパンとコーヒーでした。', q: '朝ごはんは何でしたか。', options: ['ごはんとみそしる', 'パンとコーヒー', 'ラーメン', 'おにぎり'], answer: 1 }
          ]
        },
        {
          id: 'ja_n4_u2', name: '買い物 (购物)',
          vocab: [
            { word: 'かう', pos: 'v.', meaning: '买', example: '本を買います。' },
            { word: 'いくら', pos: 'n.', meaning: '多少钱', example: 'これはいくらですか。' },
            { word: 'たかい', pos: 'adj.', meaning: '贵的', example: 'この時計は高いです。' },
            { word: 'やすい', pos: 'adj.', meaning: '便宜的', example: 'このかばんは安いです。' }
          ],
          grammar: [
            { q: 'これは___ですか。(多少钱)', type: 'fill', answer: 'いくら', explain: 'いくら 多少钱' },
            { q: 'このシャツは___です。(便宜)', type: 'choice', options: ['たかい', 'やすい', 'おおきい', 'ちいさい'], answer: 1, explain: 'やすい 便宜' }
          ],
          speaking: [
            { text: 'これはいくらですか。', trans: '这个多少钱？' },
            { text: 'これをください。', trans: '请给我这个。' }
          ],
          listening: [
            { text: 'このかばんは三千円です。あのかばんは五千円です。', q: 'どちらのかばんが安いですか。', options: ['このかばん', 'あのかばん', '同じ', 'わからない'], answer: 0 }
          ]
        },
        {
          id: 'ja_n4_u3', name: '旅行 (旅行)',
          vocab: [
            { word: 'いく', pos: 'v.', meaning: '去', example: '日本へ行きます。' },
            { word: 'くうこう', pos: 'n.', meaning: '机场', example: '空港へ行きます。' },
            { word: 'ホテル', pos: 'n.', meaning: '酒店', example: 'ホテルに泊まります。' },
            { word: 'きっぷ', pos: 'n.', meaning: '票', example: '切符を買います。' }
          ],
          grammar: [
            { q: '日本___行きます。', type: 'choice', options: ['を', 'へ', 'で', 'に'], answer: 1, explain: 'へ 表示方向' },
            { q: 'きのう、東京へ___。(去了)', type: 'fill', answer: '行きました', explain: '行く 的过去式ます形' }
          ],
          speaking: [
            { text: '来週、日本へ行きます。', trans: '下周去日本。' },
            { text: 'ホテルを予約しました。', trans: '已经预约了酒店。' }
          ],
          listening: [
            { text: '来月、大阪へ旅行に行きます。新幹線で行きます。', q: 'どうやって大阪へ行きますか。', options: ['車', '新幹線', '飛行機', '船'], answer: 1 }
          ]
        }
      ]
    },
    {
      id: 'ja_n3', level: 'N3', name: '中级', desc: '能进行日常话题的较深入交流',
      units: [
        {
          id: 'ja_n3_u1', name: '仕事 (工作)',
          vocab: [
            { word: 'しごと', pos: 'n.', meaning: '工作', example: '仕事が忙しいです。' },
            { word: 'めんせつ', pos: 'n.', meaning: '面试', example: '面接を受けます。' },
            { word: 'けいけん', pos: 'n.', meaning: '经验', example: '経験があります。' },
            { word: 'きゅうりょう', pos: 'n.', meaning: '薪水', example: '給料が上がりました。' }
          ],
          grammar: [
            { q: '三年間、この会社で___います。(工作着)', type: 'fill', answer: '働いて', explain: '働く て形 + います 表示持续' },
            { q: '経験が___人を採用します。', type: 'choice', options: ['ある', 'あった', 'あります', 'ない'], answer: 0, explain: '連体形修饰名词用ある' }
          ],
          speaking: [
            { text: 'わたしは五年間、この会社で働いています。', trans: '我在这家公司工作五年了。' },
            { text: '来週、面接があります。', trans: '下周有面试。' }
          ],
          listening: [
            { text: 'わたしは五年間、プログラマーとして働いています。', q: 'わたしの仕事は何ですか。', options: ['先生', 'プログラマー', '医者', 'デザイナー'], answer: 1 }
          ]
        },
        {
          id: 'ja_n3_u2', name: '健康 (健康)',
          vocab: [
            { word: 'うんどう', pos: 'n.', meaning: '运动', example: '毎朝、運動します。' },
            { word: 'げんき', pos: 'adj.', meaning: '健康的', example: 'おかげさまで元気です。' },
            { word: 'ずつう', pos: 'n.', meaning: '头痛', example: '頭痛がします。' },
            { word: 'くすり', pos: 'n.', meaning: '药', example: '薬を飲みます。' }
          ],
          grammar: [
            { q: '毎日、運動___ほうがいいです。', type: 'choice', options: ['する', 'した', 'して', 'し'], answer: 1, explain: '～たほうがいい 最好做某事' },
            { q: '頭が痛いです。___、病院へ行きます。', type: 'fill', answer: 'だから', explain: 'だから 所以' }
          ],
          speaking: [
            { text: '頭痛がするので、病院へ行きます。', trans: '因为头痛，所以去医院。' },
            { text: '毎朝、ジョギングをしています。', trans: '每天早上慢跑。' }
          ],
          listening: [
            { text: '頭が痛いので、早く寝ます。明日は病院へ行くつもりです。', q: '明日、何をしますか。', options: ['仕事', '学校', '病院へ行く', '買い物'], answer: 2 }
          ]
        },
        {
          id: 'ja_n3_u3', name: '趣味 (爱好)',
          vocab: [
            { word: 'しゅみ', pos: 'n.', meaning: '爱好', example: '趣味は読書です。' },
            { word: 'あつめる', pos: 'v.', meaning: '收集', example: '切手を集めています。' },
            { word: 'かく', pos: 'v.', meaning: '画', example: '絵を描くのが好きです。' },
            { word: 'がっき', pos: 'n.', meaning: '乐器', example: '楽器が弾けます。' }
          ],
          grammar: [
            { q: '読書___趣味です。', type: 'choice', options: ['は', 'が', 'を', 'の'], answer: 0, explain: 'は 提示主题' },
            { q: '音楽を___のが好きです。(听)', type: 'fill', answer: '聞く', explain: '聞く 听' }
          ],
          speaking: [
            { text: 'わたしの趣味は写真を撮ることです。', trans: '我的爱好是拍照。' },
            { text: '週末によく山へ登ります。', trans: '周末经常去爬山。' }
          ],
          listening: [
            { text: 'わたしの趣味はギターを弾くことです。毎日、練習しています。', q: 'わたしの趣味は何ですか。', options: ['読書', 'ギター', '絵', 'スポーツ'], answer: 1 }
          ]
        }
      ]
    },
    {
      id: 'ja_n2', level: 'N2', name: '中高级', desc: '能理解较复杂的文章与表达',
      units: [
        {
          id: 'ja_n2_u1', name: '技術 (科技)',
          vocab: [
            { word: 'ぎじゅつ', pos: 'n.', meaning: '技术', example: '技術が進歩しました。' },
            { word: 'じんこう', pos: 'n.', meaning: '人工', example: '人工知能が発達しています。' },
            { word: 'じっし', pos: 'n.', meaning: '实施', example: '新しい政策を実施します。' },
            { word: 'こうりつ', pos: 'n.', meaning: '效率', example: '効率が上がりました。' }
          ],
          grammar: [
            { q: '技術が進歩する___、便利になりました。', type: 'choice', options: ['によって', 'につれて', 'に対して', 'にとって'], answer: 1, explain: 'につれて 随着' },
            { q: 'このシステムは___される予定です。(导入)', type: 'fill', answer: '導入', explain: '導入する 导入' }
          ],
          speaking: [
            { text: '人工知能の発展により、生活が便利になりました。', trans: '随着人工智能的发展，生活变得便利了。' },
            { text: '技術革新は社会を変えています。', trans: '技术革新正在改变社会。' }
          ],
          listening: [
            { text: '新しい技術を導入したことで、作業の効率が大幅に向上しました。', q: '何が向上しましたか。', options: ['品質', '効率', '売上', '安全性'], answer: 1 }
          ]
        },
        {
          id: 'ja_n2_u2', name: '環境 (环境)',
          vocab: [
            { word: 'おせん', pos: 'n.', meaning: '污染', example: '大気汚染が問題です。' },
            { word: 'じぞく', pos: 'n.', meaning: '可持续', example: '持続可能な開発が必要です。' },
            { word: 'リサイクル', pos: 'n.', meaning: '回收', example: 'リサイクルを推進します。' },
            { word: 'はいしゅつ', pos: 'n.', meaning: '排放', example: '二酸化炭素の排出を減らします。' }
          ],
          grammar: [
            { q: '環境を守る___、みんなで協力しましょう。', type: 'choice', options: ['ために', 'ように', 'そうに', 'ほど'], answer: 0, explain: 'ために 为了' },
            { q: 'もっとリサイクル___必要があります。', type: 'fill', answer: 'する', explain: '～する必要がある 有必要做' }
          ],
          speaking: [
            { text: '環境保護のため、リサイクルを推進しなければなりません。', trans: '为了环保，必须推进回收利用。' },
            { text: '二酸化炭素の排出を減らすことが重要です。', trans: '减少二氧化碳排放很重要。' }
          ],
          listening: [
            { text: '政府は、二酸化炭素の排出を五年以内に三十パーセント削減する目標を発表しました。', q: '何パーセント削減する目標ですか。', options: ['二十パーセント', '三十パーセント', '四十パーセント', '五十パーセント'], answer: 1 }
          ]
        },
        {
          id: 'ja_n2_u3', name: '文化 (文化)',
          vocab: [
            { word: 'ぶんか', pos: 'n.', meaning: '文化', example: '日本文化に興味があります。' },
            { word: 'でんとう', pos: 'n.', meaning: '传统', example: '伝統を守ります。' },
            { word: 'たよう', pos: 'adj.', meaning: '多样的', example: '多様な文化が共存しています。' },
            { word: 'きょうゆう', pos: 'n.', meaning: '共有', example: '価値観を共有します。' }
          ],
          grammar: [
            { q: '異なる文化___理解することが大切です。', type: 'choice', options: ['を', 'が', 'に', 'で'], answer: 0, explain: 'を 提示理解的对象' },
            { q: '文化の違い___、考え方も異なります。', type: 'fill', answer: 'によって', explain: 'によって 根据' }
          ],
          speaking: [
            { text: '多様な文化を尊重することが重要です。', trans: '尊重多样的文化很重要。' },
            { text: '伝統と革新のバランスが必要です。', trans: '需要传统与革新的平衡。' }
          ],
          listening: [
            { text: '異なる文化を理解し尊重することで、国際社会における相互理解が深まります。', q: '何が深まりますか。', options: ['経済', '相互理解', '技術', '貿易'], answer: 1 }
          ]
        }
      ]
    },
    {
      id: 'ja_n1', level: 'N1', name: '高级', desc: '能理解复杂日语并进行高级表达',
      units: [
        {
          id: 'ja_n1_u1', name: '経済 (经济)',
          vocab: [
            { word: 'インフレ', pos: 'n.', meaning: '通货膨胀', example: 'インフレが加速しています。' },
            { word: 'けいたい', pos: 'n.', meaning: '经济衰退', example: '景気が後退しています。' },
            { word: 'はいぶん', pos: 'n.', meaning: '分配', example: '資源を配分します。' },
            { word: 'おおき', pos: 'adj.', meaning: '巨大的', example: '大きな影響があります。' }
          ],
          grammar: [
            { q: '政府の対策___、インフレは抑制されるだろう。', type: 'choice', options: ['によって', 'によると', 'に対して', 'に沿って'], answer: 0, explain: 'によって 通过、由于' },
            { q: '景気が回復する___は、まだ時間がかかる。', type: 'fill', answer: 'ように', explain: 'ようには 要...' }
          ],
          speaking: [
            { text: 'インフレの加速は経済に大きな影響を与えています。', trans: '通货膨胀加速对经济产生了巨大影响。' },
            { text: '政府は経済対策を早急に実施する必要があります。', trans: '政府有必要尽快实施经济对策。' }
          ],
          listening: [
            { text: '中央銀行は、インフレ抑制のために利上げを決定しました。これは三十年ぶりの大幅な利上げです。', q: 'なぜ利上げを決定しましたか。', options: ['景気対策', 'インフレ抑制', '雇用促進', '通貨安対策'], answer: 1 }
          ]
        },
        {
          id: 'ja_n1_u2', name: '哲学 (哲学)',
          vocab: [
            { word: 'いしき', pos: 'n.', meaning: '意识', example: '意識の本質は謎です。' },
            { word: 'りんり', pos: 'n.', meaning: '伦理', example: '倫理的な問題を考えます。' },
            { word: 'こんぽん', pos: 'adj.', meaning: '根本的', example: '根本的な問題です。' },
            { word: 'ちかく', pos: 'v.', meaning: '感知', example: '世界を知覚します。' }
          ],
          grammar: [
            { q: '意識の本質を解明することは、容易___。', type: 'choice', options: ['ではない', 'にくい', 'がたい', 'である'], answer: 0, explain: '容易ではない 不容易' },
            { q: '私たちが世界を___方法は多様である。', type: 'fill', answer: '知覚する', explain: '知覚する 感知' }
          ],
          speaking: [
            { text: '哲学は、私たちの存在の根本的な問いを探究します。', trans: '哲学探究我们存在的根本问题。' },
            { text: '意識の本質は、未だに解明されていない謎です。', trans: '意识的本质仍是未解之谜。' }
          ],
          listening: [
            { text: '倫理的な判断には、結果だけでなく、行動の原理も考慮する必要があります。', q: '倫理的判断に何を考慮する必要がありますか。', options: ['結果のみ', '原理のみ', '結果と原理', 'どちらも不要'], answer: 2 }
          ]
        },
        {
          id: 'ja_n1_u3', name: '国際情勢 (国际形势)',
          vocab: [
            { word: 'ちりょう', pos: 'n.', meaning: '地缘政治', example: '地政学的な緊張が高まっています。' },
            { word: 'しゅけん', pos: 'n.', meaning: '主权', example: '国家主権は尊重されるべきです。' },
            { word: 'がいこう', pos: 'n.', meaning: '外交', example: '外交的な解決を目指します。' },
            { word: 'せいさい', pos: 'n.', meaning: '制裁', example: '経済制裁が発動されました。' }
          ],
          grammar: [
            { q: '国際紛争の解決には、外交的努力が___。', type: 'choice', options: ['必要である', '必要だった', '不要である', '不要だった'], answer: 0, explain: '必要である 有必要' },
            { q: '平和的な解決を___、外交交渉が続けられている。', type: 'fill', answer: '目指して', explain: '目指して 以...为目标' }
          ],
          speaking: [
            { text: '国際社会の平和と安定には、多国間の協力が不可欠です。', trans: '国际社会的和平与稳定离不开多边合作。' },
            { text: '外交的手段による紛争解決が望まれます。', trans: '希望通过外交手段解决争端。' }
          ],
          listening: [
            { text: '国連安保理は、紛争の平和的解決に向けた外交交渉を支持する決議を採択しました。', q: '何を支持する決議を採択しましたか。', options: ['軍事介入', '外交交渉', '経済制裁', '内政干渉'], answer: 1 }
          ]
        }
      ]
    }
  ];

  // 韩语课程数据
  const korean = [
    {
      id: 'ko_t1', level: 'TOPIK 1', name: '初级1', desc: '掌握韩文字母与基础日常用语',
      units: [
        {
          id: 'ko_t1_u1', name: '인사 (问候)',
          vocab: [
            { word: '안녕하세요', pos: '寒暄', meaning: '你好', example: '안녕하세요, 만나서 반갑습니다.' },
            { word: '감사합니다', pos: '感.', meaning: '谢谢', example: '도와주셔서 감사합니다.' },
            { word: '이름', pos: 'n.', meaning: '名字', example: '제 이름은 김민수입니다.' },
            { word: '만나다', pos: 'v.', meaning: '见面', example: '만나서 반갑습니다.' },
            { word: '안녕히 가세요', pos: '寒暄', meaning: '再见', example: '안녕히 가세요, 내일 봐요.' }
          ],
          grammar: [
            { q: '제 이름___ 김민수입니다.', type: 'choice', options: ['은', '는', '이', '가'], answer: 0, explain: '은/는 提示主题，名字后用은' },
            { q: '만나서___습니다. (高兴)', type: 'fill', answer: '반갑', explain: '반갑다 高兴' },
            { q: '어느 나라___ 오셨어요?', type: 'choice', options: ['에', '에서', '으로', '까지'], answer: 1, explain: '에서 表示来源' }
          ],
          speaking: [
            { text: '안녕하세요, 제 이름은 김민수입니다.', trans: '你好，我叫金民秀。' },
            { text: '만나서 반갑습니다.', trans: '很高兴见到你。' },
            { text: '잘 부탁드립니다.', trans: '请多多关照。' }
          ],
          listening: [
            { text: '안녕하세요, 제 이름은 이지영입니다. 한국에서 왔어요.', q: '이지영 씨는 어느 나라에서 왔어요?', options: ['중국', '한국', '일본', '미국'], answer: 1 },
            { text: '감사합니다. 안녕히 가세요.', q: '이 대화는 무슨 상황인가요?', options: ['만남', '작별', '식사', '전화'], answer: 1 }
          ]
        },
        {
          id: 'ko_t1_u2', name: '숫자와 시간 (数字与时间)',
          vocab: [
            { word: '하나', pos: '数.', meaning: '一', example: '사과가 하나 있어요.' },
            { word: '시간', pos: 'n.', meaning: '时间', example: '지금 몇 시예요?' },
            { word: '오늘', pos: 'n.', meaning: '今天', example: '오늘은 월요일이에요.' },
            { word: '내일', pos: 'n.', meaning: '明天', example: '내일 봐요.' }
          ],
          grammar: [
            { q: '지금___ 시예요. (三点)', type: 'fill', answer: '세', explain: '세 시 三点(固有数词)' },
            { q: '학교___ 갑니다.', type: 'choice', options: ['을', '를', '에', '에서'], answer: 2, explain: '에 表示目的地' }
          ],
          speaking: [
            { text: '지금 몇 시예요?', trans: '现在几点？' },
            { text: '세 시예요.', trans: '三点。' }
          ],
          listening: [
            { text: '지금 아홉 시예요. 학교는 아홉 시 반에 시작해요.', q: '학교는 몇 시에 시작해요?', options: ['아홉 시', '아홉 시 반', '열 시', '여덟 시 반'], answer: 1 }
          ]
        },
        {
          id: 'ko_t1_u3', name: '가족 (家庭)',
          vocab: [
            { word: '아버지', pos: 'n.', meaning: '父亲', example: '우리 아버지는 선생님이에요.' },
            { word: '어머니', pos: 'n.', meaning: '母亲', example: '어머니가 요리를 해요.' },
            { word: '형제', pos: 'n.', meaning: '兄弟姐妹', example: '형제가 있어요?' },
            { word: '가족', pos: 'n.', meaning: '家人', example: '우리 가족은 네 명이에요.' }
          ],
          grammar: [
            { q: '우리 가족___ 네 명이에요.', type: 'choice', options: ['은', '는', '이', '가'], answer: 0, explain: '은/는 提示主题' },
            { q: '동생이 두 명___.', type: 'fill', answer: '있어요', explain: '있다 有' }
          ],
          speaking: [
            { text: '우리 가족은 네 명이에요.', trans: '我家有四口人。' },
            { text: '아버지는 선생님이에요.', trans: '我父亲是老师。' }
          ],
          listening: [
            { text: '우리 가족은 네 명이에요. 아버지, 어머니, 언니, 그리고 저예요.', q: '가족이 모두 몇 명이에요?', options: ['세 명', '네 명', '다섯 명', '여섯 명'], answer: 1 }
          ]
        }
      ]
    },
    {
      id: 'ko_t2', level: 'TOPIK 2', name: '初级2', desc: '日常生活场景的基础表达',
      units: [
        {
          id: 'ko_t2_u1', name: '음식 (饮食)',
          vocab: [
            { word: '먹다', pos: 'v.', meaning: '吃', example: '아침을 먹어요.' },
            { word: '맛있다', pos: 'adj.', meaning: '好吃的', example: '이 김치찌개가 맛있어요.' },
            { word: '마시다', pos: 'v.', meaning: '喝', example: '커피를 마셔요.' },
            { word: '배고프다', pos: 'adj.', meaning: '饿的', example: '배고파요.' }
          ],
          grammar: [
            { q: '김치찌개를___. (吃)', type: 'fill', answer: '먹어요', explain: '먹다 + 어요' },
            { q: '주스를___ 마셔요.', type: 'choice', options: ['많이', '많은', '많다', '많'], answer: 0, explain: '많이 副词修饰动词' }
          ],
          speaking: [
            { text: '잘 먹겠습니다.', trans: '我开动了。' },
            { text: '이 음식이 정말 맛있어요.', trans: '这个食物真好吃。' }
          ],
          listening: [
            { text: '오늘 아침은 빵하고 우유를 먹었어요.', q: '아침으로 무엇을 먹었어요?', options: ['밥과 국', '빵과 우유', '라면', '김밥'], answer: 1 }
          ]
        },
        {
          id: 'ko_t2_u2', name: '쇼핑 (购物)',
          vocab: [
            { word: '사다', pos: 'v.', meaning: '买', example: '책을 사요.' },
            { word: '얼마', pos: 'n.', meaning: '多少钱', example: '이거 얼마예요?' },
            { word: '비싸다', pos: 'adj.', meaning: '贵的', example: '이 시계가 비싸요.' },
            { word: '싸다', pos: 'adj.', meaning: '便宜的', example: '이 가방이 싸요.' }
          ],
          grammar: [
            { q: '이 책___ 얼마예요?', type: 'choice', options: ['은', '는', '이', '가'], answer: 2, explain: '이 后用이' },
            { q: '이 옷은___. (便宜)', type: 'fill', answer: '싸요', explain: '싸다 + 아요' }
          ],
          speaking: [
            { text: '이거 얼마예요?', trans: '这个多少钱？' },
            { text: '이거 주세요.', trans: '请给我这个。' }
          ],
          listening: [
            { text: '이 가방은 삼천 원이에요. 저 가방은 오천 원이에요.', q: '어느 가방이 더 쌀까요?', options: ['이 가방', '저 가방', '같아요', '모름'], answer: 0 }
          ]
        },
        {
          id: 'ko_t2_u3', name: '여행 (旅行)',
          vocab: [
            { word: '가다', pos: 'v.', meaning: '去', example: '한국에 가요.' },
            { word: '공항', pos: 'n.', meaning: '机场', example: '공항에 가요.' },
            { word: '호텔', pos: 'n.', meaning: '酒店', example: '호텔에 묵어요.' },
            { word: '표', pos: 'n.', meaning: '票', example: '기차표를 사요.' }
          ],
          grammar: [
            { q: '한국___ 가요.', type: 'choice', options: ['을', '를', '에', '에서'], answer: 2, explain: '에 表示方向' },
            { q: '어제 부산에___. (去了)', type: 'fill', answer: '갔어요', explain: '가다 过去式' }
          ],
          speaking: [
            { text: '다음 주에 한국에 가요.', trans: '下周去韩国。' },
            { text: '호텔을 예약했어요.', trans: '已经预约了酒店。' }
          ],
          listening: [
            { text: '다음 달에 제주도에 여행 가요. 비행기로 갈 거예요.', q: '어떻게 제주도에 가요?', options: ['차', '비행기', '기차', '배'], answer: 1 }
          ]
        }
      ]
    },
    {
      id: 'ko_t3', level: 'TOPIK 3', name: '中级1', desc: '能进行日常话题的交流',
      units: [
        {
          id: 'ko_t3_u1', name: '직장 (职场)',
          vocab: [
            { word: '일', pos: 'n.', meaning: '工作', example: '일이 바빠요.' },
            { word: '면접', pos: 'n.', meaning: '面试', example: '면접을 봐요.' },
            { word: '경험', pos: 'n.', meaning: '经验', example: '경험이 있어요.' },
            { word: '월급', pos: 'n.', meaning: '月薪', example: '월급이 올랐어요.' }
          ],
          grammar: [
            { q: '저는 5년 동안 이 회사에서___ 있어요. (工作)', type: 'fill', answer: '일하고', explain: '일하다 + 고 있다' },
            { q: '경험이___ 사람을 찾아요.', type: 'choice', options: ['있는', '있어', '있다', '있었'], answer: 0, explain: '있는 连体形修饰名词' }
          ],
          speaking: [
            { text: '저는 이 회사에서 5년 동안 일하고 있어요.', trans: '我在这家公司工作五年了。' },
            { text: '다음 주에 면접이 있어요.', trans: '下周有面试。' }
          ],
          listening: [
            { text: '저는 프로그래머로 3년 동안 일했어요.', q: '무슨 일을 했어요?', options: ['선생님', '프로그래머', '의사', '디자이너'], answer: 1 }
          ]
        },
        {
          id: 'ko_t3_u2', name: '건강 (健康)',
          vocab: [
            { word: '운동', pos: 'n.', meaning: '运动', example: '매일 운동해요.' },
            { word: '건강', pos: 'n.', meaning: '健康', example: '건강하세요.' },
            { word: '두통', pos: 'n.', meaning: '头痛', example: '두통이 있어요.' },
            { word: '약', pos: 'n.', meaning: '药', example: '약을 먹어요.' }
          ],
          grammar: [
            { q: '매일 운동하는___ 좋아요.', type: 'choice', options: ['것이', '게', '는', '을'], answer: 0, explain: '는 것이 좋다 做...好' },
            { q: '머리가 아파요.___ 병원에 가요.', type: 'fill', answer: '그래서', explain: '그래서 所以' }
          ],
          speaking: [
            { text: '두통이 있어서 병원에 가요.', trans: '因为头痛去医院。' },
            { text: '건강을 위해 매일 운동해요.', trans: '为了健康每天运动。' }
          ],
          listening: [
            { text: '머리가 아파서 일찍 자요. 내일 병원에 갈 거예요.', q: '내일 무엇을 할 거예요?', options: ['일', '학교', '병원', '쇼핑'], answer: 2 }
          ]
        },
        {
          id: 'ko_t3_u3', name: '취미 (爱好)',
          vocab: [
            { word: '취미', pos: 'n.', meaning: '爱好', example: '취미가 독서예요.' },
            { word: '모으다', pos: 'v.', meaning: '收集', example: '우표를 모아요.' },
            { word: '그리다', pos: 'v.', meaning: '画', example: '그림을 그려요.' },
            { word: '악기', pos: 'n.', meaning: '乐器', example: '악기를 연주해요.' }
          ],
          grammar: [
            { q: '제 취미는 독서___.', type: 'choice', options: ['예요', '이에요', '이', '는'], answer: 1, explain: '이에요 名词结尾' },
            { q: '음악을___ 좋아해요. (听)', type: 'fill', answer: '듣는', explain: '듣다 听' }
          ],
          speaking: [
            { text: '제 취미는 사진 찍기예요.', trans: '我的爱好是拍照。' },
            { text: '주말에 등산해요.', trans: '周末去爬山。' }
          ],
          listening: [
            { text: '제 취미는 기타 치기예요. 매일 연습해요.', q: '취미가 무엇인가요?', options: ['독서', '기타', '그림', '운동'], answer: 1 }
          ]
        }
      ]
    },
    {
      id: 'ko_t4', level: 'TOPIK 4', name: '中级2', desc: '能理解较复杂的表达',
      units: [
        {
          id: 'ko_t4_u1', name: '과학 기술 (科技)',
          vocab: [
            { word: '기술', pos: 'n.', meaning: '技术', example: '기술이 발전했어요.' },
            { word: '인공', pos: 'n.', meaning: '人工', example: '인공지능이 발달했어요.' },
            { word: '실시', pos: 'n.', meaning: '实施', example: '새 정책을 실시해요.' },
            { word: '효율', pos: 'n.', meaning: '效率', example: '효율이 높아졌어요.' }
          ],
          grammar: [
            { q: '기술이 발전함___生活이 편리해졌어요.', type: 'choice', options: ['에 따라', '에 의해', '에 대해', '에 있어'], answer: 0, explain: '에 따라 随着' },
            { q: '새 시스템이___될 거예요. (导入)', type: 'fill', answer: '도입', explain: '도입되다 被导入' }
          ],
          speaking: [
            { text: '인공지능의 발전으로 삶이 편리해졌어요.', trans: '人工智能的发展让生活更便利。' },
            { text: '기술 혁신이 사회를 변화시키고 있어요.', trans: '技术革新正在改变社会。' }
          ],
          listening: [
            { text: '새로운 기술을 도입해서 작업 효율이 크게 향상되었어요.', q: '무엇이 향상되었어요?', options: ['품질', '효율', '매출', '안전'], answer: 1 }
          ]
        },
        {
          id: 'ko_t4_u2', name: '환경 (环境)',
          vocab: [
            { word: '오염', pos: 'n.', meaning: '污染', example: '대기 오염이 문제예요.' },
            { word: '지속', pos: 'n.', meaning: '可持续', example: '지속 가능한 발전이 필요해요.' },
            { word: '재활용', pos: 'n.', meaning: '回收', example: '재활용을 해요.' },
            { word: '배출', pos: 'n.', meaning: '排放', example: '이산화탄소 배출을 줄여요.' }
          ],
          grammar: [
            { q: '환경을 보호하기___, 재활용을 해야 해요.', type: 'choice', options: ['위해', '때문', '대로', '처럼'], answer: 0, explain: '위해 为了' },
            { q: '재활용을___ 필요가 있어요.', type: 'fill', answer: '할', explain: '할 필요가 있다 有必要做' }
          ],
          speaking: [
            { text: '환경 보호를 위해 재활용을 해야 해요.', trans: '为了环保必须回收。' },
            { text: '이산화탄소 배출을 줄이는 것이 중요해요.', trans: '减少二氧化碳排放很重要。' }
          ],
          listening: [
            { text: '정부는 이산화탄소 배출을 5년 이내에 30% 줄이는 목표를 발표했어요.', q: '몇 퍼센트 줄일 목표인가요?', options: ['20%', '30%', '40%', '50%'], answer: 1 }
          ]
        },
        {
          id: 'ko_t4_u3', name: '문화 (文化)',
          vocab: [
            { word: '문화', pos: 'n.', meaning: '文化', example: '한국 문화에 관심이 있어요.' },
            { word: '전통', pos: 'n.', meaning: '传统', example: '전통을 지켜요.' },
            { word: '다양', pos: 'adj.', meaning: '多样的', example: '다양한 문화가 공존해요.' },
            { word: '공유', pos: 'n.', meaning: '共享', example: '가치관을 공유해요.' }
          ],
          grammar: [
            { q: '다양한 문화를___ 것이 중요해요.', type: 'choice', options: ['존중하는', '존중해', '존중', '존중한'], answer: 0, explain: '존중하는 连体形' },
            { q: '문화에 따라 생각___ 달라요.', type: 'fill', answer: '이', explain: '생각이 달라다 想法不同' }
          ],
          speaking: [
            { text: '다양한 문화를 존중하는 것이 중요해요.', trans: '尊重多样的文化很重要。' },
            { text: '전통과 혁신의 균형이 필요해요.', trans: '需要传统与创新的平衡。' }
          ],
          listening: [
            { text: '다른 문화를 이해하고 존중함으로써 국제 사회의 상호 이해가 깊어져요.', q: '무엇이 깊어져요?', options: ['경제', '상호 이해', '기술', '무역'], answer: 1 }
          ]
        }
      ]
    },
    {
      id: 'ko_t5', level: 'TOPIK 5', name: '高级1', desc: '能进行专业领域的表达',
      units: [
        {
          id: 'ko_t5_u1', name: '경제 (经济)',
          vocab: [
            { word: '인플레이션', pos: 'n.', meaning: '通货膨胀', example: '인플레이션이 심해요.' },
            { word: '불황', pos: 'n.', meaning: '经济萧条', example: '경기 불황이어요.' },
            { word: '배분', pos: 'n.', meaning: '分配', example: '자원을 배분해요.' },
            { word: '거대', pos: 'adj.', meaning: '巨大的', example: '거대한 영향이 있어요.' }
          ],
          grammar: [
            { q: '정부 대책___ 인플레이션이 억제될 거예요.', type: 'choice', options: ['에 의해', '에 따라', '에 대해', '에 있어'], answer: 0, explain: '에 의해 被...' },
            { q: '경기가 회복되기___에는 시간이 걸려요.', type: 'fill', answer: '까지', explain: '기까지 到...为止' }
          ],
          speaking: [
            { text: '인플레이션 가속이 경제에 큰 영향을 미치고 있어요.', trans: '通胀加速对经济产生巨大影响。' },
            { text: '정부는 경제 대책을 시급히 실시해야 해요.', trans: '政府必须尽快实施经济对策。' }
          ],
          listening: [
            { text: '중앙은행은 인플레이션 억제를 위해 금리 인상을 결정했어요. 30년 만에 큰 폭 인상이에요.', q: '왜 금리를 인상했나요?', options: ['경기 부양', '인플레이션 억제', '고용 촉진', '통화 약세'], answer: 1 }
          ]
        },
        {
          id: 'ko_t5_u2', name: '철학 (哲学)',
          vocab: [
            { word: '의식', pos: 'n.', meaning: '意识', example: '의식의 본질은 수수께끼예요.' },
            { word: '윤리', pos: 'n.', meaning: '伦理', example: '윤리적 문제를 고민해요.' },
            { word: '근본', pos: 'adj.', meaning: '根本的', example: '근본적인 문제예요.' },
            { word: '지각', pos: 'v.', meaning: '感知', example: '세계를 지각해요.' }
          ],
          grammar: [
            { q: '의식의 본질을 밝히는 것은 쉽지___.', type: 'choice', options: ['않아요', '어요', '은데요', '네요'], answer: 0, explain: '쉽지 않다 不容易' },
            { q: '우리가 세계를___ 방법은 다양해요.', type: 'fill', answer: '지각하는', explain: '지각하다 感知' }
          ],
          speaking: [
            { text: '철학은 우리 존재의 근본적인 질문을 탐구해요.', trans: '哲学探究我们存在的根本问题。' },
            { text: '의식의 본질은 아직 밝혀지지 않은 수수께끼예요.', trans: '意识的本质仍是未解之谜。' }
          ],
          listening: [
            { text: '윤리적 판단에는 결과뿐만 아니라 행동의 원리도 고려해야 해요.', q: '윤리적 판단에 무엇을 고려해야 하나요?', options: ['결과만', '원리만', '결과와 원리', '둘 다 불필요'], answer: 2 }
          ]
        },
        {
          id: 'ko_t5_u3', name: '국제 정세 (国际形势)',
          vocab: [
            { word: '지정학', pos: 'n.', meaning: '地缘政治', example: '지정학적 긴장이 높아요.' },
            { word: '주권', pos: 'n.', meaning: '主权', example: '국가 주권이 존중돼야 해요.' },
            { word: '외교', pos: 'n.', meaning: '外交', example: '외교적 해결을 추구해요.' },
            { word: '제재', pos: 'n.', meaning: '制裁', example: '경제 제재가 발동됐어요.' }
          ],
          grammar: [
            { q: '국제 분쟁 해결에는 외교적 노력이___.', type: 'choice', options: ['필요해요', '필요 없어요', '필요했어요', '필요 없었어요'], answer: 0, explain: '필요하다 有必要' },
            { q: '평화적 해결을___ 외교 교섭이 계속돼요.', type: 'fill', answer: '위해', explain: '위해 为了' }
          ],
          speaking: [
            { text: '국제 사회의 평화와 안정에는 다자간 협력이 필수적이에요.', trans: '国际社会的和平与稳定离不开多边合作。' },
            { text: '외교적 수단으로 분쟁을 해결해야 해요.', trans: '必须通过外交手段解决争端。' }
          ],
          listening: [
            { text: '유엔 안보리는 분쟁의 평화적 해결을 위한 외교 교섭을 지지하는 결의안을 채택했어요.', q: '무엇을 지지하는 결의안인가요?', options: ['군사 개입', '외교 교섭', '경제 제재', '내정 간섭'], answer: 1 }
          ]
        }
      ]
    },
    {
      id: 'ko_t6', level: 'TOPIK 6', name: '高级2', desc: '高级韩语运用能力',
      units: [
        {
          id: 'ko_t6_u1', name: '학술 담화 (学术论述)',
          vocab: [
            { word: '방법론', pos: 'n.', meaning: '方法论', example: '방법론이 타당해요.' },
            { word: '입증하다', pos: 'v.', meaning: '证实', example: '데이터가 이론을 입증해요.' },
            { word: '병치하다', pos: 'v.', meaning: '并列', example: '두 관점을 병치해요.' },
            { word: '뉘앙스', pos: 'n.', meaning: '细微差别', example: '의미에 뉘앙스가 있어요.' }
          ],
          grammar: [
            { q: '결과가 발표되자마자___ 새로운 의문이 제기됐어요.', type: 'choice', options: ['곧바로', '마침내', '겨우', '비로소'], answer: 0, explain: '곧바로 立即' },
            { q: '모든 학생이 지침을___ 것이 요구돼요.', type: 'fill', answer: '따르는', explain: '따르다 遵循' }
          ],
          speaking: [
            { text: '본 연구에서 사용된 방법론은 엄격하고 재현 가능합니다.', trans: '本研究采用的方法论严谨且可重复。' },
            { text: '이러한 발견은 기존의 이론적 틀을 입증합니다.', trans: '这些发现证实了现有的理论框架。' }
          ],
          listening: [
            { text: '연구자들은 정량 데이터와 정성 인터뷰를 병치하여 현상에 대한 더욱 섬세한 이해를 얻었습니다.', q: '왜 두 종류의 데이터를 사용했나요?', options: ['시간 절약', '섬세한 이해', '빠른 발표', '비용 절감'], answer: 1 }
          ]
        },
        {
          id: 'ko_t6_u2', name: '문학 분석 (文学分析)',
          vocab: [
            { word: '우화', pos: 'n.', meaning: '寓言', example: '이 소설은 우화예요.' },
            { word: '은유', pos: 'n.', meaning: '隐喻', example: '인생은 여행이라는 은유예요.' },
            { word: '주인공', pos: 'n.', meaning: '主人公', example: '주인공이 도덕적 딜레마에 빠져요.' },
            { word: '모호하다', pos: 'adj.', meaning: '模糊的', example: '결말이 의도적으로 모호해요.' }
          ],
          grammar: [
            { q: '상징이 없었다면 텍스트___ 깊이를 잃었을 거예요.', type: 'choice', options: ['은', '는', '이', '가'], answer: 1, explain: '는 强调' },
            { q: '작가,___ 작품이 수십 년에 걸쳐 있죠, 노벨상을 받았어요.', type: 'fill', answer: '의', explain: '의 表示所属' }
          ],
          speaking: [
            { text: '이 소설은 여러 의미 층위에서 작동합니다.', trans: '这部小说在多个意义层面上运作。' },
            { text: '주인공의 여정은 인간 존재에 대한 우화입니다.', trans: '主人公的旅程是关于人类存在的寓言。' }
          ],
          listening: [
            { text: '작가는 확장된 은유와 의도적인 모호함을 사용하여 독자들이 스스로 해석을 구성하도록 도전합니다.', q: '작가가 독자들을 도전하는 이유는?', options: ['단순한 언어', '은유와 모호함', '직접적 진술', '역사적 사실'], answer: 1 }
          ]
        },
        {
          id: 'ko_t6_u3', name: '글로벌 이슈 (全球议题)',
          vocab: [
            { word: '지정학적', pos: 'adj.', meaning: '地缘政治的', example: '지정학적 긴장이 고조돼요.' },
            { word: '주권', pos: 'n.', meaning: '主权', example: '국가 주권이 존중돼야 해요.' },
            { word: '외교', pos: 'n.', meaning: '外交', example: '외교는 협상의 기술이에요.' },
            { word: '제재', pos: 'n.', meaning: '制裁', example: '경제 제재가 부과됐어요.' }
          ],
          grammar: [
            { q: '이렇게 복잡한 외교적 상황은___ 없었어요.', type: 'choice', options: ['좀처럼', '드물게', '가끔', '자주'], answer: 0, explain: '좀처럼 几乎不' },
            { q: '조약은 지난해 서명됐___ 아직 비준되지 않았어요.', type: 'fill', answer: '으나', explain: '으나 虽然' }
          ],
          speaking: [
            { text: '지정학적 긴장에는 세심한 외교적 대응이 필요합니다.', trans: '地缘政治紧张需要谨慎的外交应对。' },
            { text: '다자간 협력은 여전히 세계 안정에 필수적입니다.', trans: '多边合作对全球稳定仍然至关重要。' }
          ],
          listening: [
            { text: '분쟁을 해결하기 위한 외교적 협상이 진행 중이며, 양측은 타협안 도출에 대해 조심스러운 낙관론을 표명하고 있습니다.', q: '협상의 현재 상태는?', options: ['실패', '진행 중', '완료', '취소'], answer: 1 }
          ]
        }
      ]
    }
  ];

  const all = { en: english, ja: japanese, ko: korean };

  const META = {
    en: { name: '英语', flag: '🇬🇧', code: 'en', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
    ja: { name: '日语', flag: '🇯🇵', code: 'ja', levels: ['N5', 'N4', 'N3', 'N2', 'N1'] },
    ko: { name: '韩语', flag: '🇰🇷', code: 'ko', levels: ['TOPIK 1', 'TOPIK 2', 'TOPIK 3', 'TOPIK 4', 'TOPIK 5', 'TOPIK 6'] }
  };

  function getLanguages() {
    return Object.values(META);
  }

  function getCourses(langCode) {
    return all[langCode] || [];
  }

  function getCourse(langCode, courseId) {
    return getCourses(langCode).find(c => c.id === courseId);
  }

  function getUnit(langCode, courseId, unitId) {
    const c = getCourse(langCode, courseId);
    if (!c) return null;
    return c.units.find(u => u.id === unitId);
  }

  function getMeta(langCode) {
    return META[langCode];
  }

  return { getLanguages, getCourses, getCourse, getUnit, getMeta, META };
})();
