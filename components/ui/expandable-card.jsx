"use client";;
import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, MessageSquare, Star, } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { useExpandable } from "@/components/hooks/use-expandable";

export function ProjectStatusCard({
  title ,
  progress =0,
  dueDate =0,
  tasks =[
          { title: "Fluency", completed: true,score :0  },
          { title: "Accuracy", completed: true,score:0 },
          { title: "Completeness", completed: true, score:0  },
          { title: "Practical Relevance", completed: true, score:0  },
          { title: "Explaination", completed: true, score:0 }
        ],
  bestScore =0,
  timesAttempted = 0,
  lastAttempted = 0,
}) {
  const { isExpanded, toggleExpand, animatedHeight } = useExpandable();
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      animatedHeight.set(isExpanded ? contentRef.current.scrollHeight : 0);
    }
  }, [isExpanded, animatedHeight]);

  return (
    (<Card
      className="w-[97%] ml-3 max-w-md cursor-pointer transition-all duration-300 hover:shadow-lg"
      onClick={toggleExpand}>
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-start w-full">
          <div className="space-y-2">
            <Badge
              variant="secondary"
              className={
                 "bg-green-100 text-green-600"
              }>
              {"Attempted"}
            </Badge>
            <h3 className="text-2xl font-semibold">{title}</h3>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4  ">
          {progress === 0 ? (  <Badge variant="secondary" className="text-sm bg-yellow-100 text-yellow-600">Result Yet to be Declared</Badge>) :
          (<>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Performance</span>
              <span>{progress}%</span>
            </div>
            <ProgressBar value={progress} className="h-2" />
          </div>

          <motion.div
            style={{ height: animatedHeight }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden">
            <div ref={contentRef}>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 pt-2">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Attempted on: {dueDate}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                        <span>{}Your Best</span>
                          <span>{bestScore}</span>
                          <Star className="h-4 w-4 mr-1 text-yellow-400" />
                        </div>
                      </div>
                    </div>
                   
                      <h4 className="font-medium text-sm">Parameters </h4>
                      <div className="w-auto flex flex-col  h-auto">
                      {tasks.map((task, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 flex-1">{task.title}</span>
                          {task.completed && (
                            <ProgressBar value={task.score} className="h-2 w-[50%] flex" />
                          )}
                          <span className="px-2">{task.score}%</span>
                        </div>
                      ))}
                      </div>
                   

                    <div className="space-y-2">
                      <Button className="w-full">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Retake Test
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          </>)}
        </div>
      </CardContent>
      <CardFooter>
        <div
          className="flex items-center justify-between w-full text-sm text-gray-600">
          <span>Last Attempted: {lastAttempted} hours ago</span>
          <span>{timesAttempted} Times Attempted</span>
        </div>
      </CardFooter>
    </Card>)
  );
}