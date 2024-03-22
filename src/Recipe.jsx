import React from 'react'

export default function Recipe({title, calories, image, ingredients, recipeUrl}) {

 const roundedCalories = Math.round(calories);


  return (
    <div className='col-lg-6 mb-5'>
        <div className="recipe-item">
            <div className="recipe-item-text">
            <h3 className='mb-3 text-center'>{title}</h3>
            <p className='small text-center'>Number of calories: {roundedCalories}</p>
            <ul>
                {ingredients.map(ingredient => (
                    <li>{ingredient.text}</li>
                ))}
            </ul>
            </div>
            <div className="recipe-item-bottom">
            <img src={image} alt="" />
            <a className='btn btn-primary btn-lg' href={recipeUrl} target="_blank" rel="noopener noreferrer">View Recipe</a>
            </div>
        </div>
    </div>
  )
}
