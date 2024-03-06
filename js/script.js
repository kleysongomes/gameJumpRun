const jumper = document.querySelector('.jumper');
const orcs = document.querySelector('.orcs');
const scoreElements = document.querySelector('.score-board');
const consoleLog = document.querySelector('.log');

let frameIndex = 0;
let loop;
let scoreValue = 0;
let ordemNivel = 1;
let velocidade = 2;

const jump = () => {
  jumper.classList.add('jump');

  setTimeout(() => {
    jumper.classList.remove('jump');
  }, 500);
};

const updateScoreElements = () => {
  scoreElements.querySelector('.points').textContent = `Pontos: ${scoreValue}`;
  scoreElements.querySelector('.level').textContent = `Nível de Ordem: ${ordemNivel}`;
  scoreElements.querySelector('.speed').textContent = `Velocidade: ${velocidade.toFixed(1)}x`;
};

const updateConsoleLog = (logs) => {
  const logElements = document.querySelectorAll('.console .log');
  
  // Atualiza cada elemento h3 com o log correspondente
  logElements.forEach((logElement, index) => {
    logElement.textContent = `>_${logs[index]}`;
  });
  consoleLog.scrollTop = consoleLog.scrollHeight;
};


const decreaseAnimationSpeed = () => {
  const orcsAnimation = document.styleSheets[0].cssRules[0]; // Ajuste o índice conforme necessário
  let currentSpeed = parseFloat(orcsAnimation.style.animationDuration);

  if (currentSpeed > 0.1) {
    currentSpeed -= 0.1;
    orcsAnimation.style.animationDuration = `${currentSpeed}s`;
  }
};

const checkScore = () => {
  if (scoreValue % 1000 === 0) {
    ordemNivel++;
    velocidade += 1;
    updateScoreElements();
    decreaseAnimationSpeed();
  }
};

const startGame = () => {
  frameIndex = 0;
  scoreValue = 0;
  ordemNivel = 1;
  velocidade = 1;
  updateScoreElements();

  
  loop = setInterval(() => {
    const orcsPosition = orcs.offsetLeft;
    const jumperPosition = +window.getComputedStyle(jumper).bottom.replace('px', '');

    const logs = [
      `log{`,
      `__Orcs Position: ${orcsPosition}`,
      `__Jumper Position: ${jumperPosition}`,
      `__Orcs src: ${orcs.src}`,
      `__Jumper src: ${jumper.src}`,
      `}`,
    ];

    updateConsoleLog(logs);
    
    if (frameIndex < 6) {
      jumper.src = `./images/jumper/_PNG/1_KNIGHT/_RUN/_RUN_00${frameIndex}.png`;
      orcs.src = `./images/Orcs/_PNG/1_ORK/RUN/RUN_00${frameIndex}.png`;
      frameIndex++;
    } else {
      frameIndex = 0;
    }

    if (orcsPosition <= 180 && orcsPosition > 0 && jumperPosition < 80) {
      orcs.style.animation = 'none';
      jumper.style.animation = 'none';

      orcs.style.left = `${orcsPosition}px`;

      jumper.src = './images/Jumper/_PNG/1_KNIGHT/_DIE/_DIE_006.png';
      jumper.style.width = '180px';

      orcs.src = `./images/Orcs/_PNG/1_ORK/ATTAK/ATTAK_00${frameIndex}.png`;
      orcs.style.width = '120px';

      if (frameIndex < 6) {
        frameIndex++;
      } else {
        frameIndex = 0;
      }

      clearInterval(loop);

      const continueLoop = setInterval(() => {
        if (frameIndex < 6) {
          orcs.src = `./images/Orcs/_PNG/1_ORK/ATTAK/ATTAK_00${frameIndex}.png`;
          orcs.style.width = '120px';
          orcs.style.marginLeft = '-50px';
          frameIndex++;
        } else {
          frameIndex = 0;
        }
      }, 50);

      document.addEventListener('keydown', () => {
        location.reload();
        startGame();
      });
    } else {
      scoreValue++;
      checkScore();
      updateScoreElements();
    }
  }, 30);
};

document.addEventListener('keydown', jump);

startGame();
