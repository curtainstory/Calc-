PWA Calculator
A simple yet powerful Progressive Web App (PWA) calculator designed for everyday use and specific business needs. This application is built to work seamlessly offline and can be installed on your device for quick access.

Features
Basic Arithmetic: Perform addition, subtraction, multiplication, and division.

Grand Total (GT): The = and GST buttons automatically add the result of each calculation to a running grand total. The GT button displays this total on the screen.

Percentage Calculations: A dedicated % button allows you to quickly calculate discounts, taxes, and other percentages.

GST Calculation: Dedicated buttons for 5% and 12% GST rates make tax calculations effortless.

Printable Bill: The Print Bill button generates a clean, itemized receipt of all transactions, perfect for providing a summary to a customer.

How to Use
Standard Calculation: Enter numbers and operators as you normally would. The GT display will keep a running total.

GST: Enter the pre-tax amount and press the GST 5% or GST 12% button. The final amount and the GST amount will be displayed.

Print: Click the Print Bill button to generate a printable receipt.

Installation (PWA)
This app is a PWA. On a compatible mobile browser (like Chrome or Firefox), you will likely see a prompt to "Add to Home Screen" or "Install App." This installs the app on your device, allowing it to run offline and in a standalone, app-like view.

Installation (Local)
To run this project locally, you will need a web server.

Place the index.html, manifest.json, and service-worker.js files in your server's root directory (e.g., htdocs for XAMPP).

Open your browser and navigate to http://localhost/ to access the calculator.

Technologies Used
HTML5: For the calculator's structure.

Tailwind CSS: For modern, responsive styling.

JavaScript: For the core logic and functionality.

Web Manifest: To define the PWA properties (name, icons, theme colors, etc.).

Service Worker: To enable offline access and caching.

Author
Developed by Curtain Story.
