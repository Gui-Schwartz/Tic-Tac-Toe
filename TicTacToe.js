class GameManager {
     static count = 0;
    
     createNewGame(){
        const games  = document.createElement("div");
        
        const newGameContainer = document.createElement("div");
        newGameContainer.classList.add("game-container");

        const newGame1 = new JogoDaVelha();
        
        this.count = 0;
        
        const tabuleiro = document.createElement("div");                                            
        
        tabuleiro.classList.add("tabuleiro");
        tabuleiro.style.display = "grid";
        tabuleiro.style.gridTemplateColumns = "repeat(3, 40px)";
        tabuleiro.style.gridGap = "7px";
        tabuleiro.style.margin = "auto";
        tabuleiro.style.width = "max-content";
        
        const countDisplay = document.createElement("div")
        countDisplay.textContent = `Rodadas: ${this.count}` 
        countDisplay.style.gridGap = "7px";
        countDisplay.style.margin = "auto";
        countDisplay.style.width = "max-content";
        countDisplay.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        countDisplay.style.color = "black";
        countDisplay.style.border = "none";
        countDisplay.style.padding = "10px 20px";

        for(let i =0; i < 9; i++){
            if(this.count < 9){
                const btn = document.createElement("button");
                btn.dataset.index = i;                                          //atribui o elemento data-index com o valor de i ao botão que foi criado, assim tem como rastrear o botão 
                btn.innerText = "";                                      
                btn.style.width = "30px";
                btn.style.height = "30px";
                btn.style.fontSize = "20px";
                btn.style.cursor = "pointer";           
                
                btn.addEventListener("click", (e)=>{
                    const index = e.target.dataset.index;
                    const x = Math.floor(index/3);
                    const y = index % 3;
                    
                    this.count++;
                    countDisplay.textContent = `Rodada: ${this.count}`
                    
                    if(newGame1.jogoEncerrado){                                       //confere se o jogo finalizou, caso seja verdadeiro imprime a mensagem de jogo de fim de jogo 
                        alert("jogo finalizado por favor reinicie para seguir")
                        return;
                       };
    
                       try {
                        newGame1.jogar(x, y);
                        e.target.innerText = newGame1.tabuleiro[x][y];
                        newGame1.winGame(this.count);
                        countDisplay.textContent = `Rodada: ${this.count}`
                     }catch (error){   
                        console.log(error)
                        alert ("InvalidOperationException: Posição já ocupada")
                        new InvalidOperationException("Posição ja ocupada ");
                     }
                }
            )
            tabuleiro.appendChild(btn);                                       //adiciona os botões a um grupo de elementos 
        }
           
        newGameContainer.appendChild(tabuleiro);
        newGameContainer.appendChild(countDisplay);
        document.getElementById("main-container").appendChild(newGameContainer);

    }
}
}

const addElement =()=>{                                                                            //Cria o botão Restart dinamicamente e seta as características do HTML e
    const resetBtn  = document.createElement("button");
    const newGameBtn = document.createElement("button");

    newGameBtn.innerText = "New Game"
    newGameBtn.id = "new-game-button"
    newGameBtn.addEventListener("click", ()=>{
        const game = new GameManager()
        game.createNewGame();
    })
    resetBtn.innerText = "Restart";
    resetBtn.id = "restart-button";
    resetBtn.addEventListener("click",()=>{
        location.reload();
    })
    document.body.appendChild(resetBtn);                                                           //Insere o botão reset dentro do elemento body do html
    document.body.appendChild(newGameBtn)

    resetBtn.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    resetBtn.style.color = "black";
    resetBtn.style.border = "none";
    resetBtn.style.padding = "10px 20px";
    resetBtn.style.borderRadius = "8px";
    resetBtn.style.fontSize = "16px";
    resetBtn.style.cursor = "pointer";
    resetBtn.style.textAlign = "center";
    resetBtn.style.margin = "20px auto 15px auto"
    resetBtn.style.display = "block";
    resetBtn.style.marginLeft = "auto";
    resetBtn.style.marginRight = "auto";

    newGameBtn.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    newGameBtn.style.color = "black";
    newGameBtn.style.border = "none";
    newGameBtn.style.padding = "10px 20px";
    newGameBtn.style.borderRadius = "8px";
    newGameBtn.style.fontSize = "16px";
    newGameBtn.style.cursor = "pointer";
    newGameBtn.style.textAlign = "center";
    newGameBtn.style.margin = "20px auto 15px auto"
    newGameBtn.style.display = "block";
    newGameBtn.style.marginLeft = "auto";
    newGameBtn.style.marginRight = "auto";
}
document.body.onload = addElement;                                                                  // carrega um elemento body quando a página é aberta

class ObterVencedor {                                                                               //Classe que confere se algumas das 8 posições vencedoras são verdadeiras (tem o mesmo caractere entre uma delas)
    constructor(tabuleiro){
            this.tabuleiro = tabuleiro    
        }
        verificador(count){
            
            const t = this.tabuleiro
                
            if(t[0][0] !== "" && t[0][0] === t[0][1] && t[0][1] === t[0][2]){
                let valor = t[0][0];
                alert(`O vencedor é: ${valor}`)
                return true
            }else if(t[1][0] !== "" && t[1][0] === t[1][1] && t[1][1] === t[1][2]){
                let valor = t[1][0];
                alert(`O vencedor é: ${valor}`)
                return true
            }else if(t[2][0] !== "" && t[2][0] === t[2][1] && t[2][1] === t[2][2]){
                let valor = t[2][0];
                alert(`O vencedor é: ${valor}`)
                return true
            }else if(t[0][0] !== "" && t[0][0] === t[1][0] && t[1][0] === t[2][0]){
                let valor = t[0][0];
                alert(`O vencedor é: ${valor}`)
                return true
            }else if(t[0][1] !== "" && t[0][1] === t[1][1] && t[1][1] === t[2][1]){
                let valor = t[0][1];
                alert(`O vencedor é: ${valor}`)
                return true
            }else if(t[0][2] !== "" && t[0][2] === t[1][2] && t[1][2] === t[2][2]){
                let valor = t[0][2];
                alert(`O vencedor é: ${valor}`)
                return true
            }else if(t[0][0] !== "" && t[0][0] === t[1][1] && t[1][1] === t[2][2]){
                let valor = t[0][0];
                alert(`O vencedor é: ${valor}`)
                return true
            }else if(t[0][2] !== "" && t[0][2] === t[1][1] && t[1][1] === t[2][0]){
                let valor = t[0][2];
                alert(`O vencedor é: ${valor}`)
                return true
            }else if(count === 9){
                alert(`Empate, nenhum jogador ganhou, para jogar novamente clique no botão Restart`)
                return null;
            }
    }
}

class InvalidOperationException extends Error{                                                        //Classe que gera a mensagem de erro de posição ocupada
    constructor(message){
        super(message);
        this.name = "InvalidOperationException";
    }
}

class ArgumentOutOfRangeException extends Error{                                                     // Classe que gera a mensagem de erro (se está dentro do range do jogo 3x3)
    constructor(message){
        super(message);
        this.name = "ArgumentOutOfRangeException";
    }
}

class JogoDaVelha{
    constructor(){
        this.tabuleiro = [
            ["","",""],
            ["","",""],
            ["","",""]
        ];
        this.vez = "X";
        this.vezX = "X";
        this.vezO = "O";
        this.jogoEncerrado = false;
        }

        jogar(x, y){                                                                                 //Classe jogar, que confere se as cordenadas estão dentro do correto
            console.log(this.tabuleiro)
            if(x > 2 || x < 0 || y > 2 || y < 0){                                                    
                throw new ArgumentOutOfRangeException("O range de escolha é entre 0 e 2")  

            }else if(this.tabuleiro[x][y]=== ""){                                                    //Confere se a posição a ser jogada está disponível
                this.tabuleiro[x][y] = this.vez;
                this.alternaVez();

            }else{
                throw new InvalidOperationException("Posição ja ocupada ");
            }
        }
        alternaVez(){                                                                             //Troca a vez do jogador entre X e O usando o operador ternário
            this.vez = (this.vez === "X") ? "O" : "X";
        }
        winGame(count){                                                            //Classe verificadora que chama a função que confere as posições vencedoras
            const verifica = new ObterVencedor(this.tabuleiro);                      
            
            const resultado = verifica.verificador(count)
                if (resultado) {                                 //Confere se teve algum vencedor ou encontrou um empate e troca altera o valor booleano de jogoEncerrado
                    this.jogoEncerrado = true;
                }
         }
    }