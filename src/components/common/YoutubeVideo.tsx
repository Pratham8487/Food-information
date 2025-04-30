function YouTubeVideo() {
    return (
      <div className="relative w-full pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/yTQ0tBmLbns"
          title="Introduction To WiseGPT"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    );
  }
  
  export default YouTubeVideo;
  