import { Typography, Box, Container, Alert } from "@mui/material";
import Copyright from "./Copyright";

const About = () => {
    return (
        <>
            <Container
                maxWidth="md"
                sx={{
                    bgcolor: "background.paper",
                    boxShadow: 2,
                    my: 10,
                    py: 10,
                }}
            >
                <div align="center">
                    <a href="/">
                        <img
                            src="https://github.com/tuzup/SplitApp/blob/master/client/public/static/logo.png?raw=true"
                            alt="SmartSplit Logo"
                            width="80"
                            height="80"
                        />
                    </a>

                    <Typography variant="h4" align="center" gutterBottom>
                        SmartSplit
                    </Typography>

                    <Typography align="center">
                        Built with the MERN stack (MongoDB, Express, React and NodeJS)
                        <br />
                        <br />
                        <Copyright />
                        <br />
                        <a href="https://github.com/SplitTeam/SmartSplit/issues">
                            Report Bug
                        </a>
                        &nbsp;&nbsp;&nbsp;
                        <a href="https://github.com/SplitTeam/SmartSplit/issues">
                            Request Feature
                        </a>
                    </Typography>
                </div>

                <br />

                <Typography variant="h5">
                    MERN Stack Group Expense Splitting Application
                </Typography>

                <br />

                <ul style={{ marginLeft: "40px" }}>
                    <li><a href="#introduction">Introduction</a></li>
                    <li><a href="#features">Features</a></li>
                    <li>
                        <a href="#tech-stack">Tech Stack</a>
                        <ul style={{ marginLeft: "40px" }}>
                            <li><a href="#backend">Backend</a></li>
                            <li><a href="#frontend">Frontend</a></li>
                        </ul>
                    </li>
                    <li><a href="#prerequisites">Prerequisites</a></li>
                    <li><a href="#installation">Installation</a></li>
                    <li><a href="#troubleshooting">Troubleshooting</a></li>
                    <li><a href="#license">License</a></li>
                    <li><a href="#support">Support</a></li>
                </ul>

                <br />

                {/* INTRODUCTION */}
                <Typography variant="h4" id="introduction">
                    Introduction
                </Typography>
                <br />
                <Typography>
                    A full stack expense splitting app - splitwise clone made using the MERN stack (MongoDB, Express, React & Nodejs), 
                    specially designed to split group expense between friends. With this application, you can add your expense details 
                    and get an whole expense analytics feature - Group Balance, Monthly amount spend, Category wise expense spending graph etc.
                </Typography>

                <br />

                {/* FEATURES */}
                <Typography variant="h4" id="features">
                    Features
                </Typography>
                <br />
                <ul style={{ marginLeft: "40px" }}>
                    <li>Create user groups and track group expense</li>
                    <li>Keep track of shared expenses and settle your corresponding balances in a convenient and personalized way</li>
                    <li>Get Analytical graphs to understand your expenditure trend</li>
                    <li>Multiple user registration</li>
                    <li>Authentication using JSON web token (JWT)</li>
                </ul>

                <br />

                {/* TECH STACK */}
                <Typography variant="h4" id="tech-stack">
                    Tech Stack
                </Typography>
                <br />

                <Typography variant="h6" id="backend">
                    Backend
                </Typography>
                <ul style={{ marginLeft: "40px" }}>
                    <li>Node.js with Express</li>
                    <li>Express</li>
                    <li>Mongoose</li>
                    <li>JWT (For authentication)</li>
                    <li>bcryptjs (for data encryption)</li>
                    <li>MongoDB (MongoDB Atlas)</li>
                </ul>

                <br />

                <Typography variant="h6" id="frontend">
                    Frontend
                </Typography>
                <ul style={{ marginLeft: "40px" }}>
                    <li>React JS</li>
                    <li>Redux (for managing and centralizing application state)</li>
                    <li>Axios (for making api calls)</li>
                    <li>Material UI (for User Interface)</li>
                    <li>Chart.js (To display various analytics graphs)</li>
                    <li>React-chartjs-2</li>
                    <li>Gravatar (for user profile picture)</li>
                </ul>

                <br />

                {/* PREREQUISITES */}
                <Typography variant="h4" id="prerequisites">
                    Prerequisites
                </Typography>
                <br />
                <Typography>
                    Before you begin, ensure you have the following installed:
                </Typography>
                <ul style={{ marginLeft: "40px" }}>
                    <li><strong>Node.js</strong> (v16 or higher) and npm</li>
                    <li><strong>MongoDB</strong> (local installation or MongoDB Atlas account)</li>
                </ul>

                <br />

                {/* INSTALLATION */}
                <Typography variant="h4" id="installation">
                    Installation
                </Typography>
                <br />

                <Typography variant="h6">1. Clone the Repository</Typography>
                <Box sx={{ bgcolor: "#f0f0f0", p: 2, my: 2, borderRadius: 1 }}>
                    <code>
                        git clone &lt;repository-url&gt;
                        <br />
                        cd SmartSplit
                    </code>
                </Box>

                <Typography variant="h6">2. Backend Setup</Typography>
                <Typography>Navigate to the root directory and run:</Typography>
                <Box sx={{ bgcolor: "#f0f0f0", p: 2, my: 2, borderRadius: 1 }}>
                    <code>
                        npm install
                        <br />
                        npm start (to start the server)
                    </code>
                </Box>

                <Typography>Create a <code>.env</code> file in the backend directory (root directory) with the following variables:</Typography>
                <Box sx={{ bgcolor: "#f0f0f0", p: 2, my: 2, borderRadius: 1 }}>
                    <code style={{ whiteSpace: "pre-wrap" }}>
                        # MongoDB Connection String
                        <br />
                        # Please follow this tutorial https://dev.to/dalalrohit/how-to-connect-to-mongodb-atlas-using-node-js-k9i 
                        <br />
                        # to create your mongoDB connection url, which you'll use as your MONGODB_URI
                        <br />
                        # It should look something like this: mongodb+srv://&lt;username&gt;:&lt;password&gt;@cluster.mongodb.net/?appName=Cluster
                        <br />
                        MONGO_URI=""
                        <br />
                        <br />
                        # Provide some random key in ACCESS_TOKEN_SECRET or you could generate one using node
                        <br />
                        # Enter the below command in the terminal to generate a random secret key
                        <br />
                        # node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
                        <br />
                        ACCESS_TOKEN_SECRET=""
                        <br />
                        <br />
                        # API Base URL for frontend to make API calls (e.g., http://localhost:3001)
                        <br />
                        REACT_APP_BASE_URL=""
                        <br />
                        <br />
                        # Server Port (optional, defaults to 3001)
                        <br />
                        PORT=3001
                    </code>
                </Box>

                <Typography variant="h6">3. Frontend Setup</Typography>
                <Typography>In the second terminal, navigate to the client directory and run:</Typography>
                <Box sx={{ bgcolor: "#f0f0f0", p: 2, my: 2, borderRadius: 1 }}>
                    <code>
                        cd client
                        <br />
                        npm install
                        <br />
                        npm start
                    </code>
                </Box>

                <Typography>
                    The backend server will start on <code>http://localhost:3001</code> (or the port specified in your <code>.env</code> file).
                </Typography>
                <br />
                <Typography>You should see:</Typography>
                <Box sx={{ bgcolor: "#f0f0f0", p: 2, my: 2, borderRadius: 1 }}>
                    <code>
                        Server started in PORT | 3001
                        <br />
                        DB Connected
                    </code>
                </Box>

                <br />

                {/* TROUBLESHOOTING */}
                <Typography variant="h4" id="troubleshooting">
                    Troubleshooting
                </Typography>
                <br />

                <Typography variant="h6">MongoDB Connection Issues</Typography>
                <ul style={{ marginLeft: "40px" }}>
                    <li>Ensure your MongoDB Atlas connection string is correct</li>
                    <li>Check that the database name in your <code>MONGO_URI</code> is correct</li>
                </ul>

                <Typography variant="h6">CORS Errors</Typography>
                <ul style={{ marginLeft: "40px" }}>
                    <li>Ensure <code>CLIENT_ORIGIN</code> in backend <code>.env</code> matches your frontend URL</li>
                    <li>Make sure both frontend and backend servers are running</li>
                </ul>

                <Typography variant="h6">Port Already in Use</Typography>
                <ul style={{ marginLeft: "40px" }}>
                    <li>If port 3001 is already in use, change the <code>PORT</code> in backend <code>.env</code></li>
                </ul>

                <br />

                {/* LICENSE */}
                <Typography variant="h4" id="license">
                    License
                </Typography>
                <br />
                <Typography>
                    See the LICENSE file for details.
                </Typography>

                <br />

                {/* SUPPORT */}
                <Typography variant="h4" id="support">
                    Support
                </Typography>
                <br />
                <Typography>
                    For issues or questions, please open an issue in the repository.
                </Typography>

                <br />
                <Copyright />
            </Container>
        </>
    );
};

export default About;
        </>
    );
};

export default About;
