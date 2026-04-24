export type StoryCheckpointPrompt = {
    prompt: string;
    response: string;
  };
  
  export type StoryCheckpoint = {
    arcId: string;
    prompts: StoryCheckpointPrompt[];
  };
  
  export const storyCheckpoints: StoryCheckpoint[] = [
    {
      arcId: "land-of-waves",
      prompts: [
        {
          prompt: "Who felt more elite here, Zabuza or Kakashi?",
          response:
            "Kakashi feels more complete, but Zabuza has the stronger villain presence. Kakashi shows control, experience, and composure. Zabuza makes the world feel dangerous. That contrast is why this arc works so well.",
        },
        {
          prompt: "Where do you land on Haku: tragic, loyal, dangerous, or all three?",
          response:
            "All three is probably the strongest read. Haku is dangerous enough to overwhelm Team 7, but the tragedy comes from how little of that strength feels like it belongs to him. His loyalty is real, but it also traps him.",
        },
        {
          prompt: "What did this arc teach you about being a shinobi?",
          response:
            "It pushes the idea that shinobi are treated like tools, but the story clearly questions that. Zabuza and Haku show the cost of that mindset. Naruto’s reaction is the first real sign that he sees people differently.",
        },
        {
          prompt: "Which Team 7 member changed the most by the end?",
          response:
            "Naruto changes the most emotionally. Sasuke shows growth in action, and Sakura starts understanding the stakes, but Naruto is the one whose worldview gets hit hardest.",
        },
        {
          prompt: "Where does Zabuza rank among early Naruto villains?",
          response:
            "As an early villain, Zabuza is still one of the strongest introductions. He is not the flashiest, but he gives the series weight fast. A lot of later villains are bigger, but Zabuza helps define the tone.",
        },
      ],
    },
    {
      arcId: "chunin-exams",
      prompts: [
        {
          prompt: "Who feels like the strongest genin right now?",
          response:
            "Gaara is the easy top answer because the sand defense feels unfair at this stage. Neji looks the most polished. Lee looks like the scariest matchup if he gets going. Sasuke has the most obvious growth curve.",
        },
        {
          prompt: "Which fighting style seems hardest to counter?",
          response:
            "Gaara’s style feels hardest to solve because it protects him without much visible effort. Neji’s Gentle Fist is almost as scary once he gets close. Lee is different because he overwhelms the whole pace of a fight.",
        },
        {
          prompt: "Neji, Gaara, Lee, or Sasuke: who has the highest ceiling?",
          response:
            "Sasuke probably has the highest ceiling based on how fast he learns. Gaara feels strongest now. Neji feels closest to a finished product. Lee feels like the wild card who can break the rules through effort.",
        },
        {
          prompt: "Where do you land on Neji’s view of fate?",
          response:
            "Neji’s argument feels convincing because the world around him seems to support it. Bloodline, clan status, and natural talent clearly matter. Naruto challenges that idea before he can fully disprove it.",
        },
        {
          prompt: "Which matchup are you most invested in?",
          response:
            "The best matchups are the ones where style and worldview clash. Naruto vs Neji has the clearest theme. Lee vs Gaara has the most shock value. Sasuke’s matches carry the most long-term tension.",
        },
      ],
    },
    {
      arcId: "konoha-crush",
      prompts: [
        {
          prompt: "Who handled the shift from exams to real danger best?",
          response:
            "Naruto adjusts the most dramatically. Sasuke is sharp, but Naruto rises when the stakes stop being tournament rules. Gaara also shifts, but in a more unstable way.",
        },
        {
          prompt: "How did this arc change your view of Gaara?",
          response:
            "Gaara stops feeling like just a scary prodigy and starts feeling like a warning sign. His strength is still terrifying, but the arc makes it harder to see him as only a monster.",
        },
        {
          prompt: "Naruto, Sasuke, or Gaara: whose path changed the most here?",
          response:
            "Gaara’s path changes the most emotionally. Naruto proves something about himself, Sasuke gets pushed, but Gaara is the one whose entire worldview takes the biggest hit.",
        },
        {
          prompt: "What did this arc reveal about the Leaf’s weaknesses?",
          response:
            "The Leaf looks powerful, but not untouchable. The village has strong individuals, but the invasion shows how fragile peace can be when politics, revenge, and hidden threats collide.",
        },
        {
          prompt: "Which fight felt most important to the story?",
          response:
            "Naruto vs Gaara feels the most important because it turns a battle into a character mirror. It is less about who is stronger and more about what Naruto refuses to become.",
        },
      ],
    },
    {
      arcId: "search-for-tsunade",
      prompts: [
        {
          prompt: "Which Sannin made the strongest impression?",
          response:
            "Tsunade gets the most complete arc here. Jiraiya feels like the best mentor fit for Naruto, and Orochimaru stays dangerous, but Tsunade is the one whose past, fear, and choice drive the story.",
        },
        {
          prompt: "What sold you most on Tsunade as Hokage?",
          response:
            "Her reluctance makes the decision stronger. She is not chasing the title for status. The arc works because she has to choose the village again after losing so much.",
        },
        {
          prompt: "What mattered more for Naruto here: training or belief?",
          response:
            "Belief matters more. The training is important, but Naruto’s refusal to fold is what affects Tsunade. His growth here is tied to conviction, not just technique.",
        },
        {
          prompt: "How did Jiraiya work as Naruto’s mentor?",
          response:
            "Jiraiya works because he gives Naruto room to struggle. He is not polished like Kakashi, but he fits Naruto’s energy. The mentorship feels messy, funny, and useful.",
        },
        {
          prompt: "Which character had the best argument in this arc?",
          response:
            "Tsunade has the strongest emotional argument at first because her fear is understandable. Naruto has the strongest future-facing argument because he refuses to let loss define what comes next.",
        },
      ],
    },
    {
      arcId: "sasuke-recovery-mission",
      prompts: [
        {
          prompt: "Which Sasuke Retrieval fight was the strongest overall?",
          response:
            "Most fans split between Neji’s fight, Choji’s fight, and Naruto vs Sasuke. Neji has strategy and redemption. Choji has emotional weight. Naruto vs Sasuke has the biggest story impact.",
        },
        {
          prompt: "Which rescue squad member proved the most?",
          response:
            "Shikamaru proves the most as a leader. Neji and Choji prove the most emotionally. Naruto carries the mission’s heart, but Shikamaru’s decisions shape the whole rescue attempt.",
        },
        {
          prompt: "What part of Sasuke’s choice makes the most sense?",
          response:
            "His desperation makes sense. Sasuke feels stuck watching Naruto grow while his own goal feels far away. The hard part to defend is who he is willing to hurt to chase power.",
        },
        {
          prompt: "Where did Naruto and Sasuke’s rivalry fully lock in?",
          response:
            "It locks in when the rivalry stops being about competition and becomes about identity. Naruto wants to save a bond. Sasuke wants to cut one. That is the real split.",
        },
        {
          prompt: "Which fight had the best mix of strategy and emotion?",
          response:
            "Neji’s fight probably has the cleanest strategy-emotion balance. Naruto vs Sasuke has more emotional force, but Neji’s battle shows how far he has come since the Chunin Exams.",
        },
      ],
    },
    {
      arcId: "part-1-finale",
      prompts: [
        {
          prompt: "Who changed more by the end of Part 1: Naruto or Sasuke?",
          response:
            "Naruto changes more openly. Sasuke changes more painfully. Naruto gains purpose through bonds, while Sasuke starts defining himself by what he is willing to abandon.",
        },
        {
          prompt: "What was the real turning point of their rivalry?",
          response:
            "The turning point is when Sasuke stops seeing Naruto as just annoying competition and starts seeing him as proof that he might be falling behind.",
        },
        {
          prompt: "Which unresolved thread are you carrying into Shippuden?",
          response:
            "Sasuke is the biggest unresolved thread, but the larger question is what Naruto can become without losing what makes him Naruto.",
        },
        {
          prompt: "Who are you most excited to see after the time skip?",
          response:
            "Naruto and Sasuke are the obvious picks, but Kakashi, Sakura, and the rest of the rookies all carry curiosity because Part 1 leaves so much room for growth.",
        },
        {
          prompt: "What does Part 1 leave you thinking about Naruto’s future?",
          response:
            "It leaves Naruto with a clear emotional mission. He is still rough, but the ending makes his future feel bigger than becoming strong. It is about what kind of person he refuses to stop being.",
        },
      ],
    },
    {
      arcId: "kazekage-rescue-mission",
      prompts: [
        {
          prompt: "Who showed the biggest jump after the time skip?",
          response:
            "Sakura has the clearest surprise jump because her growth is shown immediately and practically. Naruto feels stronger too, but Sakura’s improvement changes how people read her fast.",
        },
        {
          prompt: "What made Akatsuki feel different from earlier threats?",
          response:
            "Akatsuki feels organized, calm, and much larger than a single-village problem. Earlier villains were dangerous. Akatsuki feels like a system of threats.",
        },
        {
          prompt: "Where did Sakura’s growth surprise you most?",
          response:
            "Her composure stands out most. She is not just stronger; she makes decisions under pressure and contributes directly. That is what makes the jump feel real.",
        },
        {
          prompt: "What stood out more: Gaara’s role or Naruto’s growth?",
          response:
            "Gaara’s role gives the arc its emotional weight. Naruto’s growth matters, but Gaara becoming Kazekage changes how you look back at Part 1.",
        },
        {
          prompt: "Where did Shippuden first feel heavier than Part 1?",
          response:
            "It feels heavier when the consequences are political and personal at the same time. The story is no longer just about kids proving themselves. Villages, leaders, and old wounds are involved.",
        },
      ],
    },
    {
      arcId: "akatsuki-suppression",
      prompts: [
        {
          prompt: "How does Shikamaru’s plan compare to Kakashi’s style against stronger opponents?",
          response:
            "Kakashi is more adaptable mid-fight, but Shikamaru wins through preparation. This arc makes Shikamaru feel dangerous because he turns limited tools into a complete trap.",
        },
        {
          prompt: "Which ability is harder to deal with: Hidan’s ritual or Kakuzu’s multiple hearts?",
          response:
            "Hidan’s ritual is scarier once you understand it, but Kakuzu is harder to put down. One is a puzzle with deadly rules. The other is durability, range, and experience stacked together.",
        },
        {
          prompt: "Where does Shikamaru rank among Leaf shinobi after this arc?",
          response:
            "He jumps heavily in value. Not raw power, but battlefield impact. This arc proves he can shape an entire fight against stronger opponents if he has enough information.",
        },
        {
          prompt: "What part of this fight felt the most calculated?",
          response:
            "The strongest part is how Shikamaru separates the fight into pieces. He does not try to overpower the enemy. He isolates the problem he can solve.",
        },
        {
          prompt: "Which moment defines Shikamaru’s growth best?",
          response:
            "The defining moment is when grief becomes focus. He is still Shikamaru, but this arc shows he can carry emotional weight without freezing under it.",
        },
      ],
    },
    {
      arcId: "itachi-jiraiya-phase",
      prompts: [
        {
          prompt: "Which storyline hit harder: Itachi or Jiraiya?",
          response:
            "Jiraiya hits harder emotionally for a lot of viewers. Itachi hits harder in terms of mystery and long-term impact. The stretch works because both stories feel massive in different ways.",
        },
        {
          prompt: "How does Sasuke’s path compare to Naruto’s at this point?",
          response:
            "Naruto’s path is built around connection. Sasuke’s is built around cutting ties to sharpen one goal. That contrast is what makes their parallel feel tense.",
        },
        {
          prompt: "Which reveal or fight changed your read on the story most?",
          response:
            "The Itachi material changes how people read the Uchiha story. The Jiraiya material changes the emotional stakes of Akatsuki. Both make Shippuden feel much larger.",
        },
        {
          prompt: "Who feels more dangerous right now: Akatsuki as a group or Itachi alone?",
          response:
            "Akatsuki feels more dangerous as a system, but Itachi feels more dangerous in any individual scene. He changes the temperature of the story just by appearing.",
        },
        {
          prompt: "Which character feels hardest to fully understand?",
          response:
            "Itachi is the obvious answer because every scene around him carries unanswered weight. Sasuke is close because his choices make sense emotionally, even when they feel painful.",
        },
      ],
    },
    {
      arcId: "pain-arc",
      prompts: [
        {
          prompt: "Where does Pain rank among villains based on presence, power, and ideology?",
          response:
            "Pain is near the top because he has all three. He feels powerful, his presence is cold and controlled, and his ideology directly challenges Naruto instead of just threatening him.",
        },
        {
          prompt: "What part of Pain’s argument challenges Naruto the most?",
          response:
            "Pain forces Naruto to answer what peace actually means after loss. That is harder than winning a fight. Naruto cannot just say he wants peace; he has to carry the contradiction.",
        },
        {
          prompt: "Which Pain body felt the most threatening?",
          response:
            "The Deva Path feels the most threatening because it controls space and pace. Even before everything is explained, that ability makes the fight feel unfair.",
        },
        {
          prompt: "Where did the fight shift in Naruto’s favor?",
          response:
            "The shift comes when Naruto stops feeling like he is only surviving. Once he starts reading the abilities and forcing Pain to respond, the fight becomes more even.",
        },
        {
          prompt: "How does Naruto vs Pain compare to Naruto vs Gaara?",
          response:
            "Naruto vs Gaara is personal and emotional. Naruto vs Pain is ideological and symbolic. Both mirror Naruto, but Pain tests what Naruto believes at a much larger scale.",
        },
      ],
    },
    {
      arcId: "pain-aftermath",
      prompts: [
        {
          prompt: "How does Naruto’s standing in the village compare to earlier arcs?",
          response:
            "This is the biggest public shift for Naruto so far. Earlier, a few people believed in him. Here, the village’s view changes in a way that feels earned.",
        },
        {
          prompt: "Which reaction to Naruto felt most meaningful?",
          response:
            "The village reaction matters because it answers years of isolation. It is not just praise. It is recognition from the place that once rejected him.",
        },
        {
          prompt: "What part of the resolution feels strongest?",
          response:
            "The strongest part is Naruto choosing not to answer pain with revenge. Whether someone loves or debates the resolution, that choice is central to who he is.",
        },
        {
          prompt: "What part of the resolution feels most debatable?",
          response:
            "The most debated part is how quickly the emotional resolution lands after so much destruction. The idea is powerful, but fans often argue about the execution.",
        },
        {
          prompt: "What does this arc confirm about Naruto’s role going forward?",
          response:
            "It confirms Naruto is no longer just a promising ninja. He becomes someone the story treats as a moral center, not only a fighter.",
        },
      ],
    },
    {
      arcId: "five-kage-summit",
      prompts: [
        {
          prompt: "Where does Sasuke’s mindset land compared to his Part 1 version?",
          response:
            "Part 1 Sasuke was desperate. Five Kage Summit Sasuke feels consumed. The difference is that revenge is no longer something he is chasing; it is starting to shape his whole identity.",
        },
        {
          prompt: "Which Kage made the strongest first impression?",
          response:
            "The Raikage usually stands out immediately because of intensity and physical presence. The Mizukage and Onoki add a lot too, but the Raikage changes the room fastest.",
        },
        {
          prompt: "How does Danzo compare to earlier Leaf leaders?",
          response:
            "Danzo feels like the shadow version of Leaf leadership. He represents protection through control, secrecy, and sacrifice, which makes him very different from the Hokage ideal Naruto believes in.",
        },
        {
          prompt: "Which moment defines Sasuke’s shift the most?",
          response:
            "The clearest shift is when Sasuke starts feeling less reactive and more willing to burn everything around him. That is when his path feels more dangerous than tragic alone.",
        },
        {
          prompt: "What feels more dangerous now: Sasuke alone or the larger world conflict?",
          response:
            "The world conflict is bigger, but Sasuke feels more unstable. That makes him dangerous in a different way. He is not the largest threat, but he can change the direction of events fast.",
        },
      ],
    },
    {
      arcId: "war-setup",
      prompts: [
        {
          prompt: "Who feels most central heading into war: Naruto, Sasuke, or the Kage?",
          response:
            "Naruto feels most central emotionally, but the Kage control the immediate war structure. Sasuke hangs over everything because his role still feels unresolved.",
        },
        {
          prompt: "Which alliance feels the most unstable?",
          response:
            "The whole alliance feels fragile because the villages have long histories with each other. The tension is not whether they can stand together for a meeting, but whether they can fight together under pressure.",
        },
        {
          prompt: "Which matchup or encounter are you expecting to matter most?",
          response:
            "The strongest expectation is usually anything involving Naruto, Sasuke, or the masked threat behind the war. The setup makes those paths feel unavoidable.",
        },
        {
          prompt: "How does this scale compare to earlier conflicts?",
          response:
            "This is the largest scale so far. Earlier arcs centered on missions, villages, or personal battles. This setup turns the whole shinobi world into the battlefield.",
        },
        {
          prompt: "Which character feels least ready for what’s coming?",
          response:
            "A lot of characters feel emotionally unready, even if they are skilled. That is what makes the war tense. Strength alone does not guarantee someone is ready for this scale.",
        },
      ],
    },
    {
      arcId: "war-phase-1",
      prompts: [
        {
          prompt: "Which Edo Tensei return has the strongest impact so far?",
          response:
            "The strongest returns are the ones with unfinished emotional weight. Edo Tensei works best when it brings back more than power; it brings back old relationships and unresolved pain.",
        },
        {
          prompt: "How do the Allied Shinobi Forces compare to earlier squads like Team 7?",
          response:
            "The alliance feels less personal than Team 7, but that is the point. Team 7 was intimate. The Allied Forces show the story operating at a world-level scale.",
        },
        {
          prompt: "Which battlefield feels most meaningful to follow?",
          response:
            "The most meaningful battlefields are the ones tied to known characters. The war is huge, but it works best when the scale narrows around someone you already care about.",
        },
        {
          prompt: "Which returning character feels strongest compared to their original version?",
          response:
            "The reanimated characters can feel stronger because they remove normal limits. That changes how you read earlier reputations. Some legends feel more believable once you see them in this format.",
        },
        {
          prompt: "What part of the war format works best right now?",
          response:
            "The best part is seeing different generations and villages collide. The format can feel wide, but it gives the world history more texture.",
        },
      ],
    },
    {
      arcId: "war-phase-2",
      prompts: [
        {
          prompt: "Which reanimated shinobi feels hardest to handle strategically?",
          response:
            "The hardest ones are not just strong; they force emotional hesitation. Edo Tensei is dangerous because it attacks strategy and memory at the same time.",
        },
        {
          prompt: "How do Naruto’s clones change the battlefield?",
          response:
            "They make Naruto feel like a war resource, not just a fighter. His presence starts affecting multiple fronts, which changes how the alliance can fight.",
        },
        {
          prompt: "Which side character gains the most from this phase?",
          response:
            "This phase helps side characters who can show a clear specialty. The war gives them space to matter without needing to be on Naruto or Sasuke’s level.",
        },
        {
          prompt: "Where does this phase feel focused, and where does it feel scattered?",
          response:
            "It feels focused when the conflict ties back to known characters or clear matchups. It feels scattered when the battlefield expands faster than the emotional stakes can keep up.",
        },
        {
          prompt: "Which fight balances emotion and scale best?",
          response:
            "The best fights are the ones where the war scale supports a personal conflict. When both are present, the war feels meaningful instead of just large.",
        },
      ],
    },
    {
      arcId: "war-phase-5",
      prompts: [
        {
          prompt: "How does Madara’s presence compare to every villain before him?",
          response:
            "Madara feels different because the story treats him like history walking onto the battlefield. Pain felt ideological. Orochimaru felt sinister. Madara feels mythic.",
        },
        {
          prompt: "Which moment made Madara feel untouchable?",
          response:
            "The moment he starts overwhelming large groups without seeming pressed is what changes the scale. He does not feel like a normal opponent entering the war.",
        },
        {
          prompt: "How do the Kage stack up against Madara based on what you’ve seen?",
          response:
            "The Kage still feel impressive, but Madara changes the comparison. The fight makes the gap feel less like one strong shinobi vs another and more like the present facing a legend.",
        },
        {
          prompt: "What separates Madara from Pain as a threat?",
          response:
            "Pain challenges Naruto’s beliefs. Madara challenges the entire world’s ability to survive. Pain is philosophical pressure. Madara is historical and battlefield pressure.",
        },
        {
          prompt: "Which entrance or reveal changed the war’s energy most?",
          response:
            "Madara’s entrance is the big energy shift. It reframes the war from a huge conflict into something that suddenly feels much more dangerous and much older.",
        },
      ],
    },
    {
      arcId: "kakashi-anbu-arc",
      prompts: [
        {
          prompt: "How does this Kakashi compare to his Part 1 version?",
          response:
            "This Kakashi feels colder and more damaged. Part 1 Kakashi is guarded, but this arc gives more shape to why he carries himself that way.",
        },
        {
          prompt: "Which relationship shaped Kakashi the most here?",
          response:
            "The strongest answer is usually the relationship tied to loss and responsibility. Kakashi’s whole identity is shaped by what he survives and what he feels he failed to protect.",
        },
        {
          prompt: "What explains Kakashi’s leadership style best?",
          response:
            "His leadership makes more sense when you see how much he values teamwork because of what isolation and failure cost him. His rules are not abstract lessons.",
        },
        {
          prompt: "How does this tone compare to the main war arc?",
          response:
            "It feels darker and more personal. The war is large-scale chaos. This arc is quieter, but it gives emotional context to one of the series’ most important adults.",
        },
        {
          prompt: "Where does Kakashi rank for you after this context?",
          response:
            "This arc usually pushes Kakashi higher for people who already liked him. It adds weight without needing to make him louder or stronger.",
        },
      ],
    },
    {
      arcId: "war-phase-6",
      prompts: [
        {
          prompt: "How does Obito compare to Pain and Madara as a villain?",
          response:
            "Obito sits between them. Pain is ideology through suffering. Madara is overwhelming legend. Obito is personal tragedy turned into world-level damage.",
        },
        {
          prompt: "Which Obito moment changed your read on him most?",
          response:
            "The moments that connect Obito’s past to his present are what change the read. He becomes less of a mask and more of a warning about grief curdling into control.",
        },
        {
          prompt: "Where does Kakashi vs Obito rank among fights so far?",
          response:
            "It ranks high because it is not carried by scale alone. The choreography matters, but the emotional history underneath is what makes the fight stick.",
        },
        {
          prompt: "How does Naruto’s role here compare to earlier arcs?",
          response:
            "Naruto is no longer just proving himself. He is trying to pull others back from collapse. That is a much heavier role than winning or surviving.",
        },
        {
          prompt: "What part of Obito’s ideology stands out most?",
          response:
            "The most striking part is how his ideal world is built from refusal. He does not just want peace. He wants a reality where pain cannot touch him again.",
        },
      ],
    },
    {
      arcId: "war-phase-9",
      prompts: [
        {
          prompt: "Which late-war moment brought the momentum back?",
          response:
            "Momentum usually returns when the story narrows again around major characters and clear stakes. The war works best when the emotional center is obvious.",
        },
        {
          prompt: "Who feels most critical to the war’s outcome right now?",
          response:
            "Naruto remains central, but the outcome feels tied to multiple roles now. The late war is less about one person winning and more about whether everyone’s paths can converge.",
        },
        {
          prompt: "Which fight feels closest to a true climax?",
          response:
            "The fights that feel like a climax are the ones where history, power, and personal stakes overlap. Late-war Naruto works best when all three are present.",
        },
        {
          prompt: "How does Naruto’s growth show most clearly here?",
          response:
            "His growth shows in how many people he carries emotionally. Early Naruto wanted acknowledgment. Here, he becomes someone others lean on.",
        },
        {
          prompt: "Which character has the most to prove in this stretch?",
          response:
            "Sasuke often feels like the character with the most to prove, even when he is not the only focus. His choices still need to land next to Naruto’s growth.",
        },
      ],
    },
    {
      arcId: "itachi-shinden",
      prompts: [
        {
          prompt: "How does this version of Itachi compare to how you saw him earlier?",
          response:
            "This version is more human and less mythic. Earlier Itachi feels almost untouchable. This arc pulls him closer to the consequences of being a child inside adult decisions.",
        },
        {
          prompt: "Which moment best explains Itachi’s decisions?",
          response:
            "The strongest moments are the ones that show him weighing impossible outcomes too young. Whether someone agrees with him or not, the arc makes the burden clearer.",
        },
        {
          prompt: "Where does Itachi rank among the most complex characters?",
          response:
            "He ranks near the top because the story keeps forcing two reads at once. He can be tragic and still debatable. That tension is why fans keep arguing about him.",
        },
        {
          prompt: "What part of his story feels most tragic?",
          response:
            "The tragedy is how little childhood he gets. His intelligence becomes a weapon used by the world around him, and the cost is massive.",
        },
        {
          prompt: "How does this change your view of the Uchiha conflict?",
          response:
            "It makes the conflict feel less like a simple clan-village clash and more like a failure of leadership, fear, and impossible pressure.",
        },
      ],
    },
    {
      arcId: "final-battles-resume",
      prompts: [
        {
          prompt: "How do Naruto and Sasuke compare now in power and purpose?",
          response:
            "They feel closer in scale than ever, but different in purpose. Naruto’s power is tied to connection. Sasuke’s is tied to judgment and control.",
        },
        {
          prompt: "Which moment signals the true final stage of the story?",
          response:
            "The final stage starts when the war stops feeling like a battlefield arc and starts feeling like the series closing its biggest personal conflicts.",
        },
        {
          prompt: "Where does this stretch feel most focused compared to the war?",
          response:
            "It feels focused whenever Naruto and Sasuke’s paths return to the center. The war is huge, but the ending needs their conflict to anchor it.",
        },
        {
          prompt: "Which character feels most important besides Naruto and Sasuke?",
          response:
            "Kakashi often feels most important because he connects so many emotional threads. Sakura also matters because Team 7’s ending depends on more than Naruto and Sasuke alone.",
        },
        {
          prompt: "What part of the final buildup works best?",
          response:
            "The best part is the sense of convergence. So many old ideas return: bonds, revenge, loneliness, teamwork, and what power is supposed to protect.",
        },
      ],
    },
    {
      arcId: "ending-run",
      prompts: [
        {
          prompt: "Where does Naruto vs Sasuke rank among final anime battles?",
          response:
            "It ranks high because the fight is not only spectacle. It is the emotional thesis of the series. Every exchange carries years of rivalry, friendship, and disagreement.",
        },
        {
          prompt: "Which moment defines Naruto and Sasuke’s relationship most?",
          response:
            "The defining moments are the ones where they understand each other without fully agreeing. That is the core of their relationship: conflict, recognition, and refusal to let go.",
        },
        {
          prompt: "How does this ending compare to what you expected earlier?",
          response:
            "The ending feels bigger than Part 1 promised, but the emotional core is the same. Naruto still wants to reach someone everyone else thinks is lost.",
        },
        {
          prompt: "Which character arc feels most complete by the end?",
          response:
            "Naruto’s arc feels the most complete because the series begins with isolation and ends with him fully seen. Sasuke’s arc feels more like a painful return than a simple resolution.",
        },
        {
          prompt: "What part of the ending carries the most weight?",
          response:
            "The most weight comes from how quiet some of the final emotional beats are. After so much scale, the ending lands because it returns to Naruto and Sasuke as people.",
        },
      ],
    },
    {
      arcId: "movie-the-last",
      prompts: [
        {
          prompt: "Where does The Last fit in the overall story?",
          response:
            "The Last works best as a bridge. It is not the emotional ending of Naruto and Sasuke’s conflict, but it helps move the world into the next era.",
        },
        {
          prompt: "Which relationship worked best in the movie?",
          response:
            "The central relationship is the focus, but the movie also works because it shows the cast in a different life stage. That shift gives it a distinct feel from the series.",
        },
        {
          prompt: "How did this bridge Naruto into the next era?",
          response:
            "It shows Naruto after the central conflict has ended, which changes the tone. The story is less about proving himself and more about what his future looks like.",
        },
        {
          prompt: "What felt most different from the other movies?",
          response:
            "It feels more connected to the main story than the earlier movies. The placement matters, and the character direction has more weight because of where it sits.",
        },
        {
          prompt: "Which character moment made this feel canon?",
          response:
            "The moments that connect directly to Naruto’s future make it feel canon. It is not just a side adventure; it fills in emotional space after the series’ main ending.",
        },
      ],
    },
    {
      arcId: "konoha-hiden",
      prompts: [
        {
          prompt: "Which final character moment felt most satisfying?",
          response:
            "The most satisfying moments are the small ones. After so much war and conflict, seeing characters in a lighter space gives the ending room to breathe.",
        },
        {
          prompt: "How did the lighter tone work after everything?",
          response:
            "The lighter tone works because it feels earned. The story spent so long in pain, loss, and war that a softer final stretch gives the audience release.",
        },
        {
          prompt: "What made this feel like closure?",
          response:
            "It feels like closure because the focus shifts from survival to life after the journey. That is important for Naruto as a story about connection.",
        },
        {
          prompt: "Which friendship or relationship landed best?",
          response:
            "The best moments are the ones that make the old cast feel lived-in. You can feel the history without needing a huge dramatic scene.",
        },
        {
          prompt: "Where does this feel like the true final stop?",
          response:
            "It feels like the final stop because it lets the world settle. The big conflicts are over, and the story leaves you with community instead of another battle.",
        },
      ],
    },
  ];