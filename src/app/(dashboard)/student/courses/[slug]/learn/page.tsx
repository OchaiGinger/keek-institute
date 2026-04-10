import { getLearningCourse } from "@/app/data/student/get-learning-course";
import { LearningLayout } from "./_components/learning-layout";

type Props = { params: Promise<{ slug: string }> };

export default async function LearnPage({ params }: Props) {
  const { slug } = await params;
  const data = await getLearningCourse(slug);
  return <LearningLayout data={data} />;
}
