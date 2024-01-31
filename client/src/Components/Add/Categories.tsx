import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ICategory, IState } from '../../types';
import { isEmpty } from '../../Utils';
import { createCategories, deleteCategories } from '../../actions/category.action';

export default function Categories() {
  const dispatch:any = useDispatch();

    const categories = useSelector((state:IState) => state.categoryReducer)

    const [category, setCategory] = useState("");
    const [search, setSearch] = useState("");

    const addCat = () => {
        dispatch(createCategories(category));
        setCategory("");
    }

    return (
        <div className='tags'>

            <div className="head">

                <div className="title">
                    <h1>Add Tags</h1>
                </div>
                <div className="head-content">
                    <div className="input">
                        <input className='input' type="text" value={category} onChange={(e) => setCategory(e.target.value)}  />
                        <button className='button' onClick={addCat}>Add</button>
                    </div>
                </div>
            </div>

            <div className="body">
                <input type="text" className="input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search a tag' />
                <div className="tags">
                    {!isEmpty(categories) && Array.from(categories).sort((a:any,b:any) => a.name.localeCompare(b.name)).map((cat:ICategory, key:number) => {
                        if (!isEmpty(search)) {
                            if(cat.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                                return <div className='tag' key={key}>
                                    <p>{cat.name.toLocaleLowerCase()}</p>
                                    <div className="buttons">
                                        <p className="button" onClick={() => dispatch(deleteCategories(cat._id))}>Delete</p>
                                    </div>
                                </div>
                            } else {
                                return
                            }
                        } else {
                            return <div className='tag' key={key}>
                                <p>{cat.name}</p>
                                <div className="buttons">
                                    <p className="button" onClick={() => dispatch(deleteCategories(cat._id))}>Delete</p>
                                </div>
                            </div>
                        }
                    })}
                </div>
            </div>

        </div>
    )
}