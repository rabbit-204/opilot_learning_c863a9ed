// app/services/course.service.ts
import type { Course, CourseFilter } from '~/models/course.model';

// Dữ liệu giả lập (Mock Data)
let MOCK_COURSES: Course[] = [
  { id: 1, title: "Intro to Remix", categoryId: 1, subCategoryId: 101, isFree: true, postDate: "2024-01-15", tagIds: [1, 2] },
  { id: 2, title: "Advanced React", categoryId: 1, subCategoryId: 102, isFree: false, postDate: "2024-02-20", tagIds: [3] },
  // ... thêm dữ liệu mẫu nếu cần
];

export const CourseService = {
  // FR1, FR8, FR9, FR10: Get All with Filter, Sort, Pagination
  async getCourses(params: {
    filter: CourseFilter;
    sort: { field: keyof Course; direction: 'asc' | 'desc' };
    page: number;
    pageSize: number;
  }) {
    let result = [...MOCK_COURSES];

    // 1. Filtering (AND Logic - FR8)
    if (params.filter.query) {
      const q = params.filter.query.toLowerCase();
      result = result.filter(c => c.title.toLowerCase().includes(q)); // FR2
    }
    if (params.filter.categoryId) {
      result = result.filter(c => c.categoryId === params.filter.categoryId); // FR3
    }
    if (params.filter.subCategoryId) {
      result = result.filter(c => c.subCategoryId === params.filter.subCategoryId); // FR4
    }
    if (params.filter.isFree !== 'all' && params.filter.isFree !== undefined) {
      result = result.filter(c => c.isFree === params.filter.isFree); // FR5
    }
    if (params.filter.tagId) {
      result = result.filter(c => c.tagIds.includes(params.filter.tagId!)); // FR7
    }
    if (params.filter.dateFrom && params.filter.dateTo) {
        // Logic so sánh ngày (FR6) - Đơn giản hóa
        result = result.filter(c => c.postDate >= params.filter.dateFrom! && c.postDate <= params.filter.dateTo!);
    }

    // 2. Sorting (FR9)
    result.sort((a, b) => {
      const fieldA = a[params.sort.field];
      const fieldB = b[params.sort.field];
      if (fieldA < fieldB) return params.sort.direction === 'asc' ? -1 : 1;
      if (fieldA > fieldB) return params.sort.direction === 'asc' ? 1 : -1;
      return 0;
    });

    // 3. Pagination (FR10)
    const total = result.length;
    const start = (params.page - 1) * params.pageSize;
    const data = result.slice(start, start + params.pageSize);

    return { data, total, page: params.page, totalPages: Math.ceil(total / params.pageSize) };
  },

  async getById(id: number) {
    return MOCK_COURSES.find(c => c.id === id);
  },

  async create(data: Omit<Course, 'id'>) {
    const newCourse = { ...data, id: Date.now() }; // Mock ID
    MOCK_COURSES.push(newCourse);
    return newCourse;
  },

  async update(id: number, data: Partial<Course>) {
    const index = MOCK_COURSES.findIndex(c => c.id === id);
    if (index === -1) throw new Error("Course not found");
    
    // FR12: Title cannot be edited logic should be handled in UI or validation, 
    // but here we merge.
    MOCK_COURSES[index] = { ...MOCK_COURSES[index], ...data };
    return MOCK_COURSES[index];
  },

  async delete(id: number) {
    MOCK_COURSES = MOCK_COURSES.filter(c => c.id !== id);
    return true;
  }
};