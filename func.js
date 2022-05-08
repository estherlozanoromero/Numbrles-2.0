document.addEventListener("DOMContentLoaded", () => {
  let guessedNumbers = [[]];
  let availableSpace = 1;
  let po = 1;
  let num;
  let maxSol;
  let Number;
  let guessedCount = 0;
  const set = new Set();
  let nums= [0];
	let sols = new Array(50).fill(0);
	let muldiv = new Array(50).fill(0);
  get_new_game();

  //TIMER

  var tim = document.getElementById('hms');
  var sec = 0;
  var min = 0;
  var hrs = 0;
  var t;

  function tick(){
      sec++;
      if (sec >= 60) {
          sec = 0;
          min++;
          if (min >= 60) {
              min = 0;
              hrs++;
          }
      }
  }
  function add() {
      tick();
      tim.textContent = (hrs > 9 ? hrs : "0" + hrs) + ":" + (min > 9 ? min : "0" + min) + ":" + (sec > 9 ? sec : "0" + sec);
      timer();
  }

  function timer() {
      t = setTimeout(add, 1000);
  }
  function stop() {
      clearTimeout(t);
  }
  
  function reset() {
    tim.textContent = "00:00:00";
    sec = 0; min = 0; hrs = 0;
    clearTimeout(t);
  }

//////////////////////////////////////////////

  const keys_1 = document.querySelectorAll(".number-row button");
  const keys_2 = document.querySelectorAll("op-row button");


  function getCurrentNumberArr() {
    const numberOfGuessedNumbers = guessedNumbers.length;
    return guessedNumbers[numberOfGuessedNumbers - 1];
  }

  function updateGuessedNumbers(Number) {
    const currentNumberArr = getCurrentNumberArr();

    if (currentNumberArr && currentNumberArr.length < 5) {
      if (currentNumberArr.length % 2 == 0 && Number != "+" && Number != "-" && Number != "*" && Number != "/") {
        currentNumberArr.push(Number);
        const availableSpaceEl = document.getElementById(String(availableSpace));
        availableSpace = availableSpace + 1;
        availableSpaceEl.textContent = Number;
      }
      else if (currentNumberArr.length % 2 == 1 && (Number == "+" || Number == "-" || Number == "*" || Number == "/")) {
        currentNumberArr.push(Number);
        const availableSpaceEl = document.getElementById(String(availableSpace));
        availableSpace = availableSpace + 1;
        availableSpaceEl.textContent = Number;
      }
    }
  }

	function ordenar_operacio(x, a, y, b, z) {
		if (a == "*") a = "x";
		if (b == "*") b = "x";
		if (isNaN(z)) {
			if (a == "+" || a == "x") {
				let v = [x,y];
				v.sort();
				return v[0].toString() + a + v[1].toString();
			}
			else  return y.toString() + a + z.toString();
		}
		else if (a == b) {
			if (a == "+" || a == "x") {
				let v = [x,y,z];
				v.sort();
				return v[0].toString() + a + v[1].toString() + b + v[2].toString();
			}
			else {
				let v = [y,z];
				v.sort();
				return x.toString() + a + v[0].toString() + b + v[1].toString();
			}
		}
		else if (a == "/" || b == "/") {
			if (a == "-" || b == "-") return x.toString() + a + y.toString() + b + z.toString();
			else if (a == "+" || b == "+") {
				if (b == "+") return  z.toString() + b + x.toString() + a + y.toString();
				else return x.toString() + a + y.toString() + b + z.toString();
			}
			else {
				if (a == "/") {
					let v = [x,z];
					v.sort();
					return v[0].toString() + b + v[1].toString() + a + y.toString();
				}
				else {
					let v = [x,y];
					v.sort();
					return v[0].toString() + a + v[1].toString() + b + z.toString();
				}
			}
		}
		else if (a == "x" || b == "x") {
			if (a == "-" || b == "-") {
				if (a == "-") {
					let v = [z,y];
					v.sort();
					return  x.toString() + a + v[0].toString() + b + v[1].toString();
				}
				else  {
					let v = [x,y];
					v.sort();
					return  v[0].toString() + a + v[1].toString() + b + z.toString();
				}
			}
			else if (a == "+" || b == "+") {
				if (b == "+") {
					let v = [x,y];
					v.sort();
					return  z.toString() + b + v[0].toString() + a + v[1].toString();
				}
				else {
					let v = [z,y];
					v.sort();
					return  x.toString() + a + v[0].toString() + b + v[1].toString();
				}
			}
		}
		else {
			if (a == "-") {
				let v = [x,z];
				v.sort();
				return v[0].toString() + b + v[1].toString() + a + y.toString();
			}
			else {
				let v = [x,y];
				v.sort();
				return v[0].toString() + a + v[1].toString() + b + z.toString();
			}
		}
	}

  function handleSubmitNumber() {
    const cna = getCurrentNumberArr();

		if (cna.length == 1) result = parseInt(cna[0]);
		else if (cna.length == 3) {
			if (cna[1] == "+") result = parseInt(cna[0]) + parseInt(cna[2]);
			if (cna[1] == "-") result = parseInt(cna[0]) - parseInt(cna[2]);
			if (cna[1] ==  "*") result = parseInt(cna[0]) * parseInt(cna[2]);
			if (cna[1] == "/") result = parseInt(cna[0]) / parseInt(cna[2]);
		}
		else if (cna.length == 5) {
			if (cna[1] == "+" && cna[3] == "+") result = parseInt(cna[0]) + parseInt(cna[2]) + parseInt(cna[4]);
			else if (cna[1] == "+" && cna[3] == "-") result = parseInt(cna[0]) + parseInt(cna[2]) - parseInt(cna[4]);
			else if (cna[1] == "+" && cna[3] == "*") result = parseInt(cna[0]) + parseInt(cna[2]) * parseInt(cna[4]);
			else if (cna[1] == "+" && cna[3] == "/") result = parseInt(cna[0]) + parseInt(cna[2]) / parseInt(cna[4]);
			else if (cna[1] == "-" && cna[3] == "+") result = parseInt(cna[0]) - parseInt(cna[2]) + parseInt(cna[4]);
			else if (cna[1] == "-" && cna[3] == "-") result = parseInt(cna[0]) - parseInt(cna[2]) - parseInt(cna[4]);
			else if (cna[1] == "-" && cna[3] == "*") result = parseInt(cna[0]) - parseInt(cna[2]) * parseInt(cna[4]);
			else if (cna[1] == "-" && cna[3] == "/") result = parseInt(cna[0]) - parseInt(cna[2]) / parseInt(cna[4]);
			else if (cna[1] == "*" && cna[3] == "+") result = parseInt(cna[0]) * parseInt(cna[2]) + parseInt(cna[4]);
			else if (cna[1] == "*" && cna[3] == "-") result = parseInt(cna[0]) * parseInt(cna[2]) - parseInt(cna[4]);
			else if (cna[1] == "*" && cna[3] == "*") result = parseInt(cna[0]) * parseInt(cna[2]) * parseInt(cna[4]);
			else if (cna[1] == "*" && cna[3] == "/") result = parseInt(cna[0]) * parseInt(cna[2]) / parseInt(cna[4]);
			else if (cna[1] == "/" && cna[3] == "+") result = parseInt(cna[0]) / parseInt(cna[2]) + parseInt(cna[4]);
			else if (cna[1] == "/" && cna[3] == "-") result = parseInt(cna[0]) / parseInt(cna[2]) - parseInt(cna[4]);
			else if (cna[1] == "/" && cna[3] == "*") result = parseInt(cna[0]) / parseInt(cna[2]) * parseInt(cna[4]);
			else if (cna[1] == "/" && cna[3] == "/") result = parseInt(cna[0]) / parseInt(cna[2]) / parseInt(cna[4]);
		}

    if (result === num && cna.length != 2 && cna.length != 4) {
      
		let new_sol = ordenar_operacio(parseInt(cna[0]), cna[1], parseInt(cna[2]), cna[3], parseInt(cna[4]));

      if (set.has(new_sol)) window.alert("This solution already exists!");
      else {
        ++guessedCount;
        set.add(new_sol);
        if (guessedCount==maxSol){
          window.alert("Congratulations! You finished in " + tim.textContent);
          reset();
          get_new_game();
        }
        let score = document.getElementById("score");
        score.textContent = guessedCount+"/"+maxSol;
        let sol = document.getElementById("solutions-found");
        if (po == 1){
          po = 0;
        }
        else {
          sol.textContent += " · ";
        }
        sol.textContent += new_sol;
        
      }

    } else {
      window.alert("It isn't the goal " + num + "! Your result is " + result + ". You have to practice more!");
    }
    for (let i = 1; i < 6; ++i) {
      handleDeleteNumber();
    }
  }

  function clear_solution() {
    let sol = document.getElementById("solutions-found");
    sol.textContent = " ";

  }

	function find_set() {
		nums = [0];
		for (let i = 1; i < 10; ++i) {
			nums[i]=Math.floor(Math.random()*20) + 1;
			let j = 0;
			while (j < i) {
				if (nums[j]==nums[i])  {
					nums[i]=Math.floor(Math.random()*20) + 1;
					j = 0;
				} else ++j;
			}
		}
		sols = new Array(50).fill(0);
		muldiv = new Array(50).fill(0);

		for (let i = 0; i < 10; ++i) {
			for (let j = 0; j < 10; ++j) {
				for (let k = 0; k < 10; ++k) {
					if (nums[i]+nums[j]+nums[k] < 50) sols[nums[i]+nums[j]+nums[k]]++;
					if (nums[i]+nums[j]-nums[k] < 50 && nums[i]+nums[j]-nums[k] > 0) sols[nums[i]+nums[j]-nums[k]]++;
					if (nums[i]+nums[j]*nums[k] < 50) {
						sols[nums[i]+nums[j]*nums[k]]++; 
						muldiv[nums[i]+nums[j]*nums[k]]++;
					}
					if (nums[i]+nums[j]/nums[k] % 1 == 0 && nums[i]+nums[j]/nums[k] < 50) {
						sols[nums[i]+nums[j]/nums[k]]++; 
						muldiv[nums[i]+nums[j]/nums[k]]++;
					}
					if (nums[i]-nums[j]-nums[k] < 50 && nums[i]-nums[j]-nums[k] > 0) sols[nums[i]-nums[j]-nums[k]]++;
					if (nums[i]-nums[j]*nums[k] < 50 && nums[i]-nums[j]*nums[k] > 0) {
						sols[nums[i]-nums[j]*nums[k]]++; 
						muldiv[nums[i]-nums[j]*nums[k]]++;
					}
					if (nums[i]-nums[j]/nums[k] % 1 == 0 && nums[i]-nums[j]/nums[k] < 50 && nums[i]-nums[j]/nums[k] > 0) {
						sols[nums[i]-nums[j]/nums[k]]++;
						muldiv[nums[i]-nums[j]/nums[k]]++;
					}
					if (nums[i]*nums[j]-nums[k] < 50 && nums[i]*nums[j]-nums[k] > 0) {
						sols[nums[i]*nums[j]-nums[k]]++;
						muldiv[nums[i]*nums[j]-nums[k]]++;
					}
					if (nums[i]*nums[j]*nums[k] < 50) {
						sols[nums[i]*nums[j]*nums[k]]++;
						muldiv[nums[i]*nums[j]/nums[k]]++;
					}
					if (nums[i]*nums[j]/nums[k] % 1 == 0 && nums[i]*nums[j]/nums[k] < 50 && nums[i]*nums[j]/nums[k] > 0) {
						sols[nums[i]*nums[j]/nums[k]]++;
						muldiv[nums[i]*nums[j]/nums[k]]++;
					}
					if (nums[i]/nums[j]-nums[k] % 1 == 0 && nums[i]/nums[j]-nums[k] < 50 && nums[i]/nums[j]-nums[k] > 0) {
						sols[nums[i]/nums[j]-nums[k]]++;
						muldiv[nums[i]/nums[j]-nums[k]]++;
					}
					if (nums[i]/nums[j]/nums[k] % 1 == 0 && nums[i]/nums[j]/nums[k] < 50 && nums[i]/nums[j]/nums[k] > 0) {
						sols[nums[i]/nums[j]/nums[k]]++;
						muldiv[nums[i]/nums[j]/nums[k]]++;
					}
				}
			}
		}
	}

  function get_new_game() {
    timer();
    clear_solution();
    po = 1;
    
    let max = 0;
		let max_mul_div = 0;
		let max_p = 0;

		while (max == 0) {
			find_set();
			for (let i = 2; i < 50; ++i) {
				if(muldiv[i] > max_mul_div && !nums.includes(i) && sols[i] > 10 && sols[i] < 20) {
					max = sols[i];
					max_mul_div = muldiv[i];
					max_p = i;
				}
			}
		}

		solucions = new Set;
		for (let i = 0; i < 10; ++i) {
			for (let j = 0; j < 10; ++j) {
				for (let k = 0; k < 10; ++k) {
					let s = ordenar_operacio(nums[i],"+",nums[j],"+", nums[k]);
					if (nums[i]+nums[j]+nums[k] == max_p && !solucions.has(s)) solucions.add(s);
					s = ordenar_operacio(nums[i],"+",nums[j],"-", nums[k]);
					if (nums[i]+nums[j]-nums[k] == max_p && !solucions.has(s)) solucions.add(s);
					s = ordenar_operacio(nums[i],"+",nums[j],"*", nums[k]);
					if (nums[i]+nums[j]*nums[k] == max_p && !solucions.has(s)) solucions.add(s);
					s = ordenar_operacio(nums[i],"+",nums[j],"/", nums[k]);
					if (nums[i]+nums[j]/nums[k] == max_p && !solucions.has(s)) solucions.add(s);
					s = ordenar_operacio(nums[i],"-",nums[j],"-", nums[k]);
					if (nums[i]-nums[j]-nums[k] == max_p && !solucions.has(s)) solucions.add(s);
					s = ordenar_operacio(nums[i],"-",nums[j],"*", nums[k]);
					if (nums[i]-nums[j]*nums[k] == max_p && !solucions.has(s)) solucions.add(s);
					s = ordenar_operacio(nums[i],"-",nums[j],"/", nums[k]);
					if (nums[i]-nums[j]/nums[k] == max_p && !solucions.has(s)) solucions.add(s);
					s = ordenar_operacio(nums[i],"*",nums[j],"-", nums[k]);
					if (nums[i]*nums[j]-nums[k] == max_p && !solucions.has(s)) solucions.add(s);
					s = ordenar_operacio(nums[i],"*",nums[j],"*", nums[k]);
					if (nums[i]*nums[j]*nums[k] == max_p && !solucions.has(s)) solucions.add(s);
					s = ordenar_operacio(nums[i],"*",nums[j],"/", nums[k]);
					if (nums[i]*nums[j]/nums[k] == max_p && !solucions.has(s)) solucions.add(s);
					s = ordenar_operacio(nums[i],"/",nums[j],"-", nums[k]);
					if (nums[i]/nums[j]-nums[k] == max_p && !solucions.has(s)) solucions.add(s);
					s = ordenar_operacio(nums[i],"/",nums[j],"/", nums[k]);
					if (nums[i]/nums[j]/nums[k] == max_p && !solucions.has(s)) solucions.add(s);
				}
			}
		}

    for (let i = 1; i < 10; ++i) {
      let id = "A" + i;
      let a = document.getElementById(id);
      a.textContent = nums[i];
      a.setAttribute("data-key", nums[i]);
    }
      let r = document.getElementById("goal");
      num = max_p;
      maxSol = solucions.size;
      guessedCount = 0;
      r.textContent = num;
      let score = document.getElementById("score");
      score.textContent = guessedCount+"/"+maxSol;
      set.clear();
      for(let i = 0; i < 5; i++) {
        handleDeleteNumber();

      }
      
  }

  function createSquares() {
    const gameBoard = document.getElementById("board");
    for (let index = 0; index < 5; index += 1) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.setAttribute("id", index + 1);
      gameBoard.appendChild(square);
    }
  }

  function handleDeleteNumber() {
    const currentNumberArr = getCurrentNumberArr();
    if (availableSpace>1) {
      const lastNumberEl = document.getElementById(String(availableSpace - 1));
      currentNumberArr.pop();
      guessedNumbers[guessedNumbers.length - 1] = currentNumberArr;
      lastNumberEl.textContent = "";
      availableSpace = availableSpace - 1;
    }
  }

  for (let i = 0; i < keys_1.length; i++) {
    keys_1[i].onclick = ({ target }) => {

      const Number = target.getAttribute("data-key");
      
      if (Number === "enter") {
        handleSubmitNumber();
        return;
      }

      if (Number === "del") {
        handleDeleteNumber();
        return;
      }

      if (Number === "new-game") {
        reset();
        console.log(tim.textContent);
        get_new_game();
        return;
      }

      updateGuessedNumbers(Number);
    };
  }

  let he = document.getElementById("hel");
  he.onclick = ({ target }) => window.alert("Combine the numbers with adds and substracts in order to achieve the goal. Any possibility is allowed: you can use one, two or three numbers.  Explore mental calculus and find all the permutations!");
  
});
