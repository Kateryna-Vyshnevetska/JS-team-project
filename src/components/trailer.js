const ApiKey = "AIzaSyDExR98Y2bividpaU6DvmE4qz6X54FNtBQ";
// AIzaSyD55S6I32CiHWB1pftO5JPZ7N9oG809K_8
// AIzaSyDY20_m2Ceg7Tla0Z6GadEASJMrFB2Srq8;
// AIzaSyA - 8TMGtCumiAweZ6hNOQOAKeGAuVCfEVs
// AIzaSyDUfjA - r4ePx3tk22K70CKnC0DQDUDzvq0
// AIzaSyCEm2oNZ - DiMHHSQmDV - 5Dh52Gxo6fueP0

// let search;

export function GetVideoTrailer(search) {
  const url = `https://www.googleapis.com/youtube/v3/search?q=${search}%20offisial%20trailer&key=${ApiKey}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log('from tr',`https://www.youtube.com / watch ? v = ${search}`);
      search = data.items[0].id.videoId
    });
    return `https://www.youtube.com / watch ? v = ${search}`
}
// GetVideoTrailer("ironman");
//
// youtube.com / watch ? v = VyHV0BRtdxo
// export const videoLink = `youtube.com / watch ? v = ${search}`;
