import { twMerge } from "tailwind-merge"

export const NaoPercaTempoSVG = ({ className }) => {
	return (
		<svg className={twMerge("w-[300px] h-[350px]", className)} viewBox="0 0 300 350" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M238 328.729C221.48 338.142 203.296 344.972 184 348.668" stroke="#80CEFF" strokeLinecap="round" />
	<path d="M150.5 345.834C191.228 345.834 228.63 331.596 258 307.826" stroke="#80CEFF" strokeWidth="2" strokeLinecap="round" />
	<path d="M281.509 271.834C251.81 311.88 204.186 337.834 150.5 337.834C132.503 337.834 115.188 334.918 99 329.531" stroke="#80CEFF" strokeWidth="3" strokeLinecap="round" />
	<path d="M62.5 20.9395C79.0203 11.5263 97.2036 4.69651 116.5 1" stroke="#80CEFF" strokeLinecap="round" />
	<path d="M150 3.83418C109.272 3.83418 71.8704 18.0724 42.5 41.8428" stroke="#80CEFF" strokeWidth="2" strokeLinecap="round" />
	<path d="M18.991 77.8342C48.69 37.7885 96.314 11.8342 150 11.8342C167.997 11.8342 185.312 14.7508 201.5 20.1372" stroke="#80CEFF" strokeWidth="3" strokeLinecap="round" />
	<defs>
		<pattern id="imagePattern" x="0" y="0" patternUnits="userSpaceOnUse" height="350" width="300">
			<image href="https://gizmodo.uol.com.br/wp-content/blogs.dir/8/files/2021/02/nyan-cat.gif" x="0" y="0" width="300" height="350" preserveAspectRatio="none">
				<animate attributeName="x" from="0" to="0" dur="10s" repeatCount="indefinite" />
			</image>
		</pattern>
		<path id="circlePath" d="M150 175 m -150 0 a 150 150 0 1 0 300 0 a 150 150 0 1 0 -300 0" />
	</defs>
	<circle cx="150" cy="175" r="150" fill="url(#imagePattern)">
	</circle>
</svg>

	)
}