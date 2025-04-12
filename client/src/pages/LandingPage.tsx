import GetStartedButton from "@/components/landing/GetStartedButton";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { FaVideo, FaCode, FaChartBar, FaUsers, FaComments } from "react-icons/fa";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-500 overflow-y-auto">
      <header className="text-center flex flex-col items-center justify-center w-full max-w-4xl mx-auto h-[70vh]">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">AI Interview Platform</h1>
        <p className="mt-4 text-xl text-gray-700 dark:text-gray-400">Enhance your interview preparation with AI-powered features.</p>
        <GetStartedButton />
      </header>

      <section className="grid md:grid-cols-6 gap-4 mt-8 max-w-5xl mx-auto p-4">
        <Card className="p-6 col-span-2 text-center shadow-lg transform hover:scale-[102%] hover:bg-gray-100/80 dark:hover:bg-gray-700/60 cursor-pointer transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <FaVideo className="text-blue-600 dark:text-blue-400 text-4xl mx-auto mb-4" />
          <CardTitle className="text-xl">Live Video & Facial Analysis</CardTitle>
          <CardContent className="text-gray-600 dark:text-gray-300">Practice with real-time video and AI-based facial expression analysis.</CardContent>
        </Card>

        <Card className="p-6 col-span-2 text-center shadow-lg transform hover:scale-[102%] hover:bg-gray-100/80 dark:hover:bg-gray-700/60 cursor-pointer transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <FaCode className="text-green-600 dark:text-green-400 text-4xl mx-auto mb-4" />
          <CardTitle className="text-xl">Built-in Code Editor</CardTitle>
          <CardContent className="text-gray-600 dark:text-gray-300">Solve coding problems with an interactive code editor.</CardContent>
        </Card>

        <Card className="p-6 col-span-2 text-center shadow-lg transform hover:scale-[102%] hover:bg-gray-100/80 dark:hover:bg-gray-700/60 cursor-pointer transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <FaChartBar className="text-yellow-600 dark:text-yellow-400 text-4xl mx-auto mb-4" />
          <CardTitle className="text-xl">Data Visualization</CardTitle>
          <CardContent className="text-gray-600 dark:text-gray-300">Get insights into your performance with AI-powered analysis.</CardContent>
        </Card>

        <Card className="p-6 col-span-3 text-center shadow-lg transform hover:scale-[102%] hover:bg-gray-100/80 dark:hover:bg-gray-700/60 cursor-pointer transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <FaUsers className="text-purple-600 dark:text-purple-400 text-4xl mx-auto mb-4" />
          <CardTitle className="text-xl">Mock Interviews</CardTitle>
          <CardContent className="text-gray-600 dark:text-gray-300">Simulate real interview scenarios with AI-driven responses.</CardContent>
        </Card>

        <Card className="p-6 col-span-3 text-center shadow-lg transform hover:scale-[102%] hover:bg-gray-100/80 dark:hover:bg-gray-700/60 cursor-pointer transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <FaComments className="text-red-600 dark:text-red-400 text-4xl mx-auto mb-4" />
          <CardTitle className="text-xl">AI Feedback</CardTitle>
          <CardContent className="text-gray-600 dark:text-gray-300">Receive instant AI-generated feedback on your answers.</CardContent>
        </Card>
      </section>

      <footer className="mt-12 text-gray-500 text-sm text-center p-4">© 2025 AI Interview Platform. All Rights Reserved.</footer>
    </div>
  );
}
