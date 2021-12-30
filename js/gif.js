(function () {
    'use strict'; // おまじない

    // idが"img"の要素をcornという名前の箱に入れておく
    const corn = document.getElementById('img');
    const tanbarin = document.getElementById('tanbarin');

    const path = [
        './img/cap211230_a.PNG', // 0番目の画像のパス
        './img/cap211230_b.PNG', // 1番目の画像のパス
        './img/cap211230_c.PNG', // 2番目の画像のパス
    ];
    const path2 = [
        './img/tanbarin1.png', // 0番目の画像のパス
        './img/tanbarin2.png', // 1番目の画像のパス
    ];

    let index = 0; // 今表示している画像の番号を入れておく
    let index2 = 0; // 今表示している画像の番号を入れておく

    // マウスホイールしたときに
    document.addEventListener('wheel', () => {
        // コーンの画像を切り替える
        corn.src = path[index];

        index++; // 番号を+1する

        // もし、indexが3になったら、0番目に戻す（3番目の画像は存在しないのでエラーになってしまう）
        if (index > path.length - 1) {
            index = 0;
        }

        // タンバリンの画像を切り替える
        tanbarin.src = path2[index2];

        index2++; // 番号を+1する

        if (index2 > path2.length - 1) {
            index2 = 0;
        }
    });
}());
