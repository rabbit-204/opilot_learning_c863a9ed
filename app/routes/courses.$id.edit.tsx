// app/routes/courses.$id.edit.tsx
import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigation, useActionData } from "@remix-run/react";
import { CourseService } from "~/services/course.service";
import { MetaService } from "~/services/meta.service";
import { useState } from "react";

// 1. Loader: Lấy dữ liệu khóa học hiện tại + Danh sách Category để hiển thị
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const courseId = Number(params.id);
  const course = await CourseService.getById(courseId);
  
  if (!course) {
    throw new Response("Course not found", { status: 404 });
  }

  // Lấy danh sách danh mục để đổ vào dropdown
  const metaData = await MetaService.getAll();

  return json({ course, ...metaData });
};

// 2. Action: Xử lý cập nhật
export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const courseId = Number(params.id);

  // Lưu ý: Không lấy 'title' từ formData vì không cho sửa
  const updates = {
    categoryId: Number(formData.get("categoryId")),
    subCategoryId: Number(formData.get("subCategoryId")),
    isFree: formData.get("isFree") === "on",
    postDate: formData.get("postDate") as string,
    // Xử lý tags nếu cần
  };

  await CourseService.update(courseId, updates);
  return redirect("/courses");
};

// 3. UI
export default function EditCourse() {
  const { course, categories, subCategories } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // State để lọc SubCategory theo Category đã chọn
  const [selectedCat, setSelectedCat] = useState<number>(course.categoryId);

  // Lọc subCategories dựa trên Category đang chọn
  const filteredSubs = subCategories.filter((s: any) => s.categoryId === Number(selectedCat));

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-6">Edit Course</h1>
      
      <Form method="post" className="space-y-4">
        {/* Title: Read-only (FR12) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input 
            type="text" 
            value={course.title} 
            disabled 
            className="w-full border p-2 rounded bg-gray-100 text-gray-500 cursor-not-allowed" 
          />
          <p className="text-xs text-gray-500 mt-1">Title cannot be changed.</p>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select 
            name="categoryId" 
            className="w-full border p-2 rounded"
            value={selectedCat}
            onChange={(e) => setSelectedCat(Number(e.target.value))}
            required
          >
            <option value="">Select Category</option>
            {categories.map((c: any) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* SubCategory (Dependent) */}
        <div>
          <label className="block text-sm font-medium">SubCategory</label>
          <select 
            name="subCategoryId" 
            className="w-full border p-2 rounded"
            defaultValue={course.subCategoryId}
          >
             <option value="">Select SubCategory</option>
             {filteredSubs.map((s: any) => (
               <option key={s.id} value={s.id}>{s.name}</option>
             ))}
          </select>
        </div>

        {/* Free Toggle */}
        <div className="flex items-center gap-2">
          <input 
            name="isFree" 
            type="checkbox" 
            id="isFree" 
            defaultChecked={course.isFree} 
          />
          <label htmlFor="isFree">Is Free?</label>
        </div>

        {/* Date Picker */}
        <div>
             <label className="block text-sm font-medium">Post Date</label>
             <input 
                name="postDate" 
                type="date" 
                className="border p-2 rounded" 
                defaultValue={course.postDate}
                required 
             />
        </div>

        <div className="flex justify-end gap-3 pt-4">
            <button 
                type="button" 
                onClick={() => history.back()} 
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
                Cancel
            </button>
            <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {isSubmitting ? "Saving..." : "Update Course"}
            </button>
        </div>
      </Form>
    </div>
  );
}
