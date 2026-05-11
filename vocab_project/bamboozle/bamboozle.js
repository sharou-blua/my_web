const board = document.getElementById('board');
const fileInput = document.getElementById('fileInput');
const scoreboardDiv = document.getElementById('scoreboard');
const popupBg = document.getElementById('popupBg');
const popupQuestion = document.getElementById('popupQuestion');
const popupAnswer = document.getElementById('popupAnswer');
const submitBtn = document.getElementById('submitAnswer');
const inputWrapper = document.getElementById('inputWrapper');
const setTeamsBtn = document.getElementById('setTeams');
const congratsDiv = document.getElementById('congrats');
const leaderboardDiv = document.getElementById('leaderboard');
const savedFilesDiv = document.getElementById('savedFiles');

let numTeams = 2;
let teamNames = ["Team 1","Team 2","Team 3","Team 4"];
let teamScores = [0,0,0,0];
let teamTurn = 0;
let currentCell = null;
let cellsData = [];

setTeamsBtn.addEventListener('click', ()=>{
    let n = prompt("Nhập số đội (2-4)", "2");
    n = parseInt(n);
    if(isNaN(n) || n<2) n=2;
    if(n>4) n=4;
    numTeams = n;
    for(let i=0;i<numTeams;i++){
        let name = prompt(`Nhập tên đội ${i+1}:`, `Team ${i+1}`);
        if(name) teamNames[i]=name;
        teamScores[i]=0;
    }
    updateScoreboard();
});

// Load saved files from localStorage
function loadSavedFiles(){
    if(!savedFilesDiv) return;
    savedFilesDiv.innerHTML = '';
    const files = JSON.parse(localStorage.getItem('bamboozleFiles') || '[]');
    files.forEach((file, idx)=>{
        const div = document.createElement('div');
        div.className = 'file-item';
        div.innerHTML = `<span>${file.name}</span><div><button onclick='downloadFile(${idx})'>Download</button><button onclick='deleteFile(${idx})'>Xóa</button></div>`;
        div.onclick = ()=>{ createBoardFromText(file.content); inputWrapper.style.display='none'; };
        savedFilesDiv.appendChild(div);
    });
}

function saveFile(name, content){
    const files = JSON.parse(localStorage.getItem('bamboozleFiles') || '[]');
    files.push({name, content});
    localStorage.setItem('bamboozleFiles', JSON.stringify(files));
    loadSavedFiles();
}

function downloadFile(idx){
    const files = JSON.parse(localStorage.getItem('bamboozleFiles') || '[]');
    const file = files[idx];
    const blob = new Blob([file.content], {type:'text/plain'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = file.name;
    link.click();
}

function deleteFile(idx){
    let files = JSON.parse(localStorage.getItem('bamboozleFiles') || '[]');
    files.splice(idx,1);
    localStorage.setItem('bamboozleFiles', JSON.stringify(files));
    loadSavedFiles();
}

fileInput.addEventListener('change', function(event){
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e){
        const text = e.target.result;
        saveFile(file.name, text);
        createBoardFromText(text);
        inputWrapper.style.display='none';
    };
    reader.readAsText(file, "UTF-8");
});

// xáo trộn mảng
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoardFromText(text){
    board.innerHTML = '';
    const lines = text.split(/\r?\n/).filter(l => l.trim() !== '');
    const cells = [];
    lines.forEach(line=>{
        const parts = line.split('|');
        if(parts.length===3){
            cells.push({q: parts[0].trim(), a: parts[1].trim(), point: parseInt(parts[2].trim()) });
        }
    });

    // nếu nhiều hơn 20 thì hỏi chọn chế độ
    let choice = "all";
    if(cells.length > 20){
        choice = confirm("File có hơn 20 câu hỏi.\nOK = Random 20 câu\nCancel = Chơi tất cả") ? "random20" : "all";
    }

    let selectedCells;
    if(choice === "random20"){
        selectedCells = shuffleArray(cells).slice(0,20);
    } else {
        selectedCells = cells;
    }

    cellsData = selectedCells;

    cellsData.forEach((item,index)=>{
        const div = document.createElement('div');
        div.className = 'cell';
        div.innerText = `Câu ${index+1}`;
        div.dataset.index = index;
        if(item.point <=5) div.style.background='linear-gradient(45deg,#4CAF50,#81C784)';
        else if(item.point <=10) div.style.background='linear-gradient(45deg,#FFEB3B,#FFC107)';
        else div.style.background='linear-gradient(45deg,#F44336,#E57373)';
        div.addEventListener('click', ()=>{
            currentCell = div;
            popupQuestion.innerText = `${teamNames[teamTurn]}, ${item.q}`;
            popupAnswer.value = '';
            popupBg.style.display = 'flex';
        });
        board.appendChild(div);
    });
}

submitBtn.addEventListener('click', ()=>{
    const index = currentCell.dataset.index;
    const item = cellsData[index];
    const answer = popupAnswer.value.trim().toLowerCase();
    if(answer === item.a.toLowerCase()){
        congratsDiv.innerText = `${teamNames[teamTurn]} trả lời đúng! +${item.point} điểm 🎉`;
        congratsDiv.style.display='block';
        setTimeout(()=>{congratsDiv.style.display='none';},2000);
        currentCell.className = 'cell';
        currentCell.style.background = '#B0BEC5';
        teamScores[teamTurn] += item.point;
    } else {
        congratsDiv.innerText = `Sai! Đáp án đúng: ${item.a}`;
        congratsDiv.style.display='block';
        setTimeout(()=>{congratsDiv.style.display='none';},2500);
        currentCell.className = 'cell';
        currentCell.style.background = '#B0BEC5';
    }
    currentCell.style.pointerEvents='none';
    updateScoreboard();
    popupBg.style.display='none';
    teamTurn = (teamTurn +1)%numTeams;

    if(Array.from(board.children).every(c=>c.style.pointerEvents=='none')){
        showLeaderboard();
    }
});

function updateScoreboard(){
    const teamDivs = scoreboardDiv.querySelectorAll('.team-score');
    for(let i=0;i<4;i++){
        if(i<numTeams){
            teamDivs[i].style.display='block';
            teamDivs[i].innerText = `${teamNames[i]}: ${teamScores[i]}`;
        } else teamDivs[i].style.display='none';
    }
}

function showLeaderboard(){
    let results = [];
    for(let i=0;i<numTeams;i++) results.push({name:teamNames[i],score:teamScores[i]});
    results.sort((a,b)=>b.score - a.score);
    let html = "<h2>🏆 Leaderboard 🏆</h2>";
    results.forEach((r,i)=>{
        html+=`<p>${i+1}. ${r.name}: ${r.score} điểm</p>`;
    });
    leaderboardDiv.innerHTML=html;
    leaderboardDiv.style.display='block';
}

// Load saved files on page load
loadSavedFiles();
