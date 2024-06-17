import { twMerge } from "tailwind-merge"

export const MiraMobileSVG = ({ className }) => {
	return (
    <svg className={twMerge("w-[424px] h-[433px]", className)} width="424" height="433" viewBox="0 0 424 433" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M213.5 3L213.5 55.5M213.5 430L213.5 378" stroke="#1B4472" strokeWidth="6" strokeLinecap="round" />
    <path d="M3 214L50.5 214M420.5 214L373 214" stroke="#1B4472" strokeWidth="6" strokeLinecap="round" />
    <path d="M62.6378 283.5C79.5163 321.225 110.314 351.362 148.5 367.379" stroke="#80CEFF" strokeWidth="6" strokeLinecap="round" />
    <path d="M278 365.862C315.725 348.984 345.862 318.186 361.879 280" stroke="#80CEFF" strokeWidth="6" strokeLinecap="round" />
    <path d="M360.362 150.5C343.484 112.774 312.686 82.6376 274.5 66.621" stroke="#80CEFF" strokeWidth="6" strokeLinecap="round" />
    <path d="M145 68.1377C107.275 85.0161 77.1377 115.814 61.1211 154" stroke="#80CEFF" strokeWidth="6" strokeLinecap="round" />
    <circle cx="211.5" cy="217" r="150" fill="url(#pattern0_415_272)" />
    <defs>
      <pattern id="pattern0_415_272" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use href="#image0_415_272" transform="translate(-0.166667) scale(0.00208333)" />
      </pattern>
      <image id="image0_415_272" width="640" height="480" href="https://gizmodo.uol.com.br/wp-content/blogs.dir/8/files/2021/02/nyan-cat.gif">
        <animate attributeName="x" from="0" to="0" dur="10s" repeatCount="indefinite" />
      </image>
    </defs>
  </svg>
	)
}