async function e(){try{const e="https://highscore-f90ba-default-rtdb.europe-west1.firebasedatabase.app/highscores.json",t=await fetch(e),o=await t.json();console.log("data: ",o);document.getElementById("high-score").innerHTML="";const n=Object.values(o);n.sort(((e,t)=>e.score-t.score)),n.reverse();const r=n.slice(0,5);console.log("finalArray: ",r);const c=document.querySelector("#high-score");for(const e in r){const t=r[e],o=document.createElement("ul");o.classList.add("highscore-list");const n=document.createElement("li");n.textContent="Name: "+t.name,o.appendChild(n);const s=document.createElement("li");s.textContent="Score: "+t.score,o.appendChild(s),c.appendChild(o)}return r}catch(e){console.error("Error getting data from Firebase:",e)}}async function t(e){finalArraySorted=Object.values(e),finalArraySorted.sort(((e,t)=>e.score-t.score)),finalArraySorted.reverse(),finalArraySliced=finalArraySorted.slice(0,5),console.log(finalArraySliced);for(let e=0;e<finalArraySliced.length;e++){const t=`https://highscore-f90ba-default-rtdb.europe-west1.firebasedatabase.app/highscores/${e}.json`,o={name:finalArraySliced[e].name,score:finalArraySliced[e].score},n={method:"PATCH",body:JSON.stringify(o),headers:{"Content-type":"application/json; charset=UTF-8"}},r=await fetch(t,n);await r.json()}}const o=document.querySelector(".playerText"),n=document.querySelector(".playerName"),r=document.querySelector(".computerText"),c=document.querySelector(".resultText"),s=document.querySelector(".resultText2"),a=document.querySelectorAll(".choiceBtn"),l=document.querySelector(".nameBtn"),i=document.querySelector(".scorePlayerDiv"),u=document.querySelector(".scoreComputerDiv"),d=document.querySelector("form"),f=document.querySelector(".overlay");let m,h,y,S=0,p=0,g="",C=[];function x(){S=0,p=0,c.textContent="",s.textContent="",f.classList.add("hidden"),d.classList.remove("hidden"),e()}e().then((function(e){console.log(e),C=e})),l.addEventListener("click",(e=>{e.preventDefault(),y=document.querySelector("form input"),g=y.value,n.textContent=g+":",d.style.visibility="hidden",console.log("PlayerNameFromInput: "+g)})),a.forEach((e=>e.addEventListener("click",(n=>{if(n.preventDefault(),m=e.textContent,function(){switch(Math.floor(3*Math.random())+1){case 1:h="STEN";break;case 2:h="SAX";break;case 3:h="PÅSE"}}(),o.textContent=`${m}`,r.textContent=`${h}`,c.textContent=function(){if(m==h)return"Oavgjort!";if("STEN"==h)return"SAX"==m?"You lose!":"You win!";if("SAX"==h)return"PÅSE"==m?"You lose!":"You win!";if("PÅSE"==h)return"STEN"==m?"You lose!":"You win!"}(),"You lose!"==c.textContent){p++,s.textContent="Game over! Computer wins!",f.classList.remove("hidden"),console.log("till newHighscore ",g,S),console.log("finalArray",C);let e={name:g,score:S};console.log("Objektet newHighscore ",e),setTimeout(x,1e3),S>C[4].score&&C.push(e),console.log("finalArray efter push ",C),t(C)}else"You win!"==c.textContent&&(S++,s.textContent=`Player wins! ${S} points`);i.textContent=`Score: ${S}`,u.textContent=`Score: ${p}`}))));
//# sourceMappingURL=index.0346947e.js.map
