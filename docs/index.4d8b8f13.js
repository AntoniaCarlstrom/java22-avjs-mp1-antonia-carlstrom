async function e(){try{const e="https://highscore-f90ba-default-rtdb.europe-west1.firebasedatabase.app/highscores.json",t=await fetch(e),n=await t.json();console.log("data: ",n);document.getElementById("high-score").innerHTML="";const o=Object.values(n);o.sort(((e,t)=>e.score-t.score)),o.reverse();const r=o.slice(0,5),c=document.querySelector("#high-score");for(const e in r){const t=r[e],n=document.createElement("ul");n.classList.add("highscore-list");const o=document.createElement("li");o.textContent="Name: "+t.name,n.appendChild(o);const s=document.createElement("li");s.textContent="Score: "+t.score,n.appendChild(s),c.appendChild(n)}return r}catch(e){console.error("Error getting data from Firebase:",e)}}async function t(t){e().then((function(e){t=e}));const n=[];n=Object.values(t),n.sort(((e,t)=>e.score-t.score)),n.reverse(),finalArraySliced=n.slice(0,5);for(let e=0;e<finalArraySliced.length;e++){const t=`https://highscore-f90ba-default-rtdb.europe-west1.firebasedatabase.app/highscores/${e}.json`,n={name:finalArraySliced[e].name,score:finalArraySliced[e].score},o={method:"PATCH",body:JSON.stringify(n),headers:{"Content-type":"application/json; charset=UTF-8"}},r=await fetch(t,o);await r.json()}}const n=document.querySelector(".playerText"),o=document.querySelector(".playerName"),r=document.querySelector(".computerText"),c=document.querySelector(".resultText"),s=document.querySelector(".resultText2"),a=document.querySelectorAll(".choiceBtn"),i=document.querySelector(".nameBtn"),l=document.querySelector(".scorePlayerDiv"),u=document.querySelector("form"),d=document.querySelector(".overlay");let h,m,f,y=0,S=0,p="",C=[];function x(){y=0,S=0,c.textContent="",s.textContent="",d.classList.add("hidden"),u.classList.remove("hidden"),e()}e().then((function(e){C=e})),i.addEventListener("click",(e=>{e.preventDefault(),f=document.querySelector("form input"),p=f.value,o.textContent=p+":",u.style.visibility="hidden"})),a.forEach((e=>e.addEventListener("click",(o=>{if(o.preventDefault(),h=e.textContent,function(){switch(Math.floor(3*Math.random())+1){case 1:m="STEN";break;case 2:m="SAX";break;case 3:m="PÅSE"}}(),n.textContent=`${h}`,r.textContent=`${m}`,c.textContent=function(){if(h==m)return"Oavgjort!";if("STEN"==m)return"SAX"==h?"You lose!":"You win!";if("SAX"==m)return"PÅSE"==h?"You lose!":"You win!";if("PÅSE"==m)return"STEN"==h?"You lose!":"You win!"}(),"You lose!"==c.textContent){S++,s.textContent="Game over! Computer wins!",d.classList.remove("hidden");let e={name:p,score:y};setTimeout(x,1e3),y>C[4].score&&C.push(e),t(C)}else"You win!"==c.textContent&&(y++,s.textContent=`Player wins! ${y} points`);l.textContent=`Score: ${y}`}))));
//# sourceMappingURL=index.4d8b8f13.js.map
