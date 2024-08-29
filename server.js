const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Função auxiliar para servir arquivos
function serveFile(filePath, contentType, res) {
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end('Erro ao carregar o arquivo.');
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    });
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathName = parsedUrl.pathname;

    // Rota para o arquivo principal (index.html)
    if (pathName === '/') {
        serveFile(path.join(__dirname, 'index.html'), 'text/html', res);

    // Rota para o arquivo script.js
    } else if (pathName === '/script.js') {
        serveFile(path.join(__dirname, 'script.js'), 'application/javascript', res);

    // Rota para os exemplos de ciclo
    } else if (pathName === '/cycle') {
        const query = parsedUrl.query;
        let result;
        switch (query.type) {
            case 'simple':
                result = runSimpleCycle();
                break;
            case 'nested':
                result = runNestedCycle();
                break;
            case 'concatenated':
                result = runConcatenatedCycle();
                break;
            case 'unstructured':
                result = runUnstructuredCycle();
                break;
            default:
                result = 'Tipo de ciclo desconhecido.';
        }
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(result);

    // Rota para arquivos estáticos (se precisar adicionar CSS ou outras dependências)
    } else {
        res.writeHead(404);
        res.end('Página não encontrada.');
    }
});

// Funções para os diferentes tipos de ciclos
function runSimpleCycle() {
    let sum = 0;
    for (let i = 0; i < 5; i++) {
        sum += i;
    }
    return `Ciclo Simples: Soma de 0 a 4 é ${sum}.`;
}

function runNestedCycle() {
    let output = 'Ciclo Aninhado: ';
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            output += `[i: ${i}, j: ${j}] `;
        }
    }
    return output;
}

function runConcatenatedCycle() {
    let output = 'Ciclo Concatenado: ';
    for (let i = 0; i < 3; i++) {
        output += `Primeiro loop: ${i} `;
    }
    for (let j = 0; j < 2; j++) {
        output += `Segundo loop: ${j} `;
    }
    return output;
}

function runUnstructuredCycle() {
    let i = 0;
    let output = 'Ciclo Não Estruturado: ';
    while (i < 5) {
        if (i === 3) {
            i += 2; // Salta de forma não convencional
            continue;
        }
        output += `${i} `;
        i++;
    }
    return output;
}

// Inicia o servidor na porta 3000
server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
