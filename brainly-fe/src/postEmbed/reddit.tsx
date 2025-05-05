import { useEffect, useRef } from "react";

const RedditEmbed = ({ postUrl }: { postUrl: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = `
        <blockquote class="reddit-embed-bq" data-embed-height="658" style="height:500px;">
          <a href="${postUrl}">View Reddit Post</a>
        </blockquote>
      `;
    }

    // Load Reddit script (once)
    const script = document.createElement("script");
    script.src = "https://embed.reddit.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [postUrl]);

  return <div ref={containerRef} />;
};

export default RedditEmbed;
