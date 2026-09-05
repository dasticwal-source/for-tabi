const progress=document.querySelector('.progress i');
const reveals=[...document.querySelectorAll('.reveal')];
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
reveals.forEach(el=>observer.observe(el));
addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${Math.min(100,scrollY/max*100)}%`},{passive:true});

const dialog=document.querySelector('#wishes');
document.querySelector('#openWishes').onclick=()=>dialog.showModal();
document.querySelector('.close').onclick=()=>dialog.close();
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
document.querySelector('#restart').onclick=()=>scrollTo({top:0,behavior:'smooth'});

const theme=document.querySelector('#theme');
theme.volume=.42;
let playing=false;
async function toggleMusic(){const b=document.querySelector('#sound');if(playing){theme.pause();playing=false}else{try{await theme.play();playing=true}catch{return}}b.classList.toggle('playing',playing);b.querySelector('em').textContent=playing?'sound off':'sound on'}
document.querySelector('#sound').onclick=toggleMusic;
document.querySelector('#enter').onclick=async()=>{if(!playing)await toggleMusic();document.querySelector('.origin').scrollIntoView({behavior:'smooth'})};
document.querySelectorAll('video').forEach(v=>{v.addEventListener('play',()=>{document.querySelectorAll('video').forEach(other=>{if(other!==v)other.pause()});if(playing)toggleMusic()})});
