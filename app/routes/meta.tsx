// app/routes/meta.tsx
import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, useLoaderData, useSearchParams, useActionData, useNavigation } from "@remix-run/react";
import { MetaService } from "~/services/meta.service";
import { useEffect, useRef } from "react";

// 1. Loader: Lấy dữ liệu hiển thị
export const loader = async () => {
  const data = await MetaService.getAll();
  return json(data);
};

// 2. Action: Xử lý Thêm/Xóa
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent"); // Phân loại hành động
  
  try {
    switch (intent) {
      case "create_category": {
        const name = formData.get("name") as string;
        if (!name) return json({ error: "Name required" }, { status: 400 });
        await MetaService.createCategory(name);
        return json({ success: true });
      }
      case "delete_category": {
        const id = Number(formData.get("id"));
        await MetaService.deleteCategory(id);
        return json({ success: true });
      }
      case "create_tag": {
        const name = formData.get("name") as string;
        if (!name) return json({ error: "Name required" }, { status: 400 });
        await MetaService.createTag(name);
        return json({ success: true });
      }
      case "delete_tag": {
        const id = Number(formData.get("id"));
        await MetaService.deleteTag(id);
        return json({ success: true });
      }
      // Thêm cases cho SubCategory tương tự...
      default:
        return json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (e: any) {
    return json({ error: e.message }, { status: 400 }); // Trả về lỗi (ví dụ: ràng buộc dữ liệu)
  }
};

// 3. UI Component
export default function MetaManagement() {
  const { categories, tags } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const [searchParams, setSearchParams] = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // Tab hiện tại: 'categories' (default) hoặc 'tags'
  const activeTab = searchParams.get("tab") || "categories";

  // Reset form sau khi submit thành công
  useEffect(() => {
    if (actionData && !('error' in actionData)) {
      formRef.current?.reset();
    }
  }, [actionData]);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Meta Management</h1>

      {/* Tabs Navigation */}
      <div className="flex border-b mb-6">
        <button 
          onClick={() => setSearchParams({ tab: "categories" })}
          className={`px-4 py-2 ${activeTab === "categories" ? "border-b-2 border-blue-600 font-bold" : "text-gray-500"}`}
        >
          Categories
        </button>
        <button 
          onClick={() => setSearchParams({ tab: "tags" })}
          className={`px-4 py-2 ${activeTab === "tags" ? "border-b-2 border-blue-600 font-bold" : "text-gray-500"}`}
        >
          Tags
        </button>
      </div>

      {/* Error Message Display */}
      {actionData && 'error' in actionData && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {(actionData as any).error}
        </div>
      )}

      {/* --- CATEGORIES TAB CONTENT --- */}
      {activeTab === "categories" && (
        <div>
          {/* Create Form */}
          <Form method="post" ref={formRef} className="flex gap-2 mb-6 p-4 bg-gray-50 rounded">
            <input type="hidden" name="intent" value="create_category" />
            <input 
              name="name" 
              placeholder="New Category Name" 
              className="border p-2 rounded flex-1"
              required 
            />
            <button disabled={isSubmitting} className="bg-blue-600 text-white px-4 py-2 rounded">
              Add Category
            </button>
          </Form>

          {/* List */}
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat.id} className="flex justify-between items-center border p-3 rounded shadow-sm">
                <span>{cat.name}</span>
                <Form method="post">
                  <input type="hidden" name="intent" value="delete_category" />
                  <input type="hidden" name="id" value={cat.id} />
                  <button 
                    type="submit" 
                    className="text-red-500 hover:text-red-700 text-sm"
                    onClick={(e) => !confirm("Delete this category?") && e.preventDefault()}
                  >
                    Delete
                  </button>
                </Form>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* --- TAGS TAB CONTENT --- */}
      {activeTab === "tags" && (
        <div>
          <Form method="post" ref={formRef} className="flex gap-2 mb-6 p-4 bg-gray-50 rounded">
            <input type="hidden" name="intent" value="create_tag" />
            <input 
              name="name" 
              placeholder="New Tag Name" 
              className="border p-2 rounded flex-1"
              required 
            />
            <button disabled={isSubmitting} className="bg-green-600 text-white px-4 py-2 rounded">
              Add Tag
            </button>
          </Form>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag.id} className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2">
                {tag.name}
                <Form method="post" className="inline">
                  <input type="hidden" name="intent" value="delete_tag" />
                  <input type="hidden" name="id" value={tag.id} />
                  <button type="submit" className="text-gray-400 hover:text-red-500 font-bold ml-1">×</button>
                </Form>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}