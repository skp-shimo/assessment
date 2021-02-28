'user strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 *  指定した要素の子どもを全て削除する
 *  @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) {
        //子どもの要素があるかぎり削除
        element.removeChild(element.firstChild);
    }
}

userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
        assessmentButton.onclick();
    }
};
assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
        //名前が空白の時は処理を終了する
        return;
    }
    
    // 診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    // ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue =
        'https://twitter.com/intent/tweet?button_hashtag=' +
        encodeURIComponent('あなたのいいところ')  +
        '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('date-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);

    // widgets.js の設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};

const answers = [
'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
'{userName}のいいところはまなざしです。{userName}のまなざしは鋭く、全てを見透かしているようです。',
'{userName}のいいところは情熱です。{userName}の情熱はすばらしいです。',
'{userName}のいいところは厳しさです。{userName}は厳しいですが、その中に優しさがあります。',
'{userName}のいいところはあごです。{userName}のあごは武器です。',
'{userName}のいいところは髪型です。{userName}の髪型はちょうどいいです。',
'{userName}のいいところは身長です。{userName}の身長はちょうどいい大きさです。',
'{userName}のいいところは手の大きさです。{userName}の手はちょうどいい大きさです。',
'{userName}のいいところは足の大きさです。{userName}の足はちょうどいい大きさです',
'{userName}のいいところはお尻です。{userName}のお尻はちょうどいい大きさです。',
'{userName}のいいところは名前です。{userName}の名前はかっこいいです。',
'{userName}のいいところは匂いです。{userName}の匂いは特徴的です。',
'{userName}のいいところは全てです。{userName}の全てがいいです。',
'{userName}のいいところはお金です。{userName}はお金を沢山持っています。',
'{userName}のいいところは顔です。{userName}の顔がいいです。',
'{userName}のいいところはないです。{userName}のいいところはありません。',
'{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒されています。'
];
/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName){
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    // 文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replace(/\{userName\}/g, userName);
    return result;
}

// テストコード
console.assert(
    assessment('太郎') ===
    '太郎のいいところは足の大きさです。太郎の足はちょうどいい大きさです',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
