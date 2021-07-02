import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function EditorForm() {
    const [code, setCode] = useState('');
    const dispatch = useDispatch()

    function handleEditor(e) {
        e.preventDefault();
        dispatch({type: 'challenge/codeAdd', payload: code})
    }

    function handleChangeEditor(e) {
        e.preventDefault();
        const value = e.target.value
        setCode(value);
    }

    return (
        <form onSubmit={handleEditor}>
            <textarea name="code" value={code} onChange={handleChangeEditor}></textarea>
        </form>
    )
}
