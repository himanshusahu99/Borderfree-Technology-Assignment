
const input = document.getElementById("search")

input.addEventListener('input', callAPI); 

function callAPI(e){
     console.log(e.target.value)
     fetch("/getsearch", {
          method: "post", 
          body: JSON.stringify({
               title:e.target.value
          })
     }).then(res => res.json()).then(res => console.log(res)); 
}