(function () {
    'use strict'; // おまじない

    const setScrollGif = () => {
        // idが"img"の要素をcornという名前の箱に入れておく
        const itemList = document.querySelectorAll('.item');

        itemList.forEach((item) => {
            let index = 0;
            let image = item.querySelectorAll('img');

            image.forEach((img) => {
                img.classList.add('-hide');
            });
            image.item(index).classList.remove('-hide');

            document.addEventListener('scroll', () => {
                image.item(index).classList.add('-hide');

                index++; // 番号を+1する

                if (index > image.length - 1) {
                    index = 0;
                }

                image.item(index).classList.remove('-hide');
            });
        });
    };
    setScrollGif();
}());
