'use strict';

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let resultSchema = new mongoose.Schema({
    name: String,
    email: String,
    scores: {
        adjectives: Number,
        adverbs: Number,
        conditional_sentences: Number,
        conjunctions: Number,
        future: Number,
        modal_verbs: Number,
        nouns: Number,
        passive: Number,
        past: Number,
        possession: Number,
        prefixes_and_suffixes: Number,
        prepositions: Number,
        present: Number,
        pronouns: Number,
        questions: Number,
        verbs: Number
    },
    percentages: {
        adjectives: Number,
        adverbs: Number,
        conditional_sentences: Number,
        conjunctions: Number,
        future: Number,
        modal_verbs: Number,
        nouns: Number,
        passive: Number,
        past: Number,
        possession: Number,
        prefixes_and_suffixes: Number,
        prepositions: Number,
        present: Number,
        pronouns: Number,
        questions: Number,
        verbs: Number
    },
    problems: {
        adjectives: Boolean,
        adverbs: Boolean,
        conditional_sentences: Boolean,
        conjunctions: Boolean,
        future: Boolean,
        modal_verbs: Boolean,
        nouns: Boolean,
        passive: Boolean,
        past: Boolean,
        possession: Boolean,
        prefixes_and_suffixes: Boolean,
        prepositions: Boolean,
        present: Boolean,
        pronouns: Boolean,
        questions: Boolean,
        verbs: Boolean
    },
    total_score: Number,
    total_percentage: Number,
    recommendation: String
})

let Result = mongoose.model("Result", resultSchema);

// For clearing the database
/*Result.remove((err) => {
  console.log( "Database cleared" );
});*/

module.exports = function (app) {
    app.route('/check').post((req, res) => {
        let name = req.body.name;
        let email = req.body.email;
        let allQuestions = [
            req.body.question1, req.body.question2, req.body.question3, req.body.question4, req.body.question5,
            req.body.question6, req.body.question7, req.body.question8, req.body.question9, req.body.question10,
            req.body.question11, req.body.question12, req.body.question13, req.body.question14, req.body.question15,
            req.body.question16, req.body.question17, req.body.question18, req.body.question19, req.body.question20,
            req.body.question21, req.body.question22, req.body.question23, req.body.question24, req.body.question25,
            req.body.question26, req.body.question27, req.body.question28, req.body.question29, req.body.question30,
            req.body.question31, req.body.question32, req.body.question33, req.body.question34, req.body.question35
        ];
        let scores = {
            adjectives: 0, adverbs: 0, conditional_sentences: 0, conjunctions: 0,
            future: 0, modal_verbs: 0, nouns: 0, passive: 0,
            past: 0, possession: 0, prefixes_and_suffixes: 0, prepositions: 0,
            present: 0, pronouns: 0, questions: 0, verbs: 0
        };
        let percentages = {
            adjectives: 0, adverbs: 0, conditional_sentences: 0, conjunctions: 0,
            future: 0, modal_verbs: 0, nouns: 0, passive: 0,
            past: 0, possession: 0, prefixes_and_suffixes: 0, prepositions: 0,
            present: 0, pronouns: 0, questions: 0, verbs: 0
        };
        let problems = {
            adjectives: false, adverbs: false, conditional_sentences: false, conjunctions: false,
            future: false, modal_verbs: false, nouns: false, passive: false,
            past: false, possession: false, prefixes_and_suffixes: false, prepositions: false,
            present: false, pronouns: false, questions: false, verbs: false
        };
        let total_score = 0;
        let total_percentage = 0;
        let recommendation = '';
        
        allQuestions.forEach(each => {
            switch (each) {
                case 'adj':
                    scores.adjectives += 1;
                    total_score += 1;
                    break;
                case 'adv':
                    scores.adverbs += 1;
                    total_score += 1;
                    break;
                case 'cond':
                    scores.conditional_sentences += 1;
                    total_score += 1;
                    break;
                case 'conj':
                    scores.conjunctions += 1;
                    total_score += 1;
                    break;
                case 'fu':
                    scores.future += 1;
                    total_score += 1;
                    break;
                case 'mod':
                    scores.modal_verbs += 1;
                    total_score += 1;
                    break;
                case 'n':
                    scores.nouns += 1;
                    total_score += 1;
                    break;
                case 'pass':
                    scores.passive += 1;
                    total_score += 1;
                    break;
                case 'past':
                    scores.past += 1;
                    total_score += 1;
                    break;
                case 'poss':
                    scores.possession += 1;
                    total_score += 1;
                    break;
                case 'pref':
                    scores.prefixes_and_suffixes += 1;
                    total_score += 1;
                    break;
                case 'prep':
                    scores.prepositions += 1;
                    total_score += 1;
                    break;
                case 'pres':
                    scores.present += 1;
                    total_score += 1;
                    break;
                case 'pron':
                    scores.pronouns += 1;
                    total_score += 1;
                    break;
                case 'ques':
                    scores.questions += 1;
                    total_score += 1;
                    break;
                case 'v':
                    scores.verbs += 1;
                    total_score += 1;
            }
        })

        percentages.adjectives = Math.round(((scores.adjectives * 100 / 2) + Number.EPSILON) * 100) / 100;
        percentages.adverbs = Math.round(((scores.adverbs * 100 / 2) + Number.EPSILON) * 100) / 100;
        percentages.conditional_sentences = Math.round(((scores.conditional_sentences * 100 / 2) + Number.EPSILON) * 100) / 100;
        percentages.conjunctions = Math.round(((scores.conjunctions * 100 / 2) + Number.EPSILON) * 100) / 100;
        percentages.future = Math.round(((scores.future * 100 / 3) + Number.EPSILON) * 100) / 100;
        percentages.modal_verbs = Math.round(((scores.modal_verbs * 100 / 2) + Number.EPSILON) * 100) / 100;
        percentages.nouns = Math.round(((scores.nouns * 100 / 2) + Number.EPSILON) * 100) / 100;
        percentages.passive = Math.round(((scores.passive * 100 / 2) + Number.EPSILON) * 100) / 100;
        percentages.past = Math.round(((scores.past * 100 / 3) + Number.EPSILON) * 100) / 100;
        percentages.possession = Math.round(((scores.possession * 100 / 2) + Number.EPSILON) * 100) / 100;
        percentages.prefixes_and_suffixes = Math.round(((scores.prefixes_and_suffixes * 100 / 2) + Number.EPSILON) * 100) / 100;
        percentages.prepositions = Math.round(((scores.prepositions * 100 / 2) + Number.EPSILON) * 100) / 100;
        percentages.present = Math.round(((scores.present * 100 / 3) + Number.EPSILON) * 100) / 100;
        percentages.pronouns = Math.round(((scores.pronouns * 100 / 2) + Number.EPSILON) * 100) / 100;
        percentages.questions = Math.round(((scores.questions * 100 / 2) + Number.EPSILON) * 100) / 100;
        percentages.verbs = Math.round(((scores.verbs * 100 / 2) + Number.EPSILON) * 100) / 100;
        total_percentage = Math.round(((total_score * 100 / 35) + Number.EPSILON) * 100) / 100;

        for (const key in scores) {
            if (scores[key] <= 1) {
                problems[key] = true;
            }
        }

        if ((total_score <= 15) || ((total_score > 15) && (scores.present < 2 || scores.past < 1 || scores.future < 1 || scores.possession < 1))) {
            recommendation = 'Basic Grammar';
        } else if (((total_score > 15 && total_score <= 30) && scores.present >= 2 && scores.past >= 1 && scores.future >= 1 && scores.possession >= 1) || (total_score > 30 && (scores.present < 2 || scores.past < 2 || scores.future < 2 || scores.adjectives < 2 || scores.adverbs < 2 || scores.conditional_sentences < 2 || scores.conjunctions < 2 || scores.modal_verbs < 2 || scores.nouns < 2 || scores.passive < 2 || scores.possession < 2 || scores.prefixes_and_suffixes < 2 || scores.prepositions < 2 || scores.pronouns < 2 || scores.questions < 2 || scores.verbs < 2))) {
            recommendation = 'Intermediate Grammar';
        } else if ((total_score > 30) && scores.present >= 2 && scores.past >= 2 && scores.future >= 2 && scores.adjectives == 2 && scores.adverbs == 2 && scores.conditional_sentences == 2 && scores.conjunctions == 2 && scores.modal_verbs == 2 && scores.nouns == 2 && scores.passive == 2 && scores.possession == 2 && scores.prefixes_and_suffixes == 2 && scores.prepositions == 2 && scores.pronouns == 2 && scores.questions == 2 && scores.verbs == 2) {
            recommendation = 'High Scorer';
        }

        Result.create({name, email, scores, percentages, problems, total_score, total_percentage, recommendation}, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/' + data._id);
            }
        });
    })

    app.route('/api/:_id').get((req, res) => {
        let id = req.params._id;

        Result.findById(id, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                let html = `
                    <div class="result">
                        <h3 style="color: #85775a;"><strong>ผลการทดสอบ</strong></h3>
                    </div>
                `;
                
                if (data.problems.adjectives) {
                    html += `
                        <div class="result">
                            <div style="color: #85775a;"><strong>ปัญหาไวยากรณ์ภาษาอังกฤษของท่านที่พบ มีหัวข้อดังต่อไปนี้:</strong></div>
                        </div>
                        <br/>
                    `;
                }

                if (data.problems.adjectives) {
                    html += `
                        <div class="result">
                            <h4><strong>Adjectives</strong></h4>
                            <div>Adjectives (คำคุณศัพท์ [ใช้ขยายคำถาม]) ซึ่งประกอบด้วยหัวข้อ:</div>
                            <ul>
                                <li>Comparative Adjectives (คำคุณศัพท์ขั้นกว่า)</li>
                                <li>Superlative Adjectives (คำคุณศัพท์ขั้นสูงสุด)</li>
                                <li>Gradable and Non-Gradable Adjectives (คำคุณศัพท์ที่สามารถระบุระดับได้และไม่สามารถระบุระดับได้)</li>
                                <li>Two Comparatives Together (การใช้คำคุณศัพท์ขั้นกว่าสองคำด้วยกัน)</li>
                                <li>“As… as” Comparisons (การเปรียบเทียบโดยใช้ “as… as”)</li>
                            </ul>
                            <img class="img-fluid" src="https://online.prinenglish.com/wp-content/uploads/2019/11/Grammar-Pre-Test-Adjectives.jpg" />
                        </div>
                        <br/>
                    `;
                }

                if (data.problems.adverbs) {
                    html += `
                        <div class="result">
                            <h4><strong>Adverbs</strong></h4>
                            <div>Adverbs (คำวิเศษณ์ [ใช้ขยายคำกริยา คำคุณศัพท์ และคำวิเศษณ์อื่น ๆ]) ซึ่งประกอบด้วยหัวข้อ:</div>
                            <ul>
                                <li>Adverbs of Manner (คำวิเศษณ์)</li>
                                <li>Comparative and Superlative Adverbs (คำวิเศษณ์ขั้นกว่าและขั้นสูงสุด)</li>
                                <li>Adverbs of Degree (คำวิเศษณ์บอกระดับ)</li>
                                <li>Adverbs of Time (คำวิเศษณ์บอกเวลา)</li>
                                <li>Adverbs of Frequency (คำวิเศษณ์บอกความถี่)</li>
                            </ul>
                            <img class="img-fluid" src="https://online.prinenglish.com/wp-content/uploads/2019/11/Grammar-Pre-Test-Adverbs.jpg" />
                        </div>
                        <br/>
                    `;
                }

                if (data.problems.conditional_sentences) {
                    html += `
                        <div class="result">
                            <h4><strong>Conditional Sentences</strong></h4>
                            <div>Conditional Sentences (ประโยคเงื่อนไข)</div>
                            <img class="img-fluid" src="https://online.prinenglish.com/wp-content/uploads/2019/11/Grammar-Pre-Test-Conditional-Sentences.jpg" />
                        </div>
                        <br/>
                    `;
                }

                if (data.problems.conjunctions) {
                    html += `
                        <div class="result">
                            <h4><strong>Conjunctions</strong></h4>
                            <div>Conjunctions (คำเชื่อม) ซึ่งประกอบด้วยหัวข้อ:</div>
                            <ul>
                                <li>Coordinating Conjunctions (คำเชื่อมประโยค)</li>
                                <li>Subordinating Conjunctions (คำเชื่อมประโยคประเภทให้ความสำคัญไม่เท่ากัน)</li>
                            </ul>
                            <img class="img-fluid" src="https://online.prinenglish.com/wp-content/uploads/2019/11/Grammar-Pre-Test-Conjunctions.jpg" />
                        </div>
                        <br/>
                    `;
                }

                if (data.problems.future) {
                    html += `
                        <div class="result">
                            <h4><strong>Future</strong></h4>
                            <div>Future (การพูดถึงอนาคต) ซึ่งประกอบด้วยหัวข้อ:</div>
                            <ul>
                                <li>Future (“going to”) (การพูดถึงอนาคตโดยใช้ “going to”)</li>
                                <li>Future (“will”) (การพูดถึงอนาคตโดยใช้ “will”)</li>
                                <li>Future (Present Tenses) (การพูดถึงอนาคตโดยใช้กาลปัจจุบัน)</li>
                                <li>Future Continuous (การพูดถึงอนาคตแบบต่อเนื่อง)</li>
                                <li>Future Perfect (การพูดถึงเหตุการณ์ที่จะเกิดขึ้นไปแล้วในอนาคต)</li>
                            </ul>
                            <img class="img-fluid" src="https://online.prinenglish.com/wp-content/uploads/2019/11/Grammar-Pre-Test-Future.jpg" />
                        </div>
                        <br/>
                    `;
                }

                if (data.problems.modal_verbs) {
                    html += `
                        <div class="result">
                            <h4><strong>Modal Verbs</strong></h4>
                            <div>Modal Verbs (คำกริยาช่วยประเภท modal) ซึ่งประกอบด้วยหัวข้อ:</div>Countable
                            <ul>
                                <li>Ability (ความสามารถ)</li>
                                <li>Permission, Requests and Offers (การอนุญาต การขอ และการเสนอ)</li>
                                <li>Suggestions and Advice (ข้อเสนอแนะและคำแนะนำ)</li>
                                <li>Obligations (หน้าที่/สิ่งที่ต้องทำ)</li>
                                <li>Making Deductions (การอนุมาน)</li>
                                <li>Possibility (ความเป็นไปได้)</li>
                            </ul>
                            <img class="img-fluid" src="https://online.prinenglish.com/wp-content/uploads/2019/11/Grammar-Pre-Test-Modal-Verbs.jpg" />
                        </div>
                        <br/>
                    `;
                }

                if (data.problems.nouns) {
                    html += `
                        <div class="result">
                            <h4><strong>Nouns</strong></h4>
                            <div>Nouns (คำนาม) ซึ่งประกอบด้วยหัวข้อ:</div>
                            <ul>
                                <li>Singular and Plural Nouns (คำนามเอกพจน์และพหูพจน์)</li>
                                <li>Countable and Uncountable Nouns (คำนามนับได้และนับไม่ได้)</li>
                                <li>Subject-Verb Agreement (ความสัมพันธ์ระหว่างประธานและคำกริยา)</li>
                                <li>Abstract and Concrete Nouns (คำนามประเภทนามธรรมและประเภทรูปธรรม)</li>
                                <li>Compound Nouns (คำนามประสม)</li>
                            </ul>
                            <img class="img-fluid" src="https://online.prinenglish.com/wp-content/uploads/2019/11/Grammar-Pre-Test-Nouns.jpg" />
                        </div>
                        <br/>
                    `;
                }

                if (data.problems.passive) {
                    html += `
                        <div class="result">
                            <h4><strong>Passive</strong></h4>
                            <div>Passive (รูปแบบแสดงการถูกกระทำ) ซึ่งประกอบด้วยหัวข้อ:</div>
                            <ul>
                                <li>Passive in the Past (รูปแบบแสดงการถูกกระทำในปัจจุบัน)</li>
                                <li>Passive in the Past (รูปแบบแสดงการถูกกระทำในอดีต)</li>
                                <li>Passive in the Future (รูปแบบแสดงการถูกกระทำในอนาคต)</li>
                            </ul>
                            <img class="img-fluid" src="https://online.prinenglish.com/wp-content/uploads/2019/11/Grammar-Pre-Test-Passive.jpg" />
                        </div>
                        <br/>
                    `;
                }

                if (data.problems.past) {
                    html += `
                        <div class="result">
                            <h4><strong>Past</strong></h4>
                            <div>Past (การพูดถึงอดีต) ซึ่งประกอบด้วยหัวข้อ:</div>
                            <ul>
                                <li>Past Simple (การพูดถึงอดีต)</li>
                                <li>Past Simple Negative (การพูดถึงอดีตในรูปแบบปฏิเสธ)</li>
                                <li>Past Simple Questions (การพูดถึงอดีตในรูปแบบคำถาม)</li>
                                <li>Past Continuous (การพูดถึงอดีตแบบต่อเนื่อง)</li>
                                <li>Past Perfect Simple (การพูดถึงอดีตของอดีต)</li>
                                <li>Past Perfect Continuous (การพูดถึงอดีตของอดีตแบบต่อเนื่อง)</li>
                                <li>“Used to” and “would” (การพูดถึงอดีตโดยใช้ “used to” และ “would”)</li>
                            </ul>
                            <img class="img-fluid" src="https://online.prinenglish.com/wp-content/uploads/2019/11/Grammar-Pre-Test-Past.jpg" />
                        </div>
                        <br/>
                    `;
                }

                if (data.problems.possession) {
                    html += `
                        <div class="result">
                            <h4><strong>Possession</strong></h4>
                            <div>Possession (การแสดงความเป็นเจ้าของ)</div>
                            <img class="img-fluid" src="https://online.prinenglish.com/wp-content/uploads/2019/11/Grammar-Pre-Test-Possession.jpg" />
                        </div>
                        <br/>
                    `;
                }

                if (data.problems.prefixes_and_suffixes) {
                    html += `
                        <div class="result">
                            <h4><strong>Prefixes and Suffixes</strong></h4>
                            <div>Prefixes and Suffixes (คำนำหน้าคำศัพท์และคำต่อท้ายคำศัพท์)</div>
                            <img class="img-fluid" src="https://online.prinenglish.com/wp-content/uploads/2019/11/Grammar-Pre-Test-Prefixes-and-Suffixes.jpg" />
                        </div>
                        <br/>
                    `;
                }

                if (data.problems.prepositions) {
                    html += `
                        <div class="result">
                            <h4><strong>Prepositions</strong></h4>
                            <div>Prepositions (คำบุพบท [ใช้แสดงความสัมพันธ์ระหว่างสองส่วนของประโยค]) ซึ่งประกอบด้วยหัวข้อ:</div>
                            <ul>
                                <li>Prepositions of Place (คำบุพบทบอกตำแหน่งและสถานที่)</li>
                                <li>Prepositions of Time (คำบุพบทบอกเวลา)</li>
                                <li>Other Prepositions (คำบุพบทอื่น ๆ)</li>
                            </ul>
                            <img class="img-fluid" src="https://online.prinenglish.com/wp-content/uploads/2019/11/Grammar-Pre-Test-Prepositions.jpg" />
                        </div>
                        <br/>
                    `;
                }

                if (data.problems.present) {
                    html += `
                        <div class="result">
                            <h4><strong>Present</strong></h4>
                            <div>Present (การพูดถึงปัจจุบัน) ซึ่งประกอบด้วยหัวข้อ:</div>
                            <ul>
                                <li>Present Simple (การพูดถึงปัจจุบัน)</li>
                                <li>Present Simple Negative (การพูดถึงปัจจุบันในรูปแบบปฏิเสธ)</li>
                                <li>Present Simple Questions (การพูดถึงปัจจุบันในรูปแบบคำถาม)</li>
                                <li>Present Continuous (การพูดถึงปัจจุบันแบบต่อเนื่อง)</li>
                                <li>Present Perfect Simple (การพูดถึงอดีตส่งผลถึงปัจจุบัน)</li>
                                <li>Present Perfect Continuous (การพูดถึงอดีตส่งผลถึงปัจจุบันแบบต่อเนื่อง)</li>
                                <li>Imperatives (ประโยคคำสั่ง)</li>
                            </ul>
                            <img class="img-fluid" src="https://online.prinenglish.com/wp-content/uploads/2019/11/Grammar-Pre-Test-Present.jpg" />
                        </div>
                        <br/>
                    `;
                }

                if (data.problems.pronouns) {
                    html += `
                        <div class="result">
                            <h4><strong>Pronouns</strong></h4>
                            <div>Pronouns (คำสรรพนาม) ซึ่งประกอบด้วยหัวข้อ:</div>
                            <ul>
                                <li>Personal Pronouns (คำสรรพนามใช้กล่าวแทนตัวบุคคล)</li>
                                <li>Reflexive Pronouns (คำสรรพนามสะท้อนกลับไปหาผู้กระทำ)</li>
                                <li>Indefinite Pronouns (คำสรรพนามไม่ชี้เฉพาะเจาะจง)</li>
                            </ul>
                            <img class="img-fluid" src="https://online.prinenglish.com/wp-content/uploads/2019/11/Grammar-Pre-Test-Pronouns.jpg" />
                        </div>
                        <br/>
                    `;
                }

                if (data.problems.questions) {
                    html += `
                        <div class="result">
                            <h4><strong>Questions</strong></h4>
                            <div>Questions (คำถาม) ซึ่งประกอบด้วยหัวข้อ:</div>
                            <ul>
                                <li>Forming Questions (การสร้างคำถาม)</li>
                                <li>Question Words (คำที่ใช้เริ่มต้นคำถาม)</li>
                                <li>Open Questions (คำถามปลายเปิด)</li>
                                <li>Object and Subject Questions (คำถามประเภทกรรมและประเภทประธาน)</li>
                                <li>Indirect Questions (คำถามเชิงอ้อม)</li>
                            </ul>
                            <img class="img-fluid" src="https://online.prinenglish.com/wp-content/uploads/2019/11/Grammar-Pre-Test-Questions.jpg" />
                        </div>
                        <br/>
                    `;
                }

                if (data.problems.verbs) {
                    html += `
                        <div class="result">
                            <h4><strong>Verbs</strong></h4>
                            <div>Verbs (คำกริยา) ซึ่งประกอบด้วยหัวข้อ:</div>
                            <ul>
                                <li>Types of Verbs (ประเภทของคำกริยา)</li>
                                <li>Action and State Verbs (คำกริยาประเภทแสดงการกระทำและประเภทแสดงสถานะ)</li>
                                <li>Infinitives and Participles (รูปแบบพื้นฐานของคำกริยา คำกริยาที่ลงท้ายด้วย -ing และคำกริยาช่องที่สาม)</li>
                                <li>Verb Patterns (คำกริยาที่ตามด้วยรูปแบบพื้นฐานของคำกริยาและ/หรือคำกริยาที่ลงท้ายด้วย -ing)</li>
                            </ul>
                            <img class="img-fluid" src="https://online.prinenglish.com/wp-content/uploads/2019/11/Grammar-Pre-Test-Verbs.jpg" />
                        </div>
                        <br/>
                    `;
                }
                
                let ajPrin1 = `
                    <img class="img-fluid" src="https://149809094.v2.pressablecdn.com/wp-content/uploads/2019/11/Prin-for-Pre-Test.jpg">
                    <br/><br/>
                    <p><i class="fas fa-bullhorn fa-2xl icons"></i></p>
                    <h3 style="color: #85775a;"><strong>อ.ปริญญ์ ขอแนะนำ</strong></h3>
                    <p><strong>ก่อนอื่น… ไวยากรณ์คืออะไร</strong></p>
                    <p>ไวยากรณ์ หรือแกรมม่า (grammar) คือ กฎเกณฑ์ พื้นฐาน และวิชาหลักภาษาว่าด้วยเรื่องอักษร คำวลี ประโยค และส่วนประกอบอื่น ๆ เช่น การประสมคำ และการตีความ ซึ่งประกอบกันเข้าตามระเบียบแบบแผนของภาษาครับ</p>
                    <p><strong>ไวยากรณ์สำคัญอย่างไร</strong></p>
                    <p>ไวยากรณ์เป็นรากฐานของภาษา ซึ่งการจะใช้ภาษาอังกฤษได้อย่างถูกต้อง เราจะต้องทำความเข้าใจหลักไวยากรณ์ครับ ซึ่งพื้นฐานที่สำคัญนี้จะช่วยให้เราสามารถต่อยอด-ทำความเข้าใจสิ่งที่เราฟังและอ่านได้อย่างแม่นยำ รวมไปถึงทำให้เราสามารถพูดและเขียนเพื่อสื่อสารให้ผู้ฟังและผู้อ่านเข้าใจเราได้อย่างชัดเจน หากเราขาดรากฐานที่สำคัญนี้ ก็จะไม่สามารถเข้าใจโครงสร้างต่าง ๆ ในประโยค และไม่สามารถใช้ภาษาอังกฤษอย่างเป็นธรรมชาติ ส่งผลต่อทักษะการฟัง-พูด-อ่าน-เขียนของเราได้ครับ</p>
                    <p><i class="fas fa-check-double fa-2xl icons"></i></p>
                    <h5 style="color: #85775a;"><strong>จากผลคะแนนการทำแบบทดสอบของท่าน</strong></h5>
                `;

                let ajPrin2 = `
                    <p>นอกจากนี้ อาจารย์ขอแนะนำว่า การเรียนรู้เกิดขึ้นได้ทุกที่-ทุกเวลา ท่านควรหมั่นหาความรู้สนุก ๆ เพิ่มเติมนอกการเรียนครับ เช่น ดูหนัง ฟังเพลง อ่านหนังสือ อ่านบทความที่เราชอบ เพราะสิ่งเหล่านี้ก็จะคอยเป็นตัวช่วยสำคัญที่จะทำให้เกิดความคุ้นเคยกับภาษาอังกฤษ เสริมการเรียนรู้และพัฒนาทักษะภาษาของเราได้อย่างต่อเนื่องและดีเยี่ยมควบคู่ไปกับการเรียนครับ สุดท้ายนี้ <span style="color: #85775a;"><strong>อาจารย์ขอฝากให้ทุกท่านอย่าลืมใส่ความสุขเข้าไปในการเรียนรู้ในครั้งนี้ด้วยนะครับ</strong></span></p>
                    <p><span style="color: #85775a;"><strong>- อ.ปริญญ์ PrinEnglish</strong></span><br/>
                    “LEARNING HAPPENS EVERYWHERE<br/>
                    BE PART OF THE EXPERIENCE”</p>
                `;

                let contact = `
                    <p><span style="color: #85775a;"><strong>สอบถามเพิ่มเติม</strong></span><br/>
                    Line: @PrinEnglish<br/>
                    Facebook Page: PrinEnglish<br/>
                    E-mail: prinenglishonline@gmail.com</p>
                `;

                let retry = `
                    <a href="https://prinenglish.com/" type="button" class="btn btn-primary gold">ทำแบบทดสอบอีกครั้ง</a>
                `;

                if (data.recommendation == 'Basic Grammar') {
                    html += `
                        <div class="result">
                            <h4><strong>Basic Grammar</strong></h4>
                            ${ajPrin1}
                            <p>อาจารย์พบจุดอ่อนของท่านตามหัวข้อข้างบน โดยรวมแล้วท่านควรปรับปรุงทักษะไวยากรณ์ภาษาอังกฤษในระดับพื้นฐานครับ ซึ่งการพัฒนาพื้นฐานไวยากรณ์ภาษาอังกฤษผ่านหลักสูตรที่มีมาตรฐาน และมีผู้สอนที่มีหลักการและการถ่ายทอดการสอนที่ถูกวิธี มีประสบการณ์ในการสอนที่หลากหลาย มีความเข้าใจพื้นฐานลักษณะผู้เรียน และเข้าใจในหลักไวยากรณ์ภาษาอังกฤษอย่างเชี่ยวชาญและถ่องแท้ จะเป็นวิธีที่สามารถช่วยให้ท่านพัฒนา-แก้ไขปัญหาด้านภาษาของท่านได้ และยังช่วยทำให้ท่านสามารถนำไปประยุกต์ใช้ในทุกสถานการณ์และทุกทักษะ ทั้งฟัง-พูด-อ่าน-เขียน ต่อยอดด้วยตนเองได้ครับ</p>
                            <p><i class="fas fa-comment-dots fa-2xl icons"></i></p>
                            <h5 style="color: #85775a;"><strong>อาจารย์ขออนุญาตแนะนำหลักสูตร Basic Grammar ของ PrinEnglish ครับ</strong></h5>
                            <h5 style="color: #85775a;"><strong>หลักสูตรนี้:</strong></h5>
                            <ul>
                                <li>สามารถเข้าเรียน-ทบทวน-ย้อนดูได้ไม่จำกัด ตลอดอายุหลักสูตรที่ยาวนาน เพียงพอต่อการเรียนรู้ที่เหมาะสมของผู้เรียน</li>
                                <li>มีการสอนที่ละเอียดและเข้าใจง่าย พร้อมแบบฝึกหัดที่หลากหลายให้ผู้เรียนได้ฝึกฝนลงมือทำทันทีหลังเรียนจบแต่ละบทเรียน ซึ่งสำคัญอย่างยิ่งในการฝึกฝนพัฒนาทักษะของผู้เรียนในระดับนี้</li>
                                <li>มีระบบแบบฝึกหัดที่รวมผลคะแนนอัตโนมัติ พร้อมเฉลยข้อถูกผิดให้ผู้เรียนทราบทันที</li>
                                <li>มีวิดีโอเฉลยแบบฝึกหัดที่ผู้เรียนได้ทำไปในทุก ๆ ข้อ พร้อมอธิบายเหตุผลของคำตอบ-ที่มาที่ไปอย่างละเอียดโดย อ.ปริญญ์ เสริมสร้างฐานและความเข้าใจให้ผู้เรียนอย่างแม่นยำ แข็งแกร่ง และมั่นคง</li>
                                <li>ในระหว่างการเรียน ผู้เรียนสามารถสอบถามข้อสงสัยต่าง ๆ จากการเรียน และปัญหาที่พบได้ตลอดเวลา พร้อมตอบคำถามโดยตรงจากอาจารย์และทีมงานที่คอยสนับสนุนผู้เรียน</li>
                            </ul>
                            <p><i class="fas fa-thumbs-up fa-2xl icons"></i></p>
                            <h5 style="color: #85775a;"><strong>หลักสูตรนี้ เหมาะสำหรับผู้ที่:</strong></h5>
                            <ul>
                                <li>ไม่มีพื้นฐานภาษาอังกฤษ พื้นฐานไม่ดี ไม่เข้าใจหลักไวยากรณ์ หรือต้องการรื้อ-ปรับ-ทบทวนไวยากรณ์ระดับพื้นฐานใหม่อีกครั้ง</li>
                                <li>ต้องการให้มีผู้สอนคอยชี้แนะ ถ่ายทอดการสอน มอบความเข้าใจที่ถูกต้อง แบบกระชับ ชัดเจน และเข้าใจง่าย</li>
                                <li>ต้องการแก้ไขปัญหาการใช้ภาษาไม่ถูกต้องตามหลักไวยากรณ์ เช่น เรื่องความสับสนหรือไม่แน่ใจในการเลือกใช้ tenses และการกล่าวถึงอดีต-ปัจจุบัน-อนาคต เพื่อพัฒนาไปสู่การสื่อสารและทักษะฟัง-พูด-อ่านเขียนที่เข้าใจความหมายและใจความได้ดีและเป็นมืออาชีพยิ่งขึ้น</li>
                                <li>ต้องการมีพื้นฐานเพื่อพัฒนาไปสู่การทำข้อสอบมาตรฐาน เช่น TOEIC, IELTS, TOEFL iBT รวมไปถึงการเตรียมสอบชิงทุน สอบเข้ามหาวิทยาลัย สอบรายวิชาในโรงเรียน-มหาวิทยาลัย และข้อสอบเฉพาะทางอื่น ๆ ที่ใช้ความรู้ภาษาอังกฤษที่ถูกต้องเป็นพื้นฐาน</li>
                                <li>ต้องการพัฒนาต่อในการเขียน เช่น การเขียนเชิงวิชาการ (เรียงความ รายงาน วิทยานิพนธ์ abstract จดหมาย บทความ เขียนใน writing part ของข้อสอบต่าง ๆ เขียนสอบชิงทุน) และการเขียนเชิงสร้างสรรค์</li>
                            </ul>
                            <p><i class="fas fa-thumbtack fa-2xl icons"></i></p>
                            <h5 style="color: #85775a;"><strong>หัวข้อที่สอนในหลักสูตร Basic Grammar ของ PrinEnglish อาทิเช่น:</strong></h5>
                            <ul>
                                <li>Present Tenses, Past Tenses and Future (การพูดถึงปัจจุบัน อดีต และอนาคต)</li>
                                <li>Articles (คำนำหน้าคำนาม)</li>
                                <li>Possession (การแสดงความเป็นเจ้าของ)</li>
                                <li>Adjectives (คำคุณศัพท์ [ใช้ขยายคำถาม])</li>
                                <li>Prepositions (คำบุพบท [ใช้แสดงความสัมพันธ์ระหว่างสองส่วนของประโยค])</li>
                                <li>Coordinating Conjunctions (คำเชื่อมประโยค)</li>
                                <li>และหัวข้อสำคัญอื่น ๆ สำหรับผู้เรียนครับ</li>
                            </ul>
                            <p><i class="fas fa-lightbulb fa-2xl icons"></i></p>
                            <h5 style="color: #85775a;"><strong>Tips & Tricks</strong></h5>
                            <p>พื้นฐานและปัญหาภาษาอังกฤษของท่าน สามารถพัฒนาให้แข็งแกร่งและดีขึ้นได้ หากได้เรียนรู้จากผู้สอนที่มีความถูกต้อง-แม่นยำ-ชัดเจน-เข้าใจง่าย มีประสบการณ์สอนโดยตรง และเข้าใจพื้นฐานการเรียนรู้ของท่านเป็นอย่างดี ท่านก็จะได้เรียนรู้ทำความเข้าใจธรรมชาติและหลักไวยากรณ์ของภาษาอังกฤษเป็นสิ่งแรก ซึ่งเป็นก้าวแรกที่จะทำให้ท่านเห็นภาพได้ชัดเจน และสามารถนำไปต่อยอดในทุก ๆ ทักษะได้ด้วยตนเองครับ โดยเริ่มต้นจากการหมั่นเข้าเรียน ฝึกฝนทำแบบฝึกหัด ทำความเข้าใจจากการอธิบายที่ถูกต้อง-ชัดเจน ทบทวน และจดจำคำศัพท์จากบทเรียนเป็นประจำ ผ่านหลักสูตรในระบบการเรียนของ PrinEnglish ครับ</p>
                            ${ajPrin2}
                            ${contact}
                            <a href="https://online.prinenglish.com/our-courses/the-basic-grammar-course/" target="_blank">
                                <img class="img-fluid" src="https://149809094.v2.pressablecdn.com/wp-content/uploads/2019/11/Basic-Grammar-Pre-Test.jpg">
                            </a>
                            <div class="d-grid gap-2 d-md-block" style="margin: 20px 0;">
                                <a href="https://online.prinenglish.com/our-courses/the-basic-grammar-course/" target="_blank" type="button" class="btn btn-primary gold">สมัครเรียนหลักสูตร Basic Grammar อ่านรายละเอียดเนื้อหา ทดลองเรียนฟรี และรับโปรโมชั่นพิเศษ</a>
                                ${retry}
                            </div>
                        </div>
                    `;
                } else if (data.recommendation == 'Intermediate Grammar') {
                    html += `
                        <div class="result">
                            <h4><strong>Intermediate Grammar</strong></h4>
                            ${ajPrin1}
                            <p>อาจารย์พบจุดอ่อนของท่านตามหัวข้อข้างบน โดยรวมแล้วท่านควรปรับปรุงทักษะไวยากรณ์ภาษาอังกฤษในระดับกลางและพัฒนาไปสู่ระดับที่สูงขึ้นครับ ซึ่งการพัฒนาทักษะไวยากรณ์ภาษาอังกฤษผ่านหลักสูตรที่มีมาตรฐาน และมีผู้สอนที่มีหลักการและการถ่ายทอดการสอนที่ถูกวิธี มีประสบการณ์ในการสอนที่หลากหลาย มีความเข้าใจลักษณะผู้เรียน และเข้าใจในหลักไวยากรณ์ภาษาอังกฤษอย่างเชี่ยวชาญและถ่องแท้ จะเป็นวิธีที่สามารถช่วยให้ท่านพัฒนา-แก้ไขปัญหาด้านภาษาของท่านได้ และยังช่วยทำให้ท่านสามารถนำไปประยุกต์ใช้ในทุกสถานการณ์และทุกทักษะ ทั้งฟัง-พูด-อ่าน-เขียน ต่อยอดด้วยตนเอง เช่น การทำข้อสอบมาตรฐานให้ได้คะแนนที่สูงขึ้น และการเขียน-การสื่อสารในหัวข้อและบริบทที่ซับซ้อนได้ครับ</p>
                            <p><i class="fas fa-comment-dots fa-2xl icons"></i></p>
                            <h5 style="color: #85775a;"><strong>อาจารย์ขออนุญาตแนะนำหลักสูตร Intermediate Grammar ของ PrinEnglish ครับ</strong></h5>
                            <h5 style="color: #85775a;"><strong>หลักสูตรนี้:</strong></h5>
                            <ul>
                                <li>สามารถเข้าเรียน-ทบทวน-ย้อนดูได้ไม่จำกัด ตลอดอายุหลักสูตรที่ยาวนาน เพียงพอต่อการเรียนรู้ที่เหมาะสมของผู้เรียน</li>
                                <li>มีการสอนที่ละเอียดและเข้าใจง่าย พร้อมแบบฝึกหัดที่หลากหลายให้ผู้เรียนได้ฝึกฝนลงมือทำทันทีหลังเรียนจบแต่ละบทเรียน</li>
                                <li>มีระบบแบบฝึกหัดที่รวมผลคะแนนอัตโนมัติ พร้อมเฉลยข้อถูกผิดให้ผู้เรียนทราบทันที</li>
                                <li>มีวิดีโอเฉลยแบบฝึกหัดที่ผู้เรียนได้ทำไปในทุก ๆ ข้อ พร้อมอธิบายเหตุผลของคำตอบ-ที่มาที่ไปอย่างละเอียดโดย อ.ปริญญ์ เสริมสร้างความเข้าใจให้ผู้เรียนอย่างแม่นยำ แข็งแกร่ง และมั่นคง</li>
                                <li>ในระหว่างการเรียน ผู้เรียนสามารถสอบถามข้อสงสัยต่าง ๆ จากการเรียน และปัญหาที่พบได้ตลอดเวลา พร้อมตอบคำถามโดยตรงจากอาจารย์และทีมงานที่คอยสนับสนุนผู้เรียน</li>
                            </ul>
                            <p><i class="fas fa-thumbs-up fa-2xl icons"></i></p>
                            <h5 style="color: #85775a;"><strong>หลักสูตรนี้ เหมาะสำหรับผู้ที่:</strong></h5>
                            <ul>
                                <li>ต้องการทบทวน-ปรับหลักไวยากรณ์ระดับกลางที่จำเป็นต้องทราบทุก parts เพื่อใช้ในการศึกษาและทำความเข้าใจภาษาอังกฤษในด้านอื่น ๆ</li>
                                <li>ต้องการเสริมสร้างการใช้ไวยากรณ์และโครงสร้างในระดับสูงขึ้น ให้สามารถสื่อสารและทำความเข้าใจภาษา ประโยค และงานเขียนที่ละเอียดและซับซ้อนมากขึ้นได้</li>
                                <li>ต้องการเสริมการเตรียมตัวสอบข้อสอบมาตรฐาน เช่น TOEIC, IELTS, TOEFL iBT รวมไปถึงการเตรียมสอบชิงทุน สอบเข้ามหาวิทยาลัย สอบรายวิชาในโรงเรียน-มหาวิทยาลัย และข้อสอบเฉพาะทาง เพื่อให้ได้คะแนนสอบในระดับสูงขึ้น</li>
                                <li>ต้องการพัฒนาต่อในการเขียน เช่น การเขียนเชิงวิชาการ (เรียงความ รายงาน วิทยานิพนธ์ abstract จดหมาย บทความ เขียนใน writing part ของข้อสอบต่าง ๆ เขียนสอบชิงทุน) และการเขียนเชิงสร้างสรรค์</li>
                                <li>ต้องการพัฒนาไปสู่ทักษะภาคปฏิบัติ การสื่อสาร การอ่าน และการฟังที่เข้าใจความหมายและใจความได้ดีขึ้น ถูกต้อง และชัดเจน เพื่อความเป็นมืออาชีพยิ่งขึ้น</li>
                            </ul>
                            <p><i class="fas fa-thumbtack fa-2xl icons"></i></p>
                            <h5 style="color: #85775a;"><strong>หัวข้อที่สอนในหลักสูตร Intermediate Grammar ของ PrinEnglish อาทิเช่น:</strong></h5>
                            <ul>
                                <li>Past Perfect Continuous (การพูดถึงอดีตของอดีตแบบต่อเนื่อง)</li>
                                <li>Future Perfect (การพูดถึงเหตุการณ์ที่จะเกิดขึ้นไปแล้วในอนาคต)</li>
                                <li>Conditional Sentences (ประโยคเงื่อนไข)</li>
                                <li>Infinitives and Participles (รูปแบบพื้นฐานของคำกริยา คำกริยาที่ลงท้ายด้วย -ing และคำกริยาช่องที่สาม)</li>
                                <li>Modal Verbs (คำกริยาช่วยประเภท modal)</li>
                                <li>Subordinating Conjunctions (คำเชื่อมประโยคประเภทให้ความสำคัญไม่เท่ากัน)</li>
                                <li>และหัวข้อสำคัญอื่น ๆ สำหรับผู้เรียนครับ</li>
                            </ul>
                            <p><i class="fas fa-lightbulb fa-2xl icons"></i></p>
                            <h5 style="color: #85775a;"><strong>Tips & Tricks</strong></h5>
                            <p>ปัญหาภาษาอังกฤษของท่าน สามารถพัฒนาให้แข็งแกร่งและดีขึ้นได้ หากได้เรียนรู้จากผู้สอนที่มีความถูกต้อง-แม่นยำ-ชัดเจน-เข้าใจง่าย มีประสบการณ์สอนโดยตรง และเข้าใจหลักการเรียนรู้ของท่านเป็นอย่างดี ท่านก็จะได้เรียนรู้ทำความเข้าใจธรรมชาติและหลักไวยากรณ์ภาษาอังกฤษในระดับที่สูงขึ้น ซึ่งจะทำให้ท่านเห็นภาพได้ชัดเจน สามารถนำไปต่อยอดในทุก ๆ ทักษะด้วยตนเอง และสามารถเข้าใจและใช้โครงสร้างภาษาที่ละเอียด มีความยาว และซับซ้อนมากขึ้นได้ครับ โดยเริ่มต้นจากการหมั่นเข้าเรียน ฝึกฝนทำแบบฝึกหัด ทำความเข้าใจจากการอธิบายที่ถูกต้อง-ชัดเจน ทบทวน และจดจำคำศัพท์จากบทเรียนเป็นประจำ ผ่านหลักสูตรในระบบการเรียนของ PrinEnglish ครับ</p>
                            ${ajPrin2}
                            ${contact}
                            <a href="https://online.prinenglish.com/our-courses/the-intermediate-grammar-course/" target="_blank">
                                <img class="img-fluid" src="https://149809094.v2.pressablecdn.com/wp-content/uploads/2019/11/Intermediate-Grammar-Pre-Test.jpg">
                            </a>
                            <div class="d-grid gap-2 d-md-block" style="margin: 20px 0;">
                                <a href="https://online.prinenglish.com/our-courses/the-intermediate-grammar-course/" target="_blank" type="button" class="btn btn-primary gold">สมัครเรียนหลักสูตร Intermediate Grammar อ่านรายละเอียดเนื้อหา ทดลองเรียนฟรี และรับโปรโมชั่นพิเศษ</a>
                                ${retry}
                            </div>
                        </div>
                    `;
                } else if (data.recommendation == 'High Scorer') {
                    html += `
                        <div class="result">
                            <h4><strong>High Scorer</strong></h4>
                            <a href="https://online.prinenglish.com/our-courses/" target="_blank">
                                <img class="img-fluid" src="https://149809094.v2.pressablecdn.com/wp-content/uploads/2019/11/High-Scorer.jpg" />
                            </a>
                            <div class="d-grid gap-2 d-md-block" style="margin: 20px 0;">
                                <a href="https://online.prinenglish.com/our-courses/" target="_blank" type="button" class="btn btn-primary gold">อ่านรายละเอียดทุกหลักสูตรของ PrinEnglish</a>
                                ${retry}
                            </div>
                        </div>
                    `;
                }

                html += `
                    <div class="result">
                        <p><i class="fas fa-chart-line fa-2xl icons"></i></p>
                        <h3><strong>กราฟวัดผลรายบุคคล และคะแนนรวมของท่าน</strong></h3>
                        <p><span style="color: #85775a;"><strong>กดที่จุดสีชมพูเพื่อดูคะแนนที่ท่านทำได้ในแต่ละด้าน</strong></span></p>
                    </div>
                `;
                
                res.send(html);
            }
        });
    })

    app.route('/chart/:_id').get((req, res) => {
        let id = req.params._id;
        
        //module.exports = Result.findById(id);

        Result.findById(id, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const dataset = [
                    ["Adjectives", data.percentages.adjectives/100, data.scores.adjectives, 2],
                    ["Adverbs", data.percentages.adverbs/100, data.scores.adverbs, 2],
                    ["Conditional Sentences", data.percentages.conditional_sentences/100, data.scores.conditional_sentences, 2],
                    ["Conjunctions", data.percentages.conjunctions/100, data.scores.conjunctions, 2],
                    ["Future", data.percentages.future/100, data.scores.future, 3],
                    ["Modal Verbs", data.percentages.modal_verbs/100, data.scores.modal_verbs, 2],
                    ["Nouns", data.percentages.nouns/100, data.scores.nouns, 2],
                    ["Passive", data.percentages.passive/100, data.scores.passive, 2],
                    ["Past", data.percentages.past/100, data.scores.past, 3],
                    ["Possession", data.percentages.possession/100, data.scores.possession, 2],
                    ["Prefixes and Suffixes", data.percentages.prefixes_and_suffixes/100, data.scores.prefixes_and_suffixes, 2],
                    ["Prepositions", data.percentages.prepositions/100, data.scores.prepositions, 2],
                    ["Present", data.percentages.present/100, data.scores.present, 3],
                    ["Pronouns", data.percentages.pronouns/100, data.scores.pronouns, 2],
                    ["Questions", data.percentages.questions/100, data.scores.questions, 2],
                    ["Verbs", data.percentages.verbs/100, data.scores.verbs, 2],
                    ["คะแนนรวมของท่าน", data.total_percentage/100, data.total_score, 35]
                ];

                res.send(dataset);
            }
        });
    })

    app.route('/total-score/:_id').get((req, res) => {
        let id = req.params._id;

        Result.findById(id, (err, data) => {
            if (err) {
                console.log(err);
            } else {          
                const dataset = [data.total_percentage, data.total_score];

                res.send(dataset);
            }
        });
    })
};