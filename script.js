import Aluno from './aluno.js';

let bancoDados = new Array()

document.getElementById('btCadastro').addEventListener('click', () => create())
document.getElementById('btBuscar').addEventListener('click', () => search())
document.getElementById('btAtualizar').addEventListener('click', () => update())
document.getElementById('btDeletar').addEventListener('click', () => delet())
let alunoSelect

function create(){
    let mat =  document.getElementById('ipMat').value;
    let nome = document.getElementById('ipName').value;
    let email = document.getElementById('ipEmail').value;
    let  curso = document.getElementById('ipCourse').value;
    let aluno = new Aluno(mat, nome, email, curso)
    if (validateFields(mat, nome, email, curso)){
        bancoDados.push(aluno)
        limparCampos()
        read(bancoDados)
    }
}

function limparCampos(){
    const inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++){
        inputs[i].value = '';
    }
}

function validateFields(mat, nome, email, curso){
    if (mat+''=== 'NaN'){
        alert('Os dados inseridos na matricula não pode conter textos ou espaços vazios');
        limparCampos();
        return false;
    }else if (nome === '' || email === '' || curso === ''){
        alert('Preencha todos os campos');
        limparCampos();
        return false;
    }else{
        return true;
    }
}

function update(){
    const mat = parseInt(document.getElementById('ipMat').value);
    const nome = document.getElementById('ipName').value;
    const email = document.getElementById('ipEmail').value;
    const curso = document.getElementById('ipCourse').value;
    const aluno = new Aluno(mat, nome, email, curso);
    if (validateFields(mat, nome, email, curso)){
        const indexOfAluno = search();
        bancoDados.splice(indexOfAluno, 1, aluno)
        read(bancoDados)
        limparCampos()
    }
}

function delet(){
    const indexOfAluno = search();
    bancoDados.splice(indexOfAluno, 1)
    read(bancoDados)
    limparCampos()
}

function search(){
    let mat = document.getElementById('ipMat').value;
    if (mat === ''){
        alert('Digite o número da matrícula para fazer a busca')
    }else{
        alunoSelect = bancoDados.find((aluno) => aluno.matricula === mat)
        if (alunoSelect === undefined){
            alert('Essa matricula não existe')
        }
        console.log(alunoSelect);
        document.getElementById('ipName').value = alunoSelect.nome
        document.getElementById('ipEmail').value = alunoSelect.email
        document.getElementById('ipCourse').value = alunoSelect.curso
        if (bancoDados.includes(alunoSelect)) return bancoDados.indexOf(alunoSelect)
    }
}

function read(banco){
    deleteTable()
    for (let aluno of banco){
       let tableRow = document.createElement('tr');
       document.getElementById('tbody').appendChild(tableRow);
       for (const prop in aluno) {
           let tableColumn = document.createElement('td');
           tableColumn.innerHTML = aluno[prop]
           tableRow.appendChild(tableColumn)
       }
    }
}

function deleteTable(){
    document.getElementById('tbody').innerHTML = '';
}
