import {createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
	palette: {
	  primary: {
		light: "rgba(255, 170, 0, 0.66)",
		main: "rgba(245, 96, 0, 0.99)",
		dark: "rgba(245, 56, 0, 0.99)",
	  }
	} 
  });

const themex = createMuiTheme({
	palette: {
		primary: {
			main: '#009D57',
		},
		secondary: {
			main: '#ec407a',
		},
	},
	overrides: {
		MuiAppBar: {
			
		},
		MuiTab: {
			label: {
				textTransform: 'capitalize'
			},
		},
		// Name of the component ⚛️ / style sheet
		MuiButton: {
			// Name of the rule
			root: {
				// display : 'none'
			// 	// Some CSS
			// 	background: 'linear-gradient(45deg, #80cbc4 30%, #009688 90%)',
			// 	borderRadius: 3,
			// 	// border: 0,
			// 	color: 'white',
			// 	height: 48,
			// 	padding: '0 30px',
			// 	boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
			},
			label: {
				textTransform: 'capitalize'
			}
			
		},
	},
})

export default theme