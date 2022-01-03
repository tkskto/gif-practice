(function () {
    'use strict'; // おまじない

    const setScroll = () => {
        const wrapper = document.querySelector('.wrapper');

        window.addEventListener('scroll',
            // スクロールするたびにここから
            () => {
                const scrollY = window.scrollY; // 現在のスクロール量
                const screenHeight = window.innerHeight; // 画面の高さ
                const contentsHeight = document.body.clientHeight; // コンテンツの高さ

                // 一番下までスクロールしたら
                if ((scrollY + screenHeight) > contentsHeight) {
                    // class="item"のタグを取得する
                    const items = document.querySelectorAll('.item');

                    // 0番目のタグの複製をwrapperの最後に追加
                    wrapper.appendChild(items.item(0).cloneNode(true));
                    // 0番目のオリジナルをwrapperから削除
                    wrapper.removeChild(items.item(0));
                }
            }
            // ここまで実行します
        );
    };

    setScroll();
}());
