import { useState } from "react"
import TagModal from "./TagModal";
import { isEmpty } from "../../Utils";

export default function SideFilter({fTags, setFtags, params, setParams, tagModal, setTagModal}: {fTags:any, setFtags:any, params:any, setParams:any, tagModal:any, setTagModal:any}) {
  
    return (
        <div className="filter-panel">
                <h2 className="panel-title">Filters</h2>

                <div className="spacer"></div>

                <div className="fields">

                    <div className="field">
                        <p className="field-text">Category</p>
                        <input type="text" className="field-input" onChange={(e) => setParams({...params, category:e.target.value})} />
                    </div>

                    <div className="field">
                        <p className="field-text">Type</p>
                        <input type="text" list="types" className="field-input" onChange={(e) => setParams({...params, type:e.target.value})}/>
                        <datalist id="types">
                            <option value="video">Videos</option>
                            <option value="img">Images</option>
                        </datalist>
                    </div>
                </div>
                
                <div className="spacer"></div>

                <div className="fields">

                    <p className="button" onClick={() => setTagModal(!tagModal)}>Tags ({!isEmpty(fTags) ? fTags.split(",").length : 0})</p>

                </div>   

            </div>
    )
}
