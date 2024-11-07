const imagesToLoad = [
  'images/1.jpg',
  'images/6.jpg',
  'images/2.jpg',
  'images/5.jpg',
  'images/3.jpg',
  'images/4.jpg',
  'images/7.jpg'
];
const loadedImages = [];

function preloadImages() {
  return new Promise((resolve) => {
    let loadedCount = 0;
    imagesToLoad.forEach((imageUrl) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        loadedImages.push(img);
        if (loadedCount === imagesToLoad.length) {
          resolve();
        }
      };
      img.src = imageUrl;
    });
  });
}


// 模拟宝藏地图API
class TreasureMap {
  static getInitialClue() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("在古老的图书馆里找到了第一个线索...");
      }, 1000);
    });
  }

  static decodeAncientScript(clue) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!clue) {
          reject("没有线索可以解码!");
        }
        resolve("解码成功!宝藏在一座古老的神庙中...");
      }, 1500);
    });
  }

  static searchTemple(location) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();
        if (random < 0.5) {
          reject("糟糕!遇到了神庙守卫!");
        }
        resolve("找到了一个神秘的箱子...");
      }, 2000);
    });
  }

  static openTreasureBox() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("恭喜!你找到了传说中的宝藏!");
      }, 1000);
    });
  }

  static encounterMagicMaze() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("遇到神庙守卫，需要马上逃跑...");
      }, 1200);
    });
  }

  static exitMagicMaze() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("成功逃跑！进入大殿...");
      }, 1000);
    });
  }
};

const processImage = document.getElementById('process-image');

async function findTreasureWithAsyncAwait() {
  try {
    await preloadImages();
    document.getElementById('game-message').textContent = '寻宝进度：寻找第一个线索...';
    processImage.src = 'images/1.jpg';
    const clue = await TreasureMap.getInitialClue();
    console.log(clue);
    document.getElementById('game-message').textContent = "寻宝进度：解码线索...";
    processImage.src = 'images/6.jpg';
    const location = await TreasureMap.decodeAncientScript(clue);
    console.log(location);
    document.getElementById('game-message').textContent = "寻宝进度：前往神庙...";
    processImage.src = 'images/2.jpg';
    const box = await TreasureMap.searchTemple(location);
    console.log(box);
    document.getElementById('game-message').textContent = "寻宝进度：遇到神庙守卫...";
    processImage.src = 'images/5.jpg';
    const mazeMessage = await TreasureMap.encounterMagicMaze();
    console.log(mazeMessage);
    document.getElementById('game-message').textContent = "成功逃跑，进入大殿...";
    processImage.src = 'images/7.jpg';
    const exitMaze = await TreasureMap.exitMagicMaze();
    console.log(exitMaze);
    document.getElementById('game-message').textContent = "寻宝进度：发现宝箱...";
    processImage.src = 'images/3.jpg';
    document.getElementById('game-message').textContent = "寻宝进度：找到宝藏...";
    processImage.src = 'images/4.jpg';
    const treasure = await TreasureMap.openTreasureBox();
    console.log(treasure);
    document.getElementById('game-message').textContent = "寻宝进度：宝藏找到！";
  } catch (error) {
    console.error("任务失败:", error);
    document.getElementById('game-message').textContent = "寻宝进度：任务失败！";
  }
}

function startTreasureHunt() {
  findTreasureWithAsyncAwait();
}

document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('start-button');
  startButton.addEventListener('click', startTreasureHunt);
});