const BASE_URL = "https://www.youtube.com/embed/";

const getParams = (parametersList) => {
  return parametersList.reduce((result, parameter, index) => {
    if (index === 0) {
      return (result += parameter.key + "=" + parameter.value);
    }
    return (result += "&" + parameter.key + "=" + parameter.value);
  }, "");
};

// Improved function to handle both direct URL and current page URL scenarios
const getVideoIdFromUrl = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.get("v") || urlObj.pathname.split("/")[2];
  } catch (error) {
    console.error("Error parsing video ID from URL:", error);
    return null;
  }
};

// Function to extract video ID from the current page URL
const getVideoIdFromCurrentPage = () => {
  const currentPageUrl = window.location.href;
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("v");
};

const playButtonEle = document.getElementById("play-button");

playButtonEle.addEventListener("click", () => {
  let videoId = document.getElementById("video-url").value
    ? getVideoIdFromUrl(document.getElementById("video-url").value)
    : getVideoIdFromCurrentPage();

  if (videoId) {
    const parametersList = [
      {
        key: "autoplay",
        value: 1,
      },
      {
        key: "playlist",
        value: videoId,
      },
      {
        key: "loop",
        value: 1,
      },
    ];
    const embeddedVideoUrl =
      BASE_URL + videoId + "?" + getParams(parametersList);

    const iframeEle = document.getElementById("yt-player");
    iframeEle.setAttribute("src", embeddedVideoUrl);
  }
});
// const getVideoIdFromUrl = (url) => {
//     return url.split('?v=')[1];
// }

// const playButtonEle = document.getElementById("play-button");

// playButtonEle.addEventListener("click", () => {
//     const videoUrl = document.getElementById("video-url").value;

//     if (!!videoUrl) {
//         const videoId = getVideoIdFromUrl(videoUrl);
//         const parametersList = [
//             {
//                 key: 'playlist',
//                 value: videoId,
//             },
//             {
//                 key: 'loop',
//                 value: 1,
//             }
//         ];
//         const embeddedVideoUrl = BASE_URL + videoId + '?' + getParams(parametersList);

//         const iframeEle = document.getElementById("yt-player");
//         iframeEle.setAttribute("src", embeddedVideoUrl);
//     }
// });
