/* =========================================
   EMMA NAR VIDEO WEBSITE
========================================= */


/* =========================================
   WEBSITE DATA
========================================= */

let totalWatches = 0;

let totalDownloads = 0;


let videos = [

    {
        id: 1,

        title: "My First Emma Nar Video",

        src: "videos/sample-video.mp4",

        watches: 0,

        downloads: 0,

        likes: 0
    }

];



/* =========================================
   HTML ELEMENTS
========================================= */

const introScreen =
    document.getElementById(
        "introScreen"
    );


const loadingScreen =
    document.getElementById(
        "loadingScreen"
    );


const mainContent =
    document.getElementById(
        "mainContent"
    );


const watchNowBtn =
    document.getElementById(
        "watchNowBtn"
    );


const videoContainer =
    document.getElementById(
        "videoContainer"
    );


const totalWatchesElement =
    document.getElementById(
        "totalWatches"
    );


const totalDownloadsElement =
    document.getElementById(
        "totalDownloads"
    );
/* =========================================
   WATCH NOW
========================================= */

watchNowBtn.addEventListener(
    "click",
    function () {

        introScreen.classList.add(
            "hidden"
        );


        loadingScreen.classList.remove(
            "hidden"
        );


        setTimeout(
            function () {

                loadingScreen.classList.add(
                    "hidden"
                );


                mainContent.classList.remove(
                    "hidden"
                );


                displayVideos();

            },
            1800
        );

    }
);



/* =========================================
   DISPLAY VIDEOS
========================================= */

function displayVideos() {

    videoContainer.innerHTML = "";


    videos.forEach(
        function (video) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "video-card";


            card.innerHTML = `

                <video
                    controls
                    preload="metadata"
                >

                    <source
                        src="${video.src}"
                        type="video/mp4"
                    >

                    Your browser does not
                    support video.

                </video>


                <div class="video-info">

                    <h3>
                        ${video.title}
                    </h3>


                    <div class="video-stats">

                        <span>
                            👁
                            ${video.watches}
                        </span>

                        <span>
                            ❤️
                            ${video.likes}
                        </span>

                        <span>
                            ⬇
                            ${video.downloads}
                        </span>

                    </div>


                    <div class="video-actions">

                        <button
                            onclick="
                                likeVideo(${video.id})
                            "
                        >
                            ❤️ Like
                        </button>


                        <button
                            onclick="
                                downloadVideo(${video.id})
                            "
                        >
                            ⬇ Download
                        </button>


                        <button
                            onclick="
                                shareVideo(${video.id})
                            "
                        >
                            ↗ Share
                        </button>

                    </div>

                </div>

            `;


            videoContainer.appendChild(
                card
            );


            const videoElement =
                card.querySelector(
                    "video"
                );


            /* COUNT WATCH */

            videoElement.addEventListener(
                "play",
                function () {

                    if (
                        !videoElement.dataset.counted
                    ) {

                        videoElement.dataset.counted =
                            "true";


                        video.watches++;

                        totalWatches++;


                        updateStatistics();


                        updateCard(
                            card,
                            video
                        );

                    }

                }
            );

        }
    );

}



/* =========================================
   UPDATE STATISTICS
========================================= */

function updateStatistics() {

    totalWatchesElement.textContent =
        totalWatches;


    totalDownloadsElement.textContent =
        totalDownloads;

}



/* =========================================
   LIKE
========================================= */

function likeVideo(id) {

    const video =
        videos.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!video) return;


    video.likes++;


    displayVideos();

}



/* =========================================
   DOWNLOAD
========================================= */

function downloadVideo(id) {

    const video =
        videos.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!video) return;


    video.downloads++;

    totalDownloads++;


    updateStatistics();


    const link =
        document.createElement(
            "a"
        );


    link.href =
        video.src;


    link.download =
        video.title + ".mp4";


    document.body.appendChild(
        link
    );


    link.click();


    document.body.removeChild(
        link
    );


    displayVideos();

}



/* =========================================
   SHARE
========================================= */

function shareVideo(id) {

    const video =
        videos.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!video) return;


    const shareData = {

        title:
            "Emma Nar - " +
            video.title,

        text:
            "Watch this Emma Nar video!",

        url:
            window.location.href

    };


    if (
        navigator.share
    ) {

        navigator.share(
            shareData
        );

    }

    else {

        navigator.clipboard.writeText(
            window.location.href
        );


        alert(
            "Video website link copied!"
        );

    }

}

/* =========================================
   UPDATE SINGLE CARD
========================================= */

function updateCard(
    card,
    video
) {

    const stats =
        card.querySelector(
            ".video-stats"
        );


    stats.innerHTML = `

        <span>
            👁 ${video.watches}
        </span>

        <span>
            ❤️ ${video.likes}
        </span>

        <span>
            ⬇ ${video.downloads}
        </span>

    `;

}


/* =========================================
   START
========================================= */

updateStatistics();
