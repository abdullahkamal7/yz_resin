
    // Smooth infinite auto-scroll using JS. Structure:
    // - duplicate the items inside the track to make seamless loop
    // - animate by moving transformX; when moved by halfWidth, reset to 0
    // - pause on hover
    (function(){
      const carousel = document.getElementById('carousel');
      const track = document.getElementById('track');

      // copy original children to create seamless repeat
      const cards = Array.from(track.children);
      const totalCards = cards.length;
      // clone once
      cards.forEach(node => track.appendChild(node.cloneNode(true)));

      // read sizes
      let speed = 3; // pixels per frame (adjust for speed)
      let pos = 0;
      let paused = false;

      // compute width of one full set (original items)
      function calcHalfWidth(){
        // width of original set = sum widths + gaps
        // easiest: measure track scrollWidth and divide by 2 (since we duplicated)
        return track.scrollWidth / 2;
      }

      let halfWidth = calcHalfWidth();

      // Resize handler: recalc sizes on resize (responsive)
      window.addEventListener('resize', () => {
        // small timeout to allow layout to stabilize
        setTimeout(()=> {
          halfWidth = calcHalfWidth();
        }, 120);
      });

      // Pause on hover
      carousel.addEventListener('mouseenter', () => paused = true);
      carousel.addEventListener('mouseleave', () => paused = false);

      // Also pause while touching (mobile)
      carousel.addEventListener('touchstart', () => paused = true, {passive:true});
      carousel.addEventListener('touchend', () => paused = false, {passive:true});

      // Animation loop
      function step(){
        if(!paused){
          pos += speed;
          if(pos >= halfWidth) {
            // reset seamlessly
            pos = pos - halfWidth;
          }
          // translate track to the left by pos
          track.style.transform = `translateX(${-pos}px)`;
        }
        requestAnimationFrame(step);
      }

      // start
      requestAnimationFrame(step);

      // Accessibility: stop animation when page hidden
      document.addEventListener('visibilitychange', () => {
        paused = document.hidden;
      });
    })();






  //gallery card 
  // ⭐ STAR RATING
document.querySelectorAll('.rating').forEach(rating=>{
  const stars = rating.querySelectorAll('i');
  stars.forEach(star=>{
    star.addEventListener('click',()=>{
      stars.forEach(s=>s.classList.remove('active'));
      for(let i=0;i<star.dataset.value;i++){
        stars[i].classList.add('active');
      }
    });
  });
});

// ❤️ FAVORITE
document.querySelectorAll('.heart').forEach(heart=>{
  heart.addEventListener('click',()=>{
    heart.classList.toggle('active');
  });
});
    
  