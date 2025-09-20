function simplifyClause() {
    const clause = document.getElementById("clauseInput").value;
    document.getElementById("simplifiedOutput").innerText =
        `Simplified: "${clause}" → Plain English version.`;

    const risks = ["Low", "Medium", "High"];
    const risk = risks[Math.floor(Math.random() * risks.length)];
    document.getElementById("riskOutput").innerText = `Risk Level: ${risk}`;

    translateClause(); // auto-translate
}

function translateClause() {
    const clause = document.getElementById("clauseInput").value;
    const language = document.getElementById("languageSelect").value;
    document.getElementById("translationOutput").innerText =
        `Translated to ${language}: ${clause.split("").reverse().join("")}`;
}

function answerQuestion() {
    const question = document.getElementById("questionInput").value;
    document.getElementById("answerOutput").innerText =
        `Answer to "${question}" → Mock AI Response.`;
}
