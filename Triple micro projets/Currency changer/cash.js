// Objet contenant les taux de conversion
const money = {
    dollar: 0.84,
    euro: 1,
    livre: 1.14,
    bitcoin: 40000
};

// Devises sélectionnées par défaut
let entryCurrency = "dollar";
let outputCurrency = "euro";

// Fonction appelée au clic sur un bouton de devise
function selectCurrency(button, type) {
    const parent = button.parentElement;
    const allButtons = parent.querySelectorAll(".butt");

    // On enlève la classe selected à tous les boutons du groupe
    allButtons.forEach(btn => btn.classList.remove("selected"));

    // On ajoute la classe selected au bouton cliqué
    button.classList.add("selected");

    // Mise à jour de la devise
    const currency = button.dataset.devise;
    if (type === 'entry') {
        entryCurrency = currency;
    } else {
        outputCurrency = currency;
    }

    convert();
}

// Fonction de conversion
function convert() {
    const input = document.getElementById("entry");
    const output = document.getElementById("result");

    const amount = parseFloat(input.value);

    if (isNaN(amount)) {
        output.value = "";
        return;
    }

    const deviseEntree = money[entryCurrency];
    const deviseSortie = money[outputCurrency];

    const result = (deviseEntree * amount) / deviseSortie;

    output.value = result.toFixed(2);
}

// Lancer la conversion lors de la modification ou sortie de l'input
document.getElementById("entry").addEventListener("blur", convert);
document.getElementById("entry").addEventListener("change", convert);
