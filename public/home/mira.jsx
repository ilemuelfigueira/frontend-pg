import { twMerge } from "tailwind-merge"

export const MiraSVG = ({ className }) => {
	return (
		<svg className={twMerge("w-[594px] h-[463px]", className)} viewBox="0 0 594 463" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M299 3L299 70.5M299 460L299 393" stroke="#1B4472" strokeWidth="6" strokeLinecap="round" />
		<path d="M3 229L136 229M591 229L458.5 229" stroke="#1B4472" strokeWidth="6" strokeLinecap="round" />
		<path d="M148.138 298.5C165.016 336.225 195.814 366.362 234 382.379" stroke="#80CEFF" strokeWidth="6" strokeLinecap="round" />
		<path d="M363.5 380.862C401.225 363.984 431.362 333.186 447.379 295" stroke="#80CEFF" strokeWidth="6" strokeLinecap="round" />
		<path d="M445.862 165.5C428.984 127.774 398.186 97.6376 360 81.621" stroke="#80CEFF" strokeWidth="6" strokeLinecap="round" />
		<path d="M230.5 83.1377C192.775 100.016 162.638 130.814 146.621 169" stroke="#80CEFF" strokeWidth="6" strokeLinecap="round" />
		<circle cx="297" cy="232" r="150" fill="url(#pattern0_99_25)" />
		<defs>
			<pattern id="pattern0_99_25" patternContentUnits="objectBoundingBox" width="1" height="1">
				<use href="#image0_99_25" transform="translate(-0.166667) scale(0.00208333)" />
			</pattern>
			<image id="image0_99_25" width="640" height="480" href="https://gizmodo.uol.com.br/wp-content/blogs.dir/8/files/2021/02/nyan-cat.gif" >
			<animate attributeName="x" from="0" to="0" dur="10s" repeatCount="indefinite" />
				</image>
		</defs>
	</svg>
	)
}