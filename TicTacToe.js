const countDisplay = document.getElementById("count");

const tabuleiro = document.getElementById("tabuleiro")                                            

let count = 0;
   
const addElement =()=>{                                                                            //Cria o botão Restart dinamicamente e seta as características do HTML e
    const resetBtn  = document.createElement("button");
    resetBtn.innerText = "Restart";
    resetBtn.id = "restart-button";
    resetBtn.addEventListener("click",()=>{
        location.reload();
    })
    document.body.appendChild(resetBtn);                                                           //Insere o botão reset dentro do elemento body do html

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
document.body.onload = addElement;                                                                  // carrega um elemento body quando a página é aberta

const round = () => {                                                                               //função que conta as rodadas e limita caso o jogo acabe e limita a 9 rodadas(número máximo de jogadas)
        if(count < 9){
            count ++;
            countDisplay.textContent = count;
    }
}


class ObterVencedor {                                                                               //Classe que confere se algumas das 8 posições vencedoras são verdadeiras (tem o mesmo caractere entre uma delas)
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
            if(x > 2 || x < 0 || y > 2 || y < 0){                                                    
                throw new ArgumentOutOfRangeException("O range de escolha é entre 0 e 2")  

            }else if(this.tabuleiro[x][y]=== ""){                                                    //Confere se a posição a ser jogada está disponível
                this.tabuleiro[x][y] = this.vez;
                this.alternaVez();

            }else {
                throw new InvalidOperationException("Posição ja ocupada ");
            }
        }
        alternaVez(){                                                                             //Troca a vez do jogador entre X e O usando o operador ternário
            this.vez = (this.vez === "X") ? "O" : "X";
        }
        winGame(){                                                            //Classe verificadora que chama a função que confere as posições vencedoras
            const verifica = new ObterVencedor(this.tabuleiro);                  
            if(count >3){
                const resultado = verifica.verificador()
                if (verifica.verificador()) {                                 //Confere se teve algum vencedor ou encontrou um empate e troca altera o valor booleano de jogoEncerrado
                    this.jogoEncerrado = true;
                }
            }
         }
    }           

const jogo = new JogoDaVelha();



const buttons = () => {
    const btnGroup = document.createElement("div");                         //cria um elemento div que agrupa os botões dentro dele
    
    for(let i =0; i < 9; i++){
        if(count < 9){
            const btn = document.createElement("button");
            btn.dataset.index = i;                                          //atribui o elemento data-index com o valor de i ao botão que foi criado, assim tem como rastrear o botão 
            btn.innerText = "";                                      
            btnGroup.style.display = "grid";                                //cria dinamicamente o css do botão
            btnGroup.style.gridTemplateColumns = "repeat(3, 40px)";
            btnGroup.style.gridGap = "7px";
            btnGroup.style.margin = "auto"; 
            btnGroup.style.width = "max-content";
            btn.style.width = "30px";
            btn.style.height = "30px";
            btn.style.fontSize = "20px";
            btn.style.cursor = "pointer";           
            btnGroup.appendChild(btn);                                       //adiciona os botões a um grupo de elementos 
        }
    }
    btnGroup.addEventListener("click", (e) => {
        if(jogo.jogoEncerrado){                                       //confere se o jogo finalizou, caso seja verdadeiro imprime a mensagem de jogo de fim de jogo 
         alert("jogo finalizado por favor reinicie para seguir")
         return;
        };
        
        const index = e.target.dataset.index;                        //rastreia o index do botão criado/clicado e atribui a index 
        const x = Math.floor(index /3);                               //calcula as posições de X baseado no loop
        const y = index % 3;                                          //calcula as posições de Y baseado no loop
        console.log(index)                                            //mostra os index dos botões
         
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


    tabuleiro.appendChild(btnGroup);                                         //Adiciona o grupo de botões aos elementos 
}
buttons();


//fazer o append fora do elemento for, rodar o event listener para uma lista de botões criar a lista de botões como loop for e após isso rodar o event listener para essa lista |feito|
//ter dois append child um no inicio do lop para uma lista "temporaria" e um segundo para a lista final atualizar o browser |feito |
