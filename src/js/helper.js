export const helpers = {
  methods: {
    shuffle (arr) {
      let array = JSON.parse(JSON.stringify(arr))
      let counter = array.length
      // While there are elements in the array
      while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter)
        // Decrease counter by 1
        counter--
        // And swap the last element with it
        let temp = array[counter]
        array[counter] = array[index]
        array[index] = temp
      }
      return array
    },
    quick_fit (args) {
      let {element, container,  max} = args;
      container = container || element.parentElement;
      let larger = Math.max(element.offsetWidth, element.offsetHeight)
      let ratio = (container.offsetWidth) / (larger * 1.1)
      let toUse = ratio > max ? max : ratio;
      element.style.fontSize = toUse + 'em'
      return toUse
    },
    randomLetterIndex () {
      return Math.floor(Math.random() * this.characters.length)
    },
    generator( args ) {
      let { w, h, characters, minSteps, maxSteps, numCharacters } = args;
      const total = (w * h);
      if (total % 2 !== 0) {
        console.log('bad input, odd tiles');
        return;
      }
      if (!numCharacters || numCharacters > (total-1)/2){
        numCharacters = (total-1)/2;
      }

      const numEmpty = (total-2) - (numCharacters * 2);
      const charInds = this.shuffle(Array.apply(null, {length: characters.length}).map(Number.call, Number)).slice(0,numCharacters);
      
      let unshuffledBoard = [];
      charInds.forEach(index => {
        unshuffledBoard.push({
          key: index,
          displayText: characters[index][0]
        },{
          key: index,
          displayText: characters[index][1]
        })
      })
      for (var i = 0; i < numEmpty; i ++){
        unshuffledBoard.push('');
      }
      // unshuffledBoard.push('END');
      // unshuffledBoard.unshift('START');
      let shuffledBoard;
      let minSolve = [];
      let count = 0;
      const attempLoop = 2000;
      while ((minSolve.length <= minSteps) || (minSolve.length > maxSteps)) {
        if (count > attempLoop) {
          console.log( `Cannot find solution length ${minSteps} in ${attempLoop} attempts`);
          minSteps --;
          count = 0;
        }
        shuffledBoard = this.shuffle(unshuffledBoard);
        shuffledBoard.push('END');
        shuffledBoard.unshift('START');
        minSolve = this.isSolveable(shuffledBoard, w);
        count ++;
      }
      console.log(minSolve)
      return {
        board: this.toMatrix(shuffledBoard, w),
        solution: minSolve,
      }
    },
    toMatrix(arr, width) {
      return arr.reduce((rows, key, index) => (index % width === 0) ? [...rows, [key]] : [...rows.slice(0,-1), [...rows[rows.length -1], key]], []);
    },
    isSolveable(board, w) {
      let startIndex;
      let boardPaths = board.map((b,index) => {
        let ret = {
          visited: false,
          path:[],
          isGoal:false,
          index: index,
        };
        if (typeof b === 'object') {
          ret.teleporter = true;
          return ret;
        }
        if (b === 'END'){
          ret.isGoal = true;
          return ret;
        }
        if (b === 'START') {
          startIndex = index;
          ret.visited = true;
          ret.path = [index]
          return ret;
        }
        return ret;
      })
      let queue = [boardPaths[startIndex]];
      while (queue.length) {
        let currentLocation = queue.shift();
        let currentIndex = currentLocation.index;
        if (currentLocation.teleporter) {
          const key = board[currentIndex].key;
          currentIndex = board
            .findIndex((t, i) => {
              return (t.key === key) && (i !== currentIndex)
            })
        }
        let moves = this.movesForPosition(currentIndex, w, board.length)
        for ( var it = 0; it < moves.length; it++ ){
          let move = moves[it];
          let nextLocation = boardPaths[move];
          if (nextLocation.isGoal) {
            let finalPath = currentLocation.path.slice()
            finalPath.push(nextLocation.index)
            return finalPath;
          }
          if (!nextLocation.visited){
            nextLocation.visited = true;
            let newPath = currentLocation.path.slice()
            newPath.push(move)
            nextLocation.path = newPath
            queue.push(nextLocation)
          }
        }
      }
      return [];
    },
    recursiveSolve(b, w, current, win, path) {
      path = path ? path : [current];
      let m = this.movesForPosition(current, w, b.length);
      if (m.includes(win)) {
        return win;
      }
      m.forEach( i => {
        if (!path.includes(i)) {
          path.push(i)
          if (this.recursiveSolve(b, w, i, win, path)) {
            return path;
          }
        }
      })
    },
    // index
    //ind +1 +recursige
    movesForPosition(index, w, t) {
      let moves = [];
      const i = index;
      if ( !this.wallToLeft(i,w) ){
        moves.push(i-1)
      }
      if ( !this.wallToRight(i,w) ){
        moves.push(i+1)
      }
      if ( !this.wallAbove(i,w) ){
        moves.push(i-w)
      }
      if ( !this.wallBelow(i,w,t) ){
        moves.push(i+w)
      }
      return moves
    },
    wallToLeft(index, w) {
      return index % w === 0;
    },
    wallToRight(index, w) {
      return (index + 1) % w === 0;
    },
    wallAbove(index, w) {
      return index < w;
    },
    wallBelow(index, w, total) {
      return index >= total - w
    },
  },
}
