<div align="center">

# ⬆️ dsh-plugin-upgrade-rc1
- **1024 स्टोर चैनल**: एक बार `npm i -g dsh1024` चलाएँ, फिर `dsh1024 plugin --profile web add dsh-plugin-upgrade-rc1` (यह [deepseek1024.com](https://deepseek1024.com) की इंस्टॉल रैंकिंग में गिना जाता है)।
[![Gitee](https://img.shields.io/badge/Gitee-mirror-c71d23?logo=gitee)](https://gitee.com/perrylink/dsh-plugin-upgrade-rc1)

**DeepSeek Harness के लिए संस्करण-लॉक्ड प्लगइन अपग्रेड स्किल — `0.1.5-alpha.1` → `0.1.5-rc.1`।**

*एक कॉरिडोर कार्ड और एक शून्य-निर्भरता सीम स्कैनर, ताकि चुपचाप माउंट होना बंद कर चुका क्लाइंट आधा हिस्सा कभी «typecheck हरा है» न समझा जाए।*

> **आधिकारिक रिपॉज़िटरी।** यह dsh-plugin-upgrade-rc1 की एकमात्र आधिकारिक रिपॉज़िटरी है, जिसे PerryLink संभालता है। अन्य खातों की समान-नाम वाली रिपॉज़िटरियाँ इससे संबद्ध नहीं हैं।

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![DSH plugin](https://img.shields.io/badge/dsh--plugin-✅-green)](https://github.com/topics/dsh-plugin)
[![dsh-doctor](https://raw.githubusercontent.com/PerryLink/dsh-plugin-doctor/main/badges/PerryLink__dsh-plugin-upgrade-rc1.svg)](https://github.com/PerryLink/dsh-plugin-doctor#verified-徽章)
[![Node](https://img.shields.io/badge/node-%5E22.19%20%7C%7C%20%3E%3D24-brightgreen.svg)](#)
[![CI](https://img.shields.io/github/actions/workflow/status/PerryLink/dsh-plugin-upgrade-rc1/ci.yml?branch=main&label=CI)](https://github.com/PerryLink/dsh-plugin-upgrade-rc1/actions)
[![Version](https://img.shields.io/github/v/tag/PerryLink/dsh-plugin-upgrade-rc1?label=version)](https://github.com/PerryLink/dsh-plugin-upgrade-rc1/releases)
[![npm version](https://img.shields.io/npm/v/dsh-plugin-upgrade-rc1)](https://www.npmjs.com/package/dsh-plugin-upgrade-rc1)
[![npm downloads](https://img.shields.io/npm/dm/dsh-plugin-upgrade-rc1)](https://www.npmjs.com/package/dsh-plugin-upgrade-rc1)

[English](README.md) · [简体中文](README-zh.md) · [Español](README-es.md) · [Português](README-pt.md) · [हिन्दी](README-hi.md)

</div>

---

## संगतता

| सतह | स्थिति |
|---|---|
| हार्नेस | DeepSeek Harness `0.1.5-rc.1` (tag `dsh-v0.1.5-rc.1` = `183f08e9c6dd`; कॉरिडोर की शुरुआत `dsh-v0.1.5-alpha.1` = `5dda764ed3aa`)। पीयर बैंड `@deepseek-ai/dsh-skill >=0.1.2-rc.1 <0.2.0 \|\| >=0.1.5-alpha.1 <0.2.0`, `@deepseek-ai/cordis ^4.0.2`, `@deepseek-ai/schemastery ^3.18.2`। |
| Node | `^22.19.0 \|\| >=24.0.0` |
| प्लेटफ़ॉर्म | जहाँ Node चले; स्कैनर केवल फ़ाइल सिस्टम पढ़ता है और प्लेटफ़ॉर्म-निरपेक्ष है |
| मॉडल | केवल-पाठ मॉडल पूरी तरह समर्थित; स्किल एक Markdown है, किसी टूल या विज़न की आवश्यकता नहीं |
| दायरा | **केवल एक कॉरिडोर**: `0.1.5-alpha.1` → `0.1.5-rc.1`। यह सामान्य माइग्रेशन फ़्रेमवर्क नहीं है। |
| सहोदर कॉरिडोर | `0.1.3-alpha.1` → `0.1.5-alpha.1` वह [`dsh-plugin-upgrade`](https://github.com/PerryLink/dsh-plugin-upgrade) है। यदि आपका पीयर बैंड `0.1.5-alpha.1` से नीचे है तो पहले वह कार्ड पढ़ें; यह पैकेज उन सीमों को दोबारा कवर नहीं करता। |

## आपको क्या मिलता है

दो हिस्से, एक ही सीम कैटलॉग:

- **पैकेज में शामिल एजेंट स्किल (`plugin-upgrade-015rc1`)** — कॉरिडोर कार्ड और ठीक-करो-और-सत्यापित-करो चक्र। मॉडल इसे केवल तब लोड करता है जब कार्य को वास्तव में आवश्यकता हो; यह पैकेज सिस्टम प्रॉम्प्ट का कोई अनुच्छेद नहीं जोड़ता और कोई टूल पंजीकृत नहीं करता।
- **शून्य-निर्भरता CLI (`dsh-plugin-upgrade-rc1-scan`)** — दस सीमों (`C1`–`C5`, `H1`–`H4`, `P1`) के `file:line` तथ्य बताता है, जो 2026-09-10 को tag रेंज से दोबारा पढ़े गए। किसी भी error-स्तर की हिट पर `1` लौटाता है, इसलिए सीधे CI में लगता है।

यह उस विफलता-विधा के लिए है जिसे खत्म करने के लिए यह कॉरिडोर बना है: **इस छलांग की टूटन चुपचाप होती है।** नंगा क्लाइंट स्लॉट `conversation` बिना किसी alias के हटा दिया गया, और `ctx.slots.inject()` कॉलबैक केवल तब चलाता है जब declaration मौजूद हो — इसलिए उसे लक्षित करता क्लाइंट आधा हिस्सा **चुपचाप माउंट होना बंद** कर देता है: कोई त्रुटि नहीं, कोई लॉग पंक्ति नहीं, कोई बिल्ड विफलता नहीं। `typecheck` + `test` को दो वर्ग की टूटन पार कर जाती हैं:

1. टाइप लाइन पुरानी है, इसलिए रेपो **पुराने स्लॉट कैटलॉग** के विरुद्ध कंपाइल होता है (सीम `C3`);
2. परीक्षण पुरानी आकृति के विरुद्ध mock किए गए हैं, इसलिए वे पास हो जाते हैं जबकि होस्ट आपका योगदान गिरा देता है।

ईमानदार आकलन: इस पैकेज की स्वयं की वर्कस्पेस स्कैन में परिवार के क्लाइंट हिस्सों ने केवल **8** स्लॉट कुंजियाँ इस्तेमाल कीं, और सभी 8 rc.1 में जीवित हैं — उनके लिए यह टूटन **अव्यक्त है, वास्तविक नहीं**। जो टूटते हैं वे तीसरे पक्ष के क्लाइंट प्लगइन हैं जो नंगी `conversation` कुंजी को लक्षित करते थे, और वे चुपचाप टूटते हैं।

## त्वरित शुरुआत

```sh
# 1. बंडल को अपने प्रोफ़ाइल में इंस्टॉल करें
dsh plugin --profile web add dsh-plugin-upgrade-rc1

# 2. पुष्टि करें कि पंक्ति माउंट हुई
dsh --profile web --dump-config | grep -A3 'id: dsh-plugin-upgrade-rc1'

# 3. जिस प्लगइन को अपग्रेड करना है उसे स्कैन करें
npx dsh-plugin-upgrade-rc1-scan --repo ../my-plugin
```

फिर एजेंट से `plugin-upgrade-015rc1` स्किल इस्तेमाल करने को कहें, या कार्ड के साथ स्वयं चक्र चलाएँ:
`skills/plugin-upgrade-015rc1/references/v0.1.5-alpha.1-to-v0.1.5-rc.1.md`।

## इंस्टॉल और अनइंस्टॉल

```sh
dsh plugin --profile web add dsh-plugin-upgrade-rc1            # npm से
dsh plugin --profile web add "github:PerryLink/dsh-plugin-upgrade-rc1#main"   # स्रोत से
dsh plugin --profile web remove dsh-plugin-upgrade-rc1         # अनइंस्टॉल (प्रतिवर्ती)
```

बंडल इंस्टॉल करने से केवल एक स्किल पंजीकृत होती है; पंक्ति हटाने से स्किल हट जाती है। CLI एक सामान्य `npx` लक्ष्य है और उसे प्रोफ़ाइल की आवश्यकता नहीं।

## कॉन्फ़िगरेशन

हर कुंजी वैकल्पिक है और प्रोफ़ाइल पैच में रहती है:

| कुंजी | डिफ़ॉल्ट | अर्थ |
|---|---|---|
| `enabled` | `true` | पैकेज में शामिल स्किल पंजीकृत करें। निर्भरता माउंट रखते हुए चुप रहने के लिए `false`। |
| `skillName` | `plugin-upgrade-015rc1` | `skillsRoot` के अंतर्गत पंजीकृत होने वाली डायरेक्टरी, और कैटलॉग में दिखने वाला नाम। |
| `skillsRoot` | पैकेज का अपना `./skills` | जहाँ `<skillName>/SKILL.md` है। इसी ढाँचे का पुनरुपयोग करने के लिए इसे अपने कार्ड पर इंगित करें। |
| `userInvocable` | `true` | मॉडल के अतिरिक्त कोई व्यक्ति भी नाम से स्किल बुला सके या नहीं। |

```yaml
- insert:
    - id: dsh-plugin-upgrade-rc1
      name: dsh-plugin-upgrade-rc1
      config:
        skillName: plugin-upgrade-015rc1
```

प्लगइन ज़ोर से माउंट होता है: `SKILL.md` गायब होना, खाली बॉडी, या `name` रहित frontmatter — तीनों खाली स्किल पंजीकृत करने के बजाय माउंट विफल कर देते हैं।

## सतहें

**स्किल** — `plugin-upgrade-015rc1` (डिफ़ॉल्ट रूप से मॉडल और व्यक्ति दोनों द्वारा आमंत्रित). बॉडी: 6-चरणीय चक्र। संदर्भ: कॉरिडोर कार्ड। स्क्रिप्ट: डिटेक्टर, स्किल डायरेक्टरी के भीतर, ताकि सापेक्ष पथ हल हों।

**CLI** — `dsh-plugin-upgrade-rc1-scan`:

```sh
dsh-plugin-upgrade-rc1-scan [--repo <path>] [--json <out.json>] [--seams C1,P1] [--quiet]
```

| फ़्लैग | अर्थ |
|---|---|
| `--repo <path>` | स्कैन करने वाली रिपॉज़िटरी (डिफ़ॉल्ट: वर्तमान डायरेक्टरी)। |
| `--json <out.json>` | मशीन-पठनीय रिपोर्ट भी लिखें (`repo`, `scannedAt`, `files`, `hits[]`, `bySeam`)। |
| `--seams C1,P1` | केवल निर्दिष्ट सीमों तक सीमित करें। |
| `--quiet` | मानव-पठनीय आउटपुट बंद करें (`--json` के साथ उपयोगी)। |

एग्ज़िट कोड: `0` कोई error-स्तर हिट नहीं · `1` कम से कम एक error-स्तर हिट · `2` उपयोग या स्कैन विफलता। स्वच्छ स्कैन आवश्यक है पर पर्याप्त नहीं — इस कॉरिडोर का निर्गम मानदंड असली होस्ट स्मोक **और** क्लाइंट आधे हिस्से के लिए असली ब्राउज़र अभिकथन है।

## दस सीमें

| Id | स्तर | `0.1.5-rc.1` लाइन में क्या बदला |
|---|---|---|
| `C1` | error | नंगा क्लाइंट स्लॉट `conversation` हटाया गया और उसकी जगह `main` + `main.conversation` आया, **कोई alias नहीं**। `ctx.slots.inject()` केवल तब चलता है जब declaration मौजूद हो, इसलिए उसे लक्षित करने वाला प्लगइन **चुपचाप** माउंट होना बंद कर देता है। |
| `C2` | error | `@deepseek-ai/dsh-client-ui-sidebar-textpreview` का नाम `…-sidebar-documentpreview` हो गया; पुराना नाम गायब है और कोई shim पैकेज नहीं। |
| `C3` | error | क्लाइंट पक्ष का झूठा हरा: dev/test टाइप `0.1.5-alpha.*` लाइन पर pinned, या `tsconfig` `paths` alias किसी अनुपस्थित checkout डायरेक्टरी की ओर इंगित → TypeScript चुपचाप पुराने कैटलॉग पर लौट जाता है। |
| `C4` | warn | rc.1 ने वैश्विक मुख्य-पैनल मॉडल जोड़ा (`main`, `sidebar.panellist`, `ctx.layout.selectPanel(MainPanelId \| null)`) और लगभग हर स्लॉट में `usePanelInfo` मानक prop जोड़ा। |
| `C5` | warn | दस्तावेज़ पूर्वावलोकन keyed स्लॉट `sidebar.right.tab.document` (`DocumentContent`) पर चला गया; `sidebar.right.pane.tab` बचा है पर उसका पैरेंट प्रवेश `rightbar.session` हो गया। |
| `H1` | warn | `KNOWN_SESSION_EVENT_TYPES` में `deliverables/presented` और `subagent/catalog` जुड़े — fail-closed शब्दावली बढ़ी। |
| `H2` | warn | नए `present` टूल की पंक्ति `tool.call.toolview` की कुंजी `'present'` लेती है, जो alpha.1 में खाली थी। |
| `H3` | info | नई वैकल्पिक क्षमताएँ: `ctx.sessionFeedback`, `ctx.layout.beginNavigation()`, `ctx.workspaces.openSession()` / `openWorkspace()` / `forkSession()`। कार्ड पर सूचीबद्ध; जानबूझकर कोई स्वचालित पहचान नहीं। |
| `H4` | info | DeepSeek अडैप्टर का डिफ़ॉल्ट सलाहकारी मॉडल कैटलॉग अब `deepseek-flash` (DeepSeek-V41-Flash) से शुरू होता है। |
| `P1` | error | पीयर बैंड का दूसरा खंड बना रहना चाहिए: अकेला `>=0.1.2-rc.1 <0.2.0`, npm semver के prerelease-tuple नियम के तहत `0.1.5-rc.1` को **अस्वीकार** करता है (semver 7.8.5 पर मापा गया `false`)। |

`C4`, `C5`, `H1`, `H2`, `H4` जानबूझकर सलाहकारी हैं: उनके वैध मेल हैं (पहले से नई API इस्तेमाल करता रेपो, दस्तावेज़ snapshot, प्लगइन की अपनी मॉडल-id तालिका), इसलिए स्कैनर उन्हें विफलता नहीं बल्कि मानवीय समीक्षा के सुराग के रूप में बताता है।

## यह क्या कवर नहीं करता

- **पिछला कॉरिडोर।** `0.1.3-alpha.1` → `0.1.5-alpha.1` वह `dsh-plugin-upgrade` है। यदि आपका पीयर बैंड `0.1.5-alpha.1` से नीचे है तो पहले उसका कार्ड पढ़ें; यह पैकेज उन सीमों को दोबारा कवर नहीं करता।
- **सत्र-प्रारूप सीमें।** `assistant/message.stream`, `SessionHandleReadResult`, `EpochHeader.system`, `ctx.agent`, `Inbox` और `SystemPrompt.persona` इस छलांग में **नहीं बदलते** (`packages/core/session/src` का पूरा diff दो जुड़े event-type literals और एक टिप्पणी पंक्ति है), इसलिए उन्हें यहाँ दोहराना विचलन होगा। वे सहोदर कार्ड पर हैं।
- **भविष्य की लाइनें।** `0.1.5-rc.1` → अंतिम और उसके बाद सब कुछ दायरे से बाहर; कार्ड जानबूझकर संस्करण-लॉक्ड है, क्योंकि बहकता कार्ड किसी कार्ड से बुरा है।
- **DSH की उपयोगकर्ता-मुखी अपग्रेड राह।** यह पैकेज *प्लगइन स्रोत कोड* अपग्रेड करता है, उपयोगकर्ता की harness इंस्टॉलेशन नहीं।
- **थीम टोकन।** `docs/web-styling.md` में इस रेंज में शून्य परिवर्तन है।
- **प्रमाण।** स्वच्छ स्कैन एक परिकल्पना है। निर्गम मानदंड असली होस्ट स्मोक (अस्थायी `DSH_HOME`, rc.1 CLI, `plugin add <tarball>`, `--dump-config`) और हर क्लाइंट-पक्ष हिट के लिए असली ब्राउज़र अभिकथन है।

## सुरक्षा सीमाएँ

- **केवल-पठन स्कैन।** CLI स्कैन की जा रही रिपॉज़िटरी के भीतर कभी नहीं लिखता; `--json` केवल आपके दिए पथ पर लिखता है।
- **कोई नेटवर्क नहीं, कोई shell नहीं।** स्कैनर Node की मानक लाइब्रेरी के अलावा कुछ import नहीं करता और कोई प्रक्रिया नहीं चलाता।
- **कोई रहस्य नहीं।** पैकेज में कुछ भी क्रेडेंशियल, एनवायरनमेंट टोकन या सत्र डेटा नहीं पढ़ता।
- **सैंडबॉक्स स्मोक विधि।** कार्ड की असली-होस्ट जाँच `mkdtemp` वाला `DSH_HOME` इस्तेमाल करती है; आपका असली `~/.dsh` कभी नहीं छूती।

## विकास

```sh
npm install                        # या: pnpm install (रेपो में pnpm-lock.yaml है)
npm test                           # node --test: स्कैनर, कार्ड<->कैटलॉग समानता, असली Cordis + SkillRegistry
npm run verify:self-contained      # हर import पैकेज के भीतर हल होता है
npm run verify:artifacts           # tarball में स्किल, CLI और patch हैं, और परीक्षण शामिल नहीं
npm run check:readmes              # पाँच-भाषा README स्थिरता
npm pack
```

स्कैनर के अपने संश्लेषित fixtures हैं — `fixtures/bad-repo` (जानबूझकर सभी error सीमें मौजूद) और `fixtures/good-repo` (अनुकूलित) — साथ ही पहले से `0.1.5-rc.1` पर pinned एक परिवार रेपो पर live negative, ताकि कैटलॉग में रिग्रेशन उपयोगकर्ता के बजाय इस सूट में विफल हो। `test/card.test.mjs` दावा करता है कि कार्ड और `lib/scan.mjs` **ठीक वही** सीम id और समान स्तर बताते हैं — साक्ष्य-बद्धता नियम एक मशीन गेट के रूप में।

## विषय टैग

`dsh`, `dsh-plugin`, `deepseek-harness`, `deepseek`, `cordis`, `plugin-upgrade`, `migration`, `skill`, `version-card`, `scanner`, `client-slots` (`package.json` के keywords के समान; `dsh-plugin` पारिस्थितिकी का दृश्यता चैनल है)।

## PerryLink DSH प्लगइन परिवार

PerryLink DSH प्लगइन परिवार का हिस्सा — 40+ रिपॉज़िटरियाँ, जो सत्र, स्मृति, अनुमतियाँ, डिलीवरी, प्रेक्षणीयता और डेवलपर टूलिंग को कवर करती हैं। कैटलॉग देखें [perrylink-dsh-catalog.perrylink.workers.dev](https://perrylink-dsh-catalog.perrylink.workers.dev) या [`dsh-plugin` विषय](https://github.com/topics/dsh-plugin) पर।

## लाइसेंस

Apache-2.0 — देखें [LICENSE](LICENSE)। इंस्टॉल-समय निर्भरताएँ और उनके लाइसेंस [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) में सूचीबद्ध हैं; कुछ भी बंडल नहीं किया गया।
