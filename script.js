/* =================================================
   EMMA NAR VIDEO WEBSITE
================================================= */


/* ================= VIDEO DATABASE ================= */

let videos = [

    {
        id: 1,

        title: "The Money",

        src: "videos/the-money.mp4",

        watches: 0,

        downloads: 0,

        likes: 0
    }

];


/* ================= TOTAL STATISTICS ================= */

let totalWatches = 0;

let totalDownloads = 0;


/* ================= GET HTML ELEMENTS ================= */

const intro = document.getElementById("intro");

const watchNowBtn =
    document.getElementById("watchNowBtn");

const loadingScreen =
    document.getElementById("loadingScreen");

const mainWebsite =
    document.getElementById("mainWebsite");

const videoGallery =
    document.getElementById("videoGallery");

const totalWatchesElement =
    document.getElementById("totalWatches");

const totalDownloadsElement =
    document.getElementById("totalDownloads");

const uploadBtn =
    document.getElementById("uploadBtn");

const videoUpload =
    document.getElementById("videoUpload");

const videoTitle =
    document.getElementById("videoTitle");

const uploadMessage =
    document.getElementById("uploadMessage");


/* =================================================
   WATCH NOW BUTTON
================================================= */

watchNowBtn.addEventListener("click", function () {

    intro.style.opacity = "0";

    setTimeout(function () {

        intro.style.display = "none";

        loadingScreen.style.display = "flex";

    }, 700);


    setTimeout(function () {

        loadingScreen.style.display = "none";

        mainWebsite.style.display = "block";

        displayVideos();

    }, 3200);

});


/* =================================================
   DISPLAY VIDEOS
================================================= */

function displayVideos() {

    videoGallery.innerHTML = "";


    videos.forEach(function (video) {


        const card =
            document.createElement("div");

        card.className = "video-card";


        card.innerHTML = `

            <video
                controls
                preload="metadata"
                data-id="${video.id}"
            >
                <source
                    src="${video.src}"
                    type="video/mp4"
                >

                Your browser does not support video playback.
            </video>


            <div class="video-info">

                <h3>
                    ${video.title}
                </h3>


                <div class="video-stats">

                    👁
                    <span class="watch-count">
                        ${video.watches}
                    </span>
                    &nbsp;

                    ❤️
                    <span class="like-count">
                        ${video.likes}
                    </span>

                </div>


                <div class="video-buttons">

                    <button
                        class="like-btn"
                        data-id="${video.id}"
                    >
                        ❤️ Like
                    </button>


                    <button
                        class="share-btn"
                        data-id="${video.id}"
                    >
                        🔗 Share
                    </button>


                    <button
                        class="download-btn"
                        data-id="${video.id}"
                    >
                        ⬇ Download
                    </button>

                </div>

            </div>

        `;


        videoGallery.appendChild(card);


        /* ================= WATCH COUNTER ================= */

        const videoElement =
            card.querySelector("video");


        videoElement.addEventListener(
            "play",
            function () {

                const watchedKey =
                    "watched_" + video.id;


                if (!sessionStorage.getItem(watchedKey)) {

                    video.watches++;

                    totalWatches++;

                    sessionStorage.setItem(
                        watchedKey,
                        "true"
                    );


                    updateStatistics();

                    displayVideos();

                }

            },
            {
                once: true
            }
        );

    });


    /* ================= LIKE BUTTON ================= */

    document
        .querySelectorAll(".like-btn")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const id =
                        Number(button.dataset.id);


                    const video =
                        videos.find(
                            item => item.id === id
                        );


                    video.likes++;


                    displayVideos();

                }
            );

        });


    /* ================= SHARE BUTTON ================= */

    document
        .querySelectorAll(".share-btn")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const id =
                        Number(button.dataset.id);


                    const video =
                        videos.find(
                            item => item.id === id
                        );


                    shareVideo(video);

                }
            );

        });


    /* ================= DOWNLOAD BUTTON ================= */

    document
        .querySelectorAll(".download-btn")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const id =
                        Number(button.dataset.id);


                    const video =
                        videos.find(
                            item => item.id === id
                        );


                    downloadVideo(video);

                }
            );

        });

}


/* =================================================
   UPDATE STATISTICS
================================================= */

function updateStatistics() {

    totalWatchesElement.textContent =
        totalWatches;


    totalDownloadsElement.textContent =
        totalDownloads;

}


/* =================================================
   LIKE
================================================= */


/* Likes are handled inside displayVideos() */


/* =================================================
   SHARE VIDEO
================================================= */

function shareVideo(video) {

    const shareData = {

        title: video.title,

        text:
            "Watch " +
            video.title +
            " by Emma Nar",

        url: window.location.href

    };


    if (navigator.share) {

        navigator.share(shareData);

    } else {

        navigator.clipboard.writeText(
            window.location.href
        );


        alert(
            "Website link copied!"
        );

    }

}


/* =================================================
   DOWNLOAD VIDEO
================================================= */

function downloadVideo(video) {

    totalDownloads++;


    updateStatistics();


    const link =
        document.createElement("a");


    link.href = video.src;

    link.download =
        video.title + ".mp4";


    document.body.appendChild(link);


    link.click();


    document.body.removeChild(link);

}


/* =================================================
   OWNER VIDEO UPLOAD
================================================= */

uploadBtn.addEventListener(
    "click",
    function () {


        const file =
            videoUpload.files[0];


        const title =
            videoTitle.value.trim();


        if (!file) {

            uploadMessage.textContent =
                "Please choose a video.";

            return;

        }


        if (!title) {

            uploadMessage.textContent =
                "Please enter a video title.";

            return;

        }


        if (!file.type.startsWith("video/")) {

            uploadMessage.textContent =
                "Please select a video file.";

            return;

        }


        /* TEMPORARY LOCAL VIDEO */

        const videoURL =
            URL.createObjectURL(file);


        videos.push({

            id:
                Date.now(),

            title:
                title,

            src:
                videoURL,

            watches:
                0,

            downloads:
                0,

            likes:
                0

        });


        displayVideos();


        uploadMessage.textContent =
            "Video added successfully on this browser.";


        videoUpload.value = "";

        videoTitle.value = "";

    }
);
