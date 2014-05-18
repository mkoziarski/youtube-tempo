//window.alert('push the tempo!');
(function() {
    function findMovie() {
        movie = document.querySelector('#movie_player .html5-video-container');
        attempts++;
        if (movie) {
            attempts = 0;
            findVideoElement();
            makeSlider();
        } else if (attempts < maxAttempts) {
            setTimeout(findMovie, queryInt);
        }
    }

    function findVideoElement() {
        video = movie.querySelector('video');
        attempts++;
        if (!video && attempts < maxAttempts) {
            setTimeout(findVideoElement, queryInt);
        }
    }

    function onMouseMove(event) {
        var delta, top, rate;
        //console.log(event.buttons);
        if (1 == event.buttons) {
            delta = event.clientY - y;
            top = parseInt(cap.style.top.replace('px', '')) + delta;
            top = Math.max(0, top);
            top = Math.min(top, maxY);
            rate = 1 + (top - zero) * inc;
            console.log('tempo: ' + rate);
            if (video) {
                video.playbackRate = rate;
            }
            cap.style.top = top + 'px';
            y = event.clientY;
        }
        event.preventDefault();
    }

    function onMouseDown(event) {
        y = event.clientY;
        //console.log('saved y=' + y);
        event.preventDefault();
    }

    function cancelEvent(event) {
        event.stopPropagation();
    }

    function makeSlider() {
        var slider = document.createElement('div');
        slider.className = 'tempo-slider';
        slider.style.position = 'absolute';
        slider.style.top = '0px';
        slider.style.bottom = '6px';
        slider.style.right = '0px';
        slider.style.width = '20px';
        slider.style.backgroundColor = 'grey';
        slider.style.zIndex = 10000;
        movie.appendChild(slider);
        maxY = slider.clientHeight - capHeight;

        cap = document.createElement('div');
        cap.className = 'tempo-cap';
        cap.style.position = 'absolute';
        zero = Math.floor(maxY / 2);
        inc = 0.1 / zero;
        cap.style.top = zero + 'px';
        cap.style.left = '0px';
        cap.style.right = '0px';
        cap.style.height = capHeight + 'px';
        cap.style.backgroundColor = 'lightgrey';
        slider.appendChild(cap);
        y = cap.getBoundingClientRect().top + (capHeight / 2);

        cap.addEventListener('mousedown', onMouseDown, false);
        slider.addEventListener('mousemove', onMouseMove, false);
        slider.addEventListener('click', cancelEvent, false);
    }

    var movie, video;
    var queryInt = 2000;
    var attempts = 0;
    var maxAttempts = 10;
    var capHeight = 16;
    var y, maxY, zero, inc;
    var cap;

    setTimeout(findMovie, queryInt);
})();
