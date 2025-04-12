import AnalysisComponent from "@/pages/Analysis";
import React from "react";
import Certificate from "./Certificate";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const AnalyticsPage: React.FC = () => {

    const user = useUser().user
    console.log(user)

    const userData = {
        name: user?.firstName || "Not found",
        phone: user?.primaryPhoneNumber?.phoneNumber || user?.phoneNumbers[0]?.phoneNumber || "Not found",
        linkedin: "https://linkedin.com/in/johndoe",
        higherEducation: "Master's in Computer Science",
        jobRole: "Full Stack Developer",
        experience: 5,
        achievements: ["Best Developer Award", "Hackathon Winner", "Employee of the Year"],
        projects: ["E-commerce App", "AI Chatbot", "Portfolio Website"],
        goals: "Become a CTO in 5 years",
        skills: [
            { name: "Aptitude", level: 85 },
            { name: "System Design", level: 90 },
            { name: "Technical", level: 80 },
            { name: "Behavioral", level: 75 },
        ],
    };

    return (
        <div className="p-6">
            <AnalysisComponent userData={userData} />
            <Certificate name={user?.fullName || "Not found"} role={"Mern stack"} score={85} />
            <div className="flex justify-center items-center pb-24">
                <Link className="bg-blue-400 py-2 px-4 text-lg rounded-xl " to="/dashboard">Back to home</Link>
            </div>
        </div>
    );
};

export default AnalyticsPage;
