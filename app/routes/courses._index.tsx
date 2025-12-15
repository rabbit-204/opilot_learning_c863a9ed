// app/routes/courses._index.tsx
import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, useSearchParams, Link } from '@remix-run/react';
import { CourseService } from '~/services/course.service';
// import { CourseCard } from '~/components/courses/CourseCard';
import { FilterBar } from '~/components/courses/FilterBar';
import { CourseCard } from '~/components/courses/coursesCard';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || undefined;
  const categoryId = Number(url.searchParams.get("categoryId")) || undefined;
  // ... lấy các param khác
  const page = Number(url.searchParams.get("page")) || 1;
  const sortField = (url.searchParams.get("sortField") as any) || 'postDate';
  const sortDir = (url.searchParams.get("sortDir") as any) || 'desc';

  const { data, total, totalPages } = await CourseService.getCourses({
    filter: { query: q, categoryId }, // map params
    sort: { field: sortField, direction: sortDir },
    page,
    pageSize: 10
  });

  // Mock data for dropdowns
  const categories = [{id: 1, name: "Tech"}, {id: 2, name: "Art"}]; 

  return json({ courses: data, total, page, totalPages, categories });
};

export default function CoursesIndex() {
  const { courses, categories, page, totalPages } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Courses</h1>
        <Link to="new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Create Course
        </Link>
      </div>

      <FilterBar categories={categories} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <CourseCard 
            key={course.id} 
            course={course} 
            onDelete={(id) => {
                if(confirm("Are you sure?")) {
                    // Submit a delete action form here
                }
            }} 
           />
        ))}
      </div>

      {/* Pagination Controls (UI5) */}
      <div className="mt-8 flex justify-center gap-4">
        <Link 
            to={`?page=${page - 1}`} 
            className={`px-4 py-2 border rounded ${page <= 1 ? 'pointer-events-none opacity-50' : ''}`}
        >
            Previous
        </Link>
        <span className="py-2">Page {page} of {totalPages}</span>
        <Link 
            to={`?page=${page + 1}`}
            className={`px-4 py-2 border rounded ${page >= totalPages ? 'pointer-events-none opacity-50' : ''}`}
        >
            Next
        </Link>
      </div>
    </div>
  );
}