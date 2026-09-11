<div align="center">

# ⬆️ dsh-plugin-upgrade-0.1.3-0.1.5
- **1024 स्टोर चैनल**: एक बार `npm i -g dsh1024` चलाएँ, फिर `dsh1024 plugin --profile web add dsh-plugin-upgrade-0.1.3-0.1.5` (यह [deepseek1024.com](https://deepseek1024.com) की इंस्टॉल रैंकिंग में गिना जाता है)।
[![Gitee](https://img.shields.io/badge/Gitee-mirror-c71d23?logo=gitee)](https://gitee.com/perrylink/dsh-plugin-upgrade-0.1.3-0.1.5)

**DeepSeek Harness के लिए संस्करण-लॉक्ड और विलयित प्लगइन अपग्रेड स्किल — `0.1.3-alpha.1` → `0.1.5-rc.1`, दो बंद पैरों (legs) में वहन किया गया।**

*पैर A `0.1.3-alpha.1` → `0.1.5-alpha.1`, पैर B `0.1.5-alpha.1` → `0.1.5-rc.1`: विलयित 20-सीम कैटलॉग पर एक कॉरिडोर कार्ड और एक शून्य-निर्भरता सीम स्कैनर, ताकि चुपचाप माउंट होना बंद कर चुका क्लाइंट आधा हिस्सा कभी «typecheck हरा है» न समझा जाए।*

> **आधिकारिक रिपॉज़िटरी।** यह dsh-plugin-upgrade-0.1.3-0.1.5 की एकमात्र आधिकारिक रिपॉज़िटरी है, जिसे PerryLink संभालता है। यह दोनों संस्करण-लॉक्ड पैकेजों `dsh-plugin-upgrade` (पैर A) और `dsh-plugin-upgrade-rc1` (पैर B) का स्थान लेती है। अन्य खातों की समान-नाम वाली रिपॉज़िटरियाँ इससे संबद्ध नहीं हैं।

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![DSH plugin](https://img.shields.io/badge/dsh--plugin-✅-green)](https://github.com/topics/dsh-plugin)
[![dsh-doctor](https://raw.githubusercontent.com/PerryLink/dsh-plugin-doctor/main/badges/PerryLink__dsh-plugin-upgrade-0.1.3-0.1.5.svg)](https://github.com/PerryLink/dsh-plugin-doctor#verified-徽章)
[![Node](https://img.shields.io/badge/node-%5E22.19%20%7C%7C%20%3E%3D24-brightgreen.svg)](#)
[![CI](https://img.shields.io/github/actions/workflow/status/PerryLink/dsh-plugin-upgrade-0.1.3-0.1.5/ci.yml?branch=main&label=CI)](https://github.com/PerryLink/dsh-plugin-upgrade-0.1.3-0.1.5/actions)
[![Version](https://img.shields.io/github/v/tag/PerryLink/dsh-plugin-upgrade-0.1.3-0.1.5?label=version)](https://github.com/PerryLink/dsh-plugin-upgrade-0.1.3-0.1.5/releases)
[![npm version](https://img.shields.io/npm/v/dsh-plugin-upgrade-0.1.3-0.1.5)](https://www.npmjs.com/package/dsh-plugin-upgrade-0.1.3-0.1.5)
[![npm downloads](https://img.shields.io/npm/dm/dsh-plugin-upgrade-0.1.3-0.1.5)](https://www.npmjs.com/package/dsh-plugin-upgrade-0.1.3-0.1.5)

[English](README.md) · [简体中文](README-zh.md) · [Español](README-es.md) · [Português](README-pt.md) · [हिन्दी](README-hi.md)

</div>

---

## संगतता

| सतह | स्थिति |
|---|---|
| हार्नेस | DeepSeek Harness `0.1.5-rc.1` (tag `dsh-v0.1.5-rc.1` = `183f08e9c6dd`; पैर A→B हैंडऑफ़ `dsh-v0.1.5-alpha.1` = `5dda764ed3aa`; कॉरिडोर की शुरुआत `0.1.3-alpha.1`)। पीयर बैंड `@deepseek-ai/dsh-skill >=0.1.2-rc.1 <0.2.0 \|\| >=0.1.5-alpha.1 <0.2.0`, `@deepseek-ai/cordis ^4.0.2`, `@deepseek-ai/schemastery ^3.18.2`। |
| Node | `^22.19.0 \|\| >=24.0.0` |
| प्लेटफ़ॉर्म | जहाँ Node चले; स्कैनर केवल फ़ाइल सिस्टम पढ़ता है और प्लेटफ़ॉर्म-निरपेक्ष है |
| मॉडल | केवल-पाठ मॉडल पूरी तरह समर्थित; स्किल एक Markdown है, किसी टूल या विज़न की आवश्यकता नहीं |
| दायरा | **दो बंद पैर, एक ही विस्तार**: पैर A `0.1.3-alpha.1` → `0.1.5-alpha.1` और पैर B `0.1.5-alpha.1` → `0.1.5-rc.1`। कॉरिडोर कभी चौड़ा नहीं होता: `0.1.5-rc.1` के बाद की कोई छलांग एक नया पैकेज है। |
| पैर | दोनों पैर इसी पैकेज में रहते हैं: पैर A `S1`–`S10` + `M1` सीमें रखता है, पैर B `C1`, `C2`, `C4`, `C5`, `H1`–`H4`, `P1` — हर एक के अपने साक्ष्य, कार्ड अनुभाग, fixtures और रोलबैक पथ के साथ। इंस्टॉल करने के लिए कोई सहोदर पैकेज नहीं है। |
| `C3` | सेवानिवृत्त: पैर B का कार्ड पुरानी टाइप-लाइन वाले झूठे हरे को `C3` लिखता था, जो पैर A की `M1` जैसा ही दोष है। यह विलय कार्ड पर दर्ज है; `--seams C3` किसी से मेल नहीं खाता। |

## आपको क्या मिलता है

दो हिस्से, एक ही सीम कैटलॉग:

- **पैकेज में शामिल एजेंट स्किल (`plugin-upgrade-015`)** — विलयित कॉरिडोर कार्ड और ठीक-करो-और-सत्यापित-करो चक्र। बॉडी पहले बुलाने वाले को उसी पैर तक पहुँचाती है जो उसके पीयर बैंड से मेल खाता है; मॉडल इसे केवल तब लोड करता है जब किसी कार्य को वास्तव में आवश्यकता हो, और यह पैकेज सिस्टम प्रॉम्प्ट का कोई अनुच्छेद नहीं जोड़ता और कोई टूल भी नहीं।
- **शून्य-निर्भरता CLI (`dsh-plugin-upgrade-015-scan`)** — विलयित बीस सीमों (`S3`, `S8`, `S9`, `M1`, `S4`, `S5`, `S6`, `S7`, `S2`, `S1`, `S10`, `C1`, `C2`, `P1`, `C4`, `C5`, `H1`, `H2`, `H4`, `H3`) के `file:line` तथ्य बताता है, जो 2026-09-09 (पैर A) और 2026-09-10 (पैर B) को हार्नेस tag रेंज से दोबारा पढ़े गए। किसी भी error-स्तर की हिट पर `1` लौटाता है, इसलिए सीधे CI में लगता है।

यह उस विफलता-विधा के लिए है जिसे खत्म करने के लिए यह कॉरिडोर बना है: **इस विस्तार की टूटन ज़्यादातर चुपचाप होती है, दोनों सिरों से।** टाइप लाइन पुरानी हो सकती है, इसलिए रेपो **पुराने** कैटलॉग के विरुद्ध कंपाइल होता है (सीम `M1`), और नंगा `conversation` क्लाइंट स्लॉट बिना किसी alias के हटा दिया गया, जबकि `ctx.slots.inject()` कॉलबैक केवल तब चलाता है जब declaration मौजूद हो — इसलिए उसे अब भी लक्षित करता क्लाइंट आधा हिस्सा माउंट होना बंद कर देता है: कोई त्रुटि नहीं, कोई लॉग पंक्ति नहीं, कोई बिल्ड विफलता नहीं (सीम `C1`)। `typecheck` + `test` को तीन वर्ग की टूटन पार कर जाती हैं:

1. स्थानीय गेट एक पुरानी टाइप लाइन कंपाइल करता है — पुराना `paths` alias, या `0.1.5-alpha.*` पर pinned dev/test टाइप (सीम `M1`);
2. कोई लॉग लेखक V3 के अनिवार्य `stream` फ़ील्ड को छोड़ देता है, इसलिए सत्र import तो हो जाता है पर फिर रिज़्यूम करने से इनकार कर देता है (सीम `S3`);
3. परीक्षण पुरानी आकृति के विरुद्ध mock किए गए हैं, इसलिए वे पास हो जाते हैं जबकि होस्ट योगदान गिरा देता है (सीम `C1`)।

ईमानदार आकलन: पैर B की वर्कस्पेस स्कैन में पाया गया कि परिवार के क्लाइंट हिस्से केवल **8** स्लॉट कुंजियाँ इस्तेमाल करते हैं, और सभी 8 rc.1 में जीवित हैं — उनके लिए rc.1 की टूटन **अव्यक्त है, वास्तविक नहीं**। जो टूटते हैं वे तीसरे पक्ष के क्लाइंट प्लगइन हैं जो नंगी `conversation` कुंजी को लक्षित करते थे, और वे चुपचाप टूटते हैं। पैर A की स्कैन में उलटी बनावट मिली: 40 रेपो, उनमें से 11 पर `M1` लगा, और पुराने पथ को ठीक करने से 3 ऐसे रेपो में असली TypeScript त्रुटियाँ खुल गईं जो पहले «हरे» थे।

## त्वरित शुरुआत

```sh
# 1. बंडल को अपने प्रोफ़ाइल में इंस्टॉल करें
dsh plugin --profile web add dsh-plugin-upgrade-0.1.3-0.1.5

# 2. पुष्टि करें कि पंक्ति माउंट हुई
dsh --profile web --dump-config | grep -A3 'id: dsh-plugin-upgrade-0.1.3-0.1.5'

# 3. जिस प्लगइन को अपग्रेड करना है उसे स्कैन करें
npx dsh-plugin-upgrade-015-scan --repo ../my-plugin
```

फिर एजेंट से `plugin-upgrade-015` स्किल इस्तेमाल करने को कहें, या कार्ड के साथ स्वयं चक्र चलाएँ:
`skills/plugin-upgrade-015/references/v0.1.3-alpha.1-to-v0.1.5-rc.1.md` (पैर A §1 है, पैर B §2 है, विलयित सीम सूचकांक §3 है)।

## इंस्टॉल और अनइंस्टॉल

```sh
dsh plugin --profile web add dsh-plugin-upgrade-0.1.3-0.1.5            # npm से
dsh plugin --profile web add "github:PerryLink/dsh-plugin-upgrade-0.1.3-0.1.5#main"   # स्रोत से
dsh plugin --profile web remove dsh-plugin-upgrade-0.1.3-0.1.5         # अनइंस्टॉल (प्रतिवर्ती)
```

बंडल इंस्टॉल करने से केवल एक स्किल पंजीकृत होती है; पंक्ति हटाने से स्किल हट जाती है। CLI एक सामान्य `npx` लक्ष्य है और उसे किसी प्रोफ़ाइल की आवश्यकता नहीं।

## कॉन्फ़िगरेशन

हर कुंजी वैकल्पिक है और प्रोफ़ाइल पैच में रहती है:

| कुंजी | डिफ़ॉल्ट | अर्थ |
|---|---|---|
| `enabled` | `true` | पैकेज में शामिल स्किल पंजीकृत करें। निर्भरता माउंट रखते हुए चुप रहने के लिए `false`। |
| `skillName` | `plugin-upgrade-015` | `skillsRoot` के अंतर्गत पंजीकृत होने वाली डायरेक्टरी, और कैटलॉग में दिखने वाला नाम। |
| `skillsRoot` | पैकेज का अपना `./skills` | जहाँ `<skillName>/SKILL.md` है। इसी ढाँचे का पुनरुपयोग करने के लिए इसे अपने कार्ड पर इंगित करें। |
| `userInvocable` | `true` | मॉडल के अतिरिक्त कोई व्यक्ति भी नाम से स्किल बुला सके या नहीं। |

```yaml
- insert:
    - id: dsh-plugin-upgrade-0.1.3-0.1.5
      name: dsh-plugin-upgrade-0.1.3-0.1.5
      config:
        skillName: plugin-upgrade-015
```

प्लगइन ज़ोर से माउंट होता है: `SKILL.md` गायब होना, खाली बॉडी, या `name` रहित frontmatter — तीनों खाली स्किल पंजीकृत करने के बजाय माउंट विफल कर देते हैं।

## सतहें

**स्किल** — `plugin-upgrade-015` (डिफ़ॉल्ट रूप से मॉडल और व्यक्ति दोनों द्वारा आमंत्रित). बॉडी: पैर-रूटिंग तालिका, 8 कठोर नियम और 6-चरणीय चक्र। संदर्भ: विलयित कॉरिडोर कार्ड। स्क्रिप्ट: डिटेक्टर, स्किल डायरेक्टरी के भीतर भेजा गया, ताकि सापेक्ष पथ हल हों।

**CLI** — `dsh-plugin-upgrade-015-scan`:

```sh
dsh-plugin-upgrade-015-scan [--repo <path>] [--json <out.json>] [--seams S3,C1,P1] [--quiet]
```

| फ़्लैग | अर्थ |
|---|---|
| `--repo <path>` | स्कैन करने वाली रिपॉज़िटरी (डिफ़ॉल्ट: वर्तमान डायरेक्टरी)। |
| `--json <out.json>` | मशीन-पठनीय रिपोर्ट भी लिखें (`repo`, `scannedAt`, `files`, `hits[]`, `bySeam`)। |
| `--seams S3,C1,P1` | विलयित कैटलॉग की केवल निर्दिष्ट सीमों तक सीमित करें। |
| `--quiet` | मानव-पठनीय आउटपुट बंद करें (`--json` के साथ उपयोगी)। |

एग्ज़िट कोड: `0` कोई error-स्तर हिट नहीं · `1` कम से कम एक error-स्तर हिट · `2` उपयोग या स्कैन विफलता। स्वच्छ स्कैन आवश्यक है पर पर्याप्त नहीं — निर्गम मानदंड असली होस्ट स्मोक है, साथ ही लॉग लेखकों के लिए एक रिज़्यूम राउंड-ट्रिप (पैर A) और क्लाइंट आधे हिस्से के लिए असली ब्राउज़र अभिकथन (पैर B)।

## बीस सीमें

क्रम `lib/scan.mjs` के कैटलॉग का अनुसरण करता है (पहले पैर A, फिर पैर B), और यही वह क्रम है जिस पर `test/card.test.mjs` कार्ड को pinned रखता है।

| Id | स्तर | `0.1.5-rc.1` तक के रास्ते में क्या बदला |
|---|---|---|
| `S3` | error | `assistant/message` में अनिवार्य `stream` फ़ील्ड जुड़ा (सत्र प्रारूप V3): उसके बिना लिखा लॉग सफलतापूर्वक import होता है और फिर रिज़्यूम करने से इनकार कर देता है (`Session.fromRestore` `invalid settlement fields` फेंकता है)। |
| `S8` | error | `SessionHandle.read()` इवेंट array के बजाय `SessionHandleReadResult` (`{ eventState, events }`) लौटाता है; array संक्रियाओं को `.events` खोलना पड़ता है। |
| `S9` | error | `SystemPrompt` के कॉन्फ़िग ने `persona` → `personaPrefix` / `personaSuffix` कर दिया। `includeHarnessIdentity: false` लगाना **समतुल्य नहीं** है — वह हार्नेस पहचान ब्लॉक को मिटा देता है। |
| `M1` | error | स्थानीय गेट एक पुरानी टाइप लाइन कंपाइल करता है: `0.1.5-alpha.*` पर pinned dev/test टाइप, या किसी अनुपस्थित checkout डायरेक्टरी की ओर इंगित `tsconfig` `paths` alias, TypeScript को चुपचाप प्रकाशित टाइप पर लौटा देते हैं। हरा गेट, ग़लत पैमाना। |
| `S4` | error | `tool/code-dispatch` का नाम `tool/ptc-dispatch` हो गया; पुराना लेबल V3 सत्रों में अब मान्य नहीं है। |
| `S5` | error | `ctx.agent` हटा दिया गया: बुलाने वाले को Agent स्पष्ट रूप से पास करना होगा (जैसे `setup(agentCtx, agent)` का दूसरा पैरामीटर)। |
| `S6` | error | `Inbox` एक type interface है, बनाने योग्य class नहीं; fixtures आधिकारिक असमर्थित आकृति इस्तेमाल करते हैं और runtime कोड `agent.inbox` पढ़ता है। |
| `S7` | warn | `SubprocessHandle.pid` हटा दिया गया (केवल `SubprocessTerminalHandle.pid` बचा है); टेस्ट fixtures से यह फ़ील्ड हटा दें। |
| `S2` | warn | `EpochHeader.system` हटा दिया गया: सिस्टम प्रॉम्प्ट अब सरफ़ेस नोड 0 का `system/message` है। |
| `S1` | warn | सत्र प्रारूप V3 और generation-प्रत्यय वाले लॉग नाम — वर्तमान generation `session.v3.jsonl.zstd` है, इसलिए `session.jsonl.zstd` को hardcode करने वाली स्क्रिप्टें चुपचाप विफल होती हैं। |
| `S10` | warn | प्लगइन द्वारा लिखे सत्र इवेंट होस्ट के fail-closed अनुकूलन गेट से होकर जाने चाहिए: `Session.append` में `ignorable` लेखन चैनल नहीं है, इसलिए बिना शर्त append किसी सत्र को अपठनीय बना सकता है। |
| `C1` | error | नंगा क्लाइंट स्लॉट `conversation` हटाया गया और उसकी जगह `main` + `main.conversation` आया, **कोई alias नहीं**। `ctx.slots.inject()` केवल तब चलता है जब declaration मौजूद हो, इसलिए उसे लक्षित करने वाला प्लगइन **चुपचाप** माउंट होना बंद कर देता है। |
| `C2` | error | `@deepseek-ai/dsh-client-ui-sidebar-textpreview` का नाम `…-sidebar-documentpreview` हो गया; पुराना नाम गायब है और कोई shim पैकेज नहीं। |
| `P1` | error | पीयर बैंड का दूसरा खंड बना रहना चाहिए: अकेला `>=0.1.2-rc.1 <0.2.0`, npm semver के prerelease-tuple नियम के तहत `0.1.5-rc.1` को **अस्वीकार** करता है (semver 7.8.5 पर मापा गया `false`)। |
| `C4` | warn | rc.1 ने वैश्विक मुख्य-पैनल मॉडल जोड़ा (`main`, `sidebar.panellist`, `ctx.layout.selectPanel(MainPanelId \| null)`) और लगभग हर स्लॉट में `usePanelInfo` मानक prop जोड़ा। |
| `C5` | warn | दस्तावेज़ पूर्वावलोकन keyed स्लॉट `sidebar.right.tab.document` (`DocumentContent`) पर चला गया; `sidebar.right.pane.tab` बचा है पर उसका पैरेंट प्रवेश `rightbar.session` हो गया। |
| `H1` | warn | `KNOWN_SESSION_EVENT_TYPES` में `deliverables/presented` और `subagent/catalog` जुड़े — fail-closed शब्दावली बढ़ी। |
| `H2` | warn | नए `present` टूल की पंक्ति `tool.call.toolview` की कुंजी `'present'` लेती है, जो alpha.1 में खाली थी। |
| `H4` | info | DeepSeek अडैप्टर का डिफ़ॉल्ट सलाहकारी मॉडल कैटलॉग अब `deepseek-flash` (DeepSeek-V41-Flash) से शुरू होता है। |
| `H3` | info | नई वैकल्पिक क्षमताएँ: `ctx.sessionFeedback`, `ctx.layout.beginNavigation()`, `ctx.workspaces.openSession()` / `openWorkspace()` / `forkSession()`। कार्ड पर सूचीबद्ध; जानबूझकर कोई स्वचालित पहचान नहीं। |

`S7`, `S2`, `S1`, `S10`, `C4`, `C5`, `H1`, `H2` और `H4` जानबूझकर सलाहकारी हैं: उनके वैध मेल हैं (पहले से नई API इस्तेमाल करता रेपो, दस्तावेज़ snapshot, प्लगइन की अपनी मॉडल-id तालिका, Node का `ChildProcess.pid`), इसलिए स्कैनर उन्हें विफलता नहीं बल्कि मानवीय समीक्षा के सुराग के रूप में बताता है। `M1` और `P1` **संरचित** जाँचें हैं — वे पाठ मिलाने के बजाय `package.json` और `tsconfig*.json` हल करती हैं — और `H3` **केवल-कार्ड** है: प्रलेखित, id-समानता से जाँचा गया, और जानबूझकर बिना किसी डिटेक्टर के (`CARD_ONLY = ['H3']`)।

## यह क्या कवर नहीं करता

- **`0.1.5-rc.1` के बाद की कोई छलांग।** विलयित विस्तार रचना से ही rc.1 पर समाप्त होता है: हार्नेस की छलांग `0.1.5-rc.1` → `0.1.5-rc.2` ने प्लगइन-मुखी कोई सीम नहीं जोड़ी (इस पैकेज का अपना dev/test pin और CI प्रोब `0.1.5-rc.2` लाइन पर चलते हैं, ताकि कैटलॉग नवीनतम प्रकाशित टाइप के विरुद्ध सत्यापित हो)। इसके बाद सीम जोड़ने वाली कोई भी चीज़ एक **नया पैकेज** है — बहकता कार्ड किसी कार्ड से बुरा है।
- **`0.1.1` → `0.1.2` की छलांग।** समुदाय की convergence स्किल इस्तेमाल करें।
- **पैरों के बीच सीमें दोहराना।** सत्र-प्रारूप सीमें पैर A की हैं (`assistant/message.stream`, `SessionHandleReadResult`, `EpochHeader.system`, `ctx.agent`, `Inbox`, `SystemPrompt.persona`, V3 लॉग generation) और पैर B उन्हें दोबारा नहीं लिखता — पैर B के विस्तार में `packages/core/session/src` का पूरा diff दो जुड़े event-type literals और एक टिप्पणी पंक्ति है। हर पैर का कार्ड अनुभाग अपना दायरा-कथन रखता है।
- **DSH की उपयोगकर्ता-मुखी अपग्रेड राह।** यह पैकेज *प्लगइन स्रोत कोड* अपग्रेड करता है, उपयोगकर्ता की harness इंस्टॉलेशन नहीं।
- **थीम टोकन।** पैर B के विस्तार में `docs/web-styling.md` में शून्य परिवर्तन है।
- **प्रमाण।** स्वच्छ स्कैन एक परिकल्पना है। निर्गम मानदंड असली होस्ट स्मोक है (अस्थायी `DSH_HOME`, लक्ष्य CLI, `plugin add <tarball>`, `--dump-config`), साथ ही सत्र-लॉग लेखकों के लिए एक रिज़्यूम राउंड-ट्रिप (पैर A) और हर क्लाइंट-पक्ष हिट के लिए असली ब्राउज़र अभिकथन (पैर B)।

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

स्कैनर के पास **हर पैर के लिए** संश्लेषित fixtures की एक जोड़ी है: `fixtures/leg-a-bad-repo` (पैर A की सत्र/कॉन्फ़िग सीमें, हर error सीम जानबूझकर मौजूद) के साथ `fixtures/leg-a-good-repo` (अनुकूलित), और `fixtures/bad-repo` (पैर B की क्लाइंट-स्लॉट सीमें) के साथ `fixtures/good-repo` (अनुकूलित) — साथ ही पहले से `0.1.5-rc.1` पर pinned एक परिवार रेपो पर live negative, ताकि कैटलॉग में रिग्रेशन डाउनस्ट्रीम उपयोगकर्ता के बजाय इस सूट में विफल हो। `test/card.test.mjs` दावा करता है कि विलयित कार्ड सूचकांक और `lib/scan.mjs` **ठीक वही** बीस सीम id और समान स्तर बताते हैं, और `CARD_ONLY` ठीक `['H3']` है — साक्ष्य-बद्धता नियम एक मशीन गेट के रूप में।

## विषय टैग

`dsh`, `dsh-plugin`, `deepseek-harness`, `deepseek`, `cordis`, `plugin-upgrade`, `migration`, `skill`, `version-card`, `scanner`, `client-slots` (`package.json` के keywords के समान; `dsh-plugin` पारिस्थितिकी का दृश्यता चैनल है)।

## PerryLink DSH प्लगइन परिवार

PerryLink DSH प्लगइन परिवार का हिस्सा — 40+ रिपॉज़िटरियाँ, जो सत्र, स्मृति, अनुमतियाँ, डिलीवरी, प्रेक्षणीयता और डेवलपर टूलिंग को कवर करती हैं। कैटलॉग देखें [perrylink-dsh-catalog.perrylink.workers.dev](https://perrylink-dsh-catalog.perrylink.workers.dev) या [`dsh-plugin` विषय](https://github.com/topics/dsh-plugin) पर।

## लाइसेंस

Apache-2.0 — देखें [LICENSE](LICENSE)। इंस्टॉल-समय निर्भरताएँ और उनके लाइसेंस [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) में सूचीबद्ध हैं; कुछ भी बंडल नहीं किया गया।
