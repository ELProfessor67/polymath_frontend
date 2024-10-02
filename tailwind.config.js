/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		
  		colors: {
  			"dark": {
				"blue": "#2B3674"

			},
			"white-shade": {
				1:"#E7E7E7",
				2: "#E8E8E8"
			},
			"gray":{
				1:"#5F5E61",
				2: "#696F79",
				3: "#F5F5F5",
				4: "#BABABA",
				5: "#0E0E0E",
				6:"#202020",
				7: "#1F1F1F",
				8: "#161616",
				9: "#D1D1D1",
				10: "#353739",
				11: "#7F7F7F"
				
			},
			"green": {
				"100": "#64FFB5",
				"200": "#64FFB5"
			},
			"black": "#0E0E0E"
  		},
		fontSize: {
			'h2': "27px",
			'p2': '13px'
		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
