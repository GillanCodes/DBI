import { useEffect, useState } from "react";
import { isEmpty } from "../../Utils";

export interface IItem
{
    name:string,
    value:string
}

export default function Dropdown({id, title, items, currentValue, setCurrentValue} : {id:string, title:string, items:IItem[], currentValue:any, setCurrentValue:any}) {

    const [open, setOpen] = useState(false);

    return (
        <div className="dropdown">
            {!isEmpty(title) && !isEmpty(id) && (
                <>
                    <p className="dropdown-button" onClick={() => setOpen(!open)}>{!isEmpty(currentValue) ? currentValue : title}</p>
                    {open && (
                        <div className="dropdown-content" id={id}>
                            {!isEmpty(items) && items.map((item:IItem) => {
                                return <p className="dropdown-item" onClick={() => setCurrentValue(item.value)}>{item.name}</p>
                            })}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
