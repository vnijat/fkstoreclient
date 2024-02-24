/**
 * @format
 */
// Generate the required CSS
import Entypo from 'react-native-vector-icons/Fonts/Entypo.ttf';
import FontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import MaterialCommunityIcons from 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf';
import { createRoot } from 'react-dom/client';
import App from './src/App';

const iconFontStyles = `@font-face {
    src: url(${Entypo});
    font-family: Entypo;
  },
  @font-face {
    src: url(${FontAwesome});
    font-family: FontAwesome;
  },
  @font-face {
    src: url(${MaterialCommunityIcons});
    font-family: MaterialCommunityIcons;
  }`;

// Create a stylesheet
const style = document.createElement('style');
style.type = 'text/css';

// Append the iconFontStyles to the stylesheet
if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyles;
} else {
  style.appendChild(document.createTextNode(iconFontStyles));
}

// Inject the stylesheet into the document head
document.head.appendChild(style);

const root = createRoot(document.getElementById('root'));
root.render(<App />);






