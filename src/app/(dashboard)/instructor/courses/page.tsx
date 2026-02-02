import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

const CoursesPage = () => {
    return (
        <>
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Your Courses</h1>
            <Link href="/instructor/courses/create" className={buttonVariants()}>Create Course</Link>
        </div>
        <div className="">
            <h1 className="">Hear you will see all of the courses</h1>
        </div>
        </>
    )
}

export default CoursesPage