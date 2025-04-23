const a1Btn = document.getElementById("A-1");
const b1Btn = document.getElementById("B-1");
const c1Btn = document.getElementById("C-1");
const a2Btn = document.getElementById("A-2");
const b2Btn = document.getElementById("B-2");
const c2Btn = document.getElementById("C-2");
const a3Btn = document.getElementById("A-3");
const b3Btn = document.getElementById("B-3");
const c3Btn = document.getElementById("C-3");
const countDisplay = document.getElementById("count");

const tabuleiro = document.getElementById("tabuleiro")

let count = 0;

const addElement =()=>{
    const resetBtn  = document.createElement("button");
    resetBtn.innerText = "Restart";
    resetBtn.id = "restart-button";
    resetBtn.addEventListener("click",()=>{
        location.reload();
    })
    document.body.appendChild(resetBtn);

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
}
document.body.onload = addElement;

const round = () => {
        if(count < 9){
            count ++;
            countDisplay.textContent = count;
    }
}


class ObterVencedor {
    constructor(tabuleiro){
            this.tabuleiro = tabuleiro    
        }
        verificador(){
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


class InvalidOperationException extends Error{
    constructor(message){
        super(message);
        this.name = "InvalidOperationException";
    }
}

class ArgumentOutOfRangeException extends Error{
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
        }
        jogar(x, y){
            if(x > 2 || x < 0 || y > 2 || y < 0){
                throw new ArgumentOutOfRangeException("O range de escolha é entre 0 e 2")  

            }else if(this.tabuleiro[x][y]=== ""){
                this.tabuleiro[x][y] = this.vez;
                this.alternaVez();

            }else {
                throw new InvalidOperationException("Posição ja ocupada ");
            }
        }
        alternaVez(){
            this.vez = (this.vez === "X") ? "O" : "X";
        }
        winGame(){
            const verifica = new ObterVencedor(this.tabuleiro);
            if(count >3){
                if (verifica.verificador()) {
                    
                }
            }
         }
    }           

const jogo = new JogoDaVelha();






for(let i =0; i < 9; i++){
    if(count < 9){
        const btn = document.createElement("button");
        btn.dataset.index = i;                                      //atribui o elemento data-index com o valor de i ao botão que foi criado, assim tem como rastrear o botão 
        btn.innerText = "";                                      
        btn.addEventListener("click", (e) => {
           const index = e.target.dataset.index;                   //rastreia o index do botão criado/clicado e atribui a index 
           const x = Math.floor(index /3);                         //calcula as posições de X baseado no loop
           const y = index % 3;                                      //calcula as posições de Y baseado no loop
           console.log(index)                                      //mostra os index dos botões
        
            try {
               jogo.jogar(x, y);
               e.target.innerText = jogo.tabuleiro[x][y];
               jogo.winGame();
               round() 
            }catch (error){   
               alert("InvalidOperationException: Posição já ocupada")
               InvalidOperationException("Posição ja ocupada ");
            }
        });
        tabuleiro.appendChild(btn);
    }
}
