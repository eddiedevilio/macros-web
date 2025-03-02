Project Overview
Repository URL: OceanBlue on GitHub

Getting Started
Editing Your Code
You have multiple options to edit and enhance your application:

Using Lovable Platform

Visit the Lovable Project and start making changes through prompts. All modifications via Lovable are automatically committed to this repository.

Using Your Preferred IDE

To work locally:

Clone this repository.

Ensure Node.js and npm are installed. We recommend using nvm for installation.

sh
Copy
# Clone the repository
git clone https://github.com/eddiedevilio/oceanblue

# Navigate into the project directory
cd oceanblue

# Install dependencies
npm i

# Start the development server
npm run dev
Directly Editing on GitHub

Go to the file you wish to edit.

Click the "Edit" button (pencil icon).

Make your changes and commit them.

Using GitHub Codespaces

Access the main page of your repository.

Click the "Code" button and select the "Codespaces" tab.

Create a new codespace to start editing directly in your browser.

Technologies Used
This project utilizes a modern stack to ensure a robust and scalable application:

Vite - Fast build tool and development server.

TypeScript - Enhances JavaScript with static types.

React - A powerful library for building user interfaces.

shadcn-ui - UI components for building rich interfaces.

Tailwind CSS - Utility-first CSS framework for rapid UI development.

Deployment
Deploy your project effortlessly through Lovable by navigating to Share -> Publish. For custom domain deployments, consider using Netlify as Lovable currently does not support custom domains. More details can be found in our Custom domains documentation.

Additional Components (e.g., Hero Section)
If you've added new components (such as a Hero section) to the GitHub repository but they are not appearing in your Lovable project, follow these steps to sync your changes:

Ensure Changes Are Committed and Pushed:

Make sure all new components (e.g., Hero) are committed and pushed to your GitHub repository.

Run the following commands:

sh
Copy
git add .
git commit -m "Added new Hero component"
git push origin main
Sync Lovable with GitHub:

Go to your Lovable Project.

Check if Lovable has automatically pulled the latest changes from GitHub. If not, manually trigger a sync (if the option is available).

If the changes are still not reflected, restart the development server:

sh
Copy
npm run dev
Preview your project to confirm the new components are visible.

Contact Support:

If the issue persists, reach out to Lovable support for assistance or check their documentation for troubleshooting tips.

Feel free to explore, modify, and deploy your project with OceanBlue. We're excited to see what you create! If you encounter any issues, refer to the steps above or reach out for help. Happy coding!