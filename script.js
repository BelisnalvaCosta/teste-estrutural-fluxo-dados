function runExample(type) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/cycle?type=${type}`, true);
    xhr.onload = function () {
        if (this.status === 200) {
            document.getElementById('output').innerHTML = this.responseText;
            drawOnCanvas(type); // Desenha o fluxograma correspondente
        } else {
            document.getElementById('output').innerHTML = 'Erro ao carregar o exemplo.';
        }
    };
    xhr.onerror = function () {
        document.getElementById('output').innerHTML = 'Erro na conexão.';
    };
    xhr.send();
}

function drawOnCanvas(type) {
    const canvas = document.getElementById('interactiveCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas antes de desenhar

    switch (type) {
        case 'simple':
            drawSimpleCycle(ctx);
            break;
        case 'nested':
            drawNestedCycle(ctx);
            break;
        case 'concatenated':
            drawConcatenatedCycle(ctx);
            break;
        case 'unstructured':
            drawUnstructuredCycle(ctx);
            break;
    }
}

function drawSimpleCycle(ctx) {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#007bff';
    ctx.fillRect(50, 50, 100, 50); // Retângulo representando o loop
    ctx.strokeRect(50, 50, 100, 50);
    ctx.fillStyle = '#fff';
    ctx.fillText('Soma: 0', 60, 80);

    ctx.fillStyle = '#007bff';
    ctx.fillRect(50, 130, 100, 50);
    ctx.strokeRect(50, 130, 100, 50);
    ctx.fillStyle = '#fff';
    ctx.fillText('i < 5', 80, 160);

    ctx.beginPath();
    ctx.moveTo(100, 100); // Linha do primeiro bloco ao segundo
    ctx.lineTo(100, 130);
    ctx.stroke();

    ctx.fillStyle = '#007bff';
    ctx.fillRect(200, 130, 150, 50);
    ctx.strokeRect(200, 130, 150, 50);
    ctx.fillStyle = '#fff';
    ctx.fillText('Soma += i', 220, 160);

    ctx.beginPath();
    ctx.moveTo(100, 180);
    ctx.lineTo(100, 230);
    ctx.lineTo(275, 230);
    ctx.lineTo(275, 180);
    ctx.stroke();
}

function drawNestedCycle(ctx) {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#28a745';
    ctx.fillRect(50, 50, 150, 50);
    ctx.strokeRect(50, 50, 150, 50);
    ctx.fillStyle = '#fff';
    ctx.fillText('i = 0 a 2', 80, 80);

    ctx.fillStyle = '#28a745';
    ctx.fillRect(50, 130, 150, 50);
    ctx.strokeRect(50, 130, 150, 50);
    ctx.fillStyle = '#fff';
    ctx.fillText('j = 0 a 2', 80, 160);

    ctx.beginPath();
    ctx.moveTo(125, 100);
    ctx.lineTo(125, 130);
    ctx.stroke();

    ctx.fillStyle = '#28a745';
    ctx.fillRect(250, 130, 150, 50);
    ctx.strokeRect(250, 130, 150, 50);
    ctx.fillStyle = '#fff';
    ctx.fillText('[i, j]', 300, 160);

    ctx.beginPath();
    ctx.moveTo(125, 180);
    ctx.lineTo(125, 230);
    ctx.lineTo(325, 230);
    ctx.lineTo(325, 180);
    ctx.stroke();
}

function drawConcatenatedCycle(ctx) {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#ffc107';
    ctx.fillRect(50, 50, 150, 50);
    ctx.strokeRect(50, 50, 150, 50);
    ctx.fillStyle = '#fff';
    ctx.fillText('Primeiro Loop', 60, 80);

    ctx.fillStyle = '#ffc107';
    ctx.fillRect(50, 130, 150, 50);
    ctx.strokeRect(50, 130, 150, 50);
    ctx.fillStyle = '#fff';
    ctx.fillText('Segundo Loop', 60, 160);

    ctx.beginPath();
    ctx.moveTo(125, 100);
    ctx.lineTo(125, 130);
    ctx.stroke();

    ctx.fillStyle = '#ffc107';
    ctx.fillRect(250, 50, 200, 50);
    ctx.strokeRect(250, 50, 200, 50);
    ctx.fillStyle = '#fff';
    ctx.fillText('Execução: i = 0, 1, 2', 260, 80);

    ctx.fillStyle = '#ffc107';
    ctx.fillRect(250, 130, 200, 50);
    ctx.strokeRect(250, 130, 200, 50);
    ctx.fillStyle = '#fff';
    ctx.fillText('Execução: j = 0, 1', 260, 160);

    ctx.beginPath();
    ctx.moveTo(125, 180);
    ctx.lineTo(125, 230);
    ctx.lineTo(325, 230);
    ctx.lineTo(325, 180);
    ctx.stroke();
}

function drawUnstructuredCycle(ctx) {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#dc3545';
    ctx.fillRect(50, 50, 200, 50);
    ctx.strokeRect(50, 50, 200, 50);
    ctx.fillStyle = '#fff';
    ctx.fillText('Enquanto i < 5', 80, 80);

    ctx.fillStyle = '#dc3545';
    ctx.fillRect(50, 130, 200, 50);
    ctx.strokeRect(50, 130, 200, 50);
    ctx.fillStyle = '#fff';
    ctx.fillText('Salta quando i == 3', 60, 160);

    ctx.beginPath();
    ctx.moveTo(150, 100);
    ctx.lineTo(150, 130);
    ctx.stroke();

    ctx.fillStyle = '#dc3545';
    ctx.fillRect(300, 130, 200, 50);
    ctx.strokeRect(300, 130, 200, 50);
    ctx.fillStyle = '#fff';
    ctx.fillText('Execução: i = 0, 1, 2, 4', 310, 160);

    ctx.beginPath();
    ctx.moveTo(150, 180);
    ctx.lineTo(150, 230);
    ctx.lineTo(400, 230);
    ctx.lineTo(400, 180);
    ctx.stroke();
}
