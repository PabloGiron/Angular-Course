import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  // ingredientAdded = new EventEmitter<{name:string, amount: number}>();
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(private shoppingListService: ShoppingListService) { }

  @ViewChild('f',{static: false}) slForm: NgForm;
  subscription: Subscription;
  editMode= false;
  editedItemIndex: number;
  editedItem: Ingredient;

  ngOnInit() {
    this.subscription =   this.shoppingListService.startedEditing
      .subscribe(
        (index:number)=>{
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.shoppingListService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  // removeIngredient(){
  //   this.ingredients.pop();
  //   console.log(this.ingredients);
  // }
  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    // this.ingredientAdded.emit(newIngredient);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex,newIngredient)
    }else{
      this.shoppingListService.addItem(value.name,value.amount);
    }
    form.reset();
    this.editMode = false;
  }
  
  onDeleteItem(form: NgForm){
    const name = form.value.name;
    this.shoppingListService.removeItem(name);
    this.onClear();
  }
  
  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }
}
