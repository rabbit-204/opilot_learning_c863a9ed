// app/routes/courses.$id.destroy.tsx
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { CourseService } from "~/services/course.service";

export const action = async ({ params }: ActionFunctionArgs) => {
  // 1. Lấy ID từ URL
  const courseId = Number(params.id);

  if (!courseId) {
    throw new Response("Invalid ID", { status: 400 });
  }

  // 2. Gọi Service để xóa (Mock logic)
  await CourseService.delete(courseId);

  // 3. Redirect về trang danh sách sau khi xóa thành công
  return redirect("/courses");
};
