// app/components/courses/FilterBar.tsx
import { Form, useSearchParams, useSubmit, useNavigation } from '@remix-run/react';
import { useEffect, useRef } from 'react';

export function FilterBar({ categories, subCategories, tags }: any) {
  const [searchParams] = useSearchParams();
  const submit = useSubmit();
  const navigation = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);
  
  // Debounce search logic (FR2)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isFirstSearch = searchParams.get("q") === null;
    submit(e.currentTarget.form, {
      replace: !isFirstSearch, 
    });
  };

  // Auto submit on select change
  const handleFilterChange = () => {
    submit(formRef.current);
  };

  // Clear filters
  const handleClear = () => {
    // Reset form or navigate to /courses
    window.location.href = "/courses";
  };

  return (
    <Form ref={formRef} method="get" className="bg-gray-50 p-4 rounded-md mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Title Search */}
      <div className="flex flex-col">
        <label className="text-xs font-semibold mb-1">Search Title</label>
        <input 
          type="text" 
          name="q" 
          placeholder="Search title..." 
          defaultValue={searchParams.get('q') || ''}
          onChange={(e) => {
             // Basic debounce implementation
             setTimeout(() => handleSearchChange(e), 500); 
          }}
          className="border p-2 rounded"
        />
      </div>

      {/* Category Filter (FR3) */}
      <div className="flex flex-col">
        <label className="text-xs font-semibold mb-1">Category</label>
        <select 
          name="categoryId" 
          defaultValue={searchParams.get('categoryId') || ''}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      
      {/* Các filter khác tương tự: SubCategory, Free, Tags... */}
      
      <div className="flex items-end">
        <button type="button" onClick={handleClear} className="text-sm text-red-500 hover:underline">
          Clear All Filters
        </button>
      </div>
    </Form>
  );
}