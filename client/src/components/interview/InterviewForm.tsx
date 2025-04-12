import { toast } from "@/hooks/use-toast";
import { useClerk } from "@clerk/clerk-react";
import axios from "axios";
import { FormEvent, useState } from "react";

const InterviewForm = () => {

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    linkedin: "",
    higherEducation: "",
    college: "",
    jobRole: "",
    company: "",
    experience: "",
    achievements: "",
    skills: "",
    projects: "",
  });

  const user = useClerk().user

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();

    setLoading(true)

    try {
      const data = {
        name: formData.name,
        phone: formData.phone,
        email: user?.emailAddresses[0].emailAddress,
        linkedin: formData.linkedin,
        higherEducation: formData.higherEducation,
        college: formData.college,
        jobRole: formData.jobRole,
        company: formData.company,
        experience: Number(formData.experience),
        achievements: formData.achievements,
        skills: formData.skills,
        projects: formData.projects,
      }
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URI}/api/v1/user`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      });

      if (res.status === 201) {
        {
          toast({
            title: "Form submitted successfully",
          })
        }
      }

    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message,
        })
      } else {
        console.log(error)
      }
    } finally {
      setLoading(false)
    }
  };

  return (
    <div
      className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6"
    >
      <h2 className="text-2xl font-semibold text-center mb-4">Interview AI Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name */}
        <div >
          <label className="block font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Phone */}
        <div >
          <label className="block font-medium">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* LinkedIn */}
        <div >
          <label className="block font-medium">LinkedIn Profile</label>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="LinkedIn profile URL"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Higher Education */}
        <div >
          <label className="block font-medium">Higher Education</label>
          <input
            type="text"
            name="higherEducation"
            value={formData.higherEducation}
            onChange={handleChange}
            placeholder="e.g. Master's Degree"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* College Name */}
        <div >
          <label className="block font-medium">College Name</label>
          <input
            type="text"
            name="college"
            value={formData.college}
            onChange={handleChange}
            placeholder="Enter your college name"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Job Role (if any) */}
        <div >
          <label className="block font-medium">Job Role (if any)</label>
          <input
            type="text"
            name="jobRole"
            value={formData.jobRole}
            onChange={handleChange}
            placeholder="e.g. Software Developer"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Company Name */}
        <div >
          <label className="block font-medium">Company Name</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Enter company name (if applicable)"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Years of Experience */}
        <div >
          <label className="block font-medium">Years of Experience</label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Years of work experience"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Achievements */}
        <div >
          <label className="block font-medium">Achievements</label>
          <textarea
            name="achievements"
            value={formData.achievements}
            onChange={handleChange}
            placeholder="List your key achievements"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Skills */}
        <div >
          <label className="block font-medium">Skills</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="e.g. React, Python, Java"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Project GitHub Links */}
        <div >
          <label className="block font-medium">Project GitHub Links</label>
          <input
            type="url"
            name="projects"
            value={formData.projects}
            onChange={handleChange}
            placeholder="GitHub repository URL"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default InterviewForm