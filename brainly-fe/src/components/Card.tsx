import { ShareIcon } from "../icons/ShareIcon";

interface CardProps{
  title:string,
  type:string,
  link:string
}

export function Card(props:CardProps) {
  const link = "https://youtu.be/0Ha-Jbs-BHs?feature=shared";

  function extractYouTubeVideoID(url: string): string | null {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube.com\/shorts\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

  return (
    <div className="">
      
      <div className="p-4 bg-white rounded-md border-gray-200 max-w-72 border min-h-48 min-w-72">
        <div className="flex justify-between">
          <div className="flex items-center text-md">
            <div className="text-gray-500 pr-2">
              <ShareIcon />
            </div>
            {props.title}
          </div>
            <div className="flex items-center">
              <div className="pr-2 text-gray-500">
                <a
                  href={props.link}
                  target="_blank"
                >
                  <ShareIcon />
                </a>
              </div>
              <div className="text-gray-500">
                <ShareIcon />
              </div>
            </div>
      </div>

          <div className="pt-4">
            
              {
                props.type === "youtube" &&  
                <iframe
                  className="w-full"
                  src={`https://www.youtube.com/embed/${extractYouTubeVideoID(props.link)}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              }
            

            {props.type === "twitter" && 
            <>
                        <blockquote className="twitter-tweet">
                            <a href={props.link.replace("x.com", "twitter.com")}></a>
                        </blockquote><script async src="https://platform.twitter.com/widgets.js" char-set="utf-8"></script>
                        </>
}
          </div>
      </div>
    </div>
  );
}
