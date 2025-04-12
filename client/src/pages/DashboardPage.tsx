import Container from "@/components/general/Container";
import DataVisualization from "@/components/general/DataVisualization";
import StreakTracker from "@/components/general/StreakTracker";
import SessionInfoForm, { formSchema } from "@/components/interview/SessionInfoForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useInterviewStore from "@/store/interviewStore";
import { JobRoleType } from "@/types/InterviewData";
import { useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const roles = [
  {
    title: "Frontend Developer",
    skills: ["express", "react", "API handling"],
    description:
      "A Frontend Developer should be proficient in HTML, CSS, and JavaScript, along with frameworks.",
  },
  {
    title: "Backend Developer",
    skills: ["nodejs"],
    description:
      "A MERN Stack Developer must have expertise in MongoDB, Express.js, React, and Node.js, along with RESTful APIs.",
  },
  {
    title: "MERN Stack Developer",
    skills: ["react"],
    description:
      "A Java Developer should be skilled in Java, Spring Boot, Hibernate, and database management using SQL.",
  },
]

function DashboardPage() {

  const navigate = useNavigate()
  const { setCandidate } = useInterviewStore()

  const user = useUser().user

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setCandidate({
      email: user?.primaryEmailAddress?.emailAddress || null,
      name: user?.username || null,
      yearsOfExperience: values.yearsOfExperience,
      jobRole: values.jobRole,
      skills: values.skills
    })
    navigate(`/interview/${Date.now()}`)
  }

  return (
    <div className="h-full w-screen overflow-x-hidden py-12 space-y-6">
      <div className="w-1/2 mx-auto my-2 py-2 rounded-xl bg-gradient-to-r to-blue-700 from-purple-800 flex justify-center items-center">
        <p className="text-zinc-300 font-semibold"><Link to="/dashboard/form" className="text-zinc-100 font-semibold hover:underline">Visit form</Link> to get started</p>
      </div>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {roles.map((role, index) => (
            <Card
              key={index}
              className="dark:bg-zinc-800 dark:text-neutral-300 p-6 cursor-pointer transition duration-300 hover:scale-[103%] hover:shadow-lg hover:bg-neutral-100 dark:hover:bg-zinc-700/70"
              onClick={() => onSubmit({ yearsOfExperience: 0, jobRole: role.title as JobRoleType, skills: [...role.skills] as [string, ...string[]] })}
            >
              <CardHeader className="py-1 px-0">
                <CardTitle className="text-2xl font-medium">{role.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-gray-600 dark:text-gray-400 text-sm">{role.description}</p>
              </CardContent>
            </Card>
          ))}
          <SessionInfoForm />
        </div>
        <h1 className="text-3xl font-bold mb-4 mt-16 rounded-xl py-1 h-15 w-fit text-left transition duration-300">
          Daily stats
        </h1>
        <div className="flex justify-between">
          <DataVisualization />
          <StreakTracker />
        </div>
      </Container>
    </div>
  );
}

export default DashboardPage;
