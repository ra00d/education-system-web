import React, { useState } from 'react'

export const NewQuestion = (props : {}) => {
    const [type,setType]=useState("yes-or-no");
    return (
        <div>
            <select>
                <option value="1"></option>
                <option value=""></option>
                <option value=""></option>
            </select>
        </div>
    )
}
