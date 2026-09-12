<div align="center">

# ⬆️ dsh-plugin-upgrade
- **1024 स्टोर चैनल**: एक बार `npm i -g dsh1024` चलाएँ, फिर `dsh1024 plugin --profile web add dsh-plugin-upgrade` (यह [deepseek1024.com](https://deepseek1024.com) की इंस्टॉल रैंकिंग में गिना जाता है)।
[![Gitee](https://img.shields.io/badge/Gitee-mirror-c71d23?logo=gitee)](https://gitee.com/perrylink/dsh-plugin-upgrade)

**DeepSeek Harness के लिए संस्करण-लॉक प्लगइन अपग्रेड स्किल — `0.1.3-alpha.1` → `0.1.5-alpha.1`।**

*एक संस्करण कार्ड और एक शून्य-निर्भरता सीम-स्कैनर, ताकि «typecheck हरा है» को कभी «प्लगइन अब भी चलता है» न समझा जाए।*

> **आधिकारिक रिपॉज़िटरी।** यह dsh-plugin-upgrade की एकमात्र आधिकारिक रिपॉज़िटरी है, जिसे PerryLink अनुरक्षित करता है। अन्य खातों की समान-नाम वाली रिपॉज़िटरी इससे संबद्ध नहीं हैं।

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![DSH plugin](https://img.shields.io/badge/dsh--plugin-✅-green)](https://github.com/topics/dsh-plugin)
[![dsh-doctor](https://raw.githubusercontent.com/PerryLink/dsh-plugin-doctor/main/badges/PerryLink__dsh-plugin-upgrade.svg)](https://github.com/PerryLink/dsh-plugin-doctor#verified-徽章)
[![Node](https://img.shields.io/badge/node-%5E22.19%20%7C%7C%20%3E%3D24-brightgreen.svg)](#)
[![CI](https://img.shields.io/github/actions/workflow/status/PerryLink/dsh-plugin-upgrade/ci.yml?branch=main&label=CI)](https://github.com/PerryLink/dsh-plugin-upgrade/actions)
[![Version](https://img.shields.io/github/v/tag/PerryLink/dsh-plugin-upgrade?label=version)](https://github.com/PerryLink/dsh-plugin-upgrade/releases)
[![npm version](https://img.shields.io/npm/v/dsh-plugin-upgrade)](https://www.npmjs.com/package/dsh-plugin-upgrade)
[![npm downloads](https://img.shields.io/npm/dm/dsh-plugin-upgrade)](https://www.npmjs.com/package/dsh-plugin-upgrade)

[English](README.md) · [简体中文](README-zh.md) · [Español](README-es.md) · [Português](README-pt.md) · [हिन्दी](README-hi.md)

</div>

---

## संगतता

| सतह | स्थिति |
|---|---|
| हार्नेस | DeepSeek Harness `0.1.5-rc.2` (checkout `c291e7961a`, tag `dsh-v0.1.5-rc.2` = `fb2c4b9e69`)। पीयर बैंड `@deepseek-ai/dsh-skill >=0.1.2-rc.1 <0.2.0 \|\| >=0.1.5-alpha.1 <0.2.0`, `@deepseek-ai/cordis ^4.0.2`, `@deepseek-ai/schemastery ^3.18.2`। |
| Node | `^22.19.0 \|\| >=24.0.0` |
| प्लेटफ़ॉर्म | जहाँ Node चले; स्कैनर केवल फ़ाइल सिस्टम पढ़ता है और प्लेटफ़ॉर्म-निरपेक्ष है |
| मॉडल | केवल-पाठ मॉडल पूरी तरह समर्थित; स्किल एक Markdown बॉडी है, किसी टूल या विज़न की आवश्यकता नहीं |
| दायरा | **केवल एक कॉरिडोर**: `0.1.3-alpha.1` → `0.1.5-alpha.1`। यह सामान्य माइग्रेशन फ़्रेमवर्क नहीं है। |

## आपको क्या मिलता है

दो हिस्से, एक ही सीम-कैटलॉग:

- **एक बंडल एजेंट स्किल (`plugin-upgrade-015`)** — एक संस्करण कार्ड और «ठीक करो-सत्यापित करो» चक्र। मॉडल इसे तभी लोड करता है जब कार्य को वास्तव में ज़रूरत हो; यह पैकेज सिस्टम प्रॉम्प्ट में कोई पैराग्राफ़ नहीं जोड़ता और कोई टूल पंजीकृत नहीं करता।
- **एक शून्य-निर्भरता CLI (`dsh-plugin-upgrade-scan`)** — 2026-09-09 की अडैप्टेशन लहर में 40 वास्तविक प्लगइन रिपॉज़िटरी पर मापी गई दस सीमों के लिए `file:line` तथ्य देता है। कोई भी error-स्तर का हिट मिलने पर एग्ज़िट `1`, इसलिए यह सीधे CI में लगता है।

कार्ड जिस विफलता-विधा को ख़त्म करने के लिए है वह यह है: **स्थानीय गेट का हरा होना अडैप्टेशन का प्रमाण नहीं है।** दो तरह की टूटन `typecheck` + `test` को पार कर जाती हैं:

1. प्रकाशित टाइप लाइन सीम को छिपा देती है और रिपॉज़िटरी पुराने टाइप के विरुद्ध कंपाइल हो जाती है (सीम `M1`);
2. टेस्ट पुरानी शक्ल पर मॉक किए गए हैं, इसलिए वे पास हो जाते हैं जबकि होस्ट नई शक्ल अस्वीकार करता है।

दस सीमों में से चार — `S3`, `S8`, `S9`, `M1` — जब यह पैकेज लिखा गया तब तक किसी सामुदायिक अपग्रेड PR में शामिल नहीं थीं; बाक़ी छह को उस लहर के प्रमाण से मिलाया गया है।

## त्वरित शुरुआत

```sh
# 1. बंडल को अपने प्रोफ़ाइल में इंस्टॉल करें
dsh plugin --profile web add dsh-plugin-upgrade

# 2. पुष्टि करें कि पंक्ति माउंट हुई
dsh --profile web --dump-config | grep -A3 'id: dsh-plugin-upgrade'

# 3. जिस प्लगइन को अपग्रेड कर रहे हैं उसे स्कैन करें
npx dsh-plugin-upgrade-scan --repo ../my-plugin
```

फिर एजेंट से `plugin-upgrade-015` स्किल इस्तेमाल करने को कहें, या यहाँ रखे कार्ड के साथ चक्र ख़ुद चलाएँ:
`skills/plugin-upgrade-015/references/v0.1.3-alpha.1-to-v0.1.5-alpha.1.md`।

## इंस्टॉल और अनइंस्टॉल

```sh
dsh plugin --profile web add dsh-plugin-upgrade            # npm से
dsh plugin --profile web add "github:PerryLink/dsh-plugin-upgrade#main"   # सोर्स से
dsh plugin --profile web remove dsh-plugin-upgrade         # अनइंस्टॉल (प्रतिवर्ती)
```

बंडल इंस्टॉल करने से केवल एक स्किल पंजीकृत होती है; पंक्ति हटाने से स्किल हट जाती है। CLI एक सामान्य `npx` लक्ष्य है और इसके लिए किसी प्रोफ़ाइल की ज़रूरत नहीं।

## कॉन्फ़िगरेशन

हर कुंजी वैकल्पिक है और प्रोफ़ाइल पैच में रहती है:

| कुंजी | डिफ़ॉल्ट | अर्थ |
|---|---|---|
| `enabled` | `true` | बंडल स्किल पंजीकृत करें। `false` रखने पर निर्भरता माउंट रहती है पर चुप रहती है। |
| `skillName` | `plugin-upgrade-015` | `skillsRoot` के अंदर पंजीकृत होने वाली डायरेक्टरी, और कैटलॉग में दिखने वाला नाम। |
| `skillsRoot` | पैकेज का अपना `./skills` | जहाँ `<skillName>/SKILL.md` है। अपना कार्ड लगाने के लिए इसे उस ओर इंगित करें। |
| `userInvocable` | `true` | मॉडल के अलावा इंसान भी नाम से स्किल बुला सके या नहीं। |

```yaml
- insert:
    - id: dsh-plugin-upgrade
      name: dsh-plugin-upgrade
      config:
        skillName: plugin-upgrade-015
```

माउंट ज़ोर से विफल होता है: `SKILL.md` गुम, बॉडी ख़ाली, या frontmatter में `name` न हो — तो माउंट रुक जाता है, ख़ाली स्किल पंजीकृत नहीं होती।

## सतहें

**स्किल** — `plugin-upgrade-015` (डिफ़ॉल्ट रूप से मॉडल और इंसान दोनों बुला सकते हैं)। बॉडी: 6-चरणीय चक्र। संदर्भ: संस्करण कार्ड। स्क्रिप्ट: डिटेक्टर, स्किल डायरेक्टरी के अंदर ही, ताकि सापेक्ष पथ हल हों।

**CLI** — `dsh-plugin-upgrade-scan`:

```sh
dsh-plugin-upgrade-scan [--repo <path>] [--json <out.json>] [--seams S3,S8,M1] [--quiet]
```

| फ़्लैग | अर्थ |
|---|---|
| `--repo <path>` | स्कैन करने वाली रिपॉज़िटरी (डिफ़ॉल्ट: cwd)। |
| `--json <out.json>` | मशीन-पठनीय रिपोर्ट भी लिखें (`repo`, `scannedAt`, `files`, `hits[]`, `bySeam`)। |
| `--seams S3,S8,M1` | केवल दिए गए सीमों तक सीमित करें। |
| `--quiet` | मानव-पठनीय आउटपुट बंद करें (`--json` के साथ)। |

एग्ज़िट कोड: `0` कोई error-स्तर हिट नहीं · `1` कम से कम एक · `2` उपयोग या स्कैन विफलता। साफ़ स्कैन आवश्यक है पर पर्याप्त नहीं — कार्ड की निकास कसौटी अस्थायी `DSH_HOME` पर वास्तविक-होस्ट स्मोक है।

## दस सीमें

| Id | स्तर | `0.1.5-alpha.1` लाइन में क्या बदला |
|---|---|---|
| `S1` | warn | सेशन फ़ॉर्मैट V3 है; लॉग फ़ाइल पीढ़ी-सहित है (`session.v3.jsonl.zstd`)। कठोर कोडित `session.jsonl.zstd` चुपचाप बेकार हो जाता है। |
| `S2` | warn | `EpochHeader.system` हट गया; सिस्टम प्रॉम्प्ट सरफ़ेस नोड 0 पर `system/message` है। पढ़ने वालों को संरचनात्मक फ़ॉलबैक चाहिए। |
| `S3` | error | `assistant/message` में `stream` अनिवार्य है; बिना उसके सेशन इम्पोर्ट होता है पर रिज़्यूम नहीं होता (`Session.fromRestore` अमान्य settlement फ़ील्ड अस्वीकार करता है)। |
| `S4` | error | `tool/code-dispatch` का नाम `tool/ptc-dispatch` हो गया। |
| `S5` | error | `ctx.agent` हट गया; कॉलर को `Agent` स्पष्ट रूप से मिलता है। |
| `S6` | error | `Inbox` अब टाइप इंटरफ़ेस है — बनाया नहीं जा सकता; `agent.inbox` और आधिकारिक फ़िक्स्चर शक्ल इस्तेमाल करें। |
| `S7` | warn | `SubprocessHandle.pid` हट गया (केवल `SubprocessTerminalHandle` में `pid` बचा है)। |
| `S8` | error | `SessionHandle.read()` अब `SessionHandleReadResult` लौटाता है — `.events` खोलें। |
| `S9` | error | `SystemPrompt` का कॉन्फ़िग `persona` अब `personaPrefix` / `personaSuffix` है। |
| `M1` | error | `tsconfig` का `paths` ऐसी डायरेक्टरी ओर इंगित हो जो मौजूद नहीं, तो TypeScript चुपचाप प्रकाशित टाइप पर लौट जाता है — स्थानीय गेट **झूठा हरा** बन जाता है। |

`S7`, `S1`, `S2` और `S10` जान-बूझकर सूचनात्मक हैं: इनके वैध मेल भी होते हैं (Node का अपना `pid`, पुरानी पीढ़ी के रीडर, प्लगइन का अपना अडैप्टिव इवेंट गेट), इसलिए स्कैनर इन्हें मैनुअल समीक्षा के सुराग़ बतौर दिखाता है, विफलता नहीं।

## यह क्या कवर नहीं करता

- **अन्य कॉरिडोर।** `0.1.1` → `0.1.2` और आगे की लाइनें दायरे से बाहर; कार्ड जान-बूझकर लॉक है, क्योंकि बहकने वाला कार्ड न होने से बुरा है।
- **DSH का उपयोगकर्ता-मुखी अपग्रेड पथ।** यह पैकेज **प्लगइन सोर्स कोड** अपग्रेड करता है, उपयोगकर्ता की harness इंस्टॉलेशन नहीं।
- **क्लाइंट/ब्राउज़र व्यवहार।** स्कैनर स्थिर है; क्लाइंट आधे हिस्से के लिए असली ब्राउज़र जाँच चाहिए।
- **प्रमाण।** साफ़ स्कैन एक परिकल्पना है। निकास कसौटी वास्तविक-होस्ट स्मोक है (अस्थायी `DSH_HOME`, लक्ष्य CLI, `plugin add <tarball>`, `--dump-config`, और सेशन-लॉग लिखने वालों के लिए एक resume राउंड-ट्रिप)।

## सुरक्षा सीमाएँ

- **केवल-पठन स्कैन।** CLI स्कैन की गई रिपॉज़िटरी के अंदर कभी नहीं लिखता; `--json` केवल आपके दिए पथ पर लिखता है।
- **कोई नेटवर्क, कोई शेल नहीं।** स्कैनर Node की मानक लाइब्रेरी के अलावा कुछ आयात नहीं करता और कभी प्रोसेस नहीं बनाता।
- **कोई रहस्य नहीं।** पैकेज में कुछ भी क्रेडेंशियल, एनवायरनमेंट टोकन या सेशन डेटा नहीं पढ़ता।
- **सैंडबॉक्स स्मोक नुस्ख़ा।** कार्ड की असली-होस्ट जाँच `mkdtemp` वाले `DSH_HOME` का उपयोग करती है; आपके असली `~/.dsh` को कभी नहीं छूती।

## विकास

```sh
pnpm install
pnpm test                          # node --test (असली Cordis + असली SkillRegistry)
pnpm run verify:self-contained     # हर import पैकेज के भीतर हल होता है
pnpm run verify:artifacts          # tarball में स्किल, CLI और patch मौजूद
pnpm run check:readmes             # पाँच-भाषा README एकरूपता
pnpm pack
```

स्कैनर के साथ संश्लेषित `fixtures/bad-repo` और `fixtures/good-repo` हैं, और लहर से पहले ही अडैप्ट हो चुकी रिपॉज़िटरी पर एक live negative भी — इसलिए कैटलॉग में रिग्रेशन टेस्ट सूट को गिराता है, उपयोगकर्ता तक नहीं पहुँचता।

## विषय टैग

`dsh`, `dsh-plugin`, `deepseek-harness`, `deepseek`, `cordis`, `plugin-upgrade`, `migration`, `skill`, `version-card`, `scanner` (`package.json` की keywords के अनुरूप; `dsh-plugin` पारिस्थितिकी का दृश्यता चैनल है)।

## PerryLink DSH प्लगइन परिवार

यह PerryLink DSH प्लगइन परिवार का हिस्सा है — 40 रिपॉज़िटरी, जो सेशन, मेमोरी, अनुमतियाँ, डिलीवरी, ऑब्ज़र्वेबिलिटी और डेवलपर टूलिंग कवर करती हैं। कैटलॉग देखें [perrylink-dsh-catalog.perrylink.workers.dev](https://perrylink-dsh-catalog.perrylink.workers.dev) पर या [`dsh-plugin` टॉपिक](https://github.com/topics/dsh-plugin) पर।

## लाइसेंस

Apache-2.0 — देखें [LICENSE](LICENSE)। इंस्टॉल-समय की निर्भरताएँ और उनके लाइसेंस [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) में सूचीबद्ध हैं; कुछ भी बंडल नहीं किया गया।
