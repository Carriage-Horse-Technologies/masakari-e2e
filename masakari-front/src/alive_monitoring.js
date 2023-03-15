const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const PATH = './out';
const filePath = "./src/target_list.txt"
const DEBUG = 0; // デバッグログなし
// const DEBUG = 1; // デバッグログあり
let errorCnt = 0;

exports.aliveTest = () => {

    //スクリーンショット出力用のディレクトリを作成
    if (!fs.existsSync(PATH)) {
        fs.mkdir(PATH, (err) => {
            if (err) { throw err; }
            console.log('testディレクトリが作成されました');
        });
    }

    //走査リストの呼び出し
    const text = fs.readFileSync(filePath, 'utf8');
    const links = text.toString().split('\n');

    //エラーの配列
    const accessErrors = [];

    //メイン処理の実行
    return (async () => {
        console.log('[Info] ■■■ 死活テスト Start ■■■');

        if (DEBUG) console.log('[Debug] Chromium起動');
        const browser = await puppeteer.launch({
            headless: true,
            slowMo: 50,
        });

        if (DEBUG) console.log('[Debug] 新しいタブを開く');
        const page = await browser.newPage();

        if (DEBUG) console.log('[Debug] ビューポート/デバイスを指定');
        await page.setViewport({
            width: 1200,
            height: 800,
        });
        let index = 0
        for (const url of links) {
            if (url.length < 5) continue;
            if (DEBUG) console.log(`[Debug]${url}へ移動`);

            const response = await page.goto(url, { waitUntil: 'domcontentloaded' });

            console.log("HTTP STATUS:", response.status());
            console.log("URL:", response.url())

            // 4xx,5xxエラーを検知する
            if (response.status() > 399) {
                errorCnt++;
                accessErrors[url] = response.status();
            }

            if (DEBUG) console.log('[Debug] スクリーンショットを保存');
            await page.screenshot({
                path: path.join(PATH, `result_${index}.png`),
                fullPage: true,
            });
            console.log(`[Info] ファイル保存：result_${index}.png`);
            index++;
        };

        if (DEBUG) console.log('[Debug] Chromium終了');
        await browser.close();

        //エラーの集計
        if (errorCnt > 0) {
            console.log("NextCrowd4Uでエラーが発生しています");
            console.log(accessErrors);
        } else {
            console.log("NextCrowd4Uの全ページへ正常にアクセスができます");
        }

        console.log('[Info] ■■■ 死活テスト End ■■■');
    })();
}