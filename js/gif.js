(function () {
    'use strict'; // おまじない

    const setScrollGif = () => {
        // classが"item"の要素をitemListという名前の箱に入れておく
        const itemList = document.querySelectorAll('.item');

        itemList.forEach((item) => {
            let index = 0;
            // itemListが持っているimgタグを取得
            let image = item.querySelectorAll('img');

            // imageから1個ずつ取り出して処理する
            image.forEach((img) => {
                // 取り出したimgタグにクラスをつける
                img.classList.add('-hide');
            });
            // 1個目だけ表示
            image.item(0).classList.remove('-hide');

            document.addEventListener('scroll',
                () => {
                    image.item(index).classList.add('-hide');

                    index = index + 1; // 番号を+1する

                    // 最後の画像を表示したら0番目に戻る
                    if (index > image.length - 1) {
                        index = 0;
                    }

                    image.item(index).classList.remove('-hide');
                }
            );
        });
    };
    setScrollGif();
}());
