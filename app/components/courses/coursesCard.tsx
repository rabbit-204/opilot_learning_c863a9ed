// app/components/courses/CourseCard.tsx
import { Link } from '@remix-run/react';
import { Course } from '~/models/course.model';
import { Form } from "@remix-run/react";
// Giả sử import từ aic-kits
// import { Card, Badge, Button, Text } from '@aic-kits/react'; 

export function CourseCard({ course, onDelete }: { course: Course, onDelete: (id: number) => void }) {
  return (
    <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition bg-white">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg text-primary">{course.title}</h3>
        <span className={`px-2 py-1 text-xs rounded ${course.isFree ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
          {course.isFree ? 'Free' : 'Paid'}
        </span>
      </div>
      
      <div className="text-sm text-gray-500 mb-2">
        {/* Trong thực tế cần map ID sang Name */}
        Cat: {course.categoryId} / Sub: {course.subCategoryId}
      </div>
      
      <div className="text-xs text-gray-400 mb-3">
        Date: {new Date(course.postDate).toLocaleDateString()}
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {course.tagIds.map(tagId => (
           <span key={tagId} className="bg-gray-100 px-2 rounded-full text-xs">Tag {tagId}</span>
        ))}
      </div>

      <div className="flex gap-2 mt-auto">
        <Link to={`/courses/${course.id}/edit`} className="text-blue-600 hover:underline text-sm flex items-end">Edit</Link>
        <Form 
          method="post" 
          action={`/courses/${course.id}/destroy`} 
          onSubmit={(event) => {
            if (!confirm("Are you sure you want to delete this course?")) {
              event.preventDefault();
            }
          }}
        >
          <button type="submit" className="text-red-600 hover:underline text-sm flex items-end">
            Delete
          </button>
        </Form>
        {/* <button onClick={() => onDelete(course.id)} className="text-red-600 hover:underline text-sm">Delete</button> */}
      </div>
    </div>
  );
}
