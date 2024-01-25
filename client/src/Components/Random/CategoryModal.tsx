import React, { useEffect, useState } from 'react'
import { isEmpty } from '../../Utils'
import { useSelector } from 'react-redux'
import { ICategory, IState } from '../../types'

export default function CategoryModal({close, FCategories, setFCategories} : {close:any, FCategories:any, setFCategories:any}) {
    const categories = useSelector((state:IState) => state.categoryReducer);

    const [load, setLoad] = useState<Boolean>(false);

    useEffect(() => {
        if (!isEmpty(categories)) setLoad(true)
    }, [categories])

    const categoryHandle = (categories:ICategory) => {
        if (!isEmpty(FCategories))
        {
            var categoryArr = FCategories!.split(','); //Array
            const index = categoryArr.findIndex((i:string) => i === categories._id)
            if (index >= 0)
            {
                var filtered = categoryArr.filter((t:string) => {
                    return t !== categories._id
                });
                var foldersStr = filtered.join(',');
                setFCategories(foldersStr);
            }
            else
            {
                categoryArr.push(categories._id);
                var categoryArr = categoryArr.join(',');
                setFCategories(categoryArr);
            }
        }
        else
        {
            var categoryArr:any = [];
            categoryArr.push(categories._id);
            var foldersStr = categoryArr.join(",");
            setFCategories(foldersStr);
        }
        return;
    }

    const allHandle = () => {
        var categoryArr:string[] = [];
        
        if (categories.length === FCategories.split(',').length)
        {
            setFCategories('');
        }
        else
        {
            categories.map((c:ICategory) => {
                categoryArr.push(c._id)
            });

            var foldersStr = categoryArr!.join(',');
            setFCategories(foldersStr)
        }     
    }

    //Shortcuts
    useEffect(() => {
        const keyDownHandler = (event:any) => {
            var key = event.keyCode;
            if (key === 27) close(false);
        }
        document.addEventListener('keydown', keyDownHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        }
    }, [])

    return (
        <div className='tag-modal modal-content'>
            <div className="head">
                <h2 className="title">Tags Filter</h2>
                <p className='button' onClick={allHandle}>Un/Check All</p>
                {!isEmpty(close) && (
                    <p className="close" onClick={() => close(false)}>X</p>
                )}
            </div>

            <div className="body">
                <div className="tags">
                    {load && categories.map((category:ICategory) => {
                        return (
                            <div className="tag" onClick={() => categoryHandle(category)}>
                                <input type="checkbox" checked={FCategories.includes(category._id)} />
                                <p>{category.name}</p>
                            </div>
                        )
                    })}
                </div>
                
            </div>
        </div>

    )
}
