class Bola {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radio = Math.floor(Math.random() * 10) + 3;
    this.dirX = Math.random() * 2 - 1;
    this.dirY = Math.random() * 2 - 1;
    this.velocidad = Math.random() * 5;
  }

  dibujar() {
    context.beginPath();
    context.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
    context.fill();
    //context.stroke();
    context.closePath();
  }

  mover(bolas) {
    this.x += this.dirX * this.velocidad;
    this.y += this.dirY * this.velocidad;
    if (this.x + this.radio > canvas.width || this.x + this.radio < 0) {
      this.dirX = (Math.random() * 2 - 1) * (this.dirX < 0 ? -1 : 1);
    }
    if (this.y + this.radio > canvas.height || this.y + this.radio < 0) {
      this.dirY = (Math.random() * 2 - 1) * (this.dirY < 0 ? -1 : 1);
    }

    bolas.forEach((bola) => {
      if (this !== bola) {
        const dist = Math.sqrt((this.x - bola.x) ** 2 + (this.y - bola.y) ** 2);

        if (dist < this.radio + bola.radio) {
          let dirX = bola.dirX;
          let dirY = bola.dirY;

          bola.dirX = this.dirX;
          bola.dirY = this.dirY;

          this.dirX = dirX;
          this.dirY = dirY;
        }
      }
    });
  }
}
