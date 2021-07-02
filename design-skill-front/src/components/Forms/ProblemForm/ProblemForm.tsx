import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux'

export default function TextChallengeForm() {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        dispatch({type: 'challenge/problemAdd', payload: text});
    }

    function handleChangeText(e) {
        e.preventDefault();
        setText(e.target.value);
    }

    useEffect(() => {
        return() => {
            console.log('text', text);
        }
    }, [text]);

    return (
        <>
           <form onSubmit={handleSubmit}>
               <label>
                   Challenge Text
                   <textarea value={text} onChange={handleChangeText} ></textarea>
               </label>
               <input type="submit" value="Add" />
            </form> 
        </>
    )
}
