import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { IProperty, IState } from '../../types'

export default function Properties() {

    const properties = useSelector((state:IState) => state.propertiesReducer);

    const [edit, setEdit] = useState("");

    const saveHandle = () => {
        setEdit('');
    }

    return (
                <div className="properties">
                    {properties.map((property:IProperty) => {
                        return (
                            <div className="property">
                                <div className="fields">

                                    <div className="field">
                                        {edit === property._id ? (<input type='text'/>) : (<p>{property.name}</p>) }
                                    </div>
                                    <div className="field">
                                        {edit === property._id ? (<input type='text'/>) : (<p>{property.type}</p>) }
                                    </div>
                                </div>
                                <div className="buttons">
                                    {edit === property._id ? ( <p className='button' onClick={saveHandle}>save</p> ) : (<p className='button' onClick={() => setEdit(property._id)}>Edit</p>) }
                                    <p className="button delete">Delete</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
    )
}
