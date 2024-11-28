(function() {
    if (blacket && blacket.requests && blacket.requests.get) {
        const vanillaSystem = blacket.requests.get;
        blacket.requests.get = function() {
            const loaderModal = document.querySelector('.loaderModal');
            if (loaderModal) {
                loaderModal.remove();
            }
        };
        const loaderModal = document.querySelector('.loaderModal');
        if (loaderModal) {
            loaderModal.remove();
        }
    }

    function handleHover(event) {
        const blookImage = event.target.closest('div.styles__bazaarSelectorItem___Meg69-camelCase');
        if (blookImage) {
            const targetBlook = blookImage.querySelector('img');
            if (targetBlook) {
                const src = targetBlook.src;
                if (src.includes('/content/blooks/')) {
                    const itemId = src.split('/content/blooks/')[1].split('.')[0];
                    const fetchListings = `https://blacket.org/worker/bazaar?item=${itemId}`;
                    fetch(fetchListings)
                        .then(response => response.json())
                        .then(data => {
                            if (data.error) return;

                            const bazaarItems = data.bazaar;
                            let preloadContainer = document.getElementById('preload');
                            if (!preloadContainer) {
                                preloadContainer = document.createElement('div');
                                preloadContainer.id = 'preload';
                                preloadContainer.style.display = 'none';
                                document.body.appendChild(preloadContainer);
                            }
                            preloadContainer.innerHTML = '';
                            bazaarItems.forEach(item => {
                                const itemElement = document.createElement('div');
                                itemElement.id = item.id;
                                itemElement.classList.add('styles__bazaarItem___Meg69-camelCase');
                                itemElement.innerHTML = `
                                    <img loading="lazy" class="styles__bazaarItemImage___KriA4-camelCase" src="/content/blooks/${item.item}.webp">
                                    <div class="styles__bazaarItemAuthor___Fk3A1-camelCase">${item.seller}</div>
                                    <div class="styles__bazaarItemPrice___KG4aZ-camelCase">${item.price.toLocaleString()} <img loading="lazy" style="width: 10%;position: relative;top: 0.130vw;" src="/content/tokenIcon.webp"></div>
                                `;
                                preloadContainer.appendChild(itemElement);
                            });
                        })
                        .catch(() => {});
                }
            }
        }
    }

    const blookSelectorContainer = document.getElementById('blookSelector');
    if (blookSelectorContainer) {
        blookSelectorContainer.addEventListener('mouseover', handleHover);
    }

    blookSelectorContainer.addEventListener('click', function(event) {
        const clickedItem = event.target.closest('.styles__bazaarSelectorItem___Meg69-camelCase');
        if (clickedItem) {
            var preloadContent = document.getElementById('preload');
            var targetContainer = document.querySelector('.styles__bazaarItemsContainer___GkAC2-camelCase');
            if (preloadContent && targetContainer) {
                targetContainer.innerHTML = preloadContent.innerHTML;
            }
        }
    });
})();
