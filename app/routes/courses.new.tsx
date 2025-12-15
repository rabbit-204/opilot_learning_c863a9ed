// app/routes/courses.new.tsx
import { ActionFunctionArgs, redirect, json } from '@remix-run/node';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import { CourseService } from '~/services/course.service';
import { useState } from 'react';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  
  // Validation (TR5)
  const title = formData.get("title") as string;
  const categoryId = Number(formData.get("categoryId"));
  
  if (!title) return json({ error: "Title is required" }, { status: 400 });

  await CourseService.create({
    title,
    categoryId,
    subCategoryId: Number(formData.get("subCategoryId")),
    isFree: formData.get("isFree") === "on",
    postDate: formData.get("postDate") as string,
    tagIds: [] // Handle multi-select logic
  });

  return redirect("/courses"); // Quay về danh sách
};

export default function CreateCourse() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // Client-side logic for Dependent Dropdown (FR4)
  const [selectedCat, setSelectedCat] = useState<string>("");

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-6">Create New Course</h1>
      
      <Form method="post" className="space-y-4">
        {actionData?.error && <div className="text-red-500">{actionData.error}</div>}
        
        {/* Title */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input name="title" type="text" className="w-full border p-2 rounded" required />
        </div>

        {/* Category (FR3) */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select 
            name="categoryId" 
            className="w-full border p-2 rounded"
            onChange={(e) => setSelectedCat(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="1">Tech</option>
            <option value="2">Art</option>
          </select>
        </div>

        {/* Dependent SubCategory (FR4) */}
        <div>
          <label className="block text-sm font-medium">SubCategory</label>
          <select 
            name="subCategoryId" 
            className="w-full border p-2 rounded"
            disabled={!selectedCat} // Disable until Category chosen
          >
             <option value="">Select SubCategory</option>
             {/* Render based on selectedCat logic */}
             {selectedCat === '1' && <option value="101">React</option>}
          </select>
        </div>

        {/* Free Toggle */}
        <div className="flex items-center gap-2">
          <input name="isFree" type="checkbox" id="isFree" />
          <label htmlFor="isFree">Is Free?</label>
        </div>

        {/* Date Picker */}
        <div>
             <label className="block text-sm font-medium">Post Date</label>
             <input name="postDate" type="date" className="border p-2 rounded" required />
        </div>

        <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={() => history.back()} className="px-4 py-2 text-gray-600">Cancel</button>
            <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {isSubmitting ? "Saving..." : "Save Course"}
            </button>
        </div>
      </Form>
    </div>
  );
}