import { useState } from "react";
import { Sparkles } from "lucide-react";

type Props={src:string|null|undefined;alt?:string;className?:string;fallbackClassName?:string;loading?:"eager"|"lazy"};
export default function MarketplaceImage({src,alt="",className="",fallbackClassName="",loading="lazy"}:Props){
 const [broken,setBroken]=useState(false);
 let valid=false;
 if(src){try{const url=new URL(src);valid=url.protocol==="https:"&&Boolean(url.hostname);}catch{valid=false;}}
 if(!valid||broken)return <span className={"em-media-fallback "+fallbackClassName} aria-hidden="true"><Sparkles size={34}/></span>;
 return <img key={src} src={src!} alt={alt} className={className} loading={loading} referrerPolicy="no-referrer" onError={()=>setBroken(true)}/>;
}
