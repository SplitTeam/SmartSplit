import { Typography, Box, Container } from "@mui/material";
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
                            <li><a href="#frontend">Frontend</a></li>
                            <li><a href="#backend">Backend</a></li>
                        </ul>
                    </li>
                    <li><a href="#installation">Installation</a></li>
                    <li><a href="#license">License</a></li>
                </ul>

                <br />

                {/* INTRODUCTION */}
                <Typography variant="h4" id="introduction">
                    Introduction
                </Typography>
                <br />
                <Typography>
                    SmartSplit is a full stack expense splitting application built using the MERN stack (MongoDB, Express, React & Node.js).
                    It is designed to help friends and groups split shared expenses easily.
                </Typography>
                <br />
                <Typography>
                    The application allows users to add expenses, track balances within
                    groups, and visualize spending trends such as monthly expenses and
                    category-wise analytics.
                </Typography>

                <br />

                {/* FEATURES */}
                <Typography variant="h4" id="features">
                    Features
                </Typography>
                <br />
                <ul style={{ marginLeft: "40px" }}>
                    <li>Create user groups and track group expenses</li>
                    <li>
                        Keep track of shared expenses and settle balances conveniently
                    </li>
                    <li>Analytical graphs for spending trends</li>
                    <li>Multiple user registration</li>
                    <li>Authentication using JSON Web Tokens (JWT)</li>
                </ul>

                <br />

                {/* TECH STACK */}
                <Typography variant="h4" id="tech-stack">
                    Tech Stack
                </Typography>
                <br />

                <Typography variant="h6" id="frontend">
                    Frontend
                </Typography>
                <ul style={{ marginLeft: "40px" }}>
                    <li>React JS</li>
                    <li>Redux (state management)</li>
                    <li>Axios (API requests)</li>
                    <li>Material UI</li>
                    <li>Chart.js & react-chartjs-2</li>
                    <li>Gravatar (user profile images)</li>
                </ul>

                <br />

                <Typography variant="h6" id="backend">
                    Backend
                </Typography>
                <ul style={{ marginLeft: "40px" }}>
                    <li>Node.js with Express</li>
                    <li>Mongoose</li>
                    <li>JWT (authentication)</li>
                    <li>bcryptjs (password hashing)</li>
                    <li>MongoDB Atlas</li>
                </ul>

                <br />

                {/* INSTALLATION */}
                <Typography variant="h4" id="installation">
                    Installation
                </Typography>
                <br />
                <Typography>
                    Clone the repository and install dependencies for both backend and
                    frontend.
                </Typography>

                <Box sx={{ bgcolor: "#f0f0f0", p: 3, my: 3 }}>
                    <code>
                        git clone &lt;repository-url&gt;
                        <br />
                        cd SmartSplit
                    </code>
                </Box>

                <Typography>Backend setup:</Typography>
                <Box sx={{ bgcolor: "#f0f0f0", p: 3, my: 3 }}>
                    <code>
                        npm install
                        <br />
                        npm start
                    </code>
                </Box>

                <Typography>Create a <code>.env</code> file:</Typography>
                <Box sx={{ bgcolor: "#f0f0f0", p: 3, my: 3 }}>
                    <code>
                        PORT=3001
                        <br />
                        MONGO_URI=
                        <br />
                        ACCESS_TOKEN_SECRET=
                    </code>
                </Box>

                <Typography>Frontend setup:</Typography>
                <Box sx={{ bgcolor: "#f0f0f0", p: 3, my: 3 }}>
                    <code>
                        cd client
                        <br />
                        npm install
                        <br />
                        npm start
                    </code>
                </Box>

                <br />

                {/* LICENSE */}
                <Typography variant="h4" id="license">
                    License
                </Typography>
                <br />
                <Typography>
                    This project is licensed under the MIT License.
                </Typography>

                <br />
                <Copyright />
            </Container>
        </>
    );
};

export default About;
