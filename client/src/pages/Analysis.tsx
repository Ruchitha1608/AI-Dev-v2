import { FaUser, FaPhone, FaLinkedin, FaGraduationCap, FaBriefcase, FaBullseye } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

interface Skill {
  name: string;
  level: number;
}

interface UserData {
  name: string;
  phone: string;
  linkedin: string;
  higherEducation: string;
  jobRole: string;
  goals: string;
  skills: Skill[];
}

// Update the AnalysisComponent props to use the UserData interface
interface AnalysisComponentProps {
  userData: UserData;
}

const AnalysisComponent = ({ userData }: AnalysisComponentProps) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Interview Analysis</h2>

      {/* User Info Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-4 border rounded-xl shadow-md bg-gray-50 flex items-center gap-2">
          <FaUser className="text-blue-500" />
          <span className="font-semibold">Full Name:</span>
          <p className="text-gray-700">{userData.name}</p>
        </div>

        <div className="p-4 border rounded-xl shadow-md bg-gray-50 flex items-center gap-2">
          <FaPhone className="text-blue-500" />
          <span className="font-semibold">Phone:</span>
          <p className="text-gray-700">{userData.phone}</p>
        </div>

        <div className="p-4 border rounded-xl shadow-md bg-gray-50 flex items-center gap-2">
          <FaLinkedin className="text-blue-500" />
          <span className="font-semibold">LinkedIn:</span>
          <a href={userData.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {userData.linkedin}
          </a>
        </div>

        <div className="p-4 border rounded-xl shadow-md bg-gray-50 flex items-center gap-2">
          <FaGraduationCap className="text-blue-500" />
          <span className="font-semibold">Education:</span>
          <p className="text-gray-700">{userData.higherEducation}</p>
        </div>

        <div className="p-4 border rounded-xl shadow-md bg-gray-50 flex items-center gap-2">
          <FaBriefcase className="text-blue-500" />
          <span className="font-semibold">Job Role:</span>
          <p className="text-gray-700">{userData.jobRole}</p>
        </div>

        <div className="p-4 border rounded-xl shadow-md bg-gray-50 flex items-center gap-2">
          <FaBullseye className="text-blue-500" />
          <span className="font-semibold">Career Goals:</span>
          <p className="text-gray-700">{userData.goals}</p>
        </div>
      </div>

      {/* Skills Bar Chart */}
      <div className="mt-10">
        <h3 className="text-xl font-bold text-blue-600">Skill Level Analysis</h3>
        <ResponsiveContainer width="80%" height={250}>
          <BarChart data={userData.skills} layout="vertical">
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 14, fontWeight: "bold" }} />
            <Tooltip />
            <Bar dataKey="level" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Skills Radar Chart */}
      <div className="mt-10">
        <h3 className="text-xl font-bold text-blue-600">Skill Distribution</h3>
        <ResponsiveContainer width="100%" height={350}>
          <RadarChart data={userData.skills}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" tick={{ fontSize: 14, fontWeight: "bold" }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name="Skill Level" dataKey="level" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalysisComponent;
