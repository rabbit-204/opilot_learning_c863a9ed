// app/models/course.model.ts
import type { WordPressEntity } from './wp-entity.model';

export interface Tag extends WordPressEntity {
  name: string;
}

export interface Category extends WordPressEntity {
  name: string;
}

export interface SubCategory extends WordPressEntity {
  name: string;
  categoryId: number; // Link to Category
}

export interface Course extends WordPressEntity {
  title: string;
  categoryId: number;
  subCategoryId: number;
  isFree: boolean;
  postDate: string; // ISO Date string (mm/dd/yyyy format handling in UI)
  tagIds: number[];
}

// Interface cho Filters (FR1 -> FR8)
export interface CourseFilter {
  query?: string;
  categoryId?: number;
  subCategoryId?: number;
  isFree?: boolean | 'all'; // true=Free, false=Paid, 'all'=All
  dateFrom?: string;
  dateTo?: string;
  tagId?: number;
}