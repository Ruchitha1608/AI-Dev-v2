import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MAX_STREAK = 10; // Maximum streak count for a full circle

const StreakCircle: React.FC = () => {
    const [streak, setStreak] = useState<number>(0);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    // Load streak from LocalStorage
    useEffect(() => {
        const savedStreak = localStorage.getItem("streak");
        const savedDate = localStorage.getItem("lastUpdated");

        if (savedStreak && savedDate) {
            const lastDate = new Date(savedDate);
            const today = new Date();

            if (today.toDateString() === lastDate.toDateString()) {
                setStreak(parseInt(savedStreak, 10));
            } else if (
                today.getDate() - lastDate.getDate() === 1 &&
                today.getMonth() === lastDate.getMonth() &&
                today.getFullYear() === lastDate.getFullYear()
            ) {
                setStreak(parseInt(savedStreak, 10));
            } else {
                setStreak(0); // Reset streak if a day is missed
            }
        }
        setLastUpdated(new Date());
    }, []);

    // Function to increment the streak
    const increaseStreak = () => {
        const newStreak = streak + 1;
        setStreak(newStreak);
        setLastUpdated(new Date());

        localStorage.setItem("streak", newStreak.toString());
        localStorage.setItem("lastUpdated", new Date().toISOString());
    };

    return (
        <Card className="w-7/12 max-w-sm mx-auto p-4 text-center dark:bg-[#212121] ml-2">
            <h1 className="text-3xl font-bold rounded-xl py-3  w-full text-center">
  Streak Track
</h1>

            <CardHeader>
                <CardTitle>Streak Tracker</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative flex justify-center items-center w-40 h-40 mx-auto">
                    {/* SVG Circular Progress */}
                    <svg className="absolute w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
                        {/* Background Circle */}
                        <circle cx="50" cy="50" r="40" strokeWidth="10" fill="none" className="stroke-gray-300" />
                        {/* Streak Progress Circle */}
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            strokeWidth="10"
                            fill="none"
                            stroke="currentColor"
                            strokeDasharray="251.2"
                            strokeDashoffset={251.2 - (streak / MAX_STREAK) * 251.2}
                            strokeLinecap="round"
                            className="stroke-[#f59e0b] transition-all duration-500 ease-in-out"
                        />
                    </svg>

                    {/* Streak Count in the Center */}
                    <span className="absolute text-3xl font-bold text-[#f59e0b] ">{streak}</span>
                </div>

                <Button onClick={increaseStreak} className="mt-4 w-full bg-blue-500 hover:bg-blue-400">
                    Streaks
                </Button>
            </CardContent>
        </Card>
    );
};

export default StreakCircle;
