const sidebar = document.querySelector('#sidebar');
const closeBtn= document.querySelector('.cross-btn');
function expand(){
  sidebar.style.left="0px"
}
closeBtn.addEventListener('click', close);
function close(){
   sidebar.style.left="-100%"
}