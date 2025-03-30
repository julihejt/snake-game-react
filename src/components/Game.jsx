import { useEffect, useState } from "react";

const gridSize = 20;

export default function Game() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameInterval, setGameInterval] = useState(null);
  const [highScore, setHighScore] = useState(0);
  const [direction, setDirection] = useState("right");
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [gameSpeedDelay, setGameSpeedDelay] = useState(200);
  const [food, setFood] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false); // Track if game is over

  const increaseSpeed = () => {
    // Increase speed every 3 points, and reduce speed by 15ms, but don't go below 100ms.
    if (snake.length % 3 === 0 && gameSpeedDelay > 100) {
      const newSpeed = gameSpeedDelay - 15;
      setGameSpeedDelay(newSpeed);
    }
  };

  const isFoodOnSnake = (position) => {
    return snake.some(
      (segment) => segment.x === position.x && segment.y === position.y
    );
  };

  const generateFood = () => {
    let newFoodPosition;
    do {
      newFoodPosition = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize),
      };
    } while (isFoodOnSnake(newFoodPosition));
    return newFoodPosition;
  };

  const checkCollision = (newSnake) => {
    const head = newSnake[0];
    if (head.x < 0 || head.y < 0 || head.x >= gridSize || head.y >= gridSize) {
      gameOver();
      return;
    }
    for (let i = 1; i < newSnake.length; i++) {
      if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
        gameOver();
        return;
      }
    }
  };

  const gameOver = () => {
    console.log("Game Over triggered"); // Debugging message
    if (gameInterval) clearInterval(gameInterval);
    setGameStarted(false);
    setIsGameOver(true); // Make sure the state updates to show game over screen

    if (snake.length > highScore) {
      setHighScore(snake.length);
    }

    setSnake([{ x: 10, y: 10 }]);
    setDirection("right");
    setGameSpeedDelay(200);
  };

  const move = () => {
    setSnake((prevSnake) => {
      const head = { ...prevSnake[0] };
      switch (direction) {
        case "up":
          head.y--;
          break;
        case "down":
          head.y++;
          break;
        case "left":
          head.x--;
          break;
        case "right":
          head.x++;
          break;
      }
      const newSnake = [head, ...prevSnake];
      if (food && head.x === food.x && head.y === food.y) {
        setFood(generateFood());
        increaseSpeed();
      } else {
        newSnake.pop();
      }
      checkCollision(newSnake);
      return newSnake;
    });
  };

  const startGame = () => {
    console.log("Game Started"); // Debugging message
    setGameStarted(true);
    setIsGameOver(false); // Hide game over screen
    setSnake([{ x: 10, y: 10 }]);
    setDirection("right");
    setGameSpeedDelay(200);
    setFood(generateFood());

    if (gameInterval) clearInterval(gameInterval);
    const interval = setInterval(move, gameSpeedDelay);
    setGameInterval(interval);
  };

  const handleKeyPress = (event) => {
    if (!gameStarted && (event.code === "Space" || event.key === " ")) {
      startGame();
    } else {
      switch (event.key) {
        case "ArrowUp":
          if (direction !== "down") setDirection("up");
          break;
        case "ArrowDown":
          if (direction !== "up") setDirection("down");
          break;
        case "ArrowLeft":
          if (direction !== "right") setDirection("left");
          break;
        case "ArrowRight":
          if (direction !== "left") setDirection("right");
          break;
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [direction, gameStarted]);

  useEffect(() => {
    if (gameStarted) {
      if (gameInterval) clearInterval(gameInterval);
      const interval = setInterval(move, gameSpeedDelay);
      setGameInterval(interval);
    } else {
      if (gameInterval) clearInterval(gameInterval);
    }

    return () => {
      if (gameInterval) clearInterval(gameInterval);
    };
  }, [gameStarted, direction, gameSpeedDelay]);

  return (
    <div id="game-container" className="game-container">
      {!gameStarted && !isGameOver && (
        <img id="logo" src="./src/img/snakeLogo.png" alt="snake-logo" />
      )}

      {!gameStarted && !isGameOver && (
        <h1 id="instruction-text">Press space bar to start the game</h1>
      )}

      <div className="profile-icon" id="profile-icon">
        <img src="./src/img/profileIcon.png" alt="Profile Icon" />
      </div>

      <div>
        <div className="scores">
          <h1>Score: {snake.length + 1}</h1>
          <h1>HighScore: {highScore}</h1>
        </div>
        <div className="game-border-1">
          <div className="game-border-2">
            <div className="game-border-3">
              <div id="game-board">
                {gameStarted &&
                  snake.map((segment, index) => (
                    <div
                      key={index}
                      className="snake"
                      style={{
                        gridColumnStart: segment.x + 1,
                        gridRowStart: segment.y + 1,
                      }}
                    ></div>
                  ))}
                {food && (
                  <div
                    className="food"
                    style={{
                      gridColumnStart: food.x + 1,
                      gridRowStart: food.y + 1,
                    }}
                  ></div>
                )}
              </div>
              {isGameOver && (
                <div id="game-over-screen" className="game-over">
                  <h2>Game Over</h2>
                  <p>Your Score: {snake.length}</p>
                  <button onClick={startGame}>Restart</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <footer id="footer">Developed by Julie Hejtmanek</footer>
    </div>
  );
}
