document.addEventListener('DOMContentLoaded', function() {
    const videoSection = document.getElementById('videoSection');
    const video = document.getElementById('easyCleanVideo');
    const title = document.querySelector('.video-title');
    const container = document.querySelector('.video-container');

    function handleVideoSection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                videoSection.classList.add('visible');
                if (title) title.classList.add('visible');
                if (container) container.classList.add('visible');
                if (video) {
                    video.play().catch(()=>{});
                }
            } else {
                videoSection.classList.remove('visible');
                if (title) title.classList.remove('visible');
                if (container) container.classList.remove('visible');
                if (video) {
                    video.pause();
                    video.currentTime = 0;
                }
            }
        });
    }

    if (videoSection) {
        const observer = new window.IntersectionObserver(handleVideoSection, {
            threshold: 0.3
        });
        observer.observe(videoSection);
    }
});