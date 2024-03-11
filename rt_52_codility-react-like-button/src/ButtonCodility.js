import React, { useState } from 'react';
import classNames from 'classnames';

export default function LikeButton() {
    const [isPressed, setIsPressed] = useState(false);

    const btnClass = classNames({
        'like-button': true,
        'liked': isPressed,
    });
    
    return (
        <>
            <style>{`
                    .likes-counter { 
                        font-size: 1rem;
                        padding: 5px 10px;
                    }
                    .like-button {
                        color:  #585858;
                    }
                   .liked {
                        font-weight: bold;
                        color: #1565c0;
                   }
                `}</style>
            <button className={btnClass}
                onClick={() => setIsPressed(!isPressed)}
            >  
                {'Like | '}
                <span className='likes-counter'>
                    {isPressed ? '101' : '100'}
                </span>

            </button>
        </>
    );
}