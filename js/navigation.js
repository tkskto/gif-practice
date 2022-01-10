(function () {
    'use strict';

    const navigation = document.getElementById('navigation'); // navigationというIDを持っている要素を取得
    const button = document.getElementById('navigation-button'); // navigation-buttonというIDを持っている要素を取得
    // const button = document.querySelector('#navigation-button'); // navigation-buttonというIDを持っている要素を取得
    const text = document.querySelector('.navigation-button-text'); // navigation-button-textというclassを持っている要素を取得

    let isOpen = false;

    /**
     * ボタンをクリックしたら実行する処理
     */
    const handleClick = () => {
        // 閉じていたら開く
        if (!isOpen) {
            isOpen = true;

            // 開くためのクラスを追加
            navigation.classList.add('-show');

            // 開いた時のテキストをセット
            text.textContent = 'メニューを閉じる';
        // 開いていたら閉じる
        } else {
            isOpen = false;

            // 開くためのクラスを削除
            navigation.classList.remove('-show');

            // 閉じた時のテキストをセット
            text.textContent = 'メニューを開く';
        }
    };

    button.addEventListener('click', handleClick);
}());