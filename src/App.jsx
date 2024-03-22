import React,{ useEffect, useState } from 'react'
import './App.css'
import Recipe from './Recipe';

const App = () => {

  const APP_ID = process.env.APP_ID;
  const APP_KEY = process.env.APP_KEY;

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect( () => {
    if (query !== '') {
      getRecipes();
    }
  }, [query]);

  const getRecipes = async () => {
    setLoading(true)
    try {
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const data = await response.json();
      setRecipes(data.hits);
    } catch (e) {
      console.log('Error');
      console.log({e});
    } finally {
      setLoading(false)
    }
  }

  const updateSearch = e => setSearch(e.target.value)

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <>
      <div className='App container px-lg-5'>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <h1 className='mt-5 fw-bold text-center'>Search by recipe or by ingredient</h1>
          <form onSubmit={getSearch} className='search-form d-flex my-5'>
            <input className='search-bar form-control me-3' type="text" value={search} onChange={updateSearch}/>
            <button className='search-button btn btn-primary' type='submit'>Search</button>
          </form>
        </div>
        {loading && <div className='d-flex justify-content-center'><div className="loader"></div></div>}
        {!loading && <div className="recipes row gx-md-5">
          {recipes.map(recipe => (
            <Recipe 
              title={recipe.recipe.label} calories={recipe.recipe.calories} 
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
              recipeUrl={recipe.recipe.url}
              key={recipe.recipe.url}
            />
          ))}
        </div>}
      </div>
    </>
  )
}

export default App
