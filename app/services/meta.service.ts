/* eslint-disable */
// app/services/meta.service.ts
export interface Category { id: number; name: string; }
export interface SubCategory { id: number; name: string; categoryId: number; }
export interface Tag { id: number; name: string; }

// Mock Data
let CATEGORIES = [{ id: 1, name: "Tech" }, { id: 2, name: "Business" }];
let SUBCATEGORIES = [{ id: 101, name: "React", categoryId: 1 }, { id: 102, name: "Marketing", categoryId: 2 }];
let TAGS = [{ id: 1, name: "New" }, { id: 2, name: "Hot" }];

export const MetaService = {
  async getAll() {
    return { categories: CATEGORIES, subCategories: SUBCATEGORIES, tags: TAGS };
  },

  async createCategory(name: string) {
    const newCat = { id: Date.now(), name };
    CATEGORIES.push(newCat);
    return newCat;
  },

  async deleteCategory(id: number) {
    // Check constraint (FR14): Không xóa nếu có SubCategory con
    const hasChildren = SUBCATEGORIES.some(s => s.categoryId === id);
    if (hasChildren) throw new Error("Cannot delete Category containing SubCategories.");
    CATEGORIES = CATEGORIES.filter(c => c.id !== id);
  },

  async createSubCategory(name: string, categoryId: number) {
    const newSub = { id: Date.now(), name, categoryId };
    SUBCATEGORIES.push(newSub);
    return newSub;
  },

  async deleteSubCategory(id: number) {
    SUBCATEGORIES = SUBCATEGORIES.filter(s => s.id !== id);
  },

  async createTag(name: string) {
    if (TAGS.some(t => t.name.toLowerCase() === name.toLowerCase())) throw new Error("Tag already exists");
    const newTag = { id: Date.now(), name };
    TAGS.push(newTag);
    return newTag;
  },

  async deleteTag(id: number) {
    TAGS = TAGS.filter(t => t.id !== id);
  }
};