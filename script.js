document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // ELEMENTOS
    // =========================================

    const likeBtn = document.querySelector(".like-btn");

    const postMedia = document.querySelector(".post-media");

    const bookmarkBtn = document.querySelector(".bookmark-btn");

    const likesCountSpan = document.querySelector(".likes-count");

    const othersCount = document.querySelector(".others-count");


    // Se o botão de curtir não existir, encerra
    if (!likeBtn) {
        return;
    }


    // =========================================
    // ESTADO INICIAL
    // =========================================

    let isLiked = false;

    // Quantidade inicial de curtidas
    let baseLikes = 1200;


    // =========================================
    // FORMATAÇÃO DO NÚMERO
    // =========================================

    function formatLikes(num) {

        if (num >= 1000) {

            return (num / 1000).toFixed(1) + "K";

        }

        return num.toString();
    }


    // =========================================
    // ATUALIZA A QUANTIDADE NA TELA
    // =========================================

    function updateLikes() {

        // Atualiza o número ao lado do coração
        if (likesCountSpan) {

            likesCountSpan.textContent = formatLikes(baseLikes);

        }


        // Atualiza o texto "235 others"
        if (othersCount) {

            const others = Math.max(0, baseLikes - 965);

            othersCount.textContent = others + " others";

        }

    }


    // =========================================
    // ANIMAÇÃO DO CORAÇÃO
    // =========================================

    function animateHeart() {

        const svg = likeBtn.querySelector("svg");


        if (svg) {

            svg.style.transform = "scale(1.4)";


            setTimeout(() => {

                svg.style.transform = "scale(1)";

            }, 150);

        }

    }


    // =========================================
    // CURTIR
    // =========================================

    function addLike() {

        // Impede curtidas duplicadas
        if (isLiked) {

            return;

        }


        baseLikes++;

        isLiked = true;


        // Deixa o coração vermelho
        likeBtn.classList.add("liked");


        // Atualiza os números
        updateLikes();


        // Faz a animação
        animateHeart();

    }


    // =========================================
    // DESCURTIR
    // =========================================

    function removeLike() {

        // Se não estiver curtido, não faz nada
        if (!isLiked) {

            return;

        }


        baseLikes--;

        isLiked = false;


        // Remove a cor vermelha
        likeBtn.classList.remove("liked");


        // Atualiza os números
        updateLikes();


        // Anima o coração
        animateHeart();

    }


    // =========================================
    // CLIQUE NO CORAÇÃO
    // =========================================

    likeBtn.addEventListener("click", (event) => {

        event.stopPropagation();


        if (isLiked) {

            // Já está curtido → descurtir
            removeLike();

        } else {

            // Não está curtido → curtir
            addLike();

        }

    });


    // =========================================
    // CLIQUE NA FOTO
    // =========================================

    if (postMedia) {

        postMedia.addEventListener("click", (event) => {

            event.stopPropagation();


            // Clicar na foto dá uma curtida
            addLike();

        });

    }


    // =========================================
    // BOTÃO DE SALVAR
    // =========================================

    if (bookmarkBtn) {

        let isBookmarked = false;


        bookmarkBtn.addEventListener("click", (event) => {

            event.stopPropagation();


            // Alterna estado
            isBookmarked = !isBookmarked;


            // Adiciona/remove classe
            bookmarkBtn.classList.toggle(
                "bookmarked",
                isBookmarked
            );


            // Anima o ícone
            const svg = bookmarkBtn.querySelector("svg");


            if (svg) {

                svg.style.transform = "scale(1.2)";


                setTimeout(() => {

                    svg.style.transform = "scale(1)";

                }, 150);

            }

        });

    }


    // =========================================
    // INICIALIZA A TELA
    // =========================================

    updateLikes();

});