import { Component, OnInit } from '@angular/core';
import { Category } from '../../classes/category';
import { CategoryService } from '../../services/category.service';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-management',
  imports: [ NgIf, FormsModule, CommonModule  ],
  templateUrl: './category-management.component.html',
  styleUrl: './category-management.component.scss'
})
export class CategoryManagementComponent implements OnInit{

  categories : Category[] = [];

  addCategory : boolean = false;
  updateCategory : boolean = false;
  putCategorybtn : boolean = true;
  id : number = 0;

  constructor(private categoryService : CategoryService) { }

    ngOnInit() : void {
    this.categoryService.getAll().subscribe(data => this.categories = data)
  }

    postCategorySubmit = (id : number, category : Category) : void => {
       const updatedCategory: Category = {
        id: id,
        name: category.name 
        };
      this.categoryService.update(id, updatedCategory).subscribe({
        next : () => {
          const index = this.categories.findIndex(c => c.id === id);
          if (index !== -1)
            this.categories[index] = updatedCategory;
        }, error : (error) => {
          console.log(` error - ${error} `);
        }
      }
      );
      this.updateCategory = false;
    } 

    postCategory = (id : number) : void => {
      this.id = id;
      this.updateCategory = true;
    }

    addCategorySubmit = (category : Category) : void  => {
          this.categoryService.add(category).subscribe({
          next: () => {
            this.categories.push(category);
            this.addCategory = false;
          },
          error: (err) => {
              console.error('Error deleting user:', err);
          }
      });
      this.putCategorybtn = true;
    }

    putCategory = () : void => {
        this.putCategorybtn = false;
        this.addCategory = true;
    }


}
