const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

let personagem = {
    x: 50,
    y: 50,
    largura: 30,
    altura: 30,
    velocidade: 2,
    noAr: true
};

let plataformas = [];

function gerarPlataformas() {
    for (let i = 0; i < 10; i++) {
        const plataforma = {
            x: Math.random() * (canvas.width - 100),
            y: Math.random() * (canvas.height - 20),
            largura: Math.random() * 100 + 50,
            altura: 10
        };
        plataformas.push(plataforma);
    }
}

function desenharCena() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar as plataformas
    ctx.fillStyle = '#666';
    for (const plataforma of plataformas) {
        ctx.fillRect(plataforma.x, plataforma.y, plataforma.largura, plataforma.altura);
    }

    // Desenhar o personagem
    ctx.fillStyle = '#fff';
    ctx.fillRect(personagem.x, personagem.y, personagem.largura, personagem.altura);
}

function verificarColisaoPlataformas() {
    for (const plataforma of plataformas) {
        if (
            personagem.y + personagem.altura >= plataforma.y && // Personagem abaixo da plataforma
            personagem.y <= plataforma.y + plataforma.altura && // Personagem acima da plataforma
            personagem.x + personagem.largura >= plataforma.x && // Personagem à direita da plataforma
            personagem.x <= plataforma.x + plataforma.largura // Personagem à esquerda da plataforma
        ) {
            // O personagem está em cima de uma plataforma
            personagem.noAr = false;
            personagem.y = plataforma.y - personagem.altura; // Coloca o personagem na plataforma
            return;
        }
    }
    // Se não houver colisão com nenhuma plataforma, o personagem está no ar
    personagem.noAr = true;
}

function atualizar() {
    if (personagem.noAr) {
        personagem.y += 2; // Simula a gravidade
    }

    // Movimentação do personagem com teclas WASD
    if (teclas.w && !personagem.noAr) {
        personagem.y -= personagem.velocidade * 2; // Simula o pulo
        personagem.noAr = true;
    }
    if (teclas.a && personagem.x > 0) {
        personagem.x -= personagem.velocidade;
    }
    if (teclas.s && personagem.y + personagem.altura < canvas.height) {
        personagem.y += personagem.velocidade;
    }
    if (teclas.d && personagem.x + personagem.largura < canvas.width) {
        personagem.x += personagem.velocidade;
    }

    // Verificar colisão com plataformas
    verificarColisaoPlataformas();
}

function loopJogo() {
    atualizar();
    desenharCena();
    requestAnimationFrame(loopJogo);
}

// Capturar teclas pressionadas
const teclas = {};

window.addEventListener('keydown', (e) => {
    teclas[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    delete teclas[e.key];
});

gerarPlataformas();
loopJogo();

