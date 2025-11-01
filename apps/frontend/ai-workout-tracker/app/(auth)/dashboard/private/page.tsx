"use client";

import React, { useState, useRef } from 'react'
import { useUser } from '@clerk/nextjs';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { motion, AnimatePresence } from 'motion/react';
import { Dumbbell, TrendingUp } from 'lucide-react';

const TABS = ["workout", "stats"] as const;

const PrivatePage = () => {
    const user = useUser();
    const firstName = user.user?.firstName;
    const [activeTab, setActiveTab] = useState<string>("workout");
    const [direction, setDirection] = useState<number>(1);
    const prevTabRef = useRef<string>("workout");

    return (
        <div className="space-y-6 flex flex-col h-full">
            <div>
                <h1 className='text-3xl font-bold'>{firstName}'s Space</h1>
            </div>
            <br />

            {/* Animated Tabs with Smooth Sliding Background */}
            <div className="rounded-lg bg-muted/50 p-1 border border-border">
                <AnimatedBackground
                    defaultValue="workout"
                    onValueChange={(value: string | null) => {
                        const newTab = value || "workout";
                        const currentIndex = TABS.indexOf(activeTab as typeof TABS[number]);
                        const newIndex = TABS.indexOf(newTab as typeof TABS[number]);
                        setDirection(newIndex > currentIndex ? 1 : -1);
                        prevTabRef.current = activeTab;
                        setActiveTab(newTab);
                    }}
                    className="rounded-md bg-background shadow-sm"
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                        mass: 0.8,
                    }}
                >
                    <button
                        data-id="workout"
                        type="button"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[checked=true]:text-foreground"
                    >
                        <Dumbbell className="h-4 w-4" />
                        Workout
                    </button>
                    <button
                        data-id="stats"
                        type="button"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-foreground data-[checked=true]:text-foreground"
                    >
                        <TrendingUp className="h-4 w-4" />
                        Stats
                    </button>
                </AnimatedBackground>
            </div>

            {/* Tab Content with Synchronized Carousel Sliding Animation */}
            <div className="mt-6 relative overflow-hidden w-full flex-1">
                <motion.div
                    className="flex w-full h-full"
                    animate={{
                        x: activeTab === "workout" ? "0%" : "-100%"
                    }}
                    transition={{
                        type: "tween",
                        ease: [0.32, 0.72, 0, 1],
                        duration: 0.5,
                    }}
                >
                    {/* Workout Panel */}
                    <div className="w-full h-full shrink-0 px-1">
                        <div className="rounded-lg border p-6 space-y-4 bg-background h-full flex flex-col">
                            <div className="flex items-center gap-2">
                                <h2 className="text-lg font-semibold">Workout Plans</h2>
                            </div>
                            <p className="text-muted-foreground">Track and manage your workouts.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 flex-1">
                                <div className="p-4 rounded-md bg-muted/50">
                                    <h3 className="font-medium mb-2">Today's Plan</h3>
                                    <p className="text-sm text-muted-foreground">No workouts scheduled</p>
                                </div>
                                <div className="p-4 rounded-md bg-muted/50">
                                    <h3 className="font-medium mb-2">Progress</h3>
                                    <p className="text-sm text-muted-foreground">0 workouts completed</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Panel */}
                    <div className="w-full h-full shrink-0 px-1">
                        <div className="rounded-lg border p-6 space-y-4 bg-background h-full flex flex-col">
                            <div className="flex items-center gap-2">
                                <h2 className="text-lg font-semibold">Statistics</h2>
                            </div>
                            <p className="text-muted-foreground">View your workout statistics and progress.</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 flex-1">
                                <div className="p-4 rounded-md bg-muted/50 text-center">
                                    <p className="text-2xl font-bold">0</p>
                                    <p className="text-sm text-muted-foreground">Total Workouts</p>
                                </div>
                                <div className="p-4 rounded-md bg-muted/50 text-center">
                                    <p className="text-2xl font-bold">0</p>
                                    <p className="text-sm text-muted-foreground">Hours Trained</p>
                                </div>
                                <div className="p-4 rounded-md bg-muted/50 text-center">
                                    <p className="text-2xl font-bold">0</p>
                                    <p className="text-sm text-muted-foreground">Streak Days</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default PrivatePage
