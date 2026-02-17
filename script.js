// Copy to clipboard functionality
function copyToClipboard(text, type) {
    navigator.clipboard.writeText(text).then(() => {
        if (type === 'java') {
            const copiedText = document.querySelector('.java-copied');
            if (copiedText) {
                copiedText.style.display = 'block';
                setTimeout(() => {
                    copiedText.style.display = 'none';
                }, 2000);
            }
        } else if (type === 'bedrock') {
            const copiedText = document.querySelector('.bedrock-copied');
            if (copiedText) {
                copiedText.style.display = 'block';
                setTimeout(() => {
                    copiedText.style.display = 'none';
                }, 2000);
            }
        }
    });
}

// Rank data
const ranks = [
    {
        name: "ELITE",
        price: "15K",
        features: ["Fly :/fly"],
        nameColor: "text-primary",
    },
    {
        name: "VIP",
        price: "30K",
        features: ["Set Home 4 :/home", "Fly :/fly", "Colour Chat", "Limit Blok = 13.000"],
        nameColor: "text-primary",
    },
    {
        name: "VIP+",
        price: "45K",
        features: ["Set Home 8 :/home", "Colour Chat", "Change Nick :/nick", "Afk :/afk", "Fly :/fly", "Limit Blok = 18.000"],
        nameColor: "text-primary",
    },
    {
        name: "MVP",
        price: "60K",
        features: ["Set Home 15 :/home", "Colour Chat", "Change Nick :/nick", "Afk :/afk", "Fly :/fly", "Ender Chest :/ec", "Limit Blok = 30.000"],
        nameColor: "text-gold",
        popular: true,
    },
    {
        name: "MVP+",
        price: "180K",
        features: ["Set Home 20 :/home", "Colour Chat", "Change Nick :/nick", "Afk :/afk", "Fly :/fly", "Ender Chest :/ec", "Teleport Player :/tp", "Crafting :/craft", "Anvil :/anvil", "Stone Cutter :/stonecutter", "Limit Blok = 45.000"],
        nameColor: "text-gold",
        popular: true,
    },
    {
        name: "LEGEND",
        price: "220K",
        features: ["Set Home 25 :/home", "Colour Chat", "Change Nick :/nick", "Afk :/afk", "Fly :/fly", "Ender Chest :/ec", "Teleport Player :/tp", "Crafting :/craft", "Anvil :/anvil", "Stone Cutter :/stonecutter", "Feed :/feed", "Smiting Table :/smitingtable", "Limit Blok = 75.000"],
        nameColor: "text-legend",
    },
    {
        name: "SULTAN",
        price: "260K",
        features: ["Set Home 30 :/home", "Colour Chat", "Change Nick :/nick", "Afk :/afk", "Fly :/fly", "Ender Chest :/ec", "Teleport Player :/tp", "Crafting :/craft", "Anvil :/anvil", "Stone Cutter :/stonecutter", "Repair :/erepair", "Feed :/feed", "Smiting Table :/smitingtable", "Heal :/heal", "Limit Blok = 110.000"],
        nameColor: "text-sultan",
    },
    {
        name: "MYTHIC",
        price: "380K",
        features: ["Set Home ∞ :/home", "Colour Chat", "Change Nick :/nick", "Afk :/afk", "Fly :/fly", "Ender Chest :/ec", "Teleport Player :/tp", "Crafting :/craft", "Anvil :/anvil", "Stone Cutter :/stonecutter", "Repair :/erepair", "Feed :/feed", "Smiting Table :/smitingtable", "Heal :/heal", "Enchant :/enchant", "Limit Blok = 150.000"],
        nameColor: "text-mythic",
    },
    {
        name: "DONATOR",
        price: "720K",
        features: ["Set Home ∞ :/home", "Colour Chat", "Change Nick :/nick", "Afk :/afk", "Fly :/fly", "Ender Chest :/ec", "Teleport Player :/tp", "Crafting :/craft", "Anvil :/anvil", "Stone Cutter :/stonecutter", "Repair :/erepair", "Feed :/feed", "Smiting Table :/smitingtable", "Heal :/heal", "Godmode :/godmode", "Enchant :/enchant", "Time Set :/time set", "Weather Set :/weather set", "Lightning :/lightning", "Limit Blok = 200.000"],
        nameColor: "text-donator",
    },
    {
        name: "KING DONATOR",
        price: "1.600K",
        features: ["All Donator features", "Ultimate rank privileges"],
        nameColor: "text-king",
    },
];

// Generate rank cards
function generateRankCards() {
    const rankGrid = document.querySelector('.rank-grid');
    if (!rankGrid) return;

    ranks.forEach(rank => {
        const card = document.createElement('div');
        card.className = `rank-card ${rank.popular ? 'popular' : ''}`;
        
        let featuresHTML = '';
        rank.features.forEach(feature => {
            featuresHTML += `<li><span>◆</span><span>${feature}</span></li>`;
        });

        card.innerHTML = `
            ${rank.popular ? '<span class="popular-badge">⭐ POPULAR</span>' : ''}
            <h3 class="${rank.nameColor}">${rank.name}</h3>
            <div class="rank-divider-line"></div>
            <p class="price">IDR <span class="${rank.nameColor}">${rank.price}</span></p>
            <div class="expand-indicator">
                <span class="expand-text">Click to see features</span>
                <span class="expand-arrow">▼</span>
            </div>
            <ul class="features">
                ${featuresHTML}
            </ul>
        `;
        
        // Add click event listener to toggle features
        card.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
        
        rankGrid.appendChild(card);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    generateRankCards();
});
