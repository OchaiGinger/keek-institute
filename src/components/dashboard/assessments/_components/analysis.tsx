"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Terminal, BookOpen, Trophy } from "lucide-react";

interface AnalysisProps {
  results: {
    score: number;
    status: string;
    feedback: string;
    recommendedPath: string;
  };
  firstName: string;
}

export default function AnalysisClient({ results, firstName }: AnalysisProps) {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back, {firstName}
        </h1>
        <p className="text-muted-foreground">
          Here is the detailed breakdown of your entrance assessment.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Score Card */}
        <Card className="md:col-span-1 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Assessment Score
            </CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-4xl font-bold">{results.score}%</div>
            <Progress value={results.score} className="h-2" />
            <Badge
              className={
                results.status === "PASSED"
                  ? "bg-emerald-500/10 text-emerald-600 border-emerald-200"
                  : ""
              }
            >
              {results.status}
            </Badge>
          </CardContent>
        </Card>

        {/* Path Recommendation */}
        <Card className="md:col-span-2 shadow-sm border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Recommended Career Path
            </CardTitle>
            <Terminal className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize mb-2">
              {results.recommendedPath} Developer
            </div>
            <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
              <Sparkles className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-sm leading-relaxed text-muted-foreground">
                {results.feedback}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Curriculum Preview Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-muted/30 border-dashed">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="p-2 bg-background rounded-md border shadow-sm">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">View Curriculum</p>
              <p className="text-xs text-muted-foreground">
                Tailored for {results.recommendedPath}
              </p>
            </div>
          </CardContent>
        </Card>
        {/* Additional placeholder cards for a full dashboard look */}
      </div>
    </div>
  );
}
