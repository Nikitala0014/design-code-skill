import React, { useState } from 'react';
// import { useAppDispatch } from '../../../store/store';

import { ChallengeFormView } from './ChallengeFormView';
// import { saveNewChallenge } from '../../../store/reducers/challengesReducer';

export default function ChallengeForm() {
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState({
        difficulty: '',
        skill: '',
        maxScore: '',
        successRatio: ''
    });
    const [status, setStatus] = useState('');
    const [preview, setPreview] = useState('');
    // const dispatch = useAppDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        // dispatch(saveNewChallenge({title, details, status, preview}));
        setTitle('');
        setDetails({difficulty: '', skill: '', maxScore: '', successRatio: ''});
        setPreview('');
    }

    function handleChange(e) {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        switch (name) {
            case 'title':
                setTitle(value)
                break;
            case 'status':
                setStatus(value)
                break;
            case 'diff':
                setDetails(value)
                break;
            case 'preview':
                setPreview(value);
                break;
            default:
                break;
        }
    }

    return (
        <ChallengeFormView 
            title={title}
            status={status}
            diff={details}
            preview={preview}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    )
}
