# ChuniData

### [日本語はこちらから](#日本語Readme)

This is a nodejs script for creating chart data bundle for Chunithm NEW! (Japan version).

The bundle includes: 
- all jacket (songs' album art) 
- a json file of all chart data (name, genre, artist, chart diff, chart const). [See here.](https://developer.chunirec.net/docs/v2.0/methods-records#records-showall)

Jacket datas are from [official Chunithm homepage](https://chunithm.sega.jp/) and chart info are from [UniDB](https://db.chunirec.net/) (ran by [ChuniRec](https://chunirec.net/)). 

.env file includes:
- REQUEST_URL: ChuniRec API endpoint for UniDB ([https://api.chunirec.net/2.0/music/showall.json?region=jp2&token=](https://api.chunirec.net/2.0/music/showall.json?region=jp2&token=)) with your token at the end
- URL_OFFICIAL_JSON: Official Chunithm chart JSON (Not included in code due to copyright concern)
- URL_OFFICIAL_IMG: Official Chunithm jacket URL (Not included in code due to copyright concern)

Chart data JSON sample: 

```json
{
    "meta": {
      "id": "cff70713c3582ab0",
      "title": "Don't Fight The Music",
      "genre": "ゲキマイ",
      "artist": "黒魔",
      "release": "2021-11-04",
      "bpm": 200,
      "officialID": "2099",
      "jacket": "cce8a73481e935eb.jpg"
    },
    "data": {
      "BAS": {
        "level": "4",
        "const": 0,
        "maxcombo": 697,
        "is_const_unknown": 0
      },
      "ADV": {
        "level": "7",
        "const": 0,
        "maxcombo": 1082,
        "is_const_unknown": 0
      },
      "EXP": {
        "level": "12",
        "const": 12.3,
        "maxcombo": 1888,
        "is_const_unknown": 0
      },
      "MAS": {
        "level": "14+",
        "const": 14.8,
        "maxcombo": 3070,
        "is_const_unknown": 0
      }
    }
  },
```

Chart data JSON sample (World's END):

```json
{
    "meta": {
      "id": "b7317ede27096418",
      "title": "B.B.K.K.B.K.K.【戻】",
      "genre": "WORLD'S END",
      "artist": "nora2r",
      "release": "2016-06-23",
      "bpm": 170,
      "officialID": "8020",
      "jacket": "cbf397f330e040e5.jpg"
    },
    "data": {
      "WE": {
        "level": 0,
        "const": 0,
        "maxcombo": 1051,
        "is_const_unknown": 0,
        "WE_Star": "7",
        "we_kanji": "戻"
      }
    }
  },
```

Note: By bundling with this script "officialID" and "jacket" (from official source) will be added to "meta" (from UniDB), and jacket image is named as stated. "OfficialID" is the official chart ID, WE charts have different ID with regular charts (Ultima included). In some cases, WE charts may have different jacket with regular charts.

Note 2: In the original data from UniDB, the chart diff (not const) with "+" (e.g. 14+) are represented as ".5" (14.5) as the item is a number. In the data processed by this script, diff is converted to strings and are represented as "+" when applicable. 

This repo, is NOT associated with SEGA, developers of Chunithm, developers of ChuniRec (and UniDB) and do not encourage the misuse of data. All bundled data is from public sources, please contact if there is any problem regarding copyrights and/or TOS violation of any services (related to this repo). (As stated in MIT License) In no event shall the author be liable for any special, direct, indirect, or consequential damages or any damages
whatsoever resulting from loss of use, data or profits, whether in an
action of contract, negligence or other tortious action, arising out of
or in connection with the use or performance of this software.

---

## 日本語Readme

こちらはチュウニズムの譜面データを取得し、バンドルするNodeJSスクリプトです。

取得するデータ：
- 全譜面のアルバムアート (Jacket)
- 全譜面の情報と譜面難易度情報 (タイトル、アーティスト、譜面難易度、譜面定数、など)　[こちらを参考](https://developer.chunirec.net/docs/v2.0/methods-records#records-showall)

アルバムアートワークは[公式ホームページ]((https://chunithm.sega.jp/))より。譜面情報及び譜面難易度情報は[ウニDB](https://db.chunirec.net/)より（[ChuniRec](https://chunirec.net/)運営）

.envファイル数値：
- REQUEST_URL: ChuniRec API エンドポイント（ウニDB） ([https://api.chunirec.net/2.0/music/showall.json?region=jp2&token=](https://api.chunirec.net/2.0/music/showall.json?region=jp2&token=)) 最後にトークンを追記
- URL_OFFICIAL_JSON: 公式サイトより譜面情報のJSON (配慮によりURLは記載されていません)
- URL_OFFICIAL_IMG: 公式サイトよりアルバムアートのURL (配慮によりURLは記載されていません)

譜面データサンプル：

```json
{
    "meta": {
      "id": "cff70713c3582ab0",
      "title": "Don't Fight The Music",
      "genre": "ゲキマイ",
      "artist": "黒魔",
      "release": "2021-11-04",
      "bpm": 200,
      "officialID": "2099",
      "jacket": "cce8a73481e935eb.jpg"
    },
    "data": {
      "BAS": {
        "level": "4",
        "const": 0,
        "maxcombo": 697,
        "is_const_unknown": 0
      },
      "ADV": {
        "level": "7",
        "const": 0,
        "maxcombo": 1082,
        "is_const_unknown": 0
      },
      "EXP": {
        "level": "12",
        "const": 12.3,
        "maxcombo": 1888,
        "is_const_unknown": 0
      },
      "MAS": {
        "level": "14+",
        "const": 14.8,
        "maxcombo": 3070,
        "is_const_unknown": 0
      }
    }
  },
```

譜面データサンプル (World's END)：

```json
{
    "meta": {
      "id": "b7317ede27096418",
      "title": "B.B.K.K.B.K.K.【戻】",
      "genre": "WORLD'S END",
      "artist": "nora2r",
      "release": "2016-06-23",
      "bpm": 170,
      "officialID": "8020",
      "jacket": "cbf397f330e040e5.jpg"
    },
    "data": {
      "WE": {
        "level": 0,
        "const": 0,
        "maxcombo": 1051,
        "is_const_unknown": 0,
        "WE_Star": "7",
        "we_kanji": "戻"
      }
    }
  },
```

補足：当スクリプトを使用する場合、ウニDBのデータに"officialID"（公式譜面ID）と"jacket"（アルバムアートファイル名）が"meta"に追加されます。アルバムアートファイル名は"jacket"通りです。公式譜面IDについて、WORLD'S END譜面は別エンティティとして登録されており、IDが異なります（なお、Ultimaは一般譜面として扱っています）。また、一部のWE譜面は異なるアルバムアートになってる場合があります。

補足2：ウニDBのデータに、譜面難易度（定数ではありません）が"+"の場合（例：14+）、".5"表記（例：14.5）になっています（該当項目は数字のため）。当スクリプトはそれをストリングに戻し、"+"表記に戻しています。

当スクリプトは、セガ、チュウニズム開発者及びChuniRec運営（ウニDB含む）の方々と一切関係ありません。取得するデータすべてはネット上で公開されているものですが、悪用しないでください。また、もし当スクリプトについて、著作権の侵害や、利用契約の違反がありましたら、ご連絡をいただければ幸いです。(MIT Licenseより) 作者または著作権者は、契約行為、不法行為、またはそれ以外であろうと、ソフトウェアに起因または関連し、あるいはソフトウェアの使用またはその他の扱いによって生じる一切の請求、損害、その他の義務について何らの責任も負わないものとします。