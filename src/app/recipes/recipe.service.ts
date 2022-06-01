import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();
    recipeSelected = new Subject<Recipe>();

    constructor(private shoppingListService: ShoppingListService){}

    private recipes: Recipe[] = [
        new Recipe( 
                    'Sandwich', 
                    'Sandwich de jamón y queso', 
                    'http://c.files.bbci.co.uk/14D0C/production/_103206258_sandwich.png',
                    [
                        new Ingredient('Bread',2),
                        new Ingredient('Jam',2),
                        new Ingredient('Cheese',1)
                    ]),
        new Recipe( 
                   'Hamburguesa pobre', 
                   'Hamburguesa que te dejará con más hambre', 
                   'https://www.seekpng.com/png/detail/408-4083659_png-hamburguer-imagens-de-hamburguer-png.png',
                    [
                        new Ingredient('Bread',2),
                        new Ingredient('Steak',1),
                        new Ingredient('Tomatoes',1)
                    ])
    ];

    getRecipes(){
        // return this.recipes; //Esta devolución se manda por referencia
        return this.recipes.slice(); //Con esto se mandará una copia
    }

    setIngredientsInShoppingList(ingredients : Ingredient[]){
        this.shoppingListService.setIngredients(ingredients)
    }

    getRecipe(index: number){
        return this.recipes[index];
    }

    // getRecipe(id:number){
    //     for (let i = 0; i < this.recipes.length; i++) {
    //         if(this.recipes[i].id == id){
    //             return this.recipes[i];
    //         }
    //     }
    // }
    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }
    
    updateRecipe(index:number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }

}