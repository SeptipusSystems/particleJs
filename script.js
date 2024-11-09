const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = innerWidth - 50;
canvas.height = innerHeight - 50;

let bolas = [];

for (let i = 0; i < 250; i++) {
  bolas.push(
    new Bola(
      Math.random() * canvas.width - 100,
      Math.random() * canvas.height - 100
    )
  );
}

function calcularDistancia(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

function animar() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  bolas.forEach((bola) => {
    bola.dibujar();
    bola.mover(bolas);
    bolas.forEach((bolat) => {
      const dist = calcularDistancia(bola.x, bola.y, bolat.x, bolat.y);
      const prom = (bola.radio + bolat.radio) / 20;
      const maxDist = prom * 150;
      let gris = Math.min(255, Math.max(0, (dist / maxDist) * 255));
      if (dist < maxDist) {
        context.beginPath();
        context.moveTo(bola.x, bola.y);
        context.lineTo(bolat.x, bolat.y);

        context.strokeStyle = `rgb(${gris}, ${gris}, ${gris})`;
        context.lineWidth = Math.min(
          3,
          Math.max(1, ((maxDist - dist) / maxDist) * 3)
        );
        context.stroke();
        context.closePath();
      }
    });
  });
  requestAnimationFrame(animar);
}

animar();
