import { EventEmitter } from "@angular/core";
import { Subject } from 'rxjs';

import { Ingredient } from "../shared/ingredient.model"; 

export class ShoppingListService {

    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    ingredients:Ingredient[] =[
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',10),
        new Ingredient('Potatoes',15),
        new Ingredient('Onions',20),
        new Ingredient('Cucumbers',25),
    ];

    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(index: number){
        return this.ingredients[index];
    }
    
    setIngredients( ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
    }

    addItem(name: string, amount: number){
        this.ingredients.push(new Ingredient(name, Number(amount)));
        this.ingredientsChanged.next (this.ingredients.slice());
    }

    updateIngredient(index:number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    
    removeItem(name: string){
        let ingredient = this.ingredients.findIndex( ingredient => ingredient.name === name)
        this.ingredients.splice(ingredient,1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}